
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription 
} from "@/components/ui/card";

const ProfileFinancialTab = ({ userData }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Financial Information</CardTitle>
        <CardDescription>
          Banking and financial details
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">
              Bank Name
            </p>
            <p>{userData.bankName}</p>
          </div>
          
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">
              Account Number
            </p>
            <p>{userData.accountNumber}</p>
          </div>
          
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">
              PAN Number
            </p>
            <p>{userData.panNumber}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileFinancialTab;
