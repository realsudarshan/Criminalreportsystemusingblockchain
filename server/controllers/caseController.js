const Case = require('../models/Case.js'); 
const { ethers } = require('ethers');
require('dotenv').config();
const getCanonicalRepresentation = require('../utils/getcanonicalData.js');
const CONTRACT_ABI = [
  "function storeRecord(string calldata mongoId, string calldata hash) external",
  "function getHash(string calldata mongoId) external view returns (string)"
]; 
const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
const contract = new ethers.Contract(process.env.CONTRACT_ADDRESS, CONTRACT_ABI, wallet);



exports.createCase = async (req, res) => {
  const newCase = new Case(req.body);
  
  try {
    const savedCase = await newCase.save(); 

    const canonicalData = getCanonicalRepresentation(savedCase);
    
    const reportHash = ethers.keccak256(
      ethers.toUtf8Bytes(JSON.stringify(canonicalData))
    );

    try {
      const tx = await contract.storeRecord(
        savedCase._id.toString(),
        reportHash
      );
      await tx.wait();
      
      res.status(201).json({
        report: savedCase,
        blockchainHash: reportHash,
        transactionHash: tx.hash
      });
    } catch (blockchainError) {
      res.status(500).json({ 
        message: 'Blockchain storage failed',
        report: savedCase 
      });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
 

exports.verifyCaseIntegrity = async (req, res) => {
  try {
    const crimeCase = await Case.findById(req.params.id);
    
    if (!crimeCase) {
      return res.status(404).json({ message: 'Crime Case not found' }); 
    }

    const canonicalData = getCanonicalRepresentation(crimeCase);

    const currentHash = ethers.keccak256(
      ethers.toUtf8Bytes(JSON.stringify(canonicalData))
    );

    const blockchainRecord = await contract.getHash(crimeCase._id.toString()); 

    const isSame = currentHash === blockchainRecord;

    res.json({
      report: crimeCase,
      currentHash,
      blockchainStoredHash: blockchainRecord,
      isSame
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Verification failed', 
      error: error.message 
    });
  }
};