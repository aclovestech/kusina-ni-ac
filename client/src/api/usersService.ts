// Imports
import apiClient from './apiClient';
import { User } from '.';
import { UserUpdateInput } from '../schemas/usersSchemas';

export async function getUser() {
  return await apiClient.get<User>('users').json();
}

export async function updateUser(data: UserUpdateInput) {
  return await apiClient.patch<User>('users', { json: data }).json();
}
