import { useState, useEffect, useRef } from "react";
import { uploadCSV } from "../../dashboard/api";
import { getProducts } from "../../products/api";
import Button from "../../../shared/components/Button";

const MAX_FILE_SIZE_MB = 10;
const CSV_TEMPLATE = `channel,text,name,email,mobile,product_model_number
email,Great product loved the features!,John Doe,john@example.com,,IPHONE-15-PRO
twitter,Had some issues with battery life,Jane Smith,,+1234567890,GALAXY-S24
support_chat,Excellent customer service,Bob Johnson,bob@example.com,+9876543210,
google_forms,Would recommend to friends,Alice Brown,alice@example.com,,
`;

function downloadTemplate() {
  const blob = new Blob([CSV_TEMPLATE], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "feedback_template.csv";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function parseCsvPreview(file, maxRows = 5) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target.result;
      const lines = text.split(/\r?\n/).filter((l) => l.trim() !== "");
      if (lines.length === 0) return reject(new Error("CSV file is empty"));

      const headers = lines[0].split(",").map((h) => h.trim().toLowerCase());
      const hasChannel = headers.includes("channel");
      const hasText = headers.includes("text");
      const hasEmail = headers.includes("email");
      const hasMobile = headers.includes("mobile");

      if (!hasChannel || !hasText) {
        return reject(
          new Error(
            `CSV must contain required columns: channel, text. Found: ${headers.join(", ")}`
          )
        );
      }
      if (!hasEmail && !hasMobile) {
        return reject(
          new Error(
            "CSV must contain at least one of: email, mobile"
          )
        );
      }

      const rows = lines.slice(1, maxRows + 1).map((line) => {
        const values = line.split(",");
        const obj = {};
        headers.forEach((h, i) => {
          obj[h] = values[i]?.trim() || "";
        });
        return obj;
      });

      resolve({ headers, rows, totalRows: lines.length - 1 });
    };
    reader.onerror = () => reject(new Error("Failed to read file"));
    reader.readAsText(file);
  });
}

