import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Leaf, TrendingDown, Award, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";
import EmissionsChart from "@/components/EmissionsChart";

export default function Dashboard() {
  const navigate = useNavigate();
  const [activityType, setActivityType] = useState("");
  const [amount, setAmount] = useState("");

  const handleLogActivity = (e) => {
    e.preventDefault();
    toast({
      title: "Activity logged!",
      description: `${activityType} activity has been recorded.`,
    });
    setActivityType("");
    setAmount("");
  };

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary-light/5 to-secondary/10">
      {/* Header */}
      <header className="bg-card/80 backdrop-blur-sm border-b border-border/50 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Leaf className="w-8 h-8 text-primary" />
            <h1 className="text-2xl font-bold text-foreground">EcoTrack</h1>
          </div>
          <Button onClick={handleLogout} variant="ghost" size="sm">
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Welcome Section */}
        <div>
          <h2 className="text-3xl font-bold text-foreground mb-2">Welcome back!</h2>
          <p className="text-muted-foreground">Here's your environmental impact summary</p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="bg-card/80 backdrop-blur-sm border-border/50 shadow-soft">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">This Week</CardTitle>
              <TrendingDown className="w-4 h-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">124.5 kg</div>
              <p className="text-xs text-success mt-1">↓ 12% from last week</p>
            </CardContent>
          </Card>

          <Card className="bg-card/80 backdrop-blur-sm border-border/50 shadow-soft">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Monthly Average</CardTitle>
              <TrendingDown className="w-4 h-4 text-secondary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">487.2 kg</div>
              <p className="text-xs text-muted-foreground mt-1">CO₂ equivalent</p>
            </CardContent>
          </Card>

          <Card className="bg-card/80 backdrop-blur-sm border-border/50 shadow-soft">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Achievements</CardTitle>
              <Award className="w-4 h-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">8 Badges</div>
              <p className="text-xs text-muted-foreground mt-1">Keep it up!</p>
            </CardContent>
          </Card>
        </div>

        {/* Emissions Chart */}
        <EmissionsChart />

        {/* Activity Logger & Recent Activity */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Log Activity Form */}
          <Card className="bg-card/80 backdrop-blur-sm border-border/50 shadow-soft">
            <CardHeader>
              <CardTitle>Log Activity</CardTitle>
              <CardDescription>Track your carbon emissions from daily activities</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogActivity} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="activity-type">Activity Type</Label>
                  <Select value={activityType} onValueChange={setActivityType} required>
                    <SelectTrigger id="activity-type">
                      <SelectValue placeholder="Select activity type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="car">Car Travel (km)</SelectItem>
                      <SelectItem value="bus">Bus Travel (km)</SelectItem>
                      <SelectItem value="electricity">Electricity (kWh)</SelectItem>
                      <SelectItem value="beef">Beef Meal</SelectItem>
                      <SelectItem value="flight">Flight (km)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="amount">Amount</Label>
                  <Input
                    id="amount"
                    type="number"
                    placeholder="Enter amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="w-full">
                  Log Activity
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="bg-card/80 backdrop-blur-sm border-border/50 shadow-soft">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Your latest logged emissions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { activity: "Car Travel", amount: "25 km", co2: "4.5 kg CO₂", time: "2 hours ago" },
                  { activity: "Electricity", amount: "15 kWh", co2: "13.8 kg CO₂", time: "5 hours ago" },
                  { activity: "Beef Meal", amount: "1 meal", co2: "27 kg CO₂", time: "Yesterday" },
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                    <div>
                      <p className="font-medium text-foreground">{item.activity}</p>
                      <p className="text-sm text-muted-foreground">{item.amount}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-primary">{item.co2}</p>
                      <p className="text-xs text-muted-foreground">{item.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Badges Section */}
        <Card className="bg-card/80 backdrop-blur-sm border-border/50 shadow-soft">
          <CardHeader>
            <CardTitle>Your Achievements</CardTitle>
            <CardDescription>Badges earned for reducing your carbon footprint</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { name: "First Step", icon: "🌱", earned: true },
                { name: "Week Warrior", icon: "⚡", earned: true },
                { name: "Month Master", icon: "🏆", earned: true },
                { name: "Eco Champion", icon: "🌍", earned: false },
              ].map((badge, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg text-center ${
                    badge.earned ? "bg-success/10 border border-success/20" : "bg-muted/20 border border-border/30 opacity-50"
                  }`}
                >
                  <div className="text-4xl mb-2">{badge.icon}</div>
                  <p className={`text-sm font-medium ${badge.earned ? "text-foreground" : "text-muted-foreground"}`}>
                    {badge.name}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
