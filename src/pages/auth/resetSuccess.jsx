
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
    <div className="flex h-screen gap-6 bg-white">
      {/* Left Side - Image */}
   <div className="hidden w-1/2 border lg:flex rounded-2xl">
  <img
    src="/doctors-img.svg"
    alt="Medical professionals"
    className="object-cover w-full h-full rounded-2xl"
  />
</div>


      {/* Right Side - Success Message */}
      <div className="flex items-center justify-center w-full px-4 py-8 border shadow-sm lg:w-1/2 rounded-2xl">
        <div className="w-full text-center">
          <div className="flex items-center justify-center my-4">
            {/* <Link to="/">
              <img src="/Navbar-Logo.png" alt="NavBar-logo" className="w-[180px] md:w-[180px] lg:w-[200px] h-auto" />
            </Link> */}
          </div>
          {/* Check Icon */}
          <div className="flex justify-center mb-4">
            <div className="flex items-center justify-center ">
              <img src="/check-mark.svg" className="w-14 h-14"/>
            </div>
          </div>

          {/* Heading */}
          <h1 className="mb-3 text-xl font-semibold text-center text-secondary sm:text-2xl">
            Password Reset Successfully
          </h1>
          <p className="mb-6 md:px-14 px-2 text-center text-sm font-medium text-[#374151] sm:text-base">
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
