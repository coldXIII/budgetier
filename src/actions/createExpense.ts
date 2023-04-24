import { fetchData } from "../helpers";

export const createExpense = ({
    name,
    amount,
    budgetId,
  }: {
    name: string;
    amount: string;
    budgetId: string;
  }) => {
    const newItem = {
      id: crypto.randomUUID(),
      name: name,
      createdAt: Date.now(),
      amount: +amount,
      budgetId: budgetId,
    };
    const exisitingExpenses = fetchData('expenses') ?? [];
    return localStorage.setItem(
      'expenses',
      JSON.stringify([...exisitingExpenses, newItem])
    );
  };