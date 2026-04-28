import axios from "axios";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

// Mock auth mode - set to false to use real backend
const MOCK_AUTH = false;

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Log errors in development for debugging
    if (process.env.NODE_ENV === "development") {
      console.error("API Error:", error);
    }

    // Only redirect on 401/403 if NOT on login/register pages
    if (error.response?.status === 401 || error.response?.status === 403) {
      const isAuthEndpoint =
        error.config?.url?.includes("/auth/") ||
        error.config?.url?.includes("/login") ||
        error.config?.url?.includes("/register");

      if (!isAuthEndpoint) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        // Only redirect if not already on login page to avoid loops
        if (typeof window !== "undefined" && !window.location.pathname.includes("/login")) {
          window.location.href = "/login";
        }
      }
    }
    return Promise.reject(error);
  }
);

// Auth Types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  token?: string;
  user: {
    id?: string;
    _id?: string;
    email: string;
    fullName?: string;
  };
  message?: string;
}

// Generate a mock JWT token
const generateMockToken = (email: string): string => {
  const header = btoa(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  const payload = btoa(
    JSON.stringify({
      _id: Math.random().toString(36).substring(2, 15),
      email,
      role: "CANDIDATE",
      iat: Date.now(),
    })
  );
  const signature = btoa("mock-signature");
  return `${header}.${payload}.${signature}`;
};

// Mock auth implementation
const mockLogin = async (data: LoginRequest): Promise<AuthResponse> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Simple validation
  if (data.password.length < 6) {
    throw {
      response: {
        data: { message: "Invalid credentials" },
        status: 401,
      },
    };
  }

  const token = generateMockToken(data.email);
  const user = {
    _id: Math.random().toString(36).substring(2, 15),
    email: data.email,
    fullName: data.email.split("@")[0],
    role: "CANDIDATE" as const,
  };

  return { token, user, message: "Login successful" };
};

const mockRegister = async (data: RegisterRequest): Promise<AuthResponse> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1200));

  // Simple validation
  if (data.password.length < 6) {
    throw {
      response: {
        data: { message: "Password must be at least 6 characters" },
        status: 400,
      },
    };
  }

  const user = {
    id: Math.random().toString(36).substring(2, 15),
    email: data.email,
  };

  // Backend signup doesn't return token, only user
  return { user, message: "User Sign Up Successful" };
};

// Auth API
export const authApi = {
  login: async (data: LoginRequest): Promise<AuthResponse> => {
    if (MOCK_AUTH) {
      return mockLogin(data);
    }
    const response = await api.post<AuthResponse>("/auth/login", data);
    return response.data;
  },

  register: async (data: RegisterRequest): Promise<AuthResponse> => {
    if (MOCK_AUTH) {
      return mockRegister(data);
    }
    const response = await api.post<AuthResponse>("/auth/signup", data);
    return response.data;
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  },

  getToken: () => localStorage.getItem("token"),

  getUser: () => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  },

  setAuthData: (data: AuthResponse) => {
    if (data.token) {
      localStorage.setItem("token", data.token);
    }
    localStorage.setItem("user", JSON.stringify(data.user));
  },

  isAuthenticated: () => {
    return !!localStorage.getItem("token");
  },

  // For debugging - check if using mock mode
  isMockMode: () => MOCK_AUTH,

  // Check if API is reachable (for health checks)
  healthCheck: async (): Promise<boolean> => {
    try {
      await api.get("/", { timeout: 5000 });
      return true;
    } catch (error) {
      return false;
    }
  },
};
