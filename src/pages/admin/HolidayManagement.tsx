
import { useState } from "react";
import { CalendarIcon, PlusCircle, Pencil, Trash2 } from "lucide-react";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "sonner";
import { Checkbox } from "@/components/ui/checkbox";

// Define the Holiday type
interface Holiday {
  id: string;
  name: string;
  date: Date;
  isRecurring: boolean; // Whether it occurs every year
}

export default function HolidayManagement() {
  const [holidays, setHolidays] = useState<Holiday[]>([
    {
      id: "1",
      name: "New Year's Day",
      date: new Date(2025, 0, 1),
      isRecurring: true,
    },
    {
      id: "2",
      name: "Independence Day",
      date: new Date(2025, 6, 4),
      isRecurring: true,
    },
    {
      id: "3",
      name: "Labor Day",
      date: new Date(2025, 8, 1),
      isRecurring: true,
    },
    {
      id: "4",
      name: "Thanksgiving Day",
      date: new Date(2025, 10, 27),
      isRecurring: true,
    },
    {
      id: "5",
      name: "Christmas Day",
      date: new Date(2025, 11, 25),
      isRecurring: true,
    },
  ]);

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [newHoliday, setNewHoliday] = useState<Partial<Holiday>>({
    name: "",
    date: new Date(),
    isRecurring: false,
  });
  const [selectedHoliday, setSelectedHoliday] = useState<Holiday | null>(null);

  // Function to add a new holiday
  const addHoliday = () => {
    if (!newHoliday.name || !newHoliday.date) {
      toast.error("Please fill in all required fields");
      return;
    }

    const holiday: Holiday = {
      id: Date.now().toString(),
      name: newHoliday.name,
      date: newHoliday.date as Date,
      isRecurring: newHoliday.isRecurring || false,
    };

    setHolidays([...holidays, holiday]);
    setNewHoliday({ name: "", date: new Date(), isRecurring: false });
    setIsAddDialogOpen(false);
    toast.success("Holiday added successfully");
  };

  // Function to update a holiday
  const updateHoliday = () => {
    if (!selectedHoliday) return;

    const updatedHolidays = holidays.map((holiday) =>
      holiday.id === selectedHoliday.id ? selectedHoliday : holiday
    );

    setHolidays(updatedHolidays);
    setIsEditDialogOpen(false);
    toast.success("Holiday updated successfully");
  };

  // Function to delete a holiday
  const deleteHoliday = () => {
    if (!selectedHoliday) return;

    const filteredHolidays = holidays.filter(
      (holiday) => holiday.id !== selectedHoliday.id
    );

    setHolidays(filteredHolidays);
    setIsDeleteDialogOpen(false);
    toast.success("Holiday deleted successfully");
  };

  // Handler for selecting a holiday to edit
  const handleEditClick = (holiday: Holiday) => {
    setSelectedHoliday(holiday);
    setIsEditDialogOpen(true);
  };

  // Handler for selecting a holiday to delete
  const handleDeleteClick = (holiday: Holiday) => {
    setSelectedHoliday(holiday);
    setIsDeleteDialogOpen(true);
  };

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Holiday Management</h1>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <PlusCircle className="h-4 w-4" />
              Add Holiday
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Holiday</DialogTitle>
              <DialogDescription>
                Create a new holiday for the company calendar.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Holiday Name</Label>
                <Input
                  id="name"
                  value={newHoliday.name}
                  onChange={(e) =>
                    setNewHoliday({ ...newHoliday, name: e.target.value })
                  }
                  placeholder="e.g., Independence Day"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="date">Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {newHoliday.date
                        ? format(newHoliday.date, "PPP")
                        : "Select a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={newHoliday.date}
                      onSelect={(date) =>
                        date && setNewHoliday({ ...newHoliday, date })
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="recurring"
                  checked={newHoliday.isRecurring}
                  onCheckedChange={(checked) =>
                    setNewHoliday({
                      ...newHoliday,
                      isRecurring: checked === true,
                    })
                  }
                />
                <Label htmlFor="recurring">Recurring Yearly</Label>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={addHoliday}>Add Holiday</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="bg-white rounded-lg shadow">
        <Table>
          <TableCaption>Company Holidays</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Holiday Name</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Recurring</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {holidays.map((holiday) => (
              <TableRow key={holiday.id}>
                <TableCell className="font-medium">{holiday.name}</TableCell>
                <TableCell>{format(holiday.date, "MMMM dd, yyyy")}</TableCell>
                <TableCell>{holiday.isRecurring ? "Yes" : "No"}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEditClick(holiday)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                      onClick={() => handleDeleteClick(holiday)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Holiday</DialogTitle>
            <DialogDescription>
              Update the holiday details.
            </DialogDescription>
          </DialogHeader>
          {selectedHoliday && (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-name">Holiday Name</Label>
                <Input
                  id="edit-name"
                  value={selectedHoliday.name}
                  onChange={(e) =>
                    setSelectedHoliday({
                      ...selectedHoliday,
                      name: e.target.value,
                    })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-date">Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {format(selectedHoliday.date, "PPP")}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={selectedHoliday.date}
                      onSelect={(date) =>
                        date &&
                        setSelectedHoliday({ ...selectedHoliday, date })
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="edit-recurring"
                  checked={selectedHoliday.isRecurring}
                  onCheckedChange={(checked) =>
                    setSelectedHoliday({
                      ...selectedHoliday,
                      isRecurring: checked === true,
                    })
                  }
                />
                <Label htmlFor="edit-recurring">Recurring Yearly</Label>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsEditDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={updateHoliday}>Update Holiday</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this holiday? This action cannot be
              undone.
            </DialogDescription>
          </DialogHeader>
          {selectedHoliday && (
            <div className="py-4">
              <p className="font-medium">{selectedHoliday.name}</p>
              <p className="text-sm text-gray-500">
                {format(selectedHoliday.date, "MMMM dd, yyyy")}
              </p>
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={deleteHoliday}>
              Delete Holiday
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
