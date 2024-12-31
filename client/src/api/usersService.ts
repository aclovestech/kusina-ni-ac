// Imports
import apiClient from './apiClient';
import { User } from '.';
import {
  UserUpdateInput,
  UserAddressInput,
  UserAddressUpdateInput,
} from '../schemas/usersSchemas';

export async function getUser() {
  return await apiClient.get<User>('users').json();
}

export async function updateUser(data: UserUpdateInput) {
  return await apiClient.patch<User>('users', { json: data }).json();
}

export async function getUserAddresses() {
  return await apiClient.get<UserAddress[]>('users/addresses').json();
}

export async function createNewUserAddress(data: UserAddressInput) {
  return await apiClient
    .post<UserAddress>('users/addresses', { json: data })
    .json();
}

export async function updateUserAddress(
  address_id: string,
  data: UserAddressUpdateInput
) {
  return await apiClient
    .patch<UserAddress>(`users/addresses/${address_id}`, { json: data })
    .json();
}

export async function deleteUserAddress(address_id: string) {
  return await apiClient.delete(`users/addresses/${address_id}`).json();
}

export type UserAddress = {
  address_id: string;
  customer_id: string;
  address_line1: string;
  address_line2: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  phone_number: string;
  is_default: boolean;
};
