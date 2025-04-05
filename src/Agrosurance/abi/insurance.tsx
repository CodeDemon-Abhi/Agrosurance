const insuranceABI: Array<Record<string, any>> = [
    {
        inputs: [
            {
                internalType: "uint256",
                name: "fee",
                type: "uint256",
            },
            {
                internalType: "address",
                name: "_a",
                type: "address",
            },
            {
                internalType: "address",
                name: "_d",
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
            {
                indexed: false,
                internalType: "uint256",
                name: "damageFactor",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "bool",
                name: "approved",
                type: "bool",
            },
        ],
        name: "ClaimReviewed",
        type: "event",
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
            {
                indexed: false,
                internalType: "uint256",
                name: "amount",
                type: "uint256",
            },
        ],
        name: "InsuranceClaimed",
        type: "event",
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
            {
                indexed: false,
                internalType: "uint256",
                name: "value",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "deadline",
                type: "uint256",
            },
        ],
        name: "InsuranceCreated",
        type: "event",
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
            {
                indexed: false,
                internalType: "uint256",
                name: "amount",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "totalPaid",
                type: "uint256",
            },
        ],
        name: "PremiumPaid",
        type: "event",
    },
    {
        inputs: [],
        name: "DAO",
        outputs: [
            {
                internalType: "contract InsuranceDAO",
                name: "",
                type: "address",
            },
        ],
        stateMutability: "view",
        type: "function",
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
                internalType: "uint256",
                name: "damageFactor",
                type: "uint256",
            },
        ],
        name: "claimInsurance",
        outputs: [],
        stateMutability: "payable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "value",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "deadline",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "paymentFreq",
                type: "uint256",
            },
        ],
        name: "createInsurance",
        outputs: [],
        stateMutability: "payable",
        type: "function",
    },
    {
        inputs: [],
        name: "getClaimValue",
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
        inputs: [],
        name: "getResultOfRejectedClaims",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
        ],
        name: "insurances",
        outputs: [
            {
                internalType: "bool",
                name: "isOpen",
                type: "bool",
            },
            {
                internalType: "uint256",
                name: "value",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "deadline",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "paymentFreq",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "totalPremiumPaid",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "totalPaymentPending",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "timesPaid",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "damageFactor",
                type: "uint256",
            },
            {
                internalType: "bool",
                name: "claimApproved",
                type: "bool",
            },
            {
                internalType: "bool",
                name: "isRejected",
                type: "bool",
            },
            {
                internalType: "bool",
                name: "hasNFT",
                type: "bool",
            },
            {
                internalType: "uint256",
                name: "premium",
                type: "uint256",
            },
        ],
        stateMutability: "view",
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
        inputs: [],
        name: "payPremium",
        outputs: [],
        stateMutability: "payable",
        type: "function",
    },
    {
        inputs: [],
        name: "paymentRemaining",
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
        inputs: [],
        name: "premiumRemaining",
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
        inputs: [],
        name: "recieveFund",
        outputs: [],
        stateMutability: "payable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "string",
                name: "name",
                type: "string",
            },
        ],
        name: "registerUser",
        outputs: [],
        stateMutability: "nonpayable",
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
        name: "rejectClaim",
        outputs: [],
        stateMutability: "payable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "user",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "damageFactor",
                type: "uint256",
            },
        ],
        name: "setDamageFactor",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "timesRemainingToPay",
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
        inputs: [],
        name: "totalFund",
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
                internalType: "address",
                name: "",
                type: "address",
            },
        ],
        name: "users",
        outputs: [
            {
                internalType: "address",
                name: "user",
                type: "address",
            },
            {
                internalType: "string",
                name: "name",
                type: "string",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
];

export default insuranceABI;