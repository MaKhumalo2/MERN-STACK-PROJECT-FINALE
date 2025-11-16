import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Leaf, TrendingDown, Users, Award } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Index() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary-light/5 to-secondary/10">
      {/* Header */}
      <header className="container mx-auto px-4 py-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Leaf className="w-8 h-8 text-primary" />
          <h1 className="text-2xl font-bold text-foreground">EcoTrack</h1>
        </div>
        <Button onClick={() => navigate("/auth")} variant="outline">
          Sign In
        </Button>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <h2 className="text-5xl font-bold text-foreground leading-tight">
            Track Your Carbon Footprint
            <br />
            <span className="text-primary">Make a Difference</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Join thousands of eco-conscious individuals reducing their environmental impact. 
            Track, analyze, and offset your carbon emissions with EcoTrack.
          </p>
          <div className="flex gap-4 justify-center mt-8">
            <Button onClick={() => navigate("/auth")} size="lg" className="shadow-soft">
              Get Started Free
            </Button>
            <Button variant="outline" size="lg">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-card/80 backdrop-blur-sm border-border/50 shadow-soft hover:shadow-medium transition-all">
            <CardContent className="p-6 space-y-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <TrendingDown className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">Track Emissions</h3>
              <p className="text-muted-foreground">
                Monitor your daily carbon footprint from transportation, energy, and food choices.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card/80 backdrop-blur-sm border-border/50 shadow-soft hover:shadow-medium transition-all">
            <CardContent className="p-6 space-y-4">
              <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center">
                <Leaf className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">Actionable Insights</h3>
              <p className="text-muted-foreground">
                Get personalized recommendations to reduce your environmental impact.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card/80 backdrop-blur-sm border-border/50 shadow-soft hover:shadow-medium transition-all">
            <CardContent className="p-6 space-y-4">
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                <Users className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">Community Impact</h3>
              <p className="text-muted-foreground">
                Compare progress with others and contribute to global sustainability goals.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card/80 backdrop-blur-sm border-border/50 shadow-soft hover:shadow-medium transition-all">
            <CardContent className="p-6 space-y-4">
              <div className="w-12 h-12 rounded-full bg-success/10 flex items-center justify-center">
                <Award className="w-6 h-6 text-success" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">Earn Achievements</h3>
              <p className="text-muted-foreground">
                Unlock badges and rewards as you reach sustainability milestones.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <Card className="bg-gradient-eco shadow-medium border-0">
          <CardContent className="p-12 text-center space-y-6">
            <h2 className="text-3xl font-bold text-white">Ready to make a difference?</h2>
            <p className="text-white/90 text-lg max-w-2xl mx-auto">
              Start tracking your carbon footprint today and join a community committed to a sustainable future.
            </p>
            <Button onClick={() => navigate("/auth")} size="lg" variant="secondary" className="shadow-soft">
              Start Your Journey
            </Button>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 border-t border-border/50">
        <div className="text-center text-muted-foreground">
          <p>© 2024 EcoTrack. Making the world greener, one step at a time.</p>
        </div>
      </footer>
    </div>
  );
}
