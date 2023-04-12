import { toast } from 'react-toastify';
import AddExpensesForm from '../components/AddExpensesForm';
import BudgetItem from '../components/BudgetItem';
import Table from '../components/Table';
import { Budget, Expense } from '../types';
import { createExpense, deleteItem, getAllMatchingItems } from '../helpers';
import { useLoaderData } from 'react-router-dom';

type BudgetData = {
  budget: Budget;
  expenses: Expense[];
};

export async function budgetLoader({ params }: any) {
  const budget = await getAllMatchingItems({
    category: 'budgets',
    key: 'id',
    value: params.id,
  })[0];
  const expenses = await getAllMatchingItems({
    category: 'expenses',
    key: 'budgetId',
    value: params.id,
  });
  if (!budget) {
    throw new Error('The budget, you are trying to find doesnt exist');
  }
  return { budget, expenses };
}

export async function budgetAction({ request }: any) {
  const data = await request.formData();
  const { _action, ...values } = Object.fromEntries(data);
  if (_action === 'newExpense') {
    try {
      createExpense({
        name: values.newExpense,
        amount: values.amount,
        budgetId: values.newExpenseBudget,
      });
      return toast.success(`New expense was created`);
    } catch (error) {
      throw new Error('Il y a un probleme avec crear ton budget');
    }
  }
  if (_action === 'deleteExpense') {
    console.log(values.expenseId);
    try {
      if (confirm('Are you sure?')) {
        deleteItem({
          key: 'expenses',
          id: values.expenseId,
        });
        return toast.success(`Expense was deleted`);
      }
    } catch (error) {
      throw new Error('Il y a un probleme avec delete ton budget');
    }
  }
}

const BudgetPage = () => {
  const { budget, expenses } = useLoaderData() as BudgetData;
  return (
    <div className="p-4">
      <h1 className="text-3xl text-center mb-6">
        <span className="text-white">{budget.name} </span> Budget Overview
      </h1>
      <div className=" max-w-6xl mx-auto grid grid-cols-2 gap-4 ">
        <BudgetItem budget={budget} showDelete={true} />
        <AddExpensesForm budgets={[budget]} />
      </div>
      {expenses && expenses.length > 0 && (
        <div className="mt-6">
          <h2 className="text-xl underline mb-2">{budget.name} Expenses</h2>
          <Table expenses={expenses} />
        </div>
      )}
    </div>
  );
};

export default BudgetPage;
