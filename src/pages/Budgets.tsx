import { Budget } from '../types';
import { fetchData } from '../helpers';
import { useLoaderData } from 'react-router-dom';
import BudgetItem from '../components/BudgetItem';

type Budgets = {
  budgets: Budget[];
};

export function budgetsLoader() {
  const budgets: Budgets = fetchData('budgets');
  return { budgets };
}

const Budgets = () => {
  const { budgets } = useLoaderData() as Budgets;
  console.log(budgets);
  return (
    <div className=" max-w-6xl mx-auto py-8 grid grid-cols-3 gap-4 p-4">
      {budgets.map((budget: Budget) => (
        <BudgetItem key={budget.id} budget={budget} />
      ))}
    </div>
  );
};

export default Budgets;
