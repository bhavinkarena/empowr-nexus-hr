
import { FileText, Download } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const PayslipList = () => {
  const payslips = [
    {
      id: 1,
      month: "March 2025",
      grossSalary: "5000.00",
      netSalary: "4200.00",
      status: "Paid",
    },
    {
      id: 2,
      month: "February 2025",
      grossSalary: "5000.00",
      netSalary: "4200.00",
      status: "Paid",
    },
    {
      id: 3,
      month: "January 2025",
      grossSalary: "5000.00",
      netSalary: "4200.00",
      status: "Paid",
    },
  ];

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">My Payslips</h1>
        <div className="flex gap-4">
          <Select defaultValue="2025">
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Year" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2025">2025</SelectItem>
              <SelectItem value="2024">2024</SelectItem>
            </SelectContent>
          </Select>
          <Input 
            type="search" 
            placeholder="Search payslips..." 
            className="w-64"
          />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {payslips.map((payslip) => (
          <Card key={payslip.id} className="bg-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-medium">
                {payslip.month}
              </CardTitle>
              <FileText className="h-5 w-5 text-hr-purple-300" />
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Gross Salary:</span>
                  <span className="font-medium">${payslip.grossSalary}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Net Salary:</span>
                  <span className="font-medium">${payslip.netSalary}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Status:</span>
                  <span className="text-green-500 font-medium">{payslip.status}</span>
                </div>
                <Button className="w-full mt-4" variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  Download PDF
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PayslipList;
