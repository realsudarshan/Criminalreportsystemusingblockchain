// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CriminalRecordStorage {
    
    mapping(string => string) private mongoIdToHash;

   
    event RecordStored(string mongoId, string hash);

  
    function storeRecord(string calldata mongoId, string calldata hash) external {
        require(bytes(mongoId).length > 0, "MongoDB ID cannot be empty");
        require(bytes(hash).length > 0, "Hash cannot be empty");
        require(bytes(mongoIdToHash[mongoId]).length == 0, "Record already exists");

        mongoIdToHash[mongoId] = hash;

        emit RecordStored(mongoId, hash);
    }
      
   
    function getHash(string calldata mongoId) external view returns (string memory) {
        string memory hash = mongoIdToHash[mongoId];
        require(bytes(hash).length > 0, "No record found for the given MongoDB ID");

        return hash;
    }
}
