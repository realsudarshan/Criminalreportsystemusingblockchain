export const StatusIcon = {
  closed: "/assets/icons/check.svg",
  saved: "/assets/icons/check.svg",
  underinvestigation: "/assets/icons/pending.svg",
  drafted: "/assets/icons/cancelled.svg",
  notsaved: "/assets/icons/close.svg",
};

export const status = ["underinvestigation", "closed", "drafted"];

export const reportStatus = ["saved", "notsaved"];

//type of crime
export const CrimeType = [
  "Burglary",
  "Robbery",
  "Theft",
  "Assault",
  "Homicide",
  "Kidnapping",
  "Sexual Assault",
  "Domestic Violence",
  "Cyber Crime",
  "Fraud",
  "Drug Trafficking",
  "Human Trafficking",
  "Other",
];

export const EvidenceType = [
  "CCTV Footage",
  "Fingerprints",
  "DNA",
  "Photographs",
  "Documents",
  "Other",
]

export const Officer = [
  {
    name: "Utsav Bhattarai",
    email: "utsavdotdev@gmail.com",
    img: "/assets/images/dr-green.png",
    role: ["add"],
  },
  {
    name: "Sudarshan",
    img: "/assets/images/dr-cameron.png",
    email:"utsavbhattarai007@gmail.com",
    role: ["validator"],
  },
  {
    name: "Nikesh",
    email:"letsgothere4747@gmail.com",
    img: "/assets/images/dr-livingston.png",
    role: ["view"],
  },
];

export const GenderOptions = ["Male", "Female", "Other"];

export const RegisterFormDefaultValues = {
  crimeID: "",
  title: "",
  type: "",
  date: "",
  location: "",
  victim: {
    name: "",
    contact: "",
    email:"",
    address: "",
    gender: "",
    econtact: "",
    ename: "",
  },
  suspect: {
    name: "",
    img: "",
    gender: "",
    age: "",
    address: "",
    contact: "",
    identificationType: "",
    identificationNumber:"",
  },
  evidence: {
    evidenceType: "",
    evidenceDescription: "",
    evidenceImage: "",
  },
  status: "closed",
  officerInCharge: "",
  firno: "",
  filedby: "",
  lastUpdated: "",
  reportStatus: "notsaved",
  caseDescription: "",
};

export const IdentificationTypes = [
  "Birth Certificate",
  "Driver's License",
  "Medical Insurance Card/Policy",
  "Military ID Card",
  "National Identity Card",
  "Passport",
  "Resident Alien Card (Green Card)",
  "Social Security Card",
  "State ID Card",
  "Student ID Card",
  "Voter ID Card",
  "Profile Picture",
];

export const Doctors = [
  {
    image: "/assets/images/dr-green.png",
    name: "John Green",
  },
  {
    image: "/assets/images/dr-cameron.png",
    name: "Leila Cameron",
  },
  {
    image: "/assets/images/dr-livingston.png",
    name: "David Livingston",
  },
  {
    image: "/assets/images/dr-peter.png",
    name: "Evan Peter",
  },
  {
    image: "/assets/images/dr-powell.png",
    name: "Jane Powell",
  },
  {
    image: "/assets/images/dr-remirez.png",
    name: "Alex Ramirez",
  },
  {
    image: "/assets/images/dr-lee.png",
    name: "Jasmine Lee",
  },
  {
    image: "/assets/images/dr-cruz.png",
    name: "Alyana Cruz",
  },
  {
    image: "/assets/images/dr-sharma.png",
    name: "Hardik Sharma",
  },
];
