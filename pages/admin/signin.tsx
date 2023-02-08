import { signIn } from "next-auth/react";

const signin = () => {
    const handleSignIn = async () => {
        await signIn("github", {
          callbackUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/admin/products`,
        });
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
          Admin Signin
        </a>
        <button
          className="bg-gray-500 mr-2 text-white px-3 py-2 rounded hover:scale-95 transition text-xl"
          onClick={() => handleSignIn()}>
          Signin with Github
        </button>
      </div>
    </section>
  );
};

export default signin;
