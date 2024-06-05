"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";
interface SignupProps {}

const Login: React.FC<SignupProps> = () => {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user.email && user.password) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      console.log("Login success : ", response.data);
      toast.success("Login success");
      router.push("/profile");
    } catch (error: any) {
      setLoading(false);
      console.log("Error :- Login failed ", error);
      toast.error(error.message);
    }
  };
  return (
    <div className=" bg-black min-h-screen flex flex-col items-center py-2 ">
      <h1 className=" text-white text-6xl py-20">
        {loading ? "Processing" : "Login"}
      </h1>

      <hr />

      <label htmlFor="email" className=" text-white text-lg m-1">
        Email
      </label>
      <input
        type="text"
        name="email"
        id="email"
        value={user.email}
        onChange={(e) => {
          setUser({ ...user, email: e.target.value });
        }}
        className="p-2 mb-2 text-black border border-gray-200 rounded-lg focus:outline-none focus:border-gray-500"
        placeholder="Enter email"
      />

      <label htmlFor="password" className=" text-white text-lg m-1">
        Password
      </label>
      <input
        type="password"
        name="password"
        id="password"
        value={user.password}
        onChange={(e) => {
          setUser({ ...user, password: e.target.value });
        }}
        className="p-2 mb-2 text-black border border-gray-200 rounded-lg focus:outline-none focus:border-gray-500"
        placeholder="Enter password"
      />
      <button
        className=" text-lg text-white bg-black rounded-lg px-10 py-2 m-1 border border-gray-300 focus:outline-none focus:border-gray-600"
        onClick={onLogin}
        disabled={buttonDisabled}
      >
        {buttonDisabled ? "No Login" : "Login"}
      </button>
      <Link href="/signup" className="text-white text-lg m-2">
        Visit Signup page
      </Link>
    </div>
  );
};

export default Login;
