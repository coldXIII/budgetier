import { toast } from 'react-toastify';
import { deleteItem, getAllMatchingItems } from '../helpers';
import { redirect } from 'react-router-dom';

export const deleteBudget = ({ params }: any) => {
  try {
    deleteItem({
      key: 'budgets',
      id: params.id,
    });

    const associatedExpenses = getAllMatchingItems({
      category: 'expenses',
      key: 'budgetId',
      value: params.id,
    });

    associatedExpenses.forEach((expense: any) => {
      deleteItem({
        key: 'expenses',
        id: expense.id,
      });
    });

    toast.success(`Budget was deleted`);
  } catch (error) {
    throw new Error('Il y a un probleme avec delete ton budget');
  }
  return redirect('/');
};
