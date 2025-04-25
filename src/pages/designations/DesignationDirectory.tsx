
import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, Search } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "@/hooks/use-toast";

// Mock data for designations
const DESIGNATIONS = [
  {
    id: "1",
    title: "Software Engineer",
    department: "Engineering",
    level: "L3",
    description: "Develops and maintains software applications",
    employeeCount: 25,
  },
  {
    id: "2",
    title: "Marketing Manager",
    department: "Marketing",
    level: "L4",
    description: "Manages marketing campaigns and strategy",
    employeeCount: 5,
  },
  {
    id: "3",
    title: "HR Specialist",
    department: "Human Resources",
    level: "L3",
    description: "Handles employee relations and recruitment",
    employeeCount: 3,
  },
];

const designationFormSchema = z.object({
  title: z.string().min(2, { message: "Title must be at least 2 characters" }),
  department: z.string().min(2, { message: "Department is required" }),
  level: z.string().min(1, { message: "Level is required" }),
  description: z.string().min(10, { message: "Description must be at least 10 characters" }),
});

type DesignationFormValues = z.infer<typeof designationFormSchema>;

export default function DesignationDirectory() {
  const [designations, setDesignations] = useState(DESIGNATIONS);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const form = useForm<DesignationFormValues>({
    resolver: zodResolver(designationFormSchema),
    defaultValues: {
      title: "",
      department: "",
      level: "",
      description: "",
    },
  });

  const onSubmit = (data: DesignationFormValues) => {
    const newDesignation = {
      id: (designations.length + 1).toString(),
      title: data.title,
      department: data.department,
      level: data.level,
      description: data.description,
      employeeCount: 0,
    };

    setDesignations([...designations, newDesignation]);
    toast({
      title: "Designation created",
      description: `${data.title} has been added successfully.`,
    });
    setIsAddDialogOpen(false);
    form.reset();
  };

  const filteredDesignations = designations.filter((designation) =>
    designation.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Designation Directory</h1>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-hr-purple-300 hover:bg-hr-purple-400">
              <Plus className="mr-2 h-4 w-4" /> Add Designation
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Designation</DialogTitle>
              <DialogDescription>
                Fill in the designation details. All fields are required.
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. Software Engineer" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="department"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Department</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. Engineering" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="level"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Level</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. L3" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Input placeholder="Brief description of the designation" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" className="bg-hr-purple-300 hover:bg-hr-purple-400">
                    Add Designation
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Designations</CardTitle>
          <CardDescription>
            Manage and view all job designations in the organization
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search designations..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Level</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Employees</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDesignations.map((designation) => (
                  <TableRow key={designation.id}>
                    <TableCell className="font-medium">{designation.title}</TableCell>
                    <TableCell>{designation.department}</TableCell>
                    <TableCell>{designation.level}</TableCell>
                    <TableCell>{designation.description}</TableCell>
                    <TableCell>{designation.employeeCount}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
