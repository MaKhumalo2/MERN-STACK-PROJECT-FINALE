import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { TrendingDown, TrendingUp, Trophy, Medal, Award } from "lucide-react";

export default function Leaderboard() {
    // Mock leaderboard data
    const leaderboardData = [
        { rank: 1, name: "Sarah Chen", emissions: 89.2, change: -18, badges: 12, avatar: "SC" },
        { rank: 2, name: "Alex Kumar", emissions: 95.8, change: -15, badges: 10, avatar: "AK" },
        { rank: 3, name: "You", emissions: 124.5, change: -12, badges: 8, avatar: "ME", isCurrentUser: true },
        { rank: 4, name: "Jordan Smith", emissions: 132.7, change: -8, badges: 7, avatar: "JS" },
        { rank: 5, name: "Emma Wilson", emissions: 145.3, change: -10, badges: 9, avatar: "EW" },
        { rank: 6, name: "Marcus Lee", emissions: 158.9, change: +3, badges: 6, avatar: "ML" },
        { rank: 7, name: "Olivia Brown", emissions: 167.2, change: -5, badges: 5, avatar: "OB" },
    ];

    const getRankIcon = (rank) => {
        switch (rank) {
            case 1:
                return <Trophy className="w-5 h-5 text-yellow-500" />;
            case 2:
                return <Medal className="w-5 h-5 text-gray-400" />;
            case 3:
                return <Award className="w-5 h-5 text-amber-600" />;
            default:
                return <span className="text-muted-foreground font-semibold">#{rank}</span>;
        }
    };

    return (
        <Card className="bg-card/80 backdrop-blur-sm border-border/50 shadow-soft">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-primary" />
                    Community Leaderboard
                </CardTitle>
                <CardDescription>See how you rank against other eco-warriors this week</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-3">
                    {leaderboardData.map((user) => (
                        <div
                            key={user.rank}
                            className={`flex items-center justify-between p-4 rounded-lg transition-all ${user.isCurrentUser
                                    ? "bg-primary/10 border-2 border-primary/30"
                                    : "bg-muted/30 hover:bg-muted/50"
                                }`}
                        >
                            <div className="flex items-center gap-4 flex-1">
                                {/* Rank */}
                                <div className="w-8 flex items-center justify-center">
                                    {getRankIcon(user.rank)}
                                </div>

                                {/* Avatar */}
                                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-sm font-bold text-primary">
                                    {user.avatar}
                                </div>

                                {/* Name */}
                                <div className="flex-1">
                                    <p className={`font-semibold ${user.isCurrentUser ? "text-primary" : "text-foreground"}`}>
                                        {user.name}
                                    </p>
                                    <div className="flex items-center gap-2 mt-1">
                                        <Badge variant="outline" className="text-xs">
                                            {user.badges} badges
                                        </Badge>
                                    </div>
                                </div>

                                {/* Emissions */}
                                <div className="text-right">
                                    <p className="text-lg font-bold text-foreground">{user.emissions} kg</p>
                                    <div className="flex items-center gap-1 justify-end mt-1">
                                        {user.change < 0 ? (
                                            <>
                                                <TrendingDown className="w-3 h-3 text-success" />
                                                <span className="text-xs text-success">{user.change}%</span>
                                            </>
                                        ) : (
                                            <>
                                                <TrendingUp className="w-3 h-3 text-destructive" />
                                                <span className="text-xs text-destructive">+{user.change}%</span>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Summary Stats */}
                <div className="mt-6 pt-4 border-t border-border/50">
                    <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                            <p className="text-2xl font-bold text-primary">3rd</p>
                            <p className="text-xs text-muted-foreground">Your Rank</p>
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-foreground">-12%</p>
                            <p className="text-xs text-muted-foreground">This Week</p>
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-success">↑2</p>
                            <p className="text-xs text-muted-foreground">Positions</p>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
