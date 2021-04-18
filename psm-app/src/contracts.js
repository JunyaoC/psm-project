export const contracts = {
	"psmuser":{
		"address":"0x6fAF8d62D9F0F32fA136DD21bA7bb9f424a434cA",
		"abi":[{"inputs": [{"internalType": "address", "name": "_address", "type": "address"}, {"internalType": "bool", "name": "_active", "type": "bool"} ], "name": "setActive", "outputs": [], "stateMutability": "nonpayable", "type": "function"}, {"inputs": [{"internalType": "address", "name": "_address", "type": "address"}, {"internalType": "string", "name": "_email", "type": "string"} ], "name": "setAddress", "outputs": [], "stateMutability": "nonpayable", "type": "function"}, {"inputs": [], "stateMutability": "nonpayable", "type": "constructor"}, {"anonymous": false, "inputs": [{"indexed": true, "internalType": "address", "name": "_actor", "type": "address"}, {"indexed": true, "internalType": "address", "name": "_effector", "type": "address"} ], "name": "SetActive", "type": "event"}, {"anonymous": false, "inputs": [{"indexed": true, "internalType": "address", "name": "_actor", "type": "address"}, {"indexed": true, "internalType": "address", "name": "_effector", "type": "address"}, {"indexed": true, "internalType": "string", "name": "_email", "type": "string"} ], "name": "SetAddress", "type": "event"}, {"inputs": [{"internalType": "string", "name": "_key", "type": "string"} ], "name": "setDataKey", "outputs": [], "stateMutability": "nonpayable", "type": "function"}, {"inputs": [{"internalType": "address", "name": "_address", "type": "address"}, {"internalType": "uint256", "name": "_level", "type": "uint256"} ], "name": "setLevel", "outputs": [], "stateMutability": "nonpayable", "type": "function"}, {"anonymous": false, "inputs": [{"indexed": true, "internalType": "address", "name": "_actor", "type": "address"}, {"indexed": true, "internalType": "address", "name": "_effector", "type": "address"} ], "name": "SetLevel", "type": "event"}, {"inputs": [{"internalType": "address", "name": "_address", "type": "address"}, {"internalType": "string", "name": "_data", "type": "string"} ], "name": "setMetadata", "outputs": [], "stateMutability": "nonpayable", "type": "function"}, {"anonymous": false, "inputs": [{"indexed": true, "internalType": "address", "name": "_actor", "type": "address"}, {"indexed": true, "internalType": "address", "name": "_effector", "type": "address"}, {"indexed": false, "internalType": "string", "name": "_metadata", "type": "string"} ], "name": "SetMetadata", "type": "event"}, {"inputs": [{"internalType": "address", "name": "_address", "type": "address"}, {"internalType": "string", "name": "_pwdHash", "type": "string"} ], "name": "setPassword", "outputs": [], "stateMutability": "nonpayable", "type": "function"}, {"inputs": [{"internalType": "address", "name": "_address", "type": "address"}, {"internalType": "string", "name": "_key", "type": "string"} ], "name": "setPKey", "outputs": [], "stateMutability": "nonpayable", "type": "function"}, {"anonymous": false, "inputs": [{"indexed": true, "internalType": "address", "name": "_actor", "type": "address"}, {"indexed": true, "internalType": "address", "name": "_effector", "type": "address"} ], "name": "SetPKey", "type": "event"}, {"anonymous": false, "inputs": [{"indexed": true, "internalType": "address", "name": "_actor", "type": "address"}, {"indexed": true, "internalType": "address", "name": "_effector", "type": "address"} ], "name": "SetPassword", "type": "event"}, {"inputs": [], "name": "getDataKey", "outputs": [{"internalType": "string", "name": "_key", "type": "string"} ], "stateMutability": "view", "type": "function"}, {"inputs": [], "name": "getLevel", "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"} ], "stateMutability": "view", "type": "function"}, {"inputs": [], "name": "listAddress", "outputs": [{"internalType": "address[]", "name": "_addresses", "type": "address[]"} ], "stateMutability": "view", "type": "function"}, {"inputs": [{"internalType": "string", "name": "_email", "type": "string"}, {"internalType": "string", "name": "_password", "type": "string"} ], "name": "retrieveWallet", "outputs": [{"internalType": "address", "name": "", "type": "address"}, {"internalType": "string", "name": "", "type": "string"} ], "stateMutability": "view", "type": "function"}]
	}
}