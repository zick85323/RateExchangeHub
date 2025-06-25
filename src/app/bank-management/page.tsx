import { Button } from "@/components/ui/button";
import { RefreshCw, Filter, Plus } from "lucide-react";
import BankTable from "@/components/ui-bankmanagement/BankTable";

export default function BankManagementPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
        <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Bank Management</h1>
            <p className="text-gray-600">Manage bank accounts, balances, and statuses</p>
          </div>
          
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <RefreshCw className="h-4 w-4" />
              Refresh
            </Button>
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
            <Button size="sm" className="bg-orange-500 hover:bg-orange-600 text-white flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Bank
            </Button>
          </div>
        </div>

        {/* Bank Table */}
        <BankTable />
      </div>
    </div>
  );
}