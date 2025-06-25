import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, User, AlertCircle } from "lucide-react";

interface ActionDropdownProps {
  onEditBalance: () => void;
  onMoveToError: () => void;
  onAssignToPayer: () => void;
  onDeleteBank: () => void;
}

export default function ActionDropdown({ onEditBalance, onMoveToError, onAssignToPayer, onDeleteBank }: ActionDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01" />
          </svg>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem onClick={onEditBalance} className="flex items-center space-x-2">
          <Edit className="h-4 w-4" />
          <span>Edit Balance</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onMoveToError} className="flex items-center space-x-2">
          <AlertCircle className="h-4 w-4" />
          <span>Move to Error log</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onAssignToPayer} className="flex items-center space-x-2">
          <User className="h-4 w-4" />
          <span>Assign to Payer</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={onDeleteBank} 
          className="flex items-center space-x-2 text-red-600 focus:text-red-600"
        >
          <Trash2 className="h-4 w-4" />
          <span>Delete Bank</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}