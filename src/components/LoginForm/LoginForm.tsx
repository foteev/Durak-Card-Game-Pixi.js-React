import React, { FormEvent, useState } from 'react';
import './LoginForm.css'
import{ socket } from '../../socket'
import { gameStore } from '../store/gameStore';

export const LoginForm: React.FC = () => {
  // const { socket } = props;
  const inputRef = React.createRef();
  const [value, setValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    setIsLoading(true);
    socket.timeout(10).emit('player name & socket.id', {name: value, socketId: socket.id}, () => {
      setIsLoading(false);
    });
  }


  return (
    <>
      <div className="login-form">
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
              className="mx-auto w-auto"
              src="./assets/logo1.png?color=indigo&shade=600"
              alt="Your Company"
            />
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Enter your name
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" onSubmit={onSubmit}
            >
              <div>
                <div className="mt-2">
                  <input
                  onChange={ e => setValue(e.target.value)}
                    id="email"
                    name="email"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                Enter room
                </button>
              </div>
            </form>


          </div>
        </div>
      </div>
    </>
  )
}

