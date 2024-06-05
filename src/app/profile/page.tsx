"use client";
import React, { useState } from "react";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import axios from "axios";
const Profile = () => {
  const router = useRouter();

  const [data, setData] = useState(null);

  const getUserDetail = async () => {
    try {
      const response = await axios.get("/api/users/me");
      console.log(response);
      setData(response.data.data._id);
      console.log(response);
    } catch (error: any) {
      console.log("Error", error.message);
      toast.error(error.message);
    }
  };

  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout successfully");
      router.push("/login");
    } catch (error: any) {
      console.log("Error", error.message);
      toast.error(error.message);
    }
  };

  return (
    <div className="flex flex-col min-h-screen py-2 bg-black justify-center items-center">
      <h1 className=" text-white">Profile page</h1>
      <hr />
      <h2>
        {data === null ? (
          "Nothing"
        ) : (
          <Link className="text-white" href={`/profile/${data}`}>
            {data}
          </Link>
        )}{" "}
      </h2>
      <button
        onClick={logout}
        className=" bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
      >
        Logout
      </button>
      <button
        onClick={getUserDetail}
        className=" bg-green-500 mt-4 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg"
      >
        Get user details
      </button>
    </div>
  );
};

export default Profile;
