import { Expense, MatchingItems } from "./types";

export const generateRandomColor = (): string => {
  return Math.floor(Math.random() * 16777215).toString(16);
};

export const fetchData = (key: string) => {
  return JSON.parse(localStorage.getItem(key) as string);
};

export const getAllMatchingItems = ({
  category,
  key,
  value,
}: MatchingItems) => {
  const data = fetchData(category) ?? [];
  return data.filter((item: any) => item[key] === value);
};


export const deleteItem = ({ key, id }: { key: string; id?: string }) => {
  const existingData = fetchData(key);
  if (id) {
    const newData = existingData.filter((item: any) => item.id !== id);
    return localStorage.setItem(key, JSON.stringify(newData));
  }
  return localStorage.removeItem(key);
};

// export const createBudget = ({
//   name,
//   amount,
// }: {
//   name: string;
//   amount: string;
// }) => {
//   const newItem = {
//     id: crypto.randomUUID(),
//     name: name,
//     createdAt: Date.now(),
//     amount: +amount,
//     color: generateRandomColor(),
//   };
//   const exisitingBudgets = fetchData('budgets') ?? [];
//   return localStorage.setItem(
//     'budgets',
//     JSON.stringify([...exisitingBudgets, newItem])
//   );
// };

// export const createExpense = ({
//   name,
//   amount,
//   budgetId,
// }: {
//   name: string;
//   amount: string;
//   budgetId: string;
// }) => {
//   const newItem = {
//     id: crypto.randomUUID(),
//     name: name,
//     createdAt: Date.now(),
//     amount: +amount,
//     budgetId: budgetId,
//   };
//   const exisitingExpenses = fetchData('expenses') ?? [];
//   return localStorage.setItem(
//     'expenses',
//     JSON.stringify([...exisitingExpenses, newItem])
//   );
// };

export const calculateSpentByBudget = (budgetId: string) => {
  const expenses = fetchData('expenses') ?? [];
  const budgetSpent = expenses.reduce((acc: number, expense: Expense) => {
    if (expense.budgetId !== budgetId) return acc;
    return (acc += expense.amount);
  }, 0);
  return budgetSpent;
};

export const formatPercentage = (amount: string | number) => {
  return amount.toLocaleString(undefined, {
    style: 'percent',
    minimumFractionDigits: 0,
  });
};
export const formatCurrency = (amount: string | number) => {
  return amount.toLocaleString(undefined, {
    style: 'currency',
    currency: 'USD',
  });
};
export const formatDate = (date: string) => {
  return new Date(date).toLocaleString();
};
