import Link from "next/link";
import { useRouter } from "next/router";
import React, { FormEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCustomer,
  addCustomer,
} from "../features/customer/CustomerSlice";
import { signIn, SignInResponse } from "next-auth/react";
import apiInstance from "../lib/url";
const Signin = () => {
  const route = useRouter();
  const dispatch = useDispatch();
  const customer = useSelector(selectCustomer);
  const [message, setMessage] = useState("");
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleSignIn = async (e: FormEvent) => {
    console.log(form)
    e.preventDefault();
    const res: SignInResponse | undefined = await signIn("credentials", {
      redirect: false,
      email: form.email,
      password: form.password,
    });
    console.log(res)

    if (res?.error) {
      console.log('res error', res.error)
      setMessage(res.error);
      form.email = "";
      form.password = "";
      setTimeout(() => {
        setMessage("");
      }, 2000);
    }

    if (res?.ok) {
      
      await storeUser();
    }
  };
  const storeUser = async () => {
    console.log('res ok')
    try{
      const res = await apiInstance.post('/customer/signin', {
        email: form.email,
      });
      
      const { id, name, email, password, passcode } = res.data;
      const customer = {
        id,
        name,
        email,
        password,
        passcode,
      };
      dispatch(addCustomer(customer));
      console.log('state customer:', selectCustomer)
      route.push("/");
    }catch(err){
      console.log(err)
    }
   
  };
  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a
          href="#"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          <img
            src="https://www.simicart.com/blog/wp-content/uploads/eCommerce-logo-1.jpg"
            className="w-8 h-8 mr-2"
            alt="logo"
          />
          Signin
        </a>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              {message ? (
                <span>{message}</span>
              ) : (
                <span> Sign in to your account</span>
              )}
            </h1>
            <form
              onSubmit={handleSignIn}
              className="space-y-4 md:space-y-6"
              action="#">
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                  value={form.password}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                      required
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="remember"
                      className="text-gray-500 dark:text-gray-300">
                      Remember me
                    </label>
                  </div>
                </div>
                <a
                  href="#"
                  className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">
                  Forgot password?
                </a>
              </div>
              {message ? (
                <button
                  disabled
                  type="submit"
                  className="w-full text-white bg-yellow-600 hover:bg-yellow-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                  Sign in
                </button>
              ) : (
                <button
                  type="submit"
                  className="w-full text-white bg-yellow-600 hover:bg-yellow-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                  Sign in
                </button>
              )}

              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don’t have an account yet?{" "}
                <Link
                  href="/signup"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                  Sign up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signin;
