
import { useNavigate } from "react-router-dom";
import { routePaths } from "../../constants/paths";

export default function ResetSuccess() {
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    navigate(routePaths.Login); // Redirects to the Login page
  };

  return (
    // <PublicLayout>
    <div className="flex h-screen gap-6 p-4 bg-white">
      {/* Left Side - Image */}
      <div className="hidden w-1/2 border rounded-2xl md:flex">
        <img src="/doctors-img.svg" alt="Business Meeting" className="object-cover w-full h-full rounded-2xl" />
      </div>

      {/* Right Side - Success Message */}
      <div className="flex items-center justify-center w-full px-4 border shadow-sm md:w-1/2 rounded-2xl">
        <div className="w-full p-6 text-center">
          <div className="flex items-center justify-center my-4">
            {/* <Link to="/">
              <img src="/Navbar-Logo.png" alt="NavBar-logo" className="w-[180px] md:w-[180px] lg:w-[200px] h-auto" />
            </Link> */}
          </div>
          {/* Check Icon */}
          <div className="flex justify-center mb-4">
            <div className="flex items-center justify-center ">
              <img src="/check-mark.svg" />
            </div>
          </div>

          {/* Heading */}
          <h1 className="mb-2 text-[31px] font-semibold text-secondary">
            Password Reset Successfully
          </h1>
          <p className="mb-6 text-subtext text-sm sm:text-[18px]">
            Your password has been updated. You can now use your new password to log in.
          </p>

          {/* Done Button */}
          <button
            onClick={handleClick}
            type="button"
            className="w-full text-[16px] py-2.5 font-medium text-white transition bg-primary rounded-md hover:bg-[#123057]"
          >
            Login
          </button>
        </div>
      </div>
    </div>
    // </PublicLayout>
  );
}
