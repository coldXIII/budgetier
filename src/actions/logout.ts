import { redirect } from 'react-router-dom';
import { deleteItem } from '../helpers';
import { toast } from 'react-toastify';

export async function logoutAction() {
  deleteItem({ key: 'userName', id: undefined });
  deleteItem({ key: 'budgets', id: undefined });
  deleteItem({ key: 'expenses', id: undefined });
  toast.success('You have logged out');
  return redirect('/');
}
