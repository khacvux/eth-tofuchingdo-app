import React from "react";
import Checkbox from "@mui/material/Checkbox";
import { useContractRead, useContractWrite } from "wagmi";
import { todoListABI, todoListAddress } from "../context/constant";

function TodoItem({ id }: any) {
  const { data }: any = useContractRead({
    address: todoListAddress,
    abi: todoListABI,
    functionName: "getTask",
    args: [Number(id)],
    watch: true,
  });

  const { write: toggleDone } = useContractWrite({
    address: todoListAddress,
    abi: todoListABI,
    functionName: "toggleDone",
    args: [Number(id)],
    onError(error) {
      console.log("toggleHandler error:::", error);
    },
  });

  const { write: deleteTask } = useContractWrite({
    address: todoListAddress,
    abi: todoListABI,
    functionName: "deleteTask",
    args: [Number(id)],
    onError(error) {
      console.log("deleteTask error:::", error);
    },
  });

  if (!data || !data.length) return <></>;

  return (
    <div className="flex flex-row items-start py-4 shadow-md rounded-lg shadow-[#EDEDED] bg-white">
      <div className=" px-4">
        <Checkbox
          checked={data[3]}
          size="small"
          onChange={() => toggleDone()}
        />
      </div>
      <div className=" mt-2 w-full ">
        <p>{data[2]}</p>
        <div className=" w-full flex flex-row justify-end mt-5 ">
          <button
            className="px-8 hover:text-red-500 "
            onClick={() => deleteTask()}
          >
            <span className="!text-xs">Delete</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default TodoItem;
