import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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

const AnalyticsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [phaseFilter, setPhaseFilter] = useState("all");

  // In a real application, this would come from your database
  const projectData = [
    { name: "Project A", completion: 75, phase: "design" },
    { name: "Project B", completion: 30, phase: "analyze" },
    { name: "Project C", completion: 100, phase: "document" },
    { name: "Project D", completion: 50, phase: "develop" },
  ];

  const phaseData = [
    { phase: "Analyze", count: 5 },
    { phase: "Design", count: 8 },
    { phase: "Develop", count: 12 },
    { phase: "Implement", count: 6 },
    { phase: "Evaluate", count: 4 },
    { phase: "Document", count: 3 },
  ];

  const filteredProjects = projectData.filter(
    (project) =>
      project.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (phaseFilter === "all" || project.phase === phaseFilter)
  );

  return (
    <div className="space-y-8 p-6">
      <div className="flex flex-col md:flex-row gap-4 items-end">
        <div className="space-y-2 flex-1">
          <Label htmlFor="search">Search Projects</Label>
          <Input
            id="search"
            placeholder="Search by project name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="space-y-2 w-full md:w-48">
          <Label>Filter by Phase</Label>
          <Select
            value={phaseFilter}
            onValueChange={(value) => setPhaseFilter(value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select phase" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Phases</SelectItem>
              <SelectItem value="analyze">Analyze</SelectItem>
              <SelectItem value="design">Design</SelectItem>
              <SelectItem value="develop">Develop</SelectItem>
              <SelectItem value="implement">Implement</SelectItem>
              <SelectItem value="evaluate">Evaluate</SelectItem>
              <SelectItem value="document">Document</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Project Completion Rates</CardTitle>
          </CardHeader>
          <CardContent className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={filteredProjects}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="completion" fill="#8884d8" name="Completion %" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Projects by Phase</CardTitle>
          </CardHeader>
          <CardContent className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={phaseData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="phase" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#82ca9d" name="Number of Projects" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AnalyticsPage;