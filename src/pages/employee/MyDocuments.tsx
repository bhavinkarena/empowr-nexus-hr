
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Loader } from "@/components/ui/Loader";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { FileText, Download, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";

// Mock data for documents
const documents = [
  {
    id: 1,
    name: "Employment Contract",
    dateUploaded: "2023-05-12",
    type: "PDF",
    size: "1.2 MB",
    category: "Contracts",
  },
  {
    id: 2,
    name: "Tax Declaration Form",
    dateUploaded: "2023-06-18",
    type: "PDF",
    size: "0.8 MB",
    category: "Tax Documents",
  },
  {
    id: 3,
    name: "Performance Review 2023",
    dateUploaded: "2023-11-30",
    type: "PDF",
    size: "2.1 MB",
    category: "Reviews",
  },
  {
    id: 4,
    name: "Medical Insurance Card",
    dateUploaded: "2023-03-05",
    type: "JPG",
    size: "0.5 MB",
    category: "Benefits",
  },
  {
    id: 5,
    name: "Training Certificate",
    dateUploaded: "2023-09-22",
    type: "PDF",
    size: "1.4 MB",
    category: "Training",
  },
];

export default function MyDocuments() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  
  // Simulate loading for a better UX
  useState(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  });

  if (!user || loading) {
    return (
      <div className="flex items-center justify-center min-h-[35vh]">
        <Loader size={48} />
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">My Documents</h1>
        <Button className="bg-hr-purple-300 hover:bg-hr-purple-400">
          <FileText className="mr-2 h-4 w-4" />
          Upload New Document
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardContent className="p-6 flex items-center">
            <div className="h-12 w-12 rounded-lg bg-hr-purple-100 flex items-center justify-center mr-4">
              <FileText className="h-6 w-6 text-hr-purple-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Documents</p>
              <h3 className="text-2xl font-bold">{documents.length}</h3>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 flex items-center">
            <div className="h-12 w-12 rounded-lg bg-hr-green flex items-center justify-center mr-4">
              <FileText className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Recent Uploads</p>
              <h3 className="text-2xl font-bold">2</h3>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 flex items-center">
            <div className="h-12 w-12 rounded-lg bg-hr-yellow flex items-center justify-center mr-4">
              <FileText className="h-6 w-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Pending Signatures</p>
              <h3 className="text-2xl font-bold">1</h3>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Document Library</CardTitle>
          <CardDescription>
            Access and manage all your important documents
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Document Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Date Uploaded</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Size</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {documents.map((doc) => (
                <TableRow key={doc.id}>
                  <TableCell className="font-medium">{doc.name}</TableCell>
                  <TableCell>{doc.category}</TableCell>
                  <TableCell>{doc.dateUploaded}</TableCell>
                  <TableCell>{doc.type}</TableCell>
                  <TableCell>{doc.size}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Download className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          <div className="mt-4">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" isActive>1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">2</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
