export interface Bank {
  id: string;
  name: string;
  accountNumber: string;
  accountHolder: string;
  balance: number;
  status: "Free" | "Funded" | "In Use" | "Limited";
  updatedBy: string;
  fundedBy?: string;
  payerName?: string;
  assignedBy?: string;
  reason?: string;
}

export const banks: Bank[] = [
  // All Banks / Free Banks
  {
    id: "1",
    name: "First Bank",
    accountNumber: "3089745612",
    accountHolder: "John Doe",
    balance: 0,
    status: "Free",
    updatedBy: "John Doe"
  },
  {
    id: "2",
    name: "GT Bank",
    accountNumber: "1245986512",
    accountHolder: "Jane Smith",
    balance: 0,
    status: "In Use",
    updatedBy: "Jane Smith",
    payerName: "John Doe",
    assignedBy: "Jane Smith"
  },
  {
    id: "3",
    name: "UBA Bank",
    accountNumber: "3421769654",
    accountHolder: "David Brown",
    balance: 0,
    status: "Funded",
    updatedBy: "David Brown",
    fundedBy: "David Brown"
  },
  {
    id: "4",
    name: "Zenith Bank",
    accountNumber: "1654324786",
    accountHolder: "Sarah Wills",
    balance: 0,
    status: "In Use",
    updatedBy: "Sarah wil",
    payerName: "Jane Smith",
    assignedBy: "Sarah wil"
  },
  {
    id: "5",
    name: "Fidelity Bank",
    accountNumber: "2431569781",
    accountHolder: "Lisa Johnson",
    balance: 0,
    status: "Funded",
    updatedBy: "Lisa Johnson",
    fundedBy: "James Smith"
  },
  {
    id: "6",
    name: "Sterling Bank",
    accountNumber: "1062398317",
    accountHolder: "Robert Davies",
    balance: 0,
    status: "Free",
    updatedBy: "Robert Davies"
  },
  {
    id: "7",
    name: "Sterling Bank",
    accountNumber: "1062398317",
    accountHolder: "Robert Davies",
    balance: 0,
    status: "Limited",
    updatedBy: "Robert Davies",
    payerName: "John Doe",
    assignedBy: "Jane Smith",
    reason: "Low balance"
  },
  // Funded Banks
  {
    id: "8",
    name: "UBA",
    accountNumber: "2045789021",
    accountHolder: "David Brown",
    balance: 2500000,
    status: "Funded",
    updatedBy: "David Brown",
    fundedBy: "David Brown"
  },
  {
    id: "9",
    name: "Fidelity",
    accountNumber: "2045789021",
    accountHolder: "Lisa Johnson",
    balance: 2500000,
    status: "Funded",
    updatedBy: "Lisa Johnson",
    fundedBy: "James Smith"
  },
  // Free Banks (Additional)
  {
    id: "10",
    name: "Sterling Bank",
    accountNumber: "4567890123",
    accountHolder: "Robert Davies",
    balance: 0,
    status: "Free",
    updatedBy: "Robert Davies"
  },
  // Bank in Use
  {
    id: "11",
    name: "GTBank",
    accountNumber: "0124567890",
    accountHolder: "Jane Smith",
    balance: 2500000,
    status: "In Use",
    updatedBy: "Jane Smith",
    payerName: "John Doe",
    assignedBy: "Jane Smith"
  },
  {
    id: "12",
    name: "Zenit Bank",
    accountNumber: "2045789021",
    accountHolder: "Sarah wil",
    balance: 2500000,
    status: "In Use",
    updatedBy: "Sarah wil",
    payerName: "Jane Smith",
    assignedBy: "Sarah wil"
  },
  // Limited Banks
  {
    id: "13",
    name: "GTBank",
    accountNumber: "0124567890",
    accountHolder: "Jane Smith",
    balance: 0,
    status: "Limited",
    updatedBy: "Jane Smith",
    payerName: "John Doe",
    assignedBy: "Jane Smith",
    reason: "Low balance"
  },
  {
    id: "14",
    name: "Zenit Bank",
    accountNumber: "2045789021",
    accountHolder: "Sarah wil",
    balance: 0,
    status: "Limited",
    updatedBy: "Sarah wil",
    payerName: "Jane Smith",
    assignedBy: "Sarah wil",
    reason: "Limit warning"
  },
  {
    id: "15",
    name: "Fidelity Bank",
    accountNumber: "2045789021",
    accountHolder: "Sarah wil",
    balance: 0,
    status: "Limited",
    updatedBy: "Sarah wil",
    payerName: "David Smith",
    assignedBy: "Sarah wil",
    reason: "System restricted"
  }
];