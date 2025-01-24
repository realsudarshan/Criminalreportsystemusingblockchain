// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CriminalRecordStorage {
    // Mapping to store hash associated with a MongoDB ID
    mapping(string => string) private mongoIdToHash;

    // Event emitted when a new record is stored
    event RecordStored(string mongoId, string hash);

    // Function to store the MongoDB ID and its corresponding hash
    function storeRecord(string calldata mongoId, string calldata hash) external {
        require(bytes(mongoId).length > 0, "MongoDB ID cannot be empty");
        require(bytes(hash).length > 0, "Hash cannot be empty");
        require(bytes(mongoIdToHash[mongoId]).length == 0, "Record already exists");

        mongoIdToHash[mongoId] = hash;

        emit RecordStored(mongoId, hash);
    }

    // Function to retrieve the hash using the MongoDB ID
    function getHash(string calldata mongoId) external view returns (string memory) {
        string memory hash = mongoIdToHash[mongoId];
        require(bytes(hash).length > 0, "No record found for the given MongoDB ID");

        return hash;
    }
}
