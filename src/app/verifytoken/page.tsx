"use client";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
const VerifyTokenPage = () => {
  const router: any = useRouter();
  const searchParams = useSearchParams();

  console.log(router.isReady);

  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  const verifyUserEmail = async () => {
    try {
      await axios.post("/api/users/verifyToken", { token });
      setVerified(true);
      setError(false);
    } catch (error: any) {
      setError(true);
      console.log("Error", error);
    }
  };

  useEffect(() => {
    setError(false);
    const token = searchParams.get("token") || "";
    console.log(token);
    setToken(token);
  }, []);

  useEffect(() => {
    setError(false);
    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token]);

  return (
    <div className="flex flex-col min-h-screen py-2 justify-center items-center bg-black">
      <h1 className=" text-4xl text-white">Verify Token</h1>
      <h2 className="p-2 bg-blue-400 text-white">
        {token ? `${token}` : "No Token"}
      </h2>
      {verified && (
        <div>
          <h2 className="text-white">Verified</h2>
          <Link className="text-white" href={"/login"}>
            Login
          </Link>
        </div>
      )}
      {error && (
        <div>
          <h2 className="text-white">Error</h2>
        </div>
      )}
    </div>
  );
};

export default VerifyTokenPage;
