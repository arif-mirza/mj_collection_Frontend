

// API utility file for making backend calls
const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// Helper function to get auth token from localStorage
const getAuthToken = () => {
  return localStorage.getItem("token");
};

// Helper function to make API calls
const apiCall = async (endpoint, options = {}) => {
  const token = getAuthToken();
  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const config = {
    ...options,
    headers,
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
};

// Product API calls
export const productAPI = {
  // Get all products
  getAll: async () => {
    return apiCall("/products");
  },

  // Get single product by ID
  getById: async (id) => {
    return apiCall(`/products/${id}`);
  },

  // Create new product
  create: async (productData) => {
    return apiCall("/products", {
      method: "POST",
      body: JSON.stringify(productData),
    });
  },

  // Update product
  update: async (id, productData) => {
    return apiCall(`/products/${id}`, {
      method: "PUT",
      body: JSON.stringify(productData),
    });
  },

  // Delete product
  delete: async (id) => {
    return apiCall(`/products/${id}`, {
      method: "DELETE",
    });
  },
};

// Auth API calls
export const authAPI = {
  // Register user
  register: async (userData) => {
    return apiCall("/auth/register", {
      method: "POST",
      body: JSON.stringify(userData),
    });
  },

  // Login user
  login: async (credentials) => {
    return apiCall("/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    });
  },
};

// auth helpers
export const saveToken = (token) => localStorage.setItem("token", token);

export const saveUser = (user) =>
  localStorage.setItem("user", JSON.stringify(user));

// Helper to remove token
export const removeToken = () => {
  localStorage.removeItem("token");
};

export const getUser = () => JSON.parse(localStorage.getItem("user"));

// Helper to get token
export const getToken = () => {
  return localStorage.getItem("token");
};

export const orderAPI = {
  // Admin login simulation
  adminlogin: async (credentials) => {
    return apiCall("/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    });
  },

  // Place order for user
  placeOrder: async (orderData) => {
    return apiCall("/orders", {
      method: "POST",
      body: JSON.stringify(orderData),
    });
  },

  // Get all orders for admin
  getAll: async () => {
    return apiCall("/orders");
  },

  // Update status
  updateStatus: async (id, status) => {
    return apiCall(`/orders/${id}`, {
      method: "PUT",
      body: JSON.stringify({ status }),
    });
  },
  updatePayment: async (id, data) => {
    return apiCall(`/orders/payment/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  },

  getMyOrders: async () => {
    return apiCall("/orders/my-orders");
  },
};

/* ================== CART ================== */
export const addToCart = (product) => {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const existingProduct = cart.find((item) => item._id === product._id);

  if (existingProduct) {
    // quantity increase karo
    cart = cart.map((item) =>
      item._id === product._id ? { ...item, qty: item.qty + 1 } : item,
    );
  } else {
    // first time add
    cart.push({ ...product, qty: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
};

export const getCartCount = () => {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  return cart.reduce((total, item) => total + (item.qty || 1), 0);
};

export default { productAPI, authAPI, orderAPI, addToCart, getCartCount };
