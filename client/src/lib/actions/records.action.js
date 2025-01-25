import { parseStringify } from "../utils";

export const getAllRecords = () => {
  const allrecords = {
    totalCases: 15,
    savedCases: 25,
    unsavedCases: 10,
    crimeReports: [
      {
        crimeID: "CR-1001",
        title: "Burglary at Office",
        type: "Burglary",
        date: "2025-01-01",
        location: "Kathmandu, Nepal",
        victim: {
          name: "Ram Thapa",
          contact: "+977-9812345678",
          address: "Baneshwor, Kathmandu, Nepal",
          gender: "M",
          econtact: "+977-9812345679",
        },
        suspect: {
          name: "Unknown",
          img: "https://via.placeholder.com/150",
          gender: "N/A",
          age: "N/A",
          address: "N/A",
          contact: "N/A",
          identificationDetails: "N/A",
        },
        evidence: {
          evidenceType: "CCTV Footage",
          evidenceDescription:
            "Footage of the suspects breaking into the office.",
          evidenceImage: "https://via.placeholder.com/150",
        },
        status: "closed",
        officerInCharge: "Hari Bahadur",
        firno: "FIR-12345",
        filedby: "Utsav Bhattarai",
        lastUpdated: "2025-01-15",
        reportStatus: "notsaved",
        caseDescription:
          "A burglary occurred at a commercial office in Kathmandu. The suspects broke into the office during nighttime and stole electronics and cash worth approximately NPR 500,000. The police have collected CCTV footage and other evidence from the crime scene. No suspects have been identified yet.",
      },
      {
        crimeID: "CR-1001",
        title: "Burglary at Office",
        type: "Burglary",
        date: "2025-01-01",
        location: "Kathmandu, Nepal",
        victim: {
          name: "Ram Thapa",
          contact: "+977-9812345678",
          address: "Baneshwor, Kathmandu, Nepal",
          gender: "M",
          econtact: "+977-9812345679",
        },
        suspect: {
          name: "Unknown",
          img: "https://via.placeholder.com/150",
          alias: "N/A",
          gender: "N/A",
          age: "N/A",
          address: "N/A",
          contact: "N/A",
          identificationDetails: "N/A",
          arrestStatus: "Unknown",
        },
        evidence: {
          evidenceType: "CCTV Footage",
          evidenceDescription:
            "Footage of the suspects breaking into the office.",
          evidenceImage: "https://via.placeholder.com/150",
        },
        status: "closed",
        officerInCharge: "Hari Bahadur",
        firno: "FIR-12345",
        filedby: "Nikesh",
        lastUpdated: "2025-01-15",
        reportStatus: "saved",
        caseDescription:
          "A burglary occurred at a commercial office in Kathmandu. The suspects broke into the office during nighttime and stole electronics and cash worth approximately NPR 500,000. The police have collected CCTV footage and other evidence from the crime scene. No suspects have been identified yet.",
      },
    ],
  };

  return parseStringify(allrecords);
};
