import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { TrendingDown, TrendingUp, Leaf } from "lucide-react";

const generateMockData = (view) => {
  const now = new Date();
  
  if (view === "daily") {
    return Array.from({ length: 24 }, (_, i) => ({
      name: `${i}:00`,
      co2: Math.random() * 15 + 5,
      transport: Math.random() * 8 + 2,
      energy: Math.random() * 5 + 1,
      food: Math.random() * 4 + 1,
    }));
  } else if (view === "weekly") {
    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    return days.map((day) => ({
      name: day,
      co2: Math.random() * 40 + 20,
      transport: Math.random() * 20 + 5,
      energy: Math.random() * 15 + 5,
      food: Math.random() * 10 + 3,
    }));
  } else {
    return Array.from({ length: 30 }, (_, i) => {
      const date = new Date(now);
      date.setDate(date.getDate() - (29 - i));
      return {
        name: date.getDate().toString(),
        co2: Math.random() * 50 + 25,
        transport: Math.random() * 25 + 8,
        energy: Math.random() * 18 + 7,
        food: Math.random() * 12 + 5,
      };
    });
  }
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card border border-border rounded-lg p-3 shadow-medium">
        <p className="font-semibold text-foreground mb-2">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {entry.name}: {entry.value.toFixed(1)} kg CO₂e
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function EmissionsChart() {
  const [view, setView] = useState("weekly");
  const [chartType, setChartType] = useState("area");
  const data = generateMockData(view);

  const total = data.reduce((sum, d) => sum + d.co2, 0);
  const average = total / data.length;
  const trend = data[data.length - 1].co2 - data[0].co2;

  return (
    <Card className="bg-card/80 backdrop-blur-sm border-border/50 shadow-soft">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl">Carbon Footprint Overview</CardTitle>
            <CardDescription>Track your emissions over time</CardDescription>
          </div>
          <Tabs value={view} onValueChange={setView}>
            <TabsList>
              <TabsTrigger value="daily">Daily</TabsTrigger>
              <TabsTrigger value="weekly">Weekly</TabsTrigger>
              <TabsTrigger value="monthly">Monthly</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-4">
          <div className="p-4 rounded-lg bg-primary/5 border border-primary/10">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
              <Leaf className="w-4 h-4" />
              <span>Total</span>
            </div>
            <p className="text-2xl font-bold text-foreground">{total.toFixed(1)} kg</p>
            <p className="text-xs text-muted-foreground mt-1">CO₂e</p>
          </div>
          <div className="p-4 rounded-lg bg-secondary/5 border border-secondary/10">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
              <TrendingDown className="w-4 h-4" />
              <span>Average</span>
            </div>
            <p className="text-2xl font-bold text-foreground">{average.toFixed(1)} kg</p>
            <p className="text-xs text-muted-foreground mt-1">per {view === "daily" ? "hour" : "day"}</p>
          </div>
          <div className="p-4 rounded-lg bg-accent/5 border border-accent/10">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
              {trend < 0 ? <TrendingDown className="w-4 h-4" /> : <TrendingUp className="w-4 h-4" />}
              <span>Trend</span>
            </div>
            <p className={`text-2xl font-bold ${trend < 0 ? "text-success" : "text-error"}`}>
              {trend > 0 ? "+" : ""}{trend.toFixed(1)} kg
            </p>
            <p className="text-xs text-muted-foreground mt-1">{trend < 0 ? "Improving" : "Increasing"}</p>
          </div>
        </div>

        {/* Chart Type Toggle */}
        <div className="flex gap-2">
          <Button
            variant={chartType === "area" ? "default" : "outline"}
            size="sm"
            onClick={() => setChartType("area")}
          >
            Area
          </Button>
          <Button
            variant={chartType === "bar" ? "default" : "outline"}
            size="sm"
            onClick={() => setChartType("bar")}
          >
            Bar
          </Button>
        </div>

        {/* Chart */}
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            {chartType === "area" ? (
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorCo2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="co2"
                  stroke="hsl(var(--primary))"
                  fillOpacity={1}
                  fill="url(#colorCo2)"
                  name="Total CO₂e"
                />
                <Area
                  type="monotone"
                  dataKey="transport"
                  stroke="hsl(var(--chart-1))"
                  fillOpacity={0.6}
                  fill="hsl(var(--chart-1))"
                  name="Transport"
                />
                <Area
                  type="monotone"
                  dataKey="energy"
                  stroke="hsl(var(--chart-2))"
                  fillOpacity={0.6}
                  fill="hsl(var(--chart-2))"
                  name="Energy"
                />
                <Area
                  type="monotone"
                  dataKey="food"
                  stroke="hsl(var(--chart-3))"
                  fillOpacity={0.6}
                  fill="hsl(var(--chart-3))"
                  name="Food"
                />
              </AreaChart>
            ) : (
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar dataKey="transport" stackId="a" fill="hsl(var(--chart-1))" name="Transport" />
                <Bar dataKey="energy" stackId="a" fill="hsl(var(--chart-2))" name="Energy" />
                <Bar dataKey="food" stackId="a" fill="hsl(var(--chart-3))" name="Food" />
              </BarChart>
            )}
          </ResponsiveContainer>
        </div>

        {/* Insights */}
        <div className="p-4 rounded-lg bg-success/5 border border-success/20">
          <p className="text-sm font-medium text-success mb-1">💡 Insight</p>
          <p className="text-sm text-foreground">
            {trend < 0
              ? `Great job! Your emissions are down ${Math.abs(trend).toFixed(1)} kg compared to the start of the period.`
              : `Your emissions increased by ${trend.toFixed(1)} kg. Consider using public transport or reducing energy consumption.`}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
