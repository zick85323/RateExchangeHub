import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { X, AlertTriangle } from "lucide-react";

interface MoveToErrorModalProps {
  isOpen: boolean;
  onClose: () => void;
  bank: {
    name: string;
    accountHolder: string;
    accountNumber: string;
    balance: number;
  };
  onConfirm: (actionType: string, issueType: string, flaggedBy: string, amountAffected: number) => void;
}

const actionTypes = [
  "Account Frozen",
  "Transaction Failed", 
  "Balance Discrepancy",
  "System Error",
  "Manual Review",
  "Compliance Issue"
];

const issueTypes = [
  "Low Balance",
  "Limit Warning", 
  "System Restricted",
  "Failed Transaction",
  "Account Suspended",
  "Technical Error",
  "Fraud Alert"
];

const staffMembers = [
  "John Smith",
  "Jane Doe", 
  "David Brown",
  "Sarah Wilson",
  "Mike Johnson",
  "Lisa Davis"
];

export default function MoveToErrorModal({ isOpen, onClose, bank, onConfirm }: MoveToErrorModalProps) {
  const [actionType, setActionType] = useState("");
  const [issueType, setIssueType] = useState("");
  const [flaggedBy, setFlaggedBy] = useState("");
  const [amountAffected, setAmountAffected] = useState("2,500,000");

  const handleConfirm = () => {
    if (actionType && issueType && flaggedBy) {
      const numAmount = parseFloat(amountAffected.replace(/,/g, '')) || 0;
      onConfirm(actionType, issueType, flaggedBy, numAmount);
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-orange-500" />
              <DialogTitle className="text-xl font-semibold">Move to Error Bank</DialogTitle>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>
        
        <div className="space-y-6">
          <p className="text-gray-600">
            Are you sure you want to move this bank to the error log?
          </p>

          <div className="bg-gray-50 rounded-lg p-4 space-y-2">
            <div className="text-lg font-semibold text-gray-900">{bank.name}</div>
            <div className="text-gray-600">{bank.accountHolder}</div>
            <div className="text-gray-600">{bank.accountNumber}</div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">Action</label>
              <Select value={actionType} onValueChange={setActionType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select action type" />
                </SelectTrigger>
                <SelectContent>
                  {actionTypes.map((action) => (
                    <SelectItem key={action} value={action}>
                      {action}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">Issue Type</label>
              <Select value={issueType} onValueChange={setIssueType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select issue type" />
                </SelectTrigger>
                <SelectContent>
                  {issueTypes.map((issue) => (
                    <SelectItem key={issue} value={issue}>
                      {issue}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">Flagged by</label>
              <Select value={flaggedBy} onValueChange={setFlaggedBy}>
                <SelectTrigger>
                  <SelectValue placeholder="Select staff" />
                </SelectTrigger>
                <SelectContent>
                  {staffMembers.map((staff) => (
                    <SelectItem key={staff} value={staff}>
                      {staff}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">Amount Affected</label>
              <Input
                type="text"
                value={amountAffected}
                onChange={(e) => setAmountAffected(e.target.value)}
                placeholder="₦2,500,000"
              />
            </div>
          </div>

          <div className="flex space-x-3 pt-4">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button 
              onClick={handleConfirm}
              className="flex-1 bg-orange-500 hover:bg-orange-600 text-white"
              disabled={!actionType || !issueType || !flaggedBy}
            >
              Confirm Move
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}