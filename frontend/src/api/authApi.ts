
import axios from "axios";
const BASE_URL = "http://localhost:8000/api/";

export const caseApi = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export interface LoginInput {
    email: string;
    password: string;
  }
  
  export interface LoginResponse {
    status: string;
    token: string;
  }

  export interface RegisterInput {
    email: string;
    name: string;
    password: string;
    passwordConfirm: string;
    photo: string;
  }
  
  
  export interface User {
    createdAt: string;
    email: string;
    id: string;
    name: string;
    photo: string;
    role: string;
    updatedAt: string;
    verified: boolean;
  }
  
  export interface RegisterResponse {
    status: string;
    data: {
      user: User;
    };
  }
  
  
  export const loginFn = async (loginInput: LoginInput): Promise<LoginResponse> => {
    const response = await caseApi.post<LoginResponse>('auth/login', loginInput);
    return response.data;
  };
  
export const logoutFn = async (): Promise<void> => {
  await caseApi.get('auth/logout');
};


export const registerFn = async (registerInput: RegisterInput): Promise<RegisterResponse> => {
  const response = await caseApi.post<RegisterResponse>('auth/register', registerInput);
  return response.data;
};
