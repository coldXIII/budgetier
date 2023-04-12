export type Budget = {
  id: string;
  name: string;
  amount: string;
  createdAt: string;
  color:string
};

export type Expense = {
  id: string;
  name: string;
  amount: number;
  budgetId: string;
  createdAt: string;
};

export type MatchingItems = {
  key: string;
  category: string;
  value: string;
};
