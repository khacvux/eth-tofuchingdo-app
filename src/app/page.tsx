"use client";

import React, { useState } from "react";
import {
  useAccount,
  useContractRead,
  useContractWrite,
} from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { todoListABI, todoListAddress } from "../../context/constant";
import TodoItem from "../../components/TodoItem";

export default function Home() {
  const [message, setMessage] = useState("");

  const { address, isConnecting, isDisconnected } = useAccount();

  const { write } = useContractWrite({
    address: todoListAddress,
    abi: todoListABI,
    functionName: "createTask",
    args: [message],
    onError(error) {
      console.log("createTask:::", error);
    },
  });

  const { data: taskIds }: any = useContractRead({
    address: todoListAddress,
    abi: todoListABI,
    functionName: "getTaskIds",
    watch: true,
  });

  if (isDisconnected) {
    return (
      <div className="flex flex-row items-center justify-center h-screen">
        <ConnectButton />
      </div>
    );
  }
  if (isConnecting) {
    return (
      <div className="flex flex-row items-center justify-center h-screen">
        <div className="lds-spinner">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    );
  }

  return (
    <main className="w-full ">
      <div className=" sticky top-0 flex flex-row w-full justify-end p-3">
        <ConnectButton />
      </div>

      <div>
        <p className=" text-3xl font-semibold">Hi there! </p>
      </div>

      <form
        className="flex flex-row items-center my-3 mt-10 space-x-3 mb-5"
        onSubmit={() => write()}
      >
        <input
          type="text"
          placeholder="Add new task..."
          onChange={(e: any) => setMessage(e.target.value)}
          value={message}
          className="flex-1 outline-none !bg-[#F6F6F6] px-7"
        />
        <button
          type="submit"
          className="bg-black text-white px-7 py-2 rounded-xl font-semibold"
        >
          create
        </button>
      </form>

      <div className="flex flex-col space-y-3 ">
        {taskIds?.map((id: any, i: number) =>
          Number(id) != 0 ? <TodoItem id={id} key={i} /> : <></>
        )}
      </div>
    </main>
  );
}
