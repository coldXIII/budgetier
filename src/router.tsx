import { createBrowserRouter } from 'react-router-dom';
import Dashboard, { dashboardAction, dashboardLoader } from './pages/Dashboard';
import Error from './pages/Error';
import MainLayout, { mainLoader } from './layouts/MainLayout';
import { logoutAction } from './actions/logout';
import Expenses, { expensesAction, expensesLoader } from './pages/Expenses';
import Budgets, { budgetsLoader } from './pages/Budgets';
import BudgetPage, { budgetAction, budgetLoader } from './pages/BudgetPage';
import { deleteBudget } from './actions/deleteBudget';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    loader: mainLoader,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Dashboard />,
        loader: dashboardLoader,
        action: dashboardAction,
        errorElement: <Error />,
      },
      {
        path: 'logout',
        action: logoutAction,
      },
      {
        path: 'expenses',
        element: <Expenses />,
        loader: expensesLoader,
        action: expensesAction,
      },
      {
        path: 'budgets',
        element: <Budgets />,
        loader: budgetsLoader,
      },
      {
        path: 'budget/:id',
        element: <BudgetPage />,
        loader: budgetLoader,
        action: budgetAction,
        errorElement: <Error />,
        children: [
          {
            path: 'delete',
            action: deleteBudget,
          },
        ],
      },
    ],
  },
]);
