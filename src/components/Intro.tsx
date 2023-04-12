import { Form } from 'react-router-dom';
import { UserPlusIcon } from '@heroicons/react/24/solid';

const Intro = () => {
  return (
    <div className="w-full min-h-[90vh] lg:flex justify-center items-center p-2">
      <div>
        <h1 className=" text-3xl sm:text-4xl text-white mb-4 text-center">
          Take control of <span className="text-red-400">Your Money</span>
        </h1>
        <Form method="post" className=" sm:flex gap-2 p-4">
          <input
            type="text"
            name='userName'
            placeholder="Enter Your Name"
            className="input input-bordered w-full max-w-xs mb-2"
            aria-label="Your Name"
            autoComplete="given-name"
            required
          />
          <input type="hidden" name="_action" value="newUser" />
          <button
            type="submit"
            className="btn flex justify-center items-center gap-2"
          >
            Create Account <UserPlusIcon width={20} />
          </button>
        </Form>
      </div>
      <img src="/intro.png" className="w-[100vmin] xl:w-[60vw]" alt="" />
    </div>
  );
};

export default Intro;
