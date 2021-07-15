const abi = [
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "entrant",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "baseAddress",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "uint8",
          "name": "lottery",
          "type": "uint8"
        }
      ],
      "name": "Entry",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "bytes32",
          "name": "_asset",
          "type": "bytes32"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "_from",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "_value",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint64",
          "name": "_start",
          "type": "uint64"
        },
        {
          "indexed": false,
          "internalType": "uint64",
          "name": "_end",
          "type": "uint64"
        },
        {
          "indexed": false,
          "internalType": "enum FSNContract.SendAssetFlag",
          "name": "_flag",
          "type": "uint8"
        }
      ],
      "name": "LogFusionAssetReceived",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "bytes32",
          "name": "_asset",
          "type": "bytes32"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "_to",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "_value",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint64",
          "name": "_start",
          "type": "uint64"
        },
        {
          "indexed": false,
          "internalType": "uint64",
          "name": "_end",
          "type": "uint64"
        },
        {
          "indexed": false,
          "internalType": "enum FSNContract.SendAssetFlag",
          "name": "_flag",
          "type": "uint8"
        }
      ],
      "name": "LogFusionAssetSent",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "entrant",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "baseAddress",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "uint8",
          "name": "lottery",
          "type": "uint8"
        },
        {
          "indexed": false,
          "internalType": "bytes32",
          "name": "txHash",
          "type": "bytes32"
        },
        {
          "indexed": false,
          "internalType": "bytes32",
          "name": "blockHash",
          "type": "bytes32"
        }
      ],
      "name": "Loss",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "entrant",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "baseAddress",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "uint8",
          "name": "lottery",
          "type": "uint8"
        },
        {
          "indexed": false,
          "internalType": "bytes32",
          "name": "txHash",
          "type": "bytes32"
        },
        {
          "indexed": false,
          "internalType": "bytes32",
          "name": "blockHash",
          "type": "bytes32"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "claimsTaken",
          "type": "uint256"
        }
      ],
      "name": "Win",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "assetID",
          "type": "bytes32"
        },
        {
          "internalType": "uint64",
          "name": "startTime",
          "type": "uint64"
        },
        {
          "internalType": "uint64",
          "name": "endTime",
          "type": "uint64"
        },
        {
          "internalType": "enum FSNContract.SendAssetFlag",
          "name": "flag",
          "type": "uint8"
        },
        {
          "internalType": "uint256[]",
          "name": "extraInfo",
          "type": "uint256[]"
        }
      ],
      "name": "_receiveAsset",
      "outputs": [
        {
          "internalType": "bool",
          "name": "success",
          "type": "bool"
        }
      ],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "admin",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint8",
          "name": "",
          "type": "uint8"
        }
      ],
      "name": "categories",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint8",
          "name": "_lottery",
          "type": "uint8"
        },
        {
          "internalType": "bytes32",
          "name": "_tx",
          "type": "bytes32"
        },
        {
          "internalType": "bytes32",
          "name": "_block",
          "type": "bytes32"
        }
      ],
      "name": "checkIfWin",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_claimant",
          "type": "address"
        }
      ],
      "name": "claim",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "claims",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "claimsSinceLastWin",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "cooldownTime",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "coordinator",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "end",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_account",
          "type": "address"
        }
      ],
      "name": "getCategory",
      "outputs": [
        {
          "internalType": "uint8",
          "name": "",
          "type": "uint8"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_account",
          "type": "address"
        }
      ],
      "name": "getPayoutStatus",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "governance",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "hotWalletLimit",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_admin",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "_coordinator",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "_governance",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "_subscriptionCost",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_cooldownTime",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_payoutThreshold",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_payoutAmount",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_hotWalletLimit",
          "type": "uint256"
        },
        {
          "internalType": "uint256[]",
          "name": "_categories",
          "type": "uint256[]"
        },
        {
          "internalType": "uint256[]",
          "name": "_odds",
          "type": "uint256[]"
        }
      ],
      "name": "initialize",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "name": "isPaused",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "isSubscribed",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint8",
          "name": "",
          "type": "uint8"
        }
      ],
      "name": "odds",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "payoutAmount",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "payoutStatus",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "payoutThreshold",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "previousEntry",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_account",
          "type": "address"
        },
        {
          "internalType": "uint8",
          "name": "_lottery",
          "type": "uint8"
        },
        {
          "internalType": "bytes32",
          "name": "_tx",
          "type": "bytes32"
        },
        {
          "internalType": "bytes32",
          "name": "_block",
          "type": "bytes32"
        }
      ],
      "name": "resolveEntry",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_free",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "_freemoon",
          "type": "address"
        }
      ],
      "name": "setAssets",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bool",
          "name": "_pause",
          "type": "bool"
        },
        {
          "internalType": "string[]",
          "name": "_toSet",
          "type": "string[]"
        }
      ],
      "name": "setPause",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_account",
          "type": "address"
        }
      ],
      "name": "subscribe",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "subscribedFor",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "subscribers",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "subscriptionCost",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "timelockToFree",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_admin",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "_coordinator",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "_subscriptionCost",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_cooldownTime",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_payoutThreshold",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_payoutAmount",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_hotWalletLimit",
          "type": "uint256"
        }
      ],
      "name": "updateParams",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "winners",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address payable",
          "name": "_to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "_amount",
          "type": "uint256"
        }
      ],
      "name": "withdrawFunds",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ]

export default abi