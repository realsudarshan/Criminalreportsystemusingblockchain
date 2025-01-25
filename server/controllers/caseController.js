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


exports.addToDB = async (req, res) => {
  const newCase = new Case(req.body);

  try {
    const savedCase = await newCase.save();
    res.status(201).json({ message: 'Case added to database', case: savedCase });
  } catch (error) {
    res.status(400).json({ message: 'Error adding case to database', error: error.message });
  }
};


exports.validate = async (req, res) => {
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
      message: 'Validation failed', 
      error: error.message 
    });
  }
};


exports.viewFromDB = async (req, res) => {
  try {
    const crimeCase = await Case.findById(req.params.id);

    if (!crimeCase) {
      return res.status(404).json({ message: 'Crime Case not found' });
    }

    res.json({ report: crimeCase });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching case from database', error: error.message });
  }
};


exports.addToBlockchain = async (req, res) => {
  try {
    const crimeCase = await Case.findById(req.params.id);

    if (!crimeCase) {
      return res.status(404).json({ message: 'Crime Case not found' });
    }

    const canonicalData = getCanonicalRepresentation(crimeCase);
console.log("Data from server",canonicalData)
    const reportHash = ethers.keccak256(
      ethers.toUtf8Bytes(JSON.stringify(canonicalData))
    );
console.log(reportHash)
    try {
      const tx = await contract.storeRecord(
        crimeCase._id.toString(),
        reportHash
      );
      await tx.wait();

      res.status(201).json({
        message: 'Case added to blockchain',
        blockchainHash: reportHash,
        transactionHash: tx.hash
      });
    } catch (blockchainError) {
      res.status(500).json({ 
        message: 'Error adding case to blockchain', 
        error: blockchainError.message 
      });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error adding case to blockchain', error: error.message });
  }
};


exports.fetchAllDataFromDatabase = async (req, res) => {
  try {
    const allCases = await Case.find();
    res.json({ cases: allCases });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching data from database', error: error.message });
  }
};