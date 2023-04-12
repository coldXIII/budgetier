import React from 'react';
import { fetchData } from '../helpers';
import { Outlet, useLoaderData } from 'react-router-dom';
import Nav from '../components/Nav';

type User = {
  userName: string;
};

export function mainLoader() {
  const userName = fetchData('userName');
  return { userName };
}

const Main = () => {
  const { userName } = useLoaderData() as User;
  return (
    <>
      <header>
        <Nav userName={userName} />
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Main;
