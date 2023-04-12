import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useRouteError } from 'react-router-dom';
import {  ArrowUturnLeftIcon } from '@heroicons/react/24/solid';

const Error = () => {
  const error: unknown = useRouteError();
  const navigate = useNavigate();
  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center">
      <h1 className="text-5xl font-bold mb-2">There is a problem...</h1>
      <p className="text-xl text-red-600">
        {(error as Error)?.message ||
          (error as { statusText?: string })?.statusText}
      </p>
      <button
        onClick={() => navigate(-1)}
        className="btn my-4 flex justify-center items-center gap-2"
      >
        <ArrowUturnLeftIcon width={20} />
        Go Back
      </button>
    </div>
  );
};

export default Error;
