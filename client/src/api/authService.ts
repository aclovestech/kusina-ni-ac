// Imports
import apiClient from './apiClient';
import { RegistrationFormInput } from '../schemas/registrationSchema';
import { LoginFormInput } from '../schemas/loginSchema';

export async function register(data: RegistrationFormInput) {
  return await apiClient.post('/auth/register', { json: data }).json();
}

export async function login(data: LoginFormInput) {
  return await apiClient.post('/auth/login', { json: data }).json();
}

export function loginWithGoogle() {
  window.location.href = `${import.meta.env.VITE_API_BASE_URL}/auth/google`;
}

export async function checkSession() {
  return await apiClient.get('/auth/check-session').json();
}

export async function logout() {
  return await apiClient.post('/auth/logout').json();
}
