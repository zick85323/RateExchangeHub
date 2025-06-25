'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, MoreHorizontal } from "lucide-react";
import { banks } from "@/examples/bankmanagement/dummyData";
import ActionDropdown from "./ActionDropdown";
import EditBalanceModal from "./EditBalanceModal";
import MoveToErrorModal from "./MoveToErrorModal";

type TabType = "All Banks" | "Free Banks" | "Funded Banks" | "Bank in Use" | "Limited Banks";

export default function BankTable() {
  const [activeTab, setActiveTab] = useState<TabType>("All Banks");
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [moveToErrorModalOpen, setMoveToErrorModalOpen] = useState(false);
  const [selectedBank, setSelectedBank] = useState<any>(null);

  const tabs: TabType[] = ["All Banks", "Free Banks", "Funded Banks", "Bank in Use", "Limited Banks"];

  const getFilteredBanks = () => {
    if (activeTab === "All Banks") return banks;
    if (activeTab === "Free Banks") return banks.filter(bank => bank.status === "Free");
    if (activeTab === "Funded Banks") return banks.filter(bank => bank.status === "Funded");
    if (activeTab === "Bank in Use") return banks.filter(bank => bank.status === "In Use");
    if (activeTab === "Limited Banks") return banks.filter(bank => bank.status === "Limited");
    return banks;
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Free":
        return <Badge variant="secondary" className="bg-gray-100 text-gray-800 hover:bg-gray-100">Free</Badge>;
      case "In Use":
        return <Badge variant="secondary" className="bg-orange-100 text-orange-800 hover:bg-orange-100">In Use</Badge>;
      case "Funded":
        return <Badge variant="secondary" className="bg-green-100 text-green-800 hover:bg-green-100">Funded</Badge>;
      case "Limited":
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Limited</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const handleEditBalance = (bank: any) => {
    setSelectedBank(bank);
    setEditModalOpen(true);
  };

  const handleMoveToError = (bank: any) => {
    setSelectedBank(bank);
    setMoveToErrorModalOpen(true);
  };

  const handleAssignToPayer = (bank: any) => {
    console.log("Assign to payer:", bank);
  };

  const handleDeleteBank = (bank: any) => {
    console.log("Delete bank:", bank);
  };

  const handleUpdateBalance = (newBalance: number) => {
    console.log("Update balance:", newBalance);
    setEditModalOpen(false);
  };

  const handleMoveToErrorConfirm = (actionType: string, issueType: string, flaggedBy: string, amountAffected: number) => {
    console.log("Move to error:", { actionType, issueType, flaggedBy, amountAffected });
    setMoveToErrorModalOpen(false);
  };

  const filteredBanks = getFilteredBanks();

  return (
    <div className="bg-white rounded-lg border border-gray-200">
      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <div className="flex space-x-0">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab 
                  ? "border-orange-500 text-orange-600 bg-orange-50" 
                  : "border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Bank Name
              </th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Account Number
              </th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Account holder
              </th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Balance (NGN)
              </th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Updated By
              </th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredBanks.map((bank, index) => (
              <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="py-4 px-4 font-medium text-gray-900">{bank.name}</td>
                <td className="py-4 px-4 text-gray-700">{bank.accountNumber}</td>
                <td className="py-4 px-4 text-gray-700">{bank.accountHolder}</td>
                <td className="py-4 px-4 text-gray-700">{bank.balance.toLocaleString()}</td>
                <td className="py-4 px-4">{getStatusBadge(bank.status)}</td>
                <td className="py-4 px-4 text-gray-700">{bank.updatedBy}</td>
                <td className="py-4 px-4">
                  <div className="flex items-center space-x-2">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleEditBalance(bank)}
                      className="text-gray-600 hover:text-gray-900"
                    >
                      <Edit className="h-4 w-4" />
                      Edit
                    </Button>
                    <ActionDropdown
                      onEditBalance={() => handleEditBalance(bank)}
                      onMoveToError={() => handleMoveToError(bank)}
                      onAssignToPayer={() => handleAssignToPayer(bank)}
                      onDeleteBank={() => handleDeleteBank(bank)}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modals */}
      {selectedBank && (
        <>
          <EditBalanceModal
            isOpen={editModalOpen}
            onClose={() => setEditModalOpen(false)}
            bank={selectedBank}
            onUpdate={handleUpdateBalance}
          />
          <MoveToErrorModal
            isOpen={moveToErrorModalOpen}
            onClose={() => setMoveToErrorModalOpen(false)}
            bank={selectedBank}
            onConfirm={handleMoveToErrorConfirm}
          />
        </>
      )}
    </div>
  );
}