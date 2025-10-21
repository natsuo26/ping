export interface User {
  id: string;
  userName: string;
  role?: string;
  accessToken: string;
  refreshToken: string;
}

export interface LoginRequest {
  userName: string;
  password: string;
}

export interface RegisterRequest {
  userName: string;
  password: string;
}

export interface LoginResponse {
  id: string;
  userName: string;
  role: string;
  accessToken: string;
  refreshToken: string;
}

export interface RegisterResponse {
  id: string;
  userName: string;
  passwordHash: string;
  role: string;
}
