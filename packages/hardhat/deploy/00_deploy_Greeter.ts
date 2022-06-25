import { DeployFunction } from "hardhat-deploy/types";
// import "hardhat-deploy/src/type-extensions";

const func: DeployFunction = async (hre) => {
  const { getNamedAccounts, deployments } = hre;
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();
  await deploy("Greeter", {
    from: deployer,
    args: ["weiyo"],
    log: true,
  });
};
export default func;
func.tags = ["Greeter"];
