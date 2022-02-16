const { assert } = require("chai");

describe("Game5", function() {
  it("should be a winner", async function() {
    
    const Game = await ethers.getContractFactory("Game5");
    const game = await Game.deploy();
    await game.deployed();
    
    let success = false;
    let i = 0;
    
    while (!success) {
        const signer0 = ethers.provider.getSigner(0);
        const random_signer = ethers.Wallet.createRandom().connect(ethers.provider);
        address = await random_signer.getAddress();
        console.log(`Iter ${i}: ${address}`);
        i++;
        if (address < 0x00FfFFfFFFfFFFFFfFfFfffFFFfffFfFffFfFFFf) {
          await signer0.sendTransaction({
            to: address,
            value: ethers.utils.parseEther("1.0")
          });
          await game.connect(random_signer).win();
          success = true;
        }
    }
    
    // leave this assertion as-is
    assert(await game.isWon(), "You did not win the game");
  });
});
