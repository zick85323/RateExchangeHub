import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, MoreHorizontal } from "lucide-react";
import { banks } from "@/examples/bankmanagement/dummyData";
import EditBalanceModal from "./EditBalanceModal";
import MoveToErrorModal from "./MoveToErrorModal";
import ActionDropdown from "./ActionDropdown";

type TabType = "all" | "free" | "funded" | "inuse" | "limited";

export default function BankTable() {
  const [activeTab, setActiveTab] = useState<TabType>("all");
  const [selectedBank, setSelectedBank] = useState<any>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isMoveModalOpen, setIsMoveModalOpen] = useState(false);

  const getFilteredBanks = () => {
    switch (activeTab) {
      case "free":
        return banks.filter(bank => bank.status === "Free");
      case "funded":
        return banks.filter(bank => bank.status === "Funded");
      case "inuse":
        return banks.filter(bank => bank.status === "In Use");
      case "limited":
        return banks.filter(bank => bank.status === "Limited");
      default:
        return banks;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Free":
        return <Badge className="bg-blue-100 text-blue-800 text-xs">{status}</Badge>;
      case "Funded":
        return <Badge className="bg-green-100 text-green-800 text-xs">{status}</Badge>;
      case "In Use":
        return <Badge className="bg-orange-100 text-orange-800 text-xs">{status}</Badge>;
      case "Limited":
        return <Badge className="bg-yellow-100 text-yellow-800 text-xs">{status}</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800 text-xs">{status}</Badge>;
    }
  };

  const getTableHeaders = () => {
    switch (activeTab) {
      case "funded":
        return ["Bank Name", "Account Number", "Account holder", "Balance (NGN)", "Status", "Funded By", "Payer Name"];
      case "inuse":
        return ["Bank Name", "Account Number", "Account holder", "Payer Name", "Balance (NGN)", "Status", "Assigned By"];
      case "limited":
        return ["Bank Name", "Account Number", "Account holder", "Payer Name", "Balance (NGN)", "Reason", "Status", "Assigned By"];
      default:
        return ["Bank Name", "Account Number", "Account holder", "Balance (NGN)", "Status", "Updated By", "Actions"];
    }
  };

  const handleEditBalance = (bank: any) => {
    setSelectedBank(bank);
    setIsEditModalOpen(true);
  };

  const handleMoveToError = (bank: any) => {
    setSelectedBank(bank);
    setIsMoveModalOpen(true);
  };

  const handleAssignToPayer = (bank: any) => {
    // Handle assign to payer logic
    console.log("Assign to payer:", bank);
  };

  const handleDeleteBank = (bank: any) => {
    // Handle delete bank logic
    console.log("Delete bank:", bank);
  };

  const handleUpdateBalance = (newBalance: number) => {
    console.log("Update balance:", selectedBank, newBalance);
  };

  const handleConfirmMove = (actionType: string, issueType: string, flaggedBy: string, amountAffected: number) => {
    console.log("Move to error:", selectedBank, { actionType, issueType, flaggedBy, amountAffected });
  };

  const renderTableRow = (bank: any, index: number) => {
    switch (activeTab) {
      case "funded":
        return (
          <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
            <td className="py-4 px-4 font-medium text-gray-900">{bank.name}</td>
            <td className="py-4 px-4 text-gray-700">{bank.accountNumber}</td>
            <td className="py-4 px-4 text-gray-700">{bank.accountHolder}</td>
            <td className="py-4 px-4 text-gray-700">{bank.balance.toLocaleString()}</td>
            <td className="py-4 px-4">{getStatusBadge(bank.status)}</td>
            <td className="py-4 px-4 text-gray-700">{bank.fundedBy || bank.updatedBy}</td>
            <td className="py-4 px-4">
              <Button className="bg-orange-500 hover:bg-orange-600 text-white text-xs px-3 py-1">
                Assign Bank
              </Button>
            </td>
          </tr>
        );
      case "inuse":
        return (
          <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
            <td className="py-4 px-4 font-medium text-gray-900">{bank.name}</td>
            <td className="py-4 px-4 text-gray-700">{bank.accountNumber}</td>
            <td className="py-4 px-4 text-gray-700">{bank.accountHolder}</td>
            <td className="py-4 px-4 text-gray-700">{bank.payerName || bank.accountHolder}</td>
            <td className="py-4 px-4 text-gray-700">₦{bank.balance.toLocaleString()}</td>
            <td className="py-4 px-4">{getStatusBadge(bank.status)}</td>
            <td className="py-4 px-4 text-gray-700">{bank.assignedBy || bank.updatedBy}</td>
          </tr>
        );
      case "limited":
        return (
          <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
            <td className="py-4 px-4 font-medium text-gray-900">{bank.name}</td>
            <td className="py-4 px-4 text-gray-700">{bank.accountNumber}</td>
            <td className="py-4 px-4 text-gray-700">{bank.accountHolder}</td>
            <td className="py-4 px-4 text-gray-700">{bank.payerName || bank.accountHolder}</td>
            <td className="py-4 px-4 text-gray-700">{bank.balance}</td>
            <td className="py-4 px-4 text-gray-700">{bank.reason}</td>
            <td className="py-4 px-4">{getStatusBadge(bank.status)}</td>
            <td className="py-4 px-4 text-gray-700">{bank.assignedBy || bank.updatedBy}</td>
          </tr>
        );
      default:
        return (
          <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
            <td className="py-4 px-4 font-medium text-gray-900">{bank.name}</td>
            <td className="py-4 px-4 text-gray-700">{bank.accountNumber}</td>
            <td className="py-4 px-4 text-gray-700">{bank.accountHolder}</td>
            <td className="py-4 px-4 text-gray-700">{bank.balance}</td>
            <td className="py-4 px-4">{getStatusBadge(bank.status)}</td>
            <td className="py-4 px-4 text-gray-700">{bank.updatedBy}</td>
            <td className="py-4 px-4">
              <div className="flex items-center space-x-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex items-center space-x-1"
                  onClick={() => handleEditBalance(bank)}
                >
                  <Edit className="h-3 w-3" />
                  <span>Edit</span>
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
        );
    }
  };

  const filteredBanks = getFilteredBanks();

  return (
    <>
      <div className="bg-white rounded-lg border border-gray-200">
        {/* Tab Navigation */}
        <div className="border-b border-gray-200 p-4">
          <div className="flex flex-wrap gap-2">
            <Button
              variant={activeTab === "all" ? "default" : "outline"}
              className={`text-sm px-4 py-2 ${
                activeTab === "all" 
                  ? "bg-orange-500 hover:bg-orange-600 text-white" 
                  : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
              }`}
              onClick={() => setActiveTab("all")}
            >
              All Banks
            </Button>
            <Button
              variant={activeTab === "free" ? "default" : "outline"}
              className={`text-sm px-4 py-2 ${
                activeTab === "free" 
                  ? "bg-orange-500 hover:bg-orange-600 text-white" 
                  : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
              }`}
              onClick={() => setActiveTab("free")}
            >
              Free Banks
            </Button>
            <Button
              variant={activeTab === "funded" ? "default" : "outline"}
              className={`text-sm px-4 py-2 ${
                activeTab === "funded" 
                  ? "bg-orange-500 hover:bg-orange-600 text-white" 
                  : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
              }`}
              onClick={() => setActiveTab("funded")}
            >
              Funded Banks
            </Button>
            <Button
              variant={activeTab === "inuse" ? "default" : "outline"}
              className={`text-sm px-4 py-2 ${
                activeTab === "inuse" 
                  ? "bg-orange-500 hover:bg-orange-600 text-white" 
                  : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
              }`}
              onClick={() => setActiveTab("inuse")}
            >
              Bank in Use
            </Button>
            <Button
              variant={activeTab === "limited" ? "default" : "outline"}
              className={`text-sm px-4 py-2 ${
                activeTab === "limited" 
                  ? "bg-orange-500 hover:bg-orange-600 text-white" 
                  : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
              }`}
              onClick={() => setActiveTab("limited")}
            >
              Limited Banks
            </Button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                {getTableHeaders().map((header, index) => (
                  <th key={index} className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredBanks.map((bank, index) => renderTableRow(bank, index))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modals */}
      {selectedBank && (
        <>
          <EditBalanceModal
            isOpen={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
            bank={selectedBank}
            onUpdate={handleUpdateBalance}
          />
          <MoveToErrorModal
            isOpen={isMoveModalOpen}
            onClose={() => setIsMoveModalOpen(false)}
            bank={selectedBank}
            onConfirm={handleConfirmMove}
          />
        </>
      )}
    </>
  );
}