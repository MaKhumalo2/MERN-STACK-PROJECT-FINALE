import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Target, TrendingDown, Calendar, Award } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

export default function GoalTracker() {
    const [showForm, setShowForm] = useState(false);
    const [targetAmount, setTargetAmount] = useState("");
    const [targetPeriod, setTargetPeriod] = useState("monthly");

    // Mock current goals
    const [goals, setGoals] = useState([
        {
            id: 1,
            type: "Weekly",
            target: 100,
            current: 124.5,
            period: "This Week",
            icon: Calendar,
            color: "text-primary",
        },
        {
            id: 2,
            type: "Monthly",
            target: 400,
            current: 487.2,
            period: "This Month",
            icon: Target,
            color: "text-secondary",
        },
    ]);

    const handleSetGoal = (e) => {
        e.preventDefault();
        if (!targetAmount || parseFloat(targetAmount) <= 0) {
            toast({
                title: "Invalid target",
                description: "Please enter a valid target amount.",
                variant: "destructive",
            });
            return;
        }

        toast({
            title: "Goal set!",
            description: `Your ${targetPeriod} carbon reduction target has been set.`,
        });
        setShowForm(false);
        setTargetAmount("");
    };

    const calculateProgress = (current, target) => {
        // Since we want to reduce emissions, lower is better
        // Progress = (1 - current/target) * 100, capped at 100
        const progress = Math.max(0, Math.min(100, ((target - current) / target) * 100 + 100));
        return progress;
    };

    const getProgressStatus = (current, target) => {
        const percentage = (current / target) * 100;
        if (percentage <= 80) return { status: "Excellent", color: "text-success", bgColor: "bg-success/10" };
        if (percentage <= 100) return { status: "On Track", color: "text-primary", bgColor: "bg-primary/10" };
        if (percentage <= 120) return { status: "Near Target", color: "text-warning", bgColor: "bg-warning/10" };
        return { status: "Over Target", color: "text-destructive", bgColor: "bg-destructive/10" };
    };

    return (
        <Card className="bg-card/80 backdrop-blur-sm border-border/50 shadow-soft">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle className="flex items-center gap-2">
                            <Target className="w-5 h-5 text-primary" />
                            Carbon Reduction Goals
                        </CardTitle>
                        <CardDescription>Set targets and track your progress</CardDescription>
                    </div>
                    <Button
                        onClick={() => setShowForm(!showForm)}
                        variant="outline"
                        size="sm"
                    >
                        {showForm ? "Cancel" : "New Goal"}
                    </Button>
                </div>
            </CardHeader>
            <CardContent className="space-y-6">
                {/* Goal Setting Form */}
                {showForm && (
                    <form onSubmit={handleSetGoal} className="p-4 rounded-lg bg-muted/30 space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="target-amount">Target CO₂ (kg)</Label>
                            <Input
                                id="target-amount"
                                type="number"
                                placeholder="Enter target amount"
                                value={targetAmount}
                                onChange={(e) => setTargetAmount(e.target.value)}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="target-period">Period</Label>
                            <select
                                id="target-period"
                                value={targetPeriod}
                                onChange={(e) => setTargetPeriod(e.target.value)}
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                            >
                                <option value="weekly">Weekly</option>
                                <option value="monthly">Monthly</option>
                                <option value="yearly">Yearly</option>
                            </select>
                        </div>
                        <Button type="submit" className="w-full">
                            Set Goal
                        </Button>
                    </form>
                )}

                {/* Active Goals */}
                <div className="space-y-4">
                    {goals.map((goal) => {
                        const progressValue = calculateProgress(goal.current, goal.target);
                        const status = getProgressStatus(goal.current, goal.target);
                        const Icon = goal.icon;
                        const difference = goal.target - goal.current;
                        const percentageOfTarget = ((goal.current / goal.target) * 100).toFixed(1);

                        return (
                            <div key={goal.id} className="space-y-3 p-4 rounded-lg bg-muted/20 border border-border/30">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <Icon className={`w-5 h-5 ${goal.color}`} />
                                        <div>
                                            <h4 className="font-semibold text-foreground">{goal.type} Goal</h4>
                                            <p className="text-sm text-muted-foreground">{goal.period}</p>
                                        </div>
                                    </div>
                                    <Badge className={`${status.bgColor} ${status.color} border-0`}>
                                        {status.status}
                                    </Badge>
                                </div>

                                <div className="space-y-2">
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-muted-foreground">Current: {goal.current} kg CO₂</span>
                                        <span className="font-semibold text-foreground">Target: {goal.target} kg CO₂</span>
                                    </div>
                                    <Progress
                                        value={100 - progressValue}
                                        className="h-3"
                                    />
                                    <div className="flex items-center justify-between">
                                        <p className="text-xs text-muted-foreground">
                                            {percentageOfTarget}% of target
                                        </p>
                                        {difference > 0 ? (
                                            <p className="text-xs text-success flex items-center gap-1">
                                                <TrendingDown className="w-3 h-3" />
                                                {Math.abs(difference).toFixed(1)} kg below target
                                            </p>
                                        ) : (
                                            <p className="text-xs text-destructive flex items-center gap-1">
                                                {Math.abs(difference).toFixed(1)} kg over target
                                            </p>
                                        )}
                                    </div>
                                </div>

                                {/* Mini achievements for this goal */}
                                {difference > 0 && (
                                    <div className="flex items-center gap-2 pt-2 border-t border-border/30">
                                        <Award className="w-4 h-4 text-accent" />
                                        <p className="text-xs text-muted-foreground">
                                            Great work! You're making a positive impact! 🌱
                                        </p>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* Overall Progress Summary */}
                <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-foreground">Overall Progress</p>
                            <p className="text-xs text-muted-foreground mt-1">
                                Keep up the momentum toward your eco goals
                            </p>
                        </div>
                        <div className="text-right">
                            <p className="text-2xl font-bold text-primary">
                                {goals.filter(g => g.current <= g.target).length}/{goals.length}
                            </p>
                            <p className="text-xs text-muted-foreground">Goals Met</p>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
