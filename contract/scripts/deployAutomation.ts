import { ethers, run } from "hardhat";

async function main() {
  console.log("🤖 Deploying Property Automation...");
  console.log("==================================");

  // Get required addresses from environment
  const ORACLE_ADDRESS = process.env.ORACLE_ADDRESS || "";
  const REAL_ESTATE_TOKEN_ADDRESS = process.env.REAL_ESTATE_TOKEN_ADDRESS || "";
  
  if (!ORACLE_ADDRESS || !REAL_ESTATE_TOKEN_ADDRESS) {
    console.log("❌ Missing required environment variables:");
    
    process.exit(1);
  }

  console.log("📋 Configuration:");
  console.log("- Oracle:", ORACLE_ADDRESS);
  console.log("- RealEstateToken:", REAL_ESTATE_TOKEN_ADDRESS);
  console.log("");

  // Deploy PropertyAutomation
  console.log("1️⃣ Deploying PropertyAutomation...");
  const PropertyAutomation = await ethers.getContractFactory("PropertyAutomation");
  const automation = await PropertyAutomation.deploy(
    ORACLE_ADDRESS,
    REAL_ESTATE_TOKEN_ADDRESS
  );
  await automation.waitForDeployment();
  const automationAddress = await automation.getAddress();
  console.log("✅ PropertyAutomation deployed to:", automationAddress);

  console.log("");
  console.log("📄 AUTOMATION DEPLOYMENT SUMMARY");
  console.log("===============================");
  console.log("🤖 PropertyAutomation:", automationAddress);
  console.log("");

  console.log("✅ FEATURES AVAILABLE:");
  console.log("- Automatic property value updates (24h intervals)");
  console.log("- Property-specific auto-update settings");
  console.log("");

  console.log("⚠️ NEXT STEPS:");
  console.log("1. Register at: https://automation.chain.link/");
  console.log("2. Create upkeep for:", automationAddress);
  console.log("3. Enable auto-updates: automation.setAutoUpdateEnabled(propertyId, true)");

  // Verification
  if (process.env.BASESCAN_API_KEY) {
    console.log("");
    console.log("⏳ Waiting for block confirmations...");
    await new Promise(resolve => setTimeout(resolve, 30000));
    
    try {
      console.log("🔍 Verifying contract...");
      await run("verify:verify", {
        address: automationAddress,
        constructorArguments: [ORACLE_ADDRESS, REAL_ESTATE_TOKEN_ADDRESS],
      });
      console.log("✅ Contract verified!");
    } catch (error: any) {
      console.log("❌ Verification error:", error.message);
    }
  }

  return {
    automation: automationAddress
  };
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }); 