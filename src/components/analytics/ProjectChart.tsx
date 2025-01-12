import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ProjectChartProps {
  title: string;
  data: any[];
  dataKey: string;
  fill: string;
  name: string;
  onClick: (data: any) => void;
}

export function ProjectChart({ 
  title, 
  data, 
  dataKey, 
  fill, 
  name,
  onClick 
}: ProjectChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart 
            data={data}
            onClick={(data) => {
              if (data && data.activePayload && data.activePayload.length > 0) {
                onClick(data.activePayload[0].payload);
              }
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar 
              dataKey={dataKey} 
              fill={fill} 
              name={name} 
              cursor="pointer" 
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}