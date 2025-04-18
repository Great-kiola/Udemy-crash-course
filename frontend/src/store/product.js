import { create } from "zustand";

export const useProductStore = create((set) => ({
  products: [],
  setProducts: (products) => set({ products }),

  createProduct: async (newProduct) => {
    if (!newProduct.name || !newProduct.price || !newProduct.image) {
      return { success: false, message: "Please fill in all fields" };
    }

    if (isNaN(newProduct.price) || newProduct.price <= 0) {
      return {
        success: false,
        message: "Price must be a valid positive number",
      };
    }

    const res = await fetch("/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    });

    if (!res.ok) {
      return {
        success: false,
        message: "Failed to create product. Server error.",
      };
    }

    const data = await res.json();
    set((state) => ({ products: [...state.products, data.data] }));
    return { success: true, message: "Product Added Successfully" };
  },

  fetchProducts: async () => {
    try {
      const res = await fetch("/api/products");

      if (!res.ok) {
        console.error("Failed to fetch products. Server error.");
        return;
      }

      const data = await res.json();
      set({ products: data.data });
    } catch (error) {
      console.error("Error fetching products:", error.message);
    }
  },

  deleteProduct: async (pid) => {
    try {
      const res = await fetch(`/api/products/${pid}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        return {
          success: false,
          message: "Failed to delete product. Server error.",
        };
      }

      const data = await res.json();
      if (!data.success) return { success: false, message: data.message };

      set((state) => ({
        products: state.products.filter((product) => product._id !== pid),
      }));

      return { success: true, message: data.message };
    } catch (error) {
      console.error("Error deleting product:", error.message);
      return {
        success: false,
        message: "Failed to delete product. Network error.",
      };
    }
  },

  updateProduct: async (pid, updatedProduct) => {
    const res = await fetch(`/api/products/${pid}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedProduct),
    });

    if (!res.ok) {
      return {
        success: false,
        message: "Failed to update product. Server error.",
      };
    }

    const data = await res.json();
    if (!data.success) return { success: false, message: data.message };


    // Updates the ui immediately
    set((state) => ({
      products: state.products.map((product) =>
        product._id === pid ? data.data : product
      ),
    }));

    return { success: true, message: data.message };
  },
}));
