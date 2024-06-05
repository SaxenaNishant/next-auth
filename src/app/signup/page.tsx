"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";
interface SignupProps {}

const Signup: React.FC<SignupProps> = () => {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  });
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user.email && user.username && user.password) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  const onSignUp = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      console.log("Signup success : ", response.data);
      toast.success("Signup success");
      router.push("/login");
    } catch (error: any) {
      setLoading(false);
      console.log("Error :- Signup failed ", error);
      toast.error(error.message);
    }
  };
  return (
    <div className=" bg-black min-h-screen flex flex-col items-center justify-center   py-2 ">
      <h1 className=" text-white text-6xl py-20">
        {loading ? "Processing" : "Signup"}
      </h1>

      <hr />

      <label htmlFor="username" className=" text-white text-lg m-1">
        Username
      </label>
      <input
        type="text"
        name="username"
        id="username"
        value={user.username}
        className="p-2 mb-2 text-black border border-gray-200 rounded-lg focus:outline-none focus:border-gray-500"
        onChange={(e) => {
          setUser({ ...user, username: e.target.value });
        }}
        placeholder="Enter username"
      />

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
        onClick={onSignUp}
        disabled={buttonDisabled}
      >
        {buttonDisabled ? "No Signup" : "Signup"}
      </button>
      <Link href="/login" className="text-white text-lg m-2">
        Visit login page
      </Link>
    </div>
  );
};

export default Signup;
