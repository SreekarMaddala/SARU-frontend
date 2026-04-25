import { useState } from "react";
import { createProduct } from "../../products/api";
import Button from "../../../shared/components/Button";

export default function ProductSection({ products, onProductCreated, loading }) {
  const [newProductName, setNewProductName] = useState("");
  const [newProductDescription, setNewProductDescription] = useState("");
  const [creatingProduct, setCreatingProduct] = useState(false);

  const handleCreateProduct = async () => {
    if (!newProductName.trim()) return alert("Enter a product name.");
    setCreatingProduct(true);
    try {
      await createProduct({
        name: newProductName.trim(),
        description: newProductDescription.trim(),
      });
      setNewProductName("");
      setNewProductDescription("");
      await onProductCreated();
      alert("Product created successfully!");
    } catch (error) {
      console.error("Error creating product:", error);
      alert("Failed to create product");
    }
    setCreatingProduct(false);
  };

  return (
    <div className="bg-neutral-900 rounded-xl p-6 shadow-lg border border-primary-800">
      <h2 className="text-2xl font-title text-primary-300 mb-4">Products</h2>
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Product Name"
            value={newProductName}
            onChange={(e) => setNewProductName(e.target.value)}
            className="w-full bg-neutral-800 text-neutral-100 border border-neutral-700 rounded-lg px-4 py-2 focus:border-primary-500 focus:outline-none"
          />
          <input
            type="text"
            placeholder="Product Description (optional)"
            value={newProductDescription}
            onChange={(e) => setNewProductDescription(e.target.value)}
            className="w-full bg-neutral-800 text-neutral-100 border border-neutral-700 rounded-lg px-4 py-2 focus:border-primary-500 focus:outline-none"
          />
        </div>
        <Button
          onClick={handleCreateProduct}
          loading={creatingProduct}
          variant="primary"
          size="md"
          className="w-full"
        >
          {creatingProduct ? "Creating..." : "Create Product"}
        </Button>
      </div>
      <div className="mt-6">
        <h3 className="text-lg font-semibold text-primary-300 mb-2">Existing Products</h3>
        <div className="space-y-2 max-h-40 overflow-y-auto">
          {products.map((product) => (
            <div key={product.id} className="bg-neutral-800 p-3 rounded-lg">
              <div className="font-semibold text-primary-300">{product.name}</div>
              {product.description && (
                <div className="text-sm text-neutral-400">{product.description}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

