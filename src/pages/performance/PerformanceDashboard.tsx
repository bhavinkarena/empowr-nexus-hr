
import { ChartLine, Star, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const PerformanceDashboard = () => {
  const performanceMetrics = {
    rating: 4.5,
    goals: 8,
    goalsCompleted: 6,
    skillsGrowing: ["Communication", "Leadership", "Problem Solving"],
    lastReviewDate: "March 15, 2025",
  };

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Performance Dashboard</h1>
        <Select defaultValue="2025">
          <SelectTrigger className="w-32">
            <SelectValue placeholder="Year" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="2025">2025</SelectItem>
            <SelectItem value="2024">2024</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Overall Rating
            </CardTitle>
            <Star className="h-5 w-5 text-yellow-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{performanceMetrics.rating}/5.0</div>
            <p className="text-xs text-gray-500">Last updated: {performanceMetrics.lastReviewDate}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Goals Progress
            </CardTitle>
            <TrendingUp className="h-5 w-5 text-hr-purple-300" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {performanceMetrics.goalsCompleted}/{performanceMetrics.goals}
            </div>
            <p className="text-xs text-gray-500">Goals completed this year</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Skills Growing
            </CardTitle>
            <ChartLine className="h-5 w-5 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {performanceMetrics.skillsGrowing.map((skill) => (
                <span
                  key={skill}
                  className="inline-flex items-center rounded-full bg-hr-purple-300/10 px-2.5 py-0.5 text-xs font-medium text-hr-purple-300"
                >
                  {skill}
                </span>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PerformanceDashboard;
