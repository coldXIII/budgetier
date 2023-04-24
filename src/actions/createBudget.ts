import { generateRandomColor, fetchData } from "../helpers";

export const createBudget = ({
    name,
    amount,
  }: {
    name: string;
    amount: string;
  }) => {
    const newItem = {
      id: crypto.randomUUID(),
      name: name,
      createdAt: Date.now(),
      amount: +amount,
      color: generateRandomColor(),
    };
    const exisitingBudgets = fetchData('budgets') ?? [];
    return localStorage.setItem(
      'budgets',
      JSON.stringify([...exisitingBudgets, newItem])
    );
  };