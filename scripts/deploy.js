const Web3 = require('web3');
const fs = require('fs');

// Contract ABI and Bytecode (compile IdentityLedger.sol in Remix, paste here)
const ABI = [ /* Paste full ABI JSON array here */ ];
const BYTECODE = '0x6080604052...'; // Paste bytecode from Remix

async function deploy() {
  const web3 = new Web3('http://127.0.0.1:8545'); // Connect to Node 1
  const accounts = await web3.eth.getAccounts();

  const contract = new web3.eth.Contract(ABI);
  const deployed = await contract.deploy({ data: BYTECODE }).send({
    from: accounts[0],
    gas: 3000000,
    gasPrice: web3.utils.toWei('10', 'gwei')
  });

  console.log('Contract deployed at:', deployed.options.address);
  fs.writeFileSync('contract-address.txt', deployed.options.address);
  console.log('Address saved to contract-address.txt');
}

deploy().catch(console.error);