export default function CsvUploadSection({ onUploadSuccess }) {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [products, setProducts] = useState([]);
  const [selectedModelNumber, setSelectedModelNumber] = useState("");
  const [uploading, setUploading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data || []);
      } catch (err) {
        console.error("Failed to load products for dropdown:", err);
      }
    };
    loadProducts();
  }, []);

  const handleFileChange = async (e) => {
    const selected = e.target.files?.[0];
    setFile(null);
    setPreview(null);
    setResult(null);
    setError(null);

    if (!selected) return;

    if (!selected.name.toLowerCase().endsWith(".csv")) {
      setError("Please select a .csv file.");
      return;
    }

    const sizeMB = selected.size / (1024 * 1024);
    if (sizeMB > MAX_FILE_SIZE_MB) {
      setError(`File size must be less than ${MAX_FILE_SIZE_MB}MB.`);
      return;
    }

    setFile(selected);

    try {
      const p = await parseCsvPreview(selected, 5);
      setPreview(p);
    } catch (err) {
      setError(err.message);
      setFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a CSV file first.");
      return;
    }

    setUploading(true);
    setResult(null);
    setError(null);

    try {
      const data = await uploadCSV(file);
      setResult({
        inserted: data.inserted ?? 0,
        rejected: data.rejected_missing_email_and_mobile ?? 0,
        message: data.message || "Upload complete.",
      });
      setFile(null);
      setPreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      if (onUploadSuccess) await onUploadSuccess();
    } catch (err) {
      console.error("CSV upload error:", err);
      const msg =
        err.response?.data?.detail ||
        err.response?.data?.message ||
        err.message ||
        "CSV upload failed. Please try again.";
      setError(msg);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="bg-saru-slate rounded-xl shadow-2xl p-6 border border-saru-cyan/20 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-saru-cyan">Upload Feedback CSV</h2>
        <button
          onClick={downloadTemplate}
          className="text-sm bg-saru-teal/20 text-saru-teal px-4 py-2 rounded-lg font-semibold hover:bg-saru-teal/30 transition duration-300"
        >
          📥 Download Template
        </button>
      </div>

      {/* Product Model Number Helper */}
      {products.length > 0 && (
        <div>
          <label className="block text-saru-cyan mb-2 text-sm font-medium">
            Product Model Number (optional — include in CSV instead)
          </label>
          <select
            value={selectedModelNumber}
            onChange={(e) => setSelectedModelNumber(e.target.value)}
            className="w-full bg-saru-slate-dark text-saru-cyan border border-saru-cyan/30 rounded-lg px-4 py-2 focus:border-saru-cyan focus:outline-none"
          >
            <option value="">-- Select a product (for reference) --</option>
            {products.map((p) => (
              <option key={p.model_number || p.name} value={p.model_number}>
                {p.model_number} — {p.name}
              </option>
            ))}
          </select>
          <p className="text-xs text-saru-cyan/50 mt-1">
            Tip: Add a <code className="text-saru-teal">product_model_number</code> column to your CSV.
          </p>
        </div>
      )}

      {/* File Input */}
      <div>
        <label className="block text-saru-cyan mb-2 text-sm font-medium">
          Select CSV File
        </label>
        <input
          ref={fileInputRef}
          type="file"
          accept=".csv"
          onChange={handleFileChange}
          className="w-full text-saru-cyan file:bg-saru-cyan file:text-saru-black file:border-none file:rounded-lg file:px-4 file:py-2 file:font-semibold hover:file:bg-saru-teal transition duration-300"
        />
        <p className="text-xs text-saru-cyan/50 mt-1">
          Max {MAX_FILE_SIZE_MB}MB. Must include <code className="text-saru-teal">channel</code>,{" "}
          <code className="text-saru-teal">text</code>, and at least one of{" "}
          <code className="text-saru-teal">email</code> /{" "}
          <code className="text-saru-teal">mobile</code>.
        </p>
      </div>

      {/* Preview */}
      {preview && (
        <div className="bg-saru-black-light rounded-lg p-4 border border-saru-cyan/10">
          <h3 className="text-sm font-semibold text-saru-teal mb-2">
            Preview (first {preview.rows.length} of {preview.totalRows} rows)
          </h3>
          <div className="overflow-x-auto">
            <table className="min-w-full text-xs">
              <thead>
                <tr className="text-saru-cyan/70 border-b border-saru-cyan/20">
                  {preview.headers.map((h) => (
                    <th key={h} className="text-left px-3 py-2 font-medium">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {preview.rows.map((row, i) => (
                  <tr key={i} className="text-saru-cyan/90 border-b border-saru-cyan/10">
                    {preview.headers.map((h) => (
                      <td key={h} className="px-3 py-2 whitespace-nowrap">
                        {row[h] || "—"}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Upload Button */}
      <Button
        onClick={handleUpload}
        disabled={uploading || !file}
        loading={uploading}
        variant="primary"
        size="md"
        className="w-full"
      >
        {uploading ? "Uploading..." : "Upload CSV"}
      </Button>

      {/* Success Result */}
      {result && (
        <div className="bg-green-900/20 border border-green-500/30 text-green-400 p-4 rounded-xl space-y-1">
          <p className="font-semibold flex items-center gap-2">
            <span>✅</span> {result.inserted} feedback(s) inserted
          </p>
          {result.rejected > 0 && (
            <p className="flex items-center gap-2">
              <span>⚠️</span> {result.rejected} row(s) rejected (missing email & mobile)
            </p>
          )}
          <p className="text-sm text-green-300/80 italic">💡 {result.message}</p>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="bg-red-900/20 border border-red-500/30 text-red-400 p-4 rounded-xl">
          <p className="font-semibold">❌ Upload Failed</p>
          <p className="text-sm mt-1">{error}</p>
        </div>
      )}
    </div>
  );
}

