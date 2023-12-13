const { expect } = require("chai");
const hre = require("hardhat");
const { time } = require("@nomicfoundation/hardhat-toolbox/network-helpers");

describe("TodoList", function () {
  it("test getconcac", async function () {
    const Todo = await hre.ethers.getContractFactory("TodoList");
    const todo = await Todo.deploy();
    await todo.waitForDeployment();

    console.log(await todo.createList("312312312312"))
    console.log(await todo.createList("31231231231231fsdfs12"))

    console.log(await todo.getMessage());


  });

});
