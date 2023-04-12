import { Budget } from '../types';
import {
  formatCurrency,
  calculateSpentByBudget,
  formatPercentage,
} from '../helpers';
import { Form, Link } from 'react-router-dom';
import { BanknotesIcon, TrashIcon } from '@heroicons/react/24/solid';

type Props = {
  budget: Budget;
  showDelete?: boolean;
};

const BudgetItem = ({ budget, showDelete = false }: Props) => {
  const imageUrl = `https://source.unsplash.com/random/900×700/?${budget.name}`;
  const spent = calculateSpentByBudget(budget.id);
  const color = `#${budget.color}`
  return (
    <div className={`card card-compact w-84 max-w-md  bg-base-100 shadow-xl p-1 border text-[${color}]`}>
      <figure>
        <img
          src={imageUrl}
          alt={budget.name}
          className=" w-full object-cover max-h-[10rem]"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{budget.name}</h2>
        <p>{formatCurrency(budget.amount)}</p>
        <progress max={budget.amount} value={spent}>
          {formatPercentage(spent / +budget.amount)}
        </progress>
        <div className="flex justify-between mb-4">
          <small>{formatCurrency(spent)} spent</small>
          <small>{formatCurrency(+budget.amount - spent)} remaining</small>
        </div>

        {showDelete ? (
          <Form
            method="post"
            action="delete"
            onSubmit={(e) => {
              if (
                !confirm(
                  'All the Data connected with this budget will be deleted!'
                )
              ) {
                e.preventDefault();
              }
            }}
          >
            <button
              type="submit"
              className="btn btn-outline btn-error flex justify-center items-center gap-2 "
            >
              delete budget <TrashIcon width={20} />
            </button>
          </Form>
        ) : (
          <Link to={`/budget/${budget.id}`}>
            <button
              type="submit"
              className="btn btn-outline flex justify-center items-center gap-2 "
            >
              view budget <BanknotesIcon width={20} />
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default BudgetItem;
