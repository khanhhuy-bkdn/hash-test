import hre from "hardhat";

async function main() {
  // Verify contracts
  console.log(
    "========================================================================================="
  );
  console.log("VERIFY CONTRACTS");
  console.log(
    "========================================================================================="
  );

  await hre
  .run("verify:verify", {
    address: "0xE3d94a70166DAd5E7119BD4A7C7cA7dE1B755F45",
  })
  .catch(console.log);

}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
