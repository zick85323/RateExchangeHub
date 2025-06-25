import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Calendar, Filter, X } from "lucide-react";
import { errorBankLogs } from "@/examples/errorbanklog/dummyData";
import ActionDropdown from "./ActionDropdown";
import StatusDropdown from "./StatusDropdown";

export default function ErrorBankTable() {
  const [statusFilter, setStatusFilter] = useState("all");
  const [issueFilter, setIssueFilter] = useState("all");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const getFilteredLogs = () => {
    return errorBankLogs.filter(log => {
      if (statusFilter !== "all" && log.status !== statusFilter) return false;
      if (issueFilter !== "all" && log.issueType !== issueFilter) return false;
      return true;
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Pending":
        return (
          <StatusDropdown 
            currentStatus={status}
            onStatusChange={(newStatus) => console.log("Status changed:", newStatus)}
          />
        );
      case "Resolved":
        return (
          <StatusDropdown 
            currentStatus={status}
            onStatusChange={(newStatus) => console.log("Status changed:", newStatus)}
          />
        );
      default:
        return <span className="text-gray-600">{status}</span>;
    }
  };

  const clearFilters = () => {
    setStatusFilter("all");
    setIssueFilter("all");
    setFromDate("");
    setToDate("");
  };

  const filteredLogs = getFilteredLogs();

  return (
    <div className="bg-white rounded-lg border border-gray-200">
      {/* Filter Section */}
      <div className="border-b border-gray-200 p-4">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">Filter:</span>
          </div>
          
          {/* Status Filter */}
          <div className="min-w-40">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="bg-white border-gray-300">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Resolved">Resolved</SelectItem>
                <SelectItem value="In Progress">In Progress</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Issue Type Filter */}
          <div className="min-w-40">
            <Select value={issueFilter} onValueChange={setIssueFilter}>
              <SelectTrigger className="bg-white border-gray-300">
                <SelectValue placeholder="All Issues" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Issues</SelectItem>
                <SelectItem value="Can't Withdraw">Can't Withdraw</SelectItem>
                <SelectItem value="PND (Post No Debit)">PND (Post No Debit)</SelectItem>
                <SelectItem value="Downgraded to tier 2">Downgraded to tier 2</SelectItem>
                <SelectItem value="Downgraded to Tier 1">Downgraded to Tier 1</SelectItem>
                <SelectItem value="Login Blocked">Login Blocked</SelectItem>
                <SelectItem value="Cannot Receive Transfers">Cannot Receive Transfers</SelectItem>
                <SelectItem value="Withdraw Delayed">Withdraw Delayed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Date Filters */}
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Input
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                placeholder="From date"
                className="pl-8"
              />
              <Calendar className="h-4 w-4 text-gray-400 absolute left-2 top-1/2 transform -translate-y-1/2" />
            </div>
            
            <div className="relative">
              <Input
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                placeholder="To date"
                className="pl-8"
              />
              <Calendar className="h-4 w-4 text-gray-400 absolute left-2 top-1/2 transform -translate-y-1/2" />
            </div>
          </div>

          {/* Clear Button */}
          <Button variant="outline" onClick={clearFilters} className="text-sm">
            Clear
          </Button>
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
                Date Logged
              </th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Issue Type
              </th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount Affected
              </th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Flagged by TL?
              </th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Action
              </th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Resolved Date
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredLogs.map((log, index) => (
              <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="py-4 px-4 font-medium text-gray-900">{log.bankName}</td>
                <td className="py-4 px-4 text-gray-700">{log.accountNumber}</td>
                <td className="py-4 px-4 text-gray-700">{log.accountHolder}</td>
                <td className="py-4 px-4 text-gray-700">{log.dateLogged}</td>
                <td className="py-4 px-4 text-gray-700">{log.issueType}</td>
                <td className="py-4 px-4 text-gray-700">₦{log.amountAffected.toLocaleString()}</td>
                <td className="py-4 px-4 text-gray-700">{log.flaggedBy}</td>
                <td className="py-4 px-4">{getStatusBadge(log.status)}</td>
                <td className="py-4 px-4 text-gray-700">{log.resolvedDate || "Null"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}