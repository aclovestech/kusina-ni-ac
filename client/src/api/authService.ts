// Imports
import apiClient from './apiClient';
import { LoginFormInput, RegistrationFormInput } from '../schemas/authSchemas';

export async function registerCustomer(data: RegistrationFormInput) {
  return await apiClient.post('/auth/register', { json: data }).json();
}

export async function loginCustomer(data: LoginFormInput) {
  return await apiClient.post('/auth/login', { json: data }).json();
}

export function loginCustomerWithGoogle() {
  window.location.href = `${import.meta.env.VITE_API_BASE_URL}/auth/google`;
}

export async function checkCustomerSession() {
  return await apiClient.get('/auth/check-session').json();
}

export async function logoutCustomer() {
  return await apiClient.post('/auth/logout').json();
}
