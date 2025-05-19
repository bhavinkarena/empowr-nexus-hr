
import { useState } from 'react';
import { FileText, UploadCloud } from "lucide-react";
import { useForm } from "react-hook-form";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";

// Document types for the dropdown
const DOCUMENT_TYPES = [
  { id: "resume", name: "Resume" },
  { id: "idProof", name: "ID Proof" },
  { id: "joiningLetter", name: "Joining Letter" },
  { id: "certificate", name: "Certificate" },
  { id: "other", name: "Other" }
];

const ProfileDocumentsTab = ({ documents }) => {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  
  // Form for document upload
  const form = useForm({
    defaultValues: {
      documentType: "",
      document: null
    }
  });
  
  const handleDocumentUpload = (data) => {
    // In a real implementation, we would upload the document to a server
    console.log("Document upload data:", data);
    
    // Add the document to the list (in a real app, this would come from the server response)
    const newDocument = {
      name: DOCUMENT_TYPES.find(type => type.id === data.documentType)?.name || "Document",
      url: "#",
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    };
    
    // Close the modal
    setIsUploadModalOpen(false);
    
    // Reset the form
    form.reset();
    
    // Show success message
    toast({
      title: "Document Uploaded",
      description: `${newDocument.name} has been uploaded successfully.`,
    });
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Documents</CardTitle>
          <CardDescription>
            Your documents and certificates
          </CardDescription>
        </div>
        <Dialog open={isUploadModalOpen} onOpenChange={setIsUploadModalOpen}>
          <DialogTrigger asChild>
            <Button variant="outline">
              <UploadCloud className="mr-2 h-4 w-4" /> Upload Document
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Upload Document</DialogTitle>
              <DialogDescription>
                Upload a new document to your profile. Supported formats: PDF, DOC, DOCX, JPG, PNG.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={form.handleSubmit(handleDocumentUpload)} className="space-y-6">
              <div className="space-y-4 py-2">
                <div className="space-y-2">
                  <Label htmlFor="documentType">Document Type</Label>
                  <Select
                    onValueChange={(value) => form.setValue("documentType", value)}
                    defaultValue={form.getValues("documentType")}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select document type" />
                    </SelectTrigger>
                    <SelectContent>
                      {DOCUMENT_TYPES.map((type) => (
                        <SelectItem key={type.id} value={type.id}>
                          {type.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="document">Document</Label>
                  <div className="border border-dashed border-gray-300 rounded-md p-6 text-center cursor-pointer hover:bg-gray-50 transition-colors">
                    <UploadCloud className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                    <p className="text-sm mb-2">Drag and drop your file here, or click to browse</p>
                    <p className="text-xs text-muted-foreground">Maximum file size: 10MB</p>
                    <Input
                      id="document"
                      type="file"
                      className="hidden"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          form.setValue("document", e.target.files[0]);
                        }
                      }}
                    />
                  </div>
                </div>
              </div>
              <DialogFooter className="flex justify-end gap-3">
                <Button variant="outline" onClick={() => setIsUploadModalOpen(false)}>
                  Cancel
                </Button>
                <Button 
                  type="submit"
                  className="bg-hr-purple-300 hover:bg-hr-purple-400"
                >
                  Upload Document
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {documents.map((doc, index) => (
            <div 
              key={index}
              className="flex items-center justify-between p-4 border rounded-md hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center">
                <FileText className="h-5 w-5 mr-3 text-hr-purple-300" />
                <div>
                  <p className="font-medium">{doc.name}</p>
                  <p className="text-xs text-muted-foreground">Uploaded on {doc.date}</p>
                </div>
              </div>
              <Button variant="ghost" size="sm">
                View
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileDocumentsTab;
