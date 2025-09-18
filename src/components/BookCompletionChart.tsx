import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface BookCompletionData {
  name: string;
  value: number;
  color: string;
}

interface BookCompletionChartProps {
  role: string;
}

export const BookCompletionChart = ({ role }: BookCompletionChartProps) => {
  const getChartData = (): BookCompletionData[] => {
    switch (role) {
      case "admin":
        return [
          { name: "Completed Returns", value: 342, color: "hsl(var(--library-sage))" },
          { name: "Pending Returns", value: 89, color: "hsl(var(--library-gold))" },
          { name: "Overdue Books", value: 127, color: "hsl(var(--destructive))" },
          { name: "Active Loans", value: 1289, color: "hsl(var(--library-burgundy))" }
        ];
      case "librarian":
        return [
          { name: "Books Issued", value: 342, color: "hsl(var(--library-burgundy))" },
          { name: "Returns Processed", value: 67, color: "hsl(var(--library-sage))" },
          { name: "Due Today", value: 28, color: "hsl(var(--library-gold))" },
          { name: "Overdue", value: 15, color: "hsl(var(--destructive))" }
        ];
      default:
        return [
          { name: "Books Read", value: 8, color: "hsl(var(--library-sage))" },
          { name: "Currently Reading", value: 3, color: "hsl(var(--library-gold))" },
          { name: "Overdue", value: 1, color: "hsl(var(--destructive))" },
          { name: "Reserved", value: 2, color: "hsl(var(--library-burgundy))" }
        ];
    }
  };

  const data = getChartData();
  const total = data.reduce((sum, item) => sum + item.value, 0);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0];
      const percentage = ((data.value / total) * 100).toFixed(1);
      return (
        <div className="bg-card border border-library-cream rounded-lg p-3 shadow-elegant">
          <p className="font-medium">{data.name}</p>
          <p className="text-sm text-muted-foreground">
            Count: {data.value} ({percentage}%)
          </p>
        </div>
      );
    }
    return null;
  };

  const getTitle = () => {
    switch (role) {
      case "admin":
        return "Library Overview";
      case "librarian":
        return "Daily Activities";
      default:
        return "My Reading Progress";
    }
  };

  const getDescription = () => {
    switch (role) {
      case "admin":
        return "Complete breakdown of library operations";
      case "librarian":
        return "Today's book management activities";
      default:
        return "Your personal reading statistics";
    }
  };

  return (
    <Card className="shadow-elegant border-library-cream">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {getTitle()}
        </CardTitle>
        <CardDescription>
          {getDescription()}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={120}
                paddingAngle={2}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                verticalAlign="bottom" 
                height={36}
                formatter={(value, entry) => (
                  <span style={{ color: entry.color }}>{value}</span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
          {data.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: item.color }}
              />
              <span className="text-muted-foreground">{item.name}:</span>
              <span className="font-medium">{item.value}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};