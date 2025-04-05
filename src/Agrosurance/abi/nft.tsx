const nftabi: Array<Record<string, any>> = [
    {
        inputs: [
            {
                internalType: "address",
                name: "_governanceToken",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "_fee",
                type: "uint256",
            },
            {
                internalType: "address",
                name: "_a",
                type: "address",
            },
        ],
        stateMutability: "nonpayable",
        type: "constructor",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "user",
                type: "address",
            },
        ],
        name: "DAO_Joined",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "uint256",
                name: "id",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "string",
                name: "description",
                type: "string",
            },
        ],
        name: "ProposalCreated",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "uint256",
                name: "id",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "bool",
                name: "passed",
                type: "bool",
            },
        ],
        name: "ProposalExecuted",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "uint256",
                name: "proposalId",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "address",
                name: "voter",
                type: "address",
            },
            {
                indexed: false,
                internalType: "bool",
                name: "voteFor",
                type: "bool",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "amount",
                type: "uint256",
            },
        ],
        name: "Voted",
        type: "event",
    },
    {
        inputs: [],
        name: "FEE",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "string",
                name: "description",
                type: "string",
            },
            {
                internalType: "uint256",
                name: "_insuranceType",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "_amountToBeSetteled",
                type: "uint256",
            },
        ],
        name: "createProposal",
        outputs: [],
        stateMutability: "payable",
        type: "function",
    },
    {
        inputs: [],
        name: "getAllProposals",
        outputs: [
            {
                components: [
                    {
                        internalType: "address",
                        name: "proposer",
                        type: "address",
                    },
                    {
                        internalType: "uint256",
                        name: "id",
                        type: "uint256",
                    },
                    {
                        internalType: "string",
                        name: "description",
                        type: "string",
                    },
                    {
                        internalType: "uint256",
                        name: "votesFor",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "votesAgainst",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "insuranceType",
                        type: "uint256",
                    },
                    {
                        internalType: "bool",
                        name: "executed",
                        type: "bool",
                    },
                    {
                        internalType: "uint256",
                        name: "amountToBeSetteled",
                        type: "uint256",
                    },
                ],
                internalType: "struct InsuranceDAO.Proposal[]",
                name: "",
                type: "tuple[]",
            },
        ],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "governanceToken",
        outputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        name: "hasVoted",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "proposalId",
                type: "uint256",
            },
        ],
        name: "isPassed",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "joinDAO",
        outputs: [],
        stateMutability: "payable",
        type: "function",
    },
    {
        inputs: [],
        name: "master",
        outputs: [
            {
                internalType: "contract masterContract",
                name: "",
                type: "address",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "owner",
        outputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "proposalId",
                type: "uint256",
            },
        ],
        name: "processPassedProposals",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "proposalCount",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        name: "proposals",
        outputs: [
            {
                internalType: "address",
                name: "proposer",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "id",
                type: "uint256",
            },
            {
                internalType: "string",
                name: "description",
                type: "string",
            },
            {
                internalType: "uint256",
                name: "votesFor",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "votesAgainst",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "insuranceType",
                type: "uint256",
            },
            {
                internalType: "bool",
                name: "executed",
                type: "bool",
            },
            {
                internalType: "uint256",
                name: "amountToBeSetteled",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "token",
        outputs: [
            {
                internalType: "contract AgroCoin",
                name: "",
                type: "address",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "proposalId",
                type: "uint256",
            },
            {
                internalType: "bool",
                name: "voteFor",
                type: "bool",
            },
            {
                internalType: "uint256",
                name: "amount",
                type: "uint256",
            },
        ],
        name: "voteOnProposal",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
];

export default nftabi;