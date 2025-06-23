import { useState } from "react";
import { MdAlternateEmail } from "react-icons/md";
import { TbLockPassword } from "react-icons/tb";
import { Link, useNavigate } from "react-router";
import axios from "axios";
import Swal from "sweetalert2";

const SignUp: React.FC =() => {
  const [email, setEmail] = useState("");
  const [passwordHash, setPassword] = useState("");
  const navigate = useNavigate();

// const token = localStorage.getItem("accessToken");

  const SignUpHandle = async () => {
    if (!email.trim() || !passwordHash.trim()) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please fill in all the fields.",
      });
      return;
    }

    try {
      await axios.post("https://weatherapi-backend-d1qq.onrender.com/auth/signup", {
        email,
        passwordHash,
        
      });
  

      Swal.fire({
        icon: "success",
        title: "Account Created",
        text: "You can now Sign In.",
      }).then(() => {
        navigate("/");
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Sign Up",
        text: " signing up is Failed",
      });
    }
  };

  return (
    <div className="bg-gray-200 flex-1 h-screen">
      <div className="flex justify-center items-center h-screen">
        <div className="flex flex-col gap-4 p-8 shadow bg-gray-100 rounded-lg">
          <div className="flex justify-center font-bold text-gray-700 text-2xl">
            Sign Up
          </div>

          <div className="flex gap-2 items-center">
            <MdAlternateEmail className="text-gray-800 text-lg" />
            <input
              required
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-white rounded px-3 py-1 outline-gray-700"
            />
          </div>

          <div className="flex gap-2 items-center">
            <TbLockPassword className="text-gray-800 text-lg" />
            <input
              required
              type="password"
              placeholder="Password"
              value={passwordHash}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-white rounded px-3 py-1 outline-gray-700"
            />
          </div>

          <div className="flex justify-center text-gray-700 text-sm">
            Already have an account?
            <Link className="px-1 hover:underline hover:text-blue-900" to="/">
              Sign In
            </Link>
          </div>

          <button
            onClick={SignUpHandle}
            className="flex justify-center font-bold p-1 text-gray-200 bg-gray-600 rounded hover:text-gray-100 hover:bg-gray-700 cursor-pointer"
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
