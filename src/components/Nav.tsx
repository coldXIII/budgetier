import { Form, NavLink } from 'react-router-dom';
import { TrashIcon } from '@heroicons/react/24/solid';

type NavProps = {
  userName: string;
};

const Nav = ({ userName }: NavProps) => {
  return (
    <div className="navbar bg-base-100 py-4 px-8 flex-col gap-2 sm:flex-row">
      <div className="flex-1">
        <NavLink
          to="/"
          aria-label="Go Home"
          className="flex justify-center items-center"
        >
          <img src="/logo.png" alt="" className="w-[3rem]" />
          <span className="btn btn-ghost normal-case text-4xl font-light italic">
            Le Budgetier
          </span>
        </NavLink>
      </div>
      {userName && (
        <>
          <div>
            <h2 className="text-xl uppercase mr-4">{userName}</h2>
          </div>
          <Form
            method="post"
            action="/logout"
            onSubmit={(e) => {
              if (!confirm('User and All the Data will be deleted!')) {
                e.preventDefault();
              }
            }}
          >
            <button className="btn btn-error" type="submit">
              Delete User
              <TrashIcon width={20} className="ml-2" />
            </button>
          </Form>
        </>
      )}
    </div>
  );
};

export default Nav;
