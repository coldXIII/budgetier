import { Expense } from '../types';
import ExpenseItem from './ExpenseItem';

type Props = {
  expenses: Expense[];
};

const Table = ({ expenses }: Props) => {
  return (
    <div className="w-full mb-2 ">
      <table className="w-full text-xs sm:text-sm">
        <thead className="bg-[#262626]">
          <tr>
            {['Name', 'Amount', 'Date', 'Budget', 'Remove'].map(
              (item, index) => (
                <th className="p-2 border text-left" key={index}>
                  {item}
                </th>
              )
            )}
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense: Expense) => (
            <tr key={expense.id}>
              <ExpenseItem expense={expense} />
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
