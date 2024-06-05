"use client";
import React from "react";

const UserProfileDetail = ({ params }: any) => {
  return (
    <div className="flex flex-col min-h-screen bg-black py-2 justify-center items-center">
      <h1 className=" text-white">User profile detail</h1>
      <h2 className="bg-green-500 m-3 p-3 rounded text-black">{params?.id}</h2>
    </div>
  );
};

export default UserProfileDetail;
