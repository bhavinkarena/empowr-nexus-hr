
import React, { useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
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
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { Loader } from "@/components/ui/Loader";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Job {
  id: number;
  title: string;
  department: string;
  type: string;
  location: string;
  description: string;
  requirements: string;
  postedDate: string;
  status: "Active" | "Closed" | "Draft";
}

const JobManagement = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  
  // Sample job data
  const [jobs, setJobs] = useState<Job[]>([
    {
      id: 1,
      title: "Senior Frontend Developer",
      department: "Engineering",
      type: "Full-time",
      location: "Remote",
      description: "We are looking for a senior frontend developer with experience in React.",
      requirements: "5+ years of experience with React, TypeScript, and modern frontend tools.",
      postedDate: "2025-04-15",
      status: "Active",
    },
    {
      id: 2,
      title: "HR Manager",
      department: "Human Resources",
      type: "Full-time",
      location: "New York",
      description: "Manage HR operations and develop company policies.",
      requirements: "3+ years of HR management experience, knowledge of labor laws.",
      postedDate: "2025-04-10",
      status: "Active",
    },
  ]);

  // Empty job template for creating new jobs
  const emptyJob: Omit<Job, "id" | "postedDate"> = {
    title: "",
    department: "",
    type: "",
    location: "",
    description: "",
    requirements: "",
    status: "Draft",
  };

  const [newJob, setNewJob] = useState<Omit<Job, "id" | "postedDate">>(emptyJob);

  // Filter jobs based on search term
  const filteredJobs = jobs.filter(
    (job) =>
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle create job
  const handleCreateJob = () => {
    setIsSubmitting(true);
    
    setTimeout(() => {
      const today = new Date().toISOString().split("T")[0];
      const newJobItem: Job = {
        ...newJob,
        id: jobs.length > 0 ? Math.max(...jobs.map((j) => j.id)) + 1 : 1,
        postedDate: today,
      };
      
      setJobs([...jobs, newJobItem]);
      setNewJob(emptyJob);
      
      setIsSubmitting(false);
      
      toast({
        title: "Job Created",
        description: "The job has been successfully created.",
      });
    }, 500);
  };

  // Handle update job
  const handleUpdateJob = () => {
    if (!selectedJob) return;
    
    setIsSubmitting(true);
    
    setTimeout(() => {
      const updatedJobs = jobs.map((job) =>
        job.id === selectedJob.id ? selectedJob : job
      );
      
      setJobs(updatedJobs);
      setSelectedJob(null);
      
      setIsSubmitting(false);
      
      toast({
        title: "Job Updated",
        description: "The job has been successfully updated.",
      });
    }, 500);
  };

  // Handle delete job
  const handleDeleteJob = () => {
    if (!selectedJob) return;
    
    setIsSubmitting(true);
    
    setTimeout(() => {
      const filteredJobs = jobs.filter((job) => job.id !== selectedJob.id);
      
      setJobs(filteredJobs);
      setSelectedJob(null);
      setIsDeleteDialogOpen(false);
      
      setIsSubmitting(false);
      
      toast({
        title: "Job Deleted",
        description: "The job has been successfully deleted.",
        variant: "destructive",
      });
    }, 500);
  };

  // Simulate initial loading
  React.useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 800);
  }, []);

  if (isLoading) {
    return <Loader variant="circle" size={40} fullScreen text="Loading jobs..." />;
  }

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Job Management</h1>
        <div className="flex gap-4">
          <Input
            type="search"
            placeholder="Search jobs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-64"
          />
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Create New Job
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Create New Job</DialogTitle>
                <DialogDescription>
                  Add a new job posting to the recruitment platform.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Job Title</Label>
                    <Input
                      id="title"
                      value={newJob.title}
                      onChange={(e) =>
                        setNewJob({ ...newJob, title: e.target.value })
                      }
                      placeholder="e.g. Senior Developer"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="department">Department</Label>
                    <Input
                      id="department"
                      value={newJob.department}
                      onChange={(e) =>
                        setNewJob({ ...newJob, department: e.target.value })
                      }
                      placeholder="e.g. Engineering"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="type">Job Type</Label>
                    <Select
                      value={newJob.type}
                      onValueChange={(value) =>
                        setNewJob({ ...newJob, type: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select job type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Full-time">Full-time</SelectItem>
                        <SelectItem value="Part-time">Part-time</SelectItem>
                        <SelectItem value="Contract">Contract</SelectItem>
                        <SelectItem value="Internship">Internship</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={newJob.location}
                      onChange={(e) =>
                        setNewJob({ ...newJob, location: e.target.value })
                      }
                      placeholder="e.g. Remote, New York"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Job Description</Label>
                  <Textarea
                    id="description"
                    value={newJob.description}
                    onChange={(e) =>
                      setNewJob({ ...newJob, description: e.target.value })
                    }
                    placeholder="Enter job description..."
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="requirements">Requirements</Label>
                  <Textarea
                    id="requirements"
                    value={newJob.requirements}
                    onChange={(e) =>
                      setNewJob({ ...newJob, requirements: e.target.value })
                    }
                    placeholder="Enter job requirements..."
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select
                    value={newJob.status}
                    onValueChange={(value: "Active" | "Closed" | "Draft") =>
                      setNewJob({ ...newJob, status: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="Closed">Closed</SelectItem>
                      <SelectItem value="Draft">Draft</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button 
                  onClick={handleCreateJob} 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <Loader variant="spinner" size={16} />
                  ) : (
                    "Create Job"
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle>Available Jobs</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Job Title</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Posted Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredJobs.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-6 text-muted-foreground">
                    No jobs found. Create a new job to get started.
                  </TableCell>
                </TableRow>
              ) : (
                filteredJobs.map((job) => (
                  <TableRow key={job.id}>
                    <TableCell className="font-medium">{job.title}</TableCell>
                    <TableCell>{job.department}</TableCell>
                    <TableCell>{job.type}</TableCell>
                    <TableCell>{job.location}</TableCell>
                    <TableCell>{job.postedDate}</TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          job.status === "Active"
                            ? "bg-green-100 text-green-800"
                            : job.status === "Closed"
                            ? "bg-gray-100 text-gray-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {job.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setSelectedJob(job)}
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[600px]">
                            <DialogHeader>
                              <DialogTitle>Edit Job</DialogTitle>
                              <DialogDescription>
                                Update job posting details.
                              </DialogDescription>
                            </DialogHeader>
                            {selectedJob && (
                              <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-2 gap-4">
                                  <div className="space-y-2">
                                    <Label htmlFor="edit-title">Job Title</Label>
                                    <Input
                                      id="edit-title"
                                      value={selectedJob.title}
                                      onChange={(e) =>
                                        setSelectedJob({
                                          ...selectedJob,
                                          title: e.target.value,
                                        })
                                      }
                                    />
                                  </div>
                                  <div className="space-y-2">
                                    <Label htmlFor="edit-department">Department</Label>
                                    <Input
                                      id="edit-department"
                                      value={selectedJob.department}
                                      onChange={(e) =>
                                        setSelectedJob({
                                          ...selectedJob,
                                          department: e.target.value,
                                        })
                                      }
                                    />
                                  </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                  <div className="space-y-2">
                                    <Label htmlFor="edit-type">Job Type</Label>
                                    <Select
                                      value={selectedJob.type}
                                      onValueChange={(value) =>
                                        setSelectedJob({
                                          ...selectedJob,
                                          type: value,
                                        })
                                      }
                                    >
                                      <SelectTrigger>
                                        <SelectValue placeholder="Select job type" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="Full-time">Full-time</SelectItem>
                                        <SelectItem value="Part-time">Part-time</SelectItem>
                                        <SelectItem value="Contract">Contract</SelectItem>
                                        <SelectItem value="Internship">Internship</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                  <div className="space-y-2">
                                    <Label htmlFor="edit-location">Location</Label>
                                    <Input
                                      id="edit-location"
                                      value={selectedJob.location}
                                      onChange={(e) =>
                                        setSelectedJob({
                                          ...selectedJob,
                                          location: e.target.value,
                                        })
                                      }
                                    />
                                  </div>
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="edit-description">Job Description</Label>
                                  <Textarea
                                    id="edit-description"
                                    value={selectedJob.description}
                                    onChange={(e) =>
                                      setSelectedJob({
                                        ...selectedJob,
                                        description: e.target.value,
                                      })
                                    }
                                    rows={3}
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="edit-requirements">Requirements</Label>
                                  <Textarea
                                    id="edit-requirements"
                                    value={selectedJob.requirements}
                                    onChange={(e) =>
                                      setSelectedJob({
                                        ...selectedJob,
                                        requirements: e.target.value,
                                      })
                                    }
                                    rows={3}
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="edit-status">Status</Label>
                                  <Select
                                    value={selectedJob.status}
                                    onValueChange={(value: "Active" | "Closed" | "Draft") =>
                                      setSelectedJob({
                                        ...selectedJob,
                                        status: value,
                                      })
                                    }
                                  >
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="Active">Active</SelectItem>
                                      <SelectItem value="Closed">Closed</SelectItem>
                                      <SelectItem value="Draft">Draft</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                              </div>
                            )}
                            <DialogFooter>
                              <DialogClose asChild>
                                <Button variant="outline">Cancel</Button>
                              </DialogClose>
                              <Button 
                                onClick={handleUpdateJob} 
                                disabled={isSubmitting}
                              >
                                {isSubmitting ? (
                                  <Loader variant="spinner" size={16} />
                                ) : (
                                  "Save Changes"
                                )}
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setSelectedJob(job);
                            setIsDeleteDialogOpen(true);
                          }}
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the job posting "{selectedJob?.title}". This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 hover:bg-red-700"
              onClick={handleDeleteJob}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <Loader variant="spinner" size={16} />
              ) : (
                "Delete"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default JobManagement;
