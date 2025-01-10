// Imports
import { checkCustomerSession } from '../api';

export default async function isSignedIn() {
  const user = await checkCustomerSession();
  return user !== null;
}
