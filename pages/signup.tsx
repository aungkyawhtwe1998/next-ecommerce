import { useRouter } from "next/router";
import React from "react";
import apiInstance from "../lib/url";
import { Customer } from "../type";
import { useFormik } from "formik";
import { signUpValidate } from "../lib/validate";
import Link from "next/link";
type Value = {
  name: string;
  email: string;
  password: string;
  cpassword: string;
  passcode?: number;
};
const Signup = () => {
  const router = useRouter();

  const onSubmit = async (values: Value) => {
    try {
      const res = await apiInstance.post(`/customer/signup`, {
        values,
      });
      console.log(res.data)
      if (res) {
        router.push("/signin");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      cpassword: "",
      passcode: 0,
    },
    validate: signUpValidate,
    onSubmit,
  });
  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a
          href="#"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          <img
            className="w-8 h-8 mr-2"
            src="https://www.simicart.com/blog/wp-content/uploads/eCommerce-logo-1.jpg"
            alt="logo"
          />
          Signup
        </a>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Create an account
            </h1>
            <form
              onSubmit={formik.handleSubmit}
              className="space-y-4 md:space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Name{" "}
                  {formik.errors.name && formik.touched.name ? (
                    <span className="text-rose-500 text-sm">
                      {formik.errors.name}
                    </span>
                  ) : (
                    <></>
                  )}
                </label>
                <input
                  type="text"
                  id="name"
                  placeholder="mg123"
                  required
                  className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
                    formik.errors.name && formik.touched.name
                      ? "border-rose-600"
                      : ""
                  }`}
                  {...formik.getFieldProps("name")}
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Email{" "}
                  {formik.errors.email && formik.touched.email ? (
                    <span className="text-rose-500 text-sm">
                      {formik.errors.email}
                    </span>
                  ) : (
                    <></>
                  )}
                </label>
                <input
                  type="email"
                  id="email"
                  className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
                    formik.errors.email && formik.touched.email
                      ? "border-rose-600"
                      : ""
                  }`}
                  {...formik.getFieldProps("email")}
                  placeholder="name@company.com"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Password{" "}
                  {formik.errors.cpassword && formik.touched.cpassword ? (
                    <span className="text-rose-500 text-sm">
                      {formik.errors.cpassword}
                    </span>
                  ) : (
                    <></>
                  )}
                </label>
                <input
                  type="password"
                  id="password"
                  placeholder="••••••••"
                  className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
                    formik.errors.password && formik.touched.password
                      ? "border-rose-600 text-sm"
                      : ""
                  }`}
                  {...formik.getFieldProps("password")}
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="confirm-password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Confirm Password{" "}
                  {formik.errors.cpassword && formik.touched.cpassword ? (
                    <span className="text-rose-500 text-sm">
                      {formik.errors.cpassword}
                    </span>
                  ) : (
                    <></>
                  )}
                </label>
                <input
                  type="confirm-password"
                  id="confirm-password"
                  placeholder="••••••••"
                  className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
                    formik.errors.cpassword && formik.touched.cpassword
                      ? "border-rose-600 text-sm"
                      : ""
                  }`}
                  {...formik.getFieldProps("cpassword")}
                  required
                />
              </div>
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="terms"
                    aria-describedby="terms"
                    type="checkbox"
                    className={`w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800  ${
                      formik.errors.passcode && formik.touched.passcode
                        ? "border-rose-600 text-sm"
                        : ""
                    }`}
                    {...formik.getFieldProps("passcode")}
                    required
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label
                    htmlFor="terms"
                    className="font-light text-gray-500 dark:text-gray-300">
                    I accept the{" "}
                    <a
                      className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                      href="#">
                      Terms and Conditions
                    </a>
                  </label>
                </div>
              </div>
              <button
                type="submit"
                className="w-full text-white bg-yellow-600 hover:bg-yellow-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                Create an account
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account?{" "}
                <Link
                  href="/signin"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                  Login here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;
