import React from "react";
import Layout from "../../components/layout/Layout";
import UserMenu from "../../components/layout/UserMenu";
import { useAuth } from "../../context/auth";

export default function Dashboard() {
  const [auth] = useAuth();

  return (
    <Layout>
      <div className="lg:w-[85%] h-screen p-4 lg:p-0  mx-auto flex flex-col lg:flex-row gap-4 mb-6">
        <div className="lg:w-1/4 w-full ">
          <div className="flex flex-col bg-white lg:border rounded-md gap-4 lg:p-4 lg:px-6">
            <UserMenu />
          </div>
        </div>
        <div className="w-full lg:w-3/4">
          <div className=" border p-4 rounded-md">
            <h1 className="font-semibold text-xl border-b pb-2">
              User Profile
            </h1>
            <div className="flex flex-col space-y-2">
              <h1 className="text-[14px]"> Name : {auth?.user?.name}</h1>
              <h1 className="text-[14px]"> Email : {auth?.user?.email}</h1>
              <h1 className="text-[14px] leading-6"> Address : {auth?.user?.address}</h1>
              <h1 className="text-[14px]"> Contact : {auth?.user?.phone}</h1>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
