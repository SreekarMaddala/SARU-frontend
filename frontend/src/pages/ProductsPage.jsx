import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { getProducts, createProduct, updateProduct, deleteProduct } from "../services/productApi";

export default function ProductsPage() {
  const { logout } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({ name: "", description: "" });
  const [submitting, setSubmitting] = useState(false);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await getProducts();
      setProducts(data);
      setError(null);
    } catch (err) {
      console.error("Error loading products:", err);
      setError("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleCreate = async () => {
    if (!formData.name.trim()) {
      alert("Product name is required");
      return;
    }

    setSubmitting(true);
    try {
      await createProduct({
        name: formData.name.trim(),
        description: formData.description.trim(),
      });
      setFormData({ name: "", description: "" });
      setShowCreateForm(false);
      await loadProducts();
      alert("Product created successfully!");
    } catch (err) {
      console.error("Error creating product:", err);
      alert("Failed to create product");
    } finally {
      setSubmitting(false);
    }
  };

  const handleUpdate = async () => {
    if (!formData.name.trim()) {
      alert("Product name is required");
      return;
    }

    setSubmitting(true);
    try {
      await updateProduct(editingProduct.id, {
        name: formData.name.trim(),
        description: formData.description.trim(),
      });
      setFormData({ name: "", description: "" });
      setEditingProduct(null);
      await loadProducts();
      alert("Product updated successfully!");
    } catch (err) {
      console.error("Error updating product:", err);
      alert("Failed to update product");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (productId) => {
    if (!window.confirm("Are you sure you want to delete this product?")) {
      return;
    }

    try {
      await deleteProduct(productId);
      await loadProducts();
      alert("Product deleted successfully!");
    } catch (err) {
      console.error("Error deleting product:", err);
      alert("Failed to delete product");
    }
  };

  const startEdit = (product) => {
    setEditingProduct(product);
    setFormData({ name: product.name, description: product.description || "" });
  };

  const cancelEdit = () => {
    setEditingProduct(null);
    setFormData({ name: "", description: "" });
  };

  const handleLogout = () => {
    logout();
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-saru-black">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-gradient-to-r from-saru-cyan via-saru-teal to-saru-teal-dark border-b border-saru-cyan/60 backdrop-blur-md shadow-lg">
        <div className="flex justify-between items-center p-8">
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex items-center space-x-4">
              <img src="/logo - Copy.png" alt="Logo" className="h-32 w-16" />
              <div>
                <h1 className="text-4xl font-bold text-saru-cyan">SARU</h1>
                <p className="text-sm text-saru-cyan/60">feedback collector</p>
              </div>
            </Link>
          </div>
          <div className="hidden md:flex space-x-8 items-center">
            <Link to="/dashboard" className="text-saru-cyan hover:text-saru-teal transition duration-300 relative">
              Dashboard
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-saru-teal transition-all duration-300 hover:w-full"></span>
            </Link>
            <Link to="/feedback-table" className="text-saru-cyan hover:text-saru-teal transition duration-300 relative">
              Feedback Table
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-saru-teal transition-all duration-300 hover:w-full"></span>
            </Link>
            <Link to="/customer-data" className="text-saru-cyan hover:text-saru-teal transition duration-300 relative">
              Customer Data
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-saru-teal transition-all duration-300 hover:w-full"></span>
            </Link>
            <span className="text-saru-teal font-semibold">Products</span>
            <a href="#" className="text-saru-cyan hover:text-saru-teal transition duration-300 relative">
              About
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-saru-teal transition-all duration-300 hover:w-full"></span>
            </a>
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-300"
            >
              Logout
            </button>
          </div>
          <button className="md:hidden text-saru-cyan">☰</button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="p-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold text-saru-cyan">Products</h1>
            <button
              onClick={() => setShowCreateForm(true)}
              className="bg-saru-cyan text-saru-black px-6 py-3 rounded-lg font-semibold hover:bg-saru-teal transition duration-300"
            >
              Add Product
            </button>
          </div>

          {/* Create/Edit Form Modal */}
          {(showCreateForm || editingProduct) && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-saru-slate p-8 rounded-xl shadow-2xl max-w-md w-full mx-4">
                <h2 className="text-2xl font-bold text-saru-cyan mb-6">
                  {editingProduct ? "Edit Product" : "Create New Product"}
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-saru-cyan mb-2">Name *</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-saru-slate-dark text-saru-cyan border border-saru-cyan/30 rounded-lg px-4 py-2 focus:border-saru-cyan focus:outline-none"
                      placeholder="Enter product name"
                    />
                  </div>
                  <div>
                    <label className="block text-saru-cyan mb-2">Description</label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="w-full bg-saru-slate-dark text-saru-cyan border border-saru-cyan/30 rounded-lg px-4 py-2 focus:border-saru-cyan focus:outline-none h-24 resize-none"
                      placeholder="Enter product description (optional)"
                    />
                  </div>
                </div>
                <div className="flex space-x-4 mt-6">
                  <button
                    onClick={editingProduct ? handleUpdate : handleCreate}
                    disabled={submitting}
                    className="flex-1 bg-saru-cyan text-saru-black px-6 py-3 rounded-lg font-semibold hover:bg-saru-teal transition duration-300 disabled:opacity-50"
                  >
                    {submitting ? "Saving..." : (editingProduct ? "Update" : "Create")}
                  </button>
                  <button
                    onClick={() => {
                      setShowCreateForm(false);
                      cancelEdit();
                    }}
                    className="flex-1 bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-700 transition duration-300"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Products Table */}
          <div className="bg-saru-slate rounded-xl shadow-2xl p-6">
            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-saru-cyan mx-auto"></div>
                <p className="text-saru-cyan mt-4">Loading products...</p>
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <p className="text-red-400">{error}</p>
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-saru-cyan/60">No products found. Create your first product!</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-saru-cyan/20">
                  <thead className="bg-saru-slate-dark">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-saru-cyan uppercase tracking-wider">
                        #
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-saru-cyan uppercase tracking-wider">
                        ID
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-saru-cyan uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-saru-cyan uppercase tracking-wider">
                        Description
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-saru-cyan uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-saru-slate divide-y divide-saru-cyan/10">
                    {products.map((product, index) => (
                      <tr key={product.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-saru-cyan">
                          {index + 1}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-saru-cyan/70">
                          {product.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-saru-cyan">
                          {product.name}
                        </td>
                        <td className="px-6 py-4 text-sm text-saru-cyan/70">
                          {product.description || "N/A"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => startEdit(product)}
                              className="bg-saru-teal text-saru-black px-3 py-1 rounded-lg font-semibold hover:bg-saru-cyan transition duration-300 text-xs"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDelete(product.id)}
                              className="bg-red-600 text-white px-3 py-1 rounded-lg font-semibold hover:bg-red-700 transition duration-300 text-xs"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
