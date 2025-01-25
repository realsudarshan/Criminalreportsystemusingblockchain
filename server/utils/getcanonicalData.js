function getCanonicalRepresentation(data) {
  return {
    victim: {
      name: data.victim.name,
      contact: data.victim.contact,
      address: data.victim.address,
      gender: data.victim.gender,
      econtact: data.victim.econtact
    },
    suspect: {
      name: data.suspect.name,
      img: data.suspect.img,
      gender: data.suspect.gender,
      age: data.suspect.age,
      address: data.suspect.address,
      contact: data.suspect.contact,
      identificationDetails: data.suspect.identificationDetails,
    },
    evidence: {
      evidenceType: data.evidence.evidenceType,
      evidenceDescription: data.evidence.evidenceDescription,
      evidenceImage: data.evidence.evidenceImage
    },
    crimeID: data.crimeID,
    title: data.title,
    type: data.type,
    date: data.date,
    location: data.location,
    status: data.status,
    officerInCharge: data.officerInCharge,
    firno: data.firno,
    filedby: data.filedby,
    lastUpdated: data.lastUpdated,
    reportStatus: data.reportStatus,
    caseDescription: data.caseDescription
  };
}
module.exports=getCanonicalRepresentation;