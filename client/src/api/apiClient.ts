// Imports
import ky from 'ky';

const apiClient = ky.extend({
  prefixUrl: import.meta.env.VITE_API_BASE_URL,
  credentials: 'include',
});

export default apiClient;
