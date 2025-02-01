# 🔍 Crime Ledger : Crime Record Management Portal  
A secure portal for police authorities to manage crime records, ensuring transparency and preventing unauthorized modifications or deletions.

---

## 🚀 Features  
✅ Add, view, and manage detailed crime records.  
🔒 Immutable crime records to prevent tampering or deletion.  
🕵️‍♂️ Detailed suspect profiles and case descriptions.  
🔎 Search, filter, and sort crime records for efficient management.  

---

## 🛠 Technology Stack  
🎨 **Frontend:** React.js  
⚙️ **Backend:** Node.js (Express.js)  
🗄 **Database:** MongoDB  
⛓ **Blockchain/Smart Contract:** Solidity  
🌍 **Testnet:** Ethereum Sepolia  

---

## 👥 Contributors ✨  
👑 **[Utsav](https://github.com/utsavdotdev)** – Frontend  

---

## 🏛 System Overview  

The Criminal Report Management System consists of four main components:  
1️⃣ **Criminal Report Creation**  
2️⃣ **Review by Senior Officer**  
3️⃣ **Blockchain Integration**  
4️⃣ **Validation**  

---

## 📜 Process Flow  

The following diagram illustrates the entire process from report creation to validation:  

```mermaid
graph TD
    A[📝 Start] --> B[👮 Operational Officer Creates Report] 
B --> C[💾 Save Report to MongoDB] 
C --> D[🔍 Senior Officer Reviews Report] 
D --> E{✅ Approved?} 
E -->|Yes| I[🔗 Start Adding to Blockchain] 
E -->|No| G[🔄 Report will be reuploaded by Operational body] 
G --> H[🏁 End] 
 
I --> K[🔑 Hash Report Data] 
K --> M[🛡 Add Hash and MongoDB ID to Ethereum Blockchain] 

M --> H 
N[🔎 Validation Request] --> O[📂 Fetch Report from MongoDB] 
O --> P[🔢 Generate Hash of Fetched Data] 
P --> Q[🔗 Retrieve Blockchain Hash] 
Q --> R{⚖ Hashes Match?} 
R -->|Yes| S[✔ Data Validated] 
R -->|No| T[❌ Data Not Validated] 
S --> U[🏁 End] 
T --> U
