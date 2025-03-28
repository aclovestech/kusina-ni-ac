// Imports
import apiClient from './apiClient';
import { LoginFormInput, RegistrationFormInput } from '../schemas/authSchemas';
import { HTTPError } from 'ky';

export async function registerCustomer(data: RegistrationFormInput) {
  return await apiClient.post<User>('auth/register', { json: data }).json();
}

export async function loginCustomer(data: LoginFormInput) {
  return await apiClient.post<User>('auth/login', { json: data }).json();
}

export function loginCustomerWithGoogle() {
  window.location.href = `${import.meta.env.VITE_API_BASE_URL}/auth/google`;
}

export async function checkCustomerSession() {
  try {
    const response = await apiClient.get<User>('auth/check-session').json();
    return response;
  } catch (error) {
    if (
      error instanceof HTTPError &&
      error.response &&
      error.response.status === 401
    ) {
      return null;
    }
  }
}

export async function logoutCustomer() {
  return await apiClient.post('auth/logout').json();
}

export type User = {
  customer_id: string;
  email: string;
  first_name: string;
  last_name: string;
  date_of_birth: Date;
  loyalty_points: number;
  created_at: string;
  updated_at: string;
  last_login: string;
};
