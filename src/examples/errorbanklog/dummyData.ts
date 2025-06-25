export interface ErrorBankLog {
  id: string;
  bankName: string;
  accountNumber: string;
  accountHolder: string;
  dateLogged: string;
  issueType: string;
  amountAffected: number;
  flaggedBy: string;
  status: "Pending" | "Resolved" | "In Progress";
  resolvedDate?: string;
}

export const errorBankLogs: ErrorBankLog[] = [
  {
    id: "1",
    bankName: "First Bank",
    accountNumber: "3089745612",
    accountHolder: "John Doe",
    dateLogged: "May 20, 2025",
    issueType: "Can't Withdraw",
    amountAffected: 2500000,
    flaggedBy: "John Doe",
    status: "Pending",
    resolvedDate: undefined
  },
  {
    id: "2",
    bankName: "GTBank",
    accountNumber: "0124567890",
    accountHolder: "Jane Smith",
    dateLogged: "May 18, 2025",
    issueType: "PND (Post No Debit)",
    amountAffected: 2500000,
    flaggedBy: "David Brown",
    status: "Resolved",
    resolvedDate: "May 21 2025"
  },
  {
    id: "3",
    bankName: "UBA",
    accountNumber: "2045789021",
    accountHolder: "David Brown",
    dateLogged: "May 17, 2025",
    issueType: "Downgraded to tier 2",
    amountAffected: 2500000,
    flaggedBy: "Jane Smith",
    status: "Pending",
    resolvedDate: undefined
  },
  {
    id: "4",
    bankName: "UBA",
    accountNumber: "2045789021",
    accountHolder: "David Brown",
    dateLogged: "May 17, 2025",
    issueType: "Downgraded to Tier 1",
    amountAffected: 2500000,
    flaggedBy: "David Brown",
    status: "Resolved",
    resolvedDate: "May 21 2025"
  },
  {
    id: "5",
    bankName: "UBA",
    accountNumber: "2045789021",
    accountHolder: "David Brown",
    dateLogged: "May 17, 2025",
    issueType: "Login Blocked",
    amountAffected: 2500000,
    flaggedBy: "Jane Smith",
    status: "Pending",
    resolvedDate: undefined
  },
  {
    id: "6",
    bankName: "UBA",
    accountNumber: "2045789021",
    accountHolder: "David Brown",
    dateLogged: "May 17, 2025",
    issueType: "Can't Receive Transfer",
    amountAffected: 2500000,
    flaggedBy: "David Brown",
    status: "Resolved",
    resolvedDate: "May 21 2025"
  }
];