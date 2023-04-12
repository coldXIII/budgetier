import { useEffect, useRef } from 'react';
import {  useFetcher } from 'react-router-dom';
import { CurrencyDollarIcon } from '@heroicons/react/24/solid';

type Props = {
  title: string;
};

const AddBudgetForm = ({ title }: Props) => {
  const fetcher = useFetcher();
  const isSubmitting = fetcher.state === 'submitting';

  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (formRef.current !== null && !isSubmitting) {
      formRef.current.reset();
    }
  }, [isSubmitting]);

  return (
    <div className="flex flex-col p-4">
      <h2 className="text-xl underline mb-4">{title}</h2>
      <fetcher.Form
        method="post"
        ref={formRef}
        className=" bg-[#232323] p-2 rounded-md   flex flex-col gap-4  items-start"
      >
        <div className="flex flex-col gap-2 w-full">
          <label htmlFor="newBudget" className="text-xs">
            Budget Name
          </label>
          <input
            type="text"
            name="newBudget"
            id="newBudget"
            className="input input-bordered w-full max-w-sm"
            placeholder="name of budget e.g. Grocery"
            required
          />
        </div>
        <div className="flex flex-col gap-2  w-full ">
          <label htmlFor="amount" className="text-xs">
            Budget Amount
          </label>
          <input
            type="number"
            step="0.01"
            inputMode="decimal"
            name="amount"
            id="amount"
            className="input input-bordered w-full max-w-sm"
            placeholder="amount of budget"
            required
          />
        </div>
        <input type="hidden" name="_action" value="newBudget" />
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn flex justify-center items-center gap-2 mt-4 disabled:blur-sm"
        >
          {isSubmitting ? 'Creating Your Budget' : 'Create New Budget'}{' '}
          <CurrencyDollarIcon width={25} />
        </button>
      </fetcher.Form>
    </div>
  );
};

export default AddBudgetForm;
