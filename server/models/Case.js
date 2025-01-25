const mongoose = require("mongoose");

const CaseSchema = new mongoose.Schema({
  crimeID: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  type: { type: String, required: true },
  date: { type: Date, required: true },
  location: { type: String, required: true },
  

  victim: {
    name: { type: String, required: true },
    contact: { type: String, required: true },
    address: { type: String, required: true },
    gender: { type: String, required: true },
    econtact: { type: String, required: true }, 
  },
  
  
  suspect: {
    name: { type: String, default: "Unknown" },
    img: { type: String, default: "https://via.placeholder.com/150" },
    alias: { type: String, default: "N/A" },
    gender: { type: String, default: "N/A" },
    age: { type: String, default: "N/A" },
    address: { type: String, default: "N/A" },
    contact: { type: String, default: "N/A" },
    identificationDetails: { type: String, default: "N/A" },
    arrestStatus: { type: String, default: "Unknown" },
  },
  evidence: {
    evidenceType: { type: String, required: true },
    evidenceDescription: { type: String, required: true },
    evidenceImage: { type: String, default: "https://via.placeholder.com/150" },
  },
  
  status: {
    type: String
  },
  officerInCharge: { type: String, required: true },
  firno: { type: String, required: true }, 
  filedby: { type: String, required: true }, 
  lastUpdated: { type: Date, default: Date.now },
  reportStatus: { type: String },
  caseDescription: { type: String, required: true },
});

module.exports= mongoose.model("Case", CaseSchema);


