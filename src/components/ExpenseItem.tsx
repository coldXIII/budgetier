import { Expense } from '../types';
import { formatCurrency, formatDate, getAllMatchingItems } from '../helpers';
import { Link, useFetcher } from 'react-router-dom';
import { TrashIcon } from '@heroicons/react/24/solid';

type Props = {
  expense: Expense;
};

const ExpenseItem = ({ expense }: Props) => {
  
  const fetcher = useFetcher();
  const budget = getAllMatchingItems({
    category: 'budgets',
    key: 'id',
    value: expense.budgetId,
  })[0];
  const color = `#${budget.color}`
  return (
    <>
      <td className="p-2 border">{expense.name}</td>
      <td className="p-2 border">{formatCurrency(expense.amount)}</td>
      <td className="p-2 border">{formatDate(expense.createdAt)}</td>
      <td className={`p-2 border text-[${color}]`}>
        <Link to={`/budget/${budget.id}`}>{budget.name}</Link>
      </td>
      <td className="p-2 border">
        <fetcher.Form method="post">
          <input type="hidden" name="_action" value="deleteExpense" />
          <input type="hidden" name="expenseId" value={expense.id} />
          <button
            type="submit"
            title="Remove Expense"
            className="btn btn-error btn-outline"
            aria-label={`Delete ${expense.name} expense`}
          >
            <TrashIcon width={20} />
          </button>
        </fetcher.Form>
      </td>
    </>
  );
};

export default ExpenseItem;
