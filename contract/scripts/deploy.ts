import { ethers } from "hardhat";
import {
  Hash__factory,
  Hash
} from "../typechain-types";

async function main() {
  const Hash: Hash__factory = await ethers.getContractFactory("Hash");

  const hash = await Hash.deploy() as Hash;
  await hash.waitForDeployment();

  console.log("Hash                          deployed to:>>", hash.target);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
