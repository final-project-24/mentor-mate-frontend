// src/config.js

// main.jsx

export const API_BASE_URL = 
  import.meta.env.VITE_API_BASE_URL || "http://localhost:4000/app";

export const STRIPE_PUBLIC_KEY =
  import.meta.env.VITE_STRIPE_PUBLIC_KEY;

export const PAYPAL_CLIENT_ID =
  import.meta.env.PAYPAL_CLIENT_ID;

export const NODE_ENV =
  import.meta.env.VITE_NODE_ENV
