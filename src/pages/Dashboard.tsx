import { Expense, Budget, User } from '../types';
import { deleteItem, fetchData } from '../helpers';
import { createBudget } from '../actions/createBudget';
import { createExpense } from '../actions/createExpense';
import { useLoaderData } from 'react-router-dom';
import { toast } from 'react-toastify';
import Intro from '../components/Intro';
import AddBudgetForm from '../components/AddBudgetForm';
import AddExpensesForm from '../components/AddExpensesForm';
import BudgetItem from '../components/BudgetItem';
import Table from '../components/Table';
import { Link } from 'react-router-dom';
import { ChevronDoubleRightIcon } from '@heroicons/react/24/solid';

export function dashboardLoader() {
  const userName: string = fetchData('userName');
  const budgets: Budget[] = fetchData('budgets');
  const expenses: Expense[] = fetchData('expenses');
  return { userName, budgets, expenses };
}

export async function dashboardAction({ request }: any) {
  const data = await request.formData();
  const { _action, ...values } = Object.fromEntries(data);
  if (_action === 'newUser') {
    try {
      localStorage.setItem('userName', JSON.stringify(values.userName));
      return toast.success(`Bienvenue a Le Budgetier, ${values.userName}!`);
    } catch (error) {
      throw new Error('There is a problem with creating your account');
    }
  }
  if (_action === 'newBudget') {
    try {
      createBudget({
        name: values.newBudget,
        amount: values.amount,
      });
      return toast.success(`New budget was created`);
    } catch (error) {
      throw new Error('There is a problem with creating new budget');
    }
  }
  if (_action === 'newExpense') {
    try {
      createExpense({
        name: values.newExpense,
        amount: values.amount,
        budgetId: values.newExpenseBudget,
      });
      return toast.success(`New expense was created`);
    } catch (error) {
      throw new Error('There is a problem with creating new expense');
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

const Dashboard = () => {
  const { userName, budgets, expenses } = useLoaderData() as User;
  const sortedExpenses =
    expenses &&
    expenses.sort((a, b) => +b.createdAt - +a.createdAt).slice(0, 8);

  return (
    <>
      {userName ? (
        <div className="dashboard p-2">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {budgets && budgets.length > 0 ? (
              <>
                <div className="flex flex-col gap-2">
                  <AddBudgetForm title={'Create Budget'} />
                  <AddExpensesForm budgets={budgets} />
                </div>
                <div className="flex flex-col gap-2">
                  <div className=" py-8 grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {budgets.slice(0, 4).map((budget) => (
                      <BudgetItem key={budget.id} budget={budget} />
                    ))}
                  </div>
                  {budgets.length > 4 && (
                    <Link to="/budgets">
                      <button className="btn flex justify-center items-center">
                        View All Budgets <ChevronDoubleRightIcon width={20} />
                      </button>
                    </Link>
                  )}
                </div>
              </>
            ) : (
              <div className="flex flex-col gap-2">
                <p className="text-3xl text-center">Create your First Budget</p>
                <AddBudgetForm title={'Create your first Budget'} />
              </div>
            )}
          </div>
          {expenses && expenses.length > 0 && (
            <div className="grid">
              <h2 className="text-xl underline mb-2">Recent Expenses</h2>
              <Table expenses={sortedExpenses} />
              {expenses.length > 8 && (
                <Link to="/expenses">
                  <button className="btn flex justify-center items-center">
                    View All Expenses <ChevronDoubleRightIcon width={20} />
                  </button>
                </Link>
              )}
            </div>
          )}
        </div>
      ) : (
        <Intro />
      )}
    </>
  );
};

export default Dashboard;
