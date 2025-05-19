
import { Calendar } from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription 
} from "@/components/ui/card";

const ProfileJobTab = ({ userData }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Job Information</CardTitle>
        <CardDescription>
          Employment details and job information
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">
              Department
            </p>
            <p>{userData.department}</p>
          </div>
          
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">
              Designation
            </p>
            <p>{userData.designation}</p>
          </div>
          
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">
              Employment Type
            </p>
            <p>{userData.employmentType}</p>
          </div>
          
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">
              Reporting To
            </p>
            <p>{userData.reportingTo}</p>
          </div>
          
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">
              Work Location
            </p>
            <p>{userData.workLocation}</p>
          </div>
          
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">
              Join Date
            </p>
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-2 text-gray-500" />
              <p>{userData.joinDate}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileJobTab;
