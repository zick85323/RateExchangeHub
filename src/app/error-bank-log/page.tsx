import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import ErrorBankTable from "@/components/ui-errorbanklog/ErrorBankTable";
import TabNavigation from "@/components/ui-bankmanagement/TabNavigation";

export default function ErrorBankLogPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <TabNavigation />
      <div className="p-4 md:p-6">
        <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Error Bank Log</h1>
              <p className="text-gray-600 mt-1">Track and manage problematic bank accounts</p>
            </div>
            <div className="flex items-center">
              <Button variant="outline" className="flex items-center space-x-2">
                <RefreshCw className="h-4 w-4" />
                <span>Refresh</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Error Bank Table */}
        <ErrorBankTable />
      </div>
    </div>
  );
}