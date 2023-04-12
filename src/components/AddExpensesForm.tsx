import { useEffect, useRef } from 'react';
import { Budget } from '../types';
import { useFetcher } from 'react-router-dom';
import { PlusCircleIcon } from '@heroicons/react/24/solid';

type Props = {
  budgets: Budget[];
};

const AddExpensesForm = ({ budgets }: Props) => {
  const fetcher = useFetcher();
  const isSubmitting = fetcher.state === 'submitting';

  const formRef = useRef<HTMLFormElement>(null);

  const sortedBudgets = budgets.sort((a, b) => +a.createdAt - +b.createdAt);

  useEffect(() => {
    if (formRef.current !== null && !isSubmitting) {
      formRef.current.reset();
    }
  }, [isSubmitting]);
  return (
    <div className="flex flex-col p-4">
      <h2 className="text-xl underline mb-4">
        <span className="text-white">Add New</span>{' '}
        {budgets.length === 1
          ? `${budgets.map((budg) => budg.name)} Expense `
          : 'Expense'}
      </h2>
      <fetcher.Form
        method="post"
        ref={formRef}
        className=" bg-[#232323] p-2 rounded-md   flex flex-col gap-4  items-start"
      >
        <div className="flex flex-col gap-2 w-full">
          <label htmlFor="newExpense" className="text-xs">
            Expense Name
          </label>
          <input
            type="text"
            name="newExpense"
            id="newExpense"
            className="input input-bordered w-full max-w-sm"
            placeholder="name of expense, e.g. Brandy"
            required
          />
        </div>
        <div className="flex flex-col gap-2  w-full ">
          <label htmlFor="amount" className="text-xs">
            Expense Amount
          </label>
          <input
            type="number"
            step="0.01"
            inputMode="decimal"
            name="amount"
            id="amount"
            className="input input-bordered w-full max-w-sm"
            placeholder="amount of expense"
            required
          />
        </div>
        <div className="flex flex-col gap-2 w-full">
          <label htmlFor="newExpenseBudget" className="text-xs">
            Budget Category
          </label>
          <select
            className="select select-bordered w-full max-w-sm"
            name="newExpenseBudget"
            id="newExpenseBudget"
            placeholder="name of expense, e.g. Brandy"
            required
          >
            {sortedBudgets.map((b, index) => (
              <option key={b.id} value={b.id}>
                {b.name}
              </option>
            ))}
          </select>
        </div>
        <input type="hidden" name="_action" value="newExpense" />
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn flex justify-center items-center gap-2 mt-4 disabled:blur-sm"
        >
          {isSubmitting ? 'Creating Your Expense' : 'Create New Expense'}{' '}
          <PlusCircleIcon width={25} />
        </button>
      </fetcher.Form>
    </div>
  );
};

export default AddExpensesForm;
