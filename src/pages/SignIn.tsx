import { useState } from "react";
import { MdAlternateEmail } from "react-icons/md";
import { TbLockPassword } from "react-icons/tb";
import axios from "axios";
import { Link, useNavigate } from "react-router";
import Swal from "sweetalert2";

const SignIn: React.FC =() => {
  const [email, setEmail] = useState("");
  const [passwordHash, setPassword] = useState("");
  const navigate = useNavigate();

  const LogInHandle = async () => {
  if (!email.trim() || !passwordHash.trim()) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Fill all the fields please ",
    });
    return;
  }

  try {
    const res = await axios.post("https://weatherapi-backend-d1qq.onrender.com/auth/signin", {
      email,
      passwordHash,
    });
   const token = res.data.data.accessToken 

    if (token) {
      localStorage.setItem("Token", token); // ✅ تخزين التوكن
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Logged in successfully!",
      }).then(() => {
        navigate("home");
      });
    } else {
      Swal.fire("Login succeeded but no token returned");
    }
  } catch {
    Swal.fire({
      icon: "error",
      title: "Login Failed",
      text: "Email or Password is incorrect",
    });
  }
};

  return (
    <div className="bg-gray-200 flex-1 h-screen">
      <div className="flex justify-center items-center h-screen">
        <div className="flex flex-col gap-4 p-8 shadow bg-gray-100 rounded-lg">
          <div className="flex justify-center font-bold text-gray-700 text-2xl">
            Sign In
          </div>

          <div className="flex gap-2 items-center">
            <MdAlternateEmail className="text-gray-800 text-lg" />
            <input
              required
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-white rounded items-center px-3 py-1 outline-gray-700"
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
              className="bg-white rounded items-center px-3 py-1 outline-gray-700"
            />
          </div>

          <div className="flex justify-center text-gray-700 text-sm">
            You don't have an account?
            <Link className="px-1 hover:underline hover:text-red-900" to="signUp">
              Sign Up
            </Link>
          </div>

          <button
            onClick={LogInHandle}
            className="flex justify-center font-bold p-1 text-gray-200 bg-gray-600 rounded hover:text-gray-100 hover:bg-gray-700 cursor-pointer"
          >
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
}

export default SignIn
