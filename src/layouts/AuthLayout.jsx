import { Link } from "react-router-dom";

const AuthLayout = ({ children }) => {
  return (
    <section className=" flex flex-col items-center justify-center gap-2 md:gap-4 min-h-screen px-4 py-10 bg-white ">
      <Link href="/" className="flex justify-center items-center gap-3 mb-10">
        <img
          src="/logo.svg"
          alt="Tickify Logo"
          className="w-5 h-5 md:w-7 md:h-7"
        />
        <p className="text-2xl font-medium">Tickify</p>
      </Link>
      {children}
    </section>
  );
};

export default AuthLayout;
