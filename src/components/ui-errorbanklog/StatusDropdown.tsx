import { useState } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, Check } from "lucide-react";

interface StatusDropdownProps {
  currentStatus: string;
  onStatusChange: (newStatus: string) => void;
}

const statusOptions = [
  { value: "Pending", label: "Pending", color: "bg-orange-100 text-orange-800" },
  { value: "In Progress", label: "In progress", color: "bg-blue-100 text-blue-800" },
  { value: "Resolved", label: "Resolved", color: "bg-green-100 text-green-800" },
];

export default function StatusDropdown({ currentStatus, onStatusChange }: StatusDropdownProps) {
  const currentOption = statusOptions.find(option => option.value === currentStatus);
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center space-x-1 focus:outline-none">
          <Badge className={`${currentOption?.color} text-xs px-2 py-1 cursor-pointer hover:opacity-80`}>
            {currentOption?.label || currentStatus}
          </Badge>
          <ChevronDown className="h-3 w-3 text-gray-400" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-32">
        {statusOptions.map((option) => (
          <DropdownMenuItem 
            key={option.value}
            onClick={() => onStatusChange(option.value)}
            className="flex items-center justify-between cursor-pointer"
          >
            <span className="text-sm">{option.label}</span>
            {currentStatus === option.value && (
              <Check className="h-3 w-3 text-orange-500" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}