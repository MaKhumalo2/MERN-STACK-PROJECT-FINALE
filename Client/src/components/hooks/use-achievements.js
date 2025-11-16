import { useEffect, useState } from "react";
import { toast } from "@/components/ui/use-toast";
import { Trophy, Award, TrendingDown, Target, Flame } from "lucide-react";

// Achievement definitions
const ACHIEVEMENTS = {
  FIRST_GOAL: {
    id: "first_goal",
    title: "Goal Setter",
    description: "Set your first carbon reduction goal",
    icon: Target,
  },
  WEEK_REDUCTION: {
    id: "week_reduction",
    title: "Week Warrior",
    description: "Reduced emissions by 10% in a week",
    icon: TrendingDown,
  },
  BADGE_COLLECTOR: {
    id: "badge_collector",
    title: "Badge Collector",
    description: "Earned 5 badges",
    icon: Award,
  },
  LEADERBOARD_TOP3: {
    id: "leaderboard_top3",
    title: "Top 3 Climber",
    description: "Reached top 3 on the leaderboard",
    icon: Trophy,
  },
  STREAK_7: {
    id: "streak_7",
    title: "Week Streak",
    description: "7 days of consistent tracking",
    icon: Flame,
  },
  MILESTONE_100: {
    id: "milestone_100",
    title: "Century Saver",
    description: "Saved 100kg of CO₂",
    icon: Award,
  },
};

export function useAchievements() {
  const [unlockedAchievements, setUnlockedAchievements] = useState(() => {
    const stored = localStorage.getItem("achievements");
    return stored ? JSON.parse(stored) : [];
  });

  // Save to localStorage whenever achievements change
  useEffect(() => {
    localStorage.setItem("achievements", JSON.stringify(unlockedAchievements));
  }, [unlockedAchievements]);

  const unlockAchievement = (achievementKey) => {
    const achievement = ACHIEVEMENTS[achievementKey];
    
    if (!achievement) return;
    
    // Check if already unlocked
    if (unlockedAchievements.includes(achievement.id)) return;

    // Add to unlocked list
    setUnlockedAchievements(prev => [...prev, achievement.id]);

    // Show toast notification
    const Icon = achievement.icon;
    toast({
      title: (
        <div className="flex items-center gap-2">
          <Icon className="w-5 h-5 text-primary" />
          <span>Achievement Unlocked!</span>
        </div>
      ),
      description: (
        <div className="mt-2">
          <p className="font-semibold text-foreground">{achievement.title}</p>
          <p className="text-sm text-muted-foreground">{achievement.description}</p>
        </div>
      ),
      duration: 5000,
    });
  };

  const checkGoalAchievement = (goalCount) => {
    if (goalCount >= 1 && !unlockedAchievements.includes(ACHIEVEMENTS.FIRST_GOAL.id)) {
      unlockAchievement("FIRST_GOAL");
    }
  };

  const checkBadgeAchievement = (badgeCount) => {
    if (badgeCount >= 5 && !unlockedAchievements.includes(ACHIEVEMENTS.BADGE_COLLECTOR.id)) {
      unlockAchievement("BADGE_COLLECTOR");
    }
  };

  const checkLeaderboardAchievement = (rank) => {
    if (rank <= 3 && !unlockedAchievements.includes(ACHIEVEMENTS.LEADERBOARD_TOP3.id)) {
      unlockAchievement("LEADERBOARD_TOP3");
    }
  };

  const checkReductionAchievement = (reductionPercent) => {
    if (reductionPercent >= 10 && !unlockedAchievements.includes(ACHIEVEMENTS.WEEK_REDUCTION.id)) {
      unlockAchievement("WEEK_REDUCTION");
    }
  };

  const checkMilestoneAchievement = (totalSaved) => {
    if (totalSaved >= 100 && !unlockedAchievements.includes(ACHIEVEMENTS.MILESTONE_100.id)) {
      unlockAchievement("MILESTONE_100");
    }
  };

  const checkStreakAchievement = (streakDays) => {
    if (streakDays >= 7 && !unlockedAchievements.includes(ACHIEVEMENTS.STREAK_7.id)) {
      unlockAchievement("STREAK_7");
    }
  };

  return {
    unlockedAchievements,
    unlockAchievement,
    checkGoalAchievement,
    checkBadgeAchievement,
    checkLeaderboardAchievement,
    checkReductionAchievement,
    checkMilestoneAchievement,
    checkStreakAchievement,
    achievements: ACHIEVEMENTS,
  };
}
