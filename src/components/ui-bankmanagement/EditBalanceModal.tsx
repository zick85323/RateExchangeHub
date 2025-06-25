import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";

interface EditBalanceModalProps {
  isOpen: boolean;
  onClose: () => void;
  bank: {
    name: string;
    accountHolder: string;
    accountNumber: string;
    balance: number;
  };
  onUpdate: (newBalance: number) => void;
}

export default function EditBalanceModal({ isOpen, onClose, bank, onUpdate }: EditBalanceModalProps) {
  const [newBalance, setNewBalance] = useState(bank.balance.toString());

  const formatBalance = (amount: string) => {
    const numAmount = parseFloat(amount.replace(/,/g, '')) || 0;
    return `₦${numAmount.toLocaleString()}`;
  };

  const handleUpdate = () => {
    const numBalance = parseFloat(newBalance.replace(/,/g, '')) || 0;
    onUpdate(numBalance);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-semibold">Edit Balance</DialogTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-4">Bank Information</h3>
            <div className="bg-gray-50 rounded-lg p-4 space-y-2">
              <div className="text-lg font-semibold text-gray-900">{bank.name}</div>
              <div className="text-gray-600">{bank.accountHolder}</div>
              <div className="text-gray-600">{bank.accountNumber}</div>
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-lg font-medium text-gray-900">New Balance (NGN)</label>
            <Input
              type="text"
              value={newBalance}
              onChange={(e) => setNewBalance(e.target.value)}
              placeholder="25000000"
              className="text-lg"
            />
            <div className="text-gray-500">
              Preview: {formatBalance(newBalance)}
            </div>
          </div>

          <div className="flex space-x-3 pt-4">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button 
              onClick={handleUpdate}
              className="flex-1 bg-orange-500 hover:bg-orange-600 text-white"
            >
              Update Balance
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}