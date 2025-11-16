import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { TrendingDown, TrendingUp, ArrowRight } from "lucide-react";

const periodOptions = [
    { value: "this_week", label: "This Week" },
    { value: "last_week", label: "Last Week" },
    { value: "this_month", label: "This Month" },
    { value: "last_month", label: "Last Month" },
    { value: "last_3_months", label: "Last 3 Months" },
];

const generatePeriodData = (period) => {
    const baseValue = Math.random() * 200 + 150;
    const variance = Math.random() * 0.3 + 0.85;

    return {
        transport: baseValue * 0.4 * variance,
        energy: baseValue * 0.35 * variance,
        food: baseValue * 0.25 * variance,
    };
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

export default function ComparisonView() {
    const [periodA, setPeriodA] = useState("this_week");
    const [periodB, setPeriodB] = useState("last_week");
    const [comparisonData, setComparisonData] = useState(null);

    const handleCompare = () => {
        const dataA = generatePeriodData(periodA);
        const dataB = generatePeriodData(periodB);

        const totalA = dataA.transport + dataA.energy + dataA.food;
        const totalB = dataB.transport + dataB.energy + dataB.food;

        const chartData = [
            {
                name: periodOptions.find(p => p.value === periodA)?.label,
                transport: dataA.transport,
                energy: dataA.energy,
                food: dataA.food,
                total: totalA,
            },
            {
                name: periodOptions.find(p => p.value === periodB)?.label,
                transport: dataB.transport,
                energy: dataB.energy,
                food: dataB.food,
                total: totalB,
            },
        ];

        setComparisonData({
            chartData,
            totalA,
            totalB,
            difference: totalA - totalB,
            percentChange: ((totalA - totalB) / totalB) * 100,
            categoryChanges: {
                transport: ((dataA.transport - dataB.transport) / dataB.transport) * 100,
                energy: ((dataA.energy - dataB.energy) / dataB.energy) * 100,
                food: ((dataA.food - dataB.food) / dataB.food) * 100,
            }
        });
    };

    return (
        <Card className="bg-card/80 backdrop-blur-sm border-border/50 shadow-soft">
            <CardHeader>
                <CardTitle className="text-xl">Period Comparison</CardTitle>
                <CardDescription>Compare your emissions across different time periods</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                {/* Period Selectors */}
                <div className="grid md:grid-cols-3 gap-4 items-end">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-muted-foreground">Period A</label>
                        <Select value={periodA} onValueChange={setPeriodA}>
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                {periodOptions.map(option => (
                                    <SelectItem key={option.value} value={option.value}>
                                        {option.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="flex items-center justify-center">
                        <ArrowRight className="w-5 h-5 text-muted-foreground" />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-muted-foreground">Period B</label>
                        <Select value={periodB} onValueChange={setPeriodB}>
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                {periodOptions.map(option => (
                                    <SelectItem key={option.value} value={option.value}>
                                        {option.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <Button onClick={handleCompare} className="w-full md:w-auto">
                    Compare Periods
                </Button>

                {/* Comparison Results */}
                {comparisonData && (
                    <>
                        {/* Summary Stats */}
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            <div className="p-4 rounded-lg bg-primary/5 border border-primary/10">
                                <p className="text-sm text-muted-foreground mb-1">Period A Total</p>
                                <p className="text-2xl font-bold text-foreground">{comparisonData.totalA.toFixed(1)} kg</p>
                                <p className="text-xs text-muted-foreground mt-1">CO₂e</p>
                            </div>

                            <div className="p-4 rounded-lg bg-secondary/5 border border-secondary/10">
                                <p className="text-sm text-muted-foreground mb-1">Period B Total</p>
                                <p className="text-2xl font-bold text-foreground">{comparisonData.totalB.toFixed(1)} kg</p>
                                <p className="text-xs text-muted-foreground mt-1">CO₂e</p>
                            </div>

                            <div className={`p-4 rounded-lg ${comparisonData.difference < 0 ? 'bg-success/5 border-success/20' : 'bg-error/5 border-error/20'} border col-span-2 md:col-span-1`}>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                                    {comparisonData.difference < 0 ? <TrendingDown className="w-4 h-4" /> : <TrendingUp className="w-4 h-4" />}
                                    <span>Change</span>
                                </div>
                                <p className={`text-2xl font-bold ${comparisonData.difference < 0 ? 'text-success' : 'text-error'}`}>
                                    {comparisonData.difference > 0 ? '+' : ''}{comparisonData.difference.toFixed(1)} kg
                                </p>
                                <p className="text-xs text-muted-foreground mt-1">
                                    {comparisonData.percentChange > 0 ? '+' : ''}{comparisonData.percentChange.toFixed(1)}%
                                </p>
                            </div>
                        </div>

                        {/* Comparison Chart */}
                        <div className="h-[350px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={comparisonData.chartData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                                    <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                                    <Tooltip content={<CustomTooltip />} />
                                    <Legend />
                                    <Bar dataKey="transport" fill="hsl(var(--chart-1))" name="Transport" />
                                    <Bar dataKey="energy" fill="hsl(var(--chart-2))" name="Energy" />
                                    <Bar dataKey="food" fill="hsl(var(--chart-3))" name="Food" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>

                        {/* Category Breakdown */}
                        <div className="space-y-3">
                            <h4 className="font-semibold text-foreground">Category Changes</h4>
                            {Object.entries(comparisonData.categoryChanges).map(([category, change]) => (
                                <div key={category} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                                    <div className="flex items-center gap-2">
                                        {change < 0 ? (
                                            <TrendingDown className="w-4 h-4 text-success" />
                                        ) : (
                                            <TrendingUp className="w-4 h-4 text-error" />
                                        )}
                                        <span className="font-medium text-foreground capitalize">{category}</span>
                                    </div>
                                    <span className={`font-semibold ${change < 0 ? 'text-success' : 'text-error'}`}>
                                        {change > 0 ? '+' : ''}{change.toFixed(1)}%
                                    </span>
                                </div>
                            ))}
                        </div>

                        {/* Insights */}
                        <div className={`p-4 rounded-lg ${comparisonData.difference < 0 ? 'bg-success/5 border-success/20' : 'bg-warning/5 border-warning/20'} border`}>
                            <p className={`text-sm font-medium mb-1 ${comparisonData.difference < 0 ? 'text-success' : 'text-warning'}`}>
                                💡 Insight
                            </p>
                            <p className="text-sm text-foreground">
                                {comparisonData.difference < 0
                                    ? `Excellent progress! Your emissions decreased by ${Math.abs(comparisonData.difference).toFixed(1)} kg (${Math.abs(comparisonData.percentChange).toFixed(1)}%) compared to the previous period. Keep up the great work!`
                                    : `Your emissions increased by ${comparisonData.difference.toFixed(1)} kg (${comparisonData.percentChange.toFixed(1)}%). Focus on reducing ${Object.entries(comparisonData.categoryChanges).sort((a, b) => b[1] - a[1])[0][0]} to improve your footprint.`}
                            </p>
                        </div>
                    </>
                )}
            </CardContent>
        </Card>
    );
}
