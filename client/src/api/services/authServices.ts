import api from '../config/axiosConfig';

interface RegistrationData {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
}

interface LoginData {
  email: string;
  password: string;
}

export const register = async (data: RegistrationData) => {
  api.post('/auth/register', data);
};

export const login = async (data: LoginData) => {
  api.post('/auth/login', data);
};
