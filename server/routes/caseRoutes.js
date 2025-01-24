const express = require('express');
const router = express.Router();
const Case = require('../models/Case.js'); 
const { ethers } = require('ethers');
require('dotenv').config();

const CONTRACT_ABI = [
  "function storeRecord(string calldata mongoId, string calldata hash) external",
  "function getHash(string calldata mongoId) external view returns (string)"
];
function sortObjectKeys(obj) {
  if (Array.isArray(obj)) {
    // If the value is an array, sort each element (if it's an object) recursively
    return obj.map(sortObjectKeys);
  } else if (obj !== null && typeof obj === 'object') {
    // If the value is an object, sort its keys
    return Object.keys(obj)
      .sort() // Sort the keys alphabetically
      .reduce((sorted, key) => {
        sorted[key] = sortObjectKeys(obj[key]); // Recursively sort for nested objects
        return sorted;
      }, {});
  }
  return obj; // Return value if it's not an object or array
}

const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
const contract = new ethers.Contract(process.env.CONTRACT_ADDRESS, CONTRACT_ABI, wallet);


router.post('/', async (req, res) => {
   
   const formattedData ={
    "crimeID": req.body.crimeID, // "C12345"
    "title": req.body.title, // "Burglary at Downtown Mall"
    "type": req.body.type, // "Burglary"
    "date": req.body.date, // "2025-01-20T14:30:00.000+00:00"
    "location": req.body.location, // "Downtown Mall, Kathmandu"
    
    "victim": {
      "name": req.body.victim.name, // "Anita Rai"
      "contact": req.body.victim.contact, // "+977-9845678912"
      "address": req.body.victim.address, // "Boudha, Kathmandu"
      "gender": req.body.victim.gender, // "Female"
      "econtact": req.body.victim.econtact, // "+977-9834567891"
    },
    
    "suspect": {
      "name": req.body.suspect.name,
      "img": req.body.suspect.img,
      "alias": req.body.suspect.alias, 
      "gender": req.body.suspect.gender,
      "age": req.body.suspect.age, 
      "address": req.body.suspect.address,
      "contact": req.body.suspect.contact, 
      "identificationDetails": req.body.suspect.identificationDetails, 
      "arrestStatus": req.body.suspect.arrestStatus, 
    },
    
    "evidence": {
      "evidenceType": req.body.evidence.evidenceType,
      "evidenceDescription": req.body.evidence.evidenceDescription,
      "evidenceImage": req.body.evidence.evidenceImage,
    },
    
    "status": req.body.status, 
    "officerInCharge": req.body.officerInCharge,
    "firno": req.body.firno,
    "filedby": req.body.filedby, 
    "lastUpdated": req.body.lastUpdated, 
    "reportStatus": req.body.reportStatus, 
    "caseDescription": req.body.caseDescription,
  }
  
  
  
  const newCase = new Case(formattedData);
  
  try {
    const savedCase = await newCase.save(); 

   
    
    console.log("Data that gonna be deployed to bc after saving in db for first time",savedCase)
    const reportHash = ethers.keccak256(
      ethers.toUtf8Bytes(JSON.stringify(savedCase))
    );
    console.log("The hashed case data stored in bc is", reportHash);

    try {
      const tx = await contract.storeRecord(
        savedCase._id.toString(),
        reportHash
      );
      console.log(reportHash);
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
});

router.get('/verify/:id', async (req, res) => {
  try {
    const crimeCase = await Case.findById(req.params.id); 
console.log("The actual chrimecase",crimeCase);
    if (!crimeCase) {
      return res.status(404).json({ message: 'Crime Case not found' }); 
    }

    const { _id, _v, ...crimecaseWithoutIdV } = crimeCase;
    console.log("The data going to hashed after taking from db",crimecaseWithoutIdV)
    const currentHash = ethers.keccak256(
      ethers.toUtf8Bytes(JSON.stringify(crimecaseWithoutIdV))
    );
   
    console.log("That data after hashing or Current Hash:", currentHash);

    const blockchainRecord = await contract.getHash(crimeCase._id.toString()); 

    const isSame = currentHash === blockchainRecord;
    console.log("Blockchain Stored Hash:", blockchainRecord); 
    console.log("Hashes Match:", isSame);

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
});

module.exports = router;
