import { Expense } from '../types';
import { deleteItem, fetchData } from '../helpers';
import Table from '../components/Table';
import { useLoaderData } from 'react-router-dom';
import { toast } from 'react-toastify';

export function expensesLoader() {
  const expenses: Expense[] = fetchData('expenses');
  return { expenses };
}

export async function expensesAction({ request }: any) {
  const data = await request.formData();
  const { _action, ...values } = Object.fromEntries(data);
  if (_action === 'deleteExpense') {
    try {
      if (confirm('Are you sure?')) {
        deleteItem({
          key: 'expenses',
          id: values.expenseId,
        });
        return toast.success(`Expense was deleted`);
      }
    } catch (error) {
      throw new Error('There is a problem with deleting this expense');
    }
  }
}

type Expenses = {
  expenses: Expense[];
};

const Expenses = () => {
  const { expenses } = useLoaderData() as Expenses;
  return (
    <div className="p-4">
      <Table expenses={expenses} />
    </div>
  );
};

export default Expenses;
