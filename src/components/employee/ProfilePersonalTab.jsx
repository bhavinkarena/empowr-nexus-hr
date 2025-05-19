
import { MapPin } from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription 
} from "@/components/ui/card";

const ProfilePersonalTab = ({ userData }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Personal Information</CardTitle>
        <CardDescription>
          Personal contact details and information
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">
              Personal Email
            </p>
            <p>{userData.personalEmail}</p>
          </div>
          
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">
              Emergency Contact
            </p>
            <p>{userData.emergencyContact}</p>
          </div>
          
          <div className="space-y-1 col-span-1 md:col-span-2">
            <p className="text-sm font-medium text-muted-foreground">
              Residential Address
            </p>
            <div className="flex items-start">
              <MapPin className="h-4 w-4 mt-1 mr-2 text-gray-500" />
              <p>{userData.address}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfilePersonalTab;
