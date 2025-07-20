import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Users, MessageSquare, History, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function MainAppFeatures() {
  const features = [
    {
      icon: Users,
      title: "Asynchronous Group Watching",
      description:
        "Create watchrooms and invite friends to watch anime together, even when you're not online at the same time. Pick up where you left off and stay synchronized.",
      benefit: "Never miss watching with friends again",
      color: "purple",
    },
    {
      icon: MessageSquare,
      title: "Integrated Chat and Discussions",
      description:
        "React to your favorite moments, discuss plot twists, and share theories with built-in real-time chat and discussion threads for each episode.",
      benefit: "Share every epic moment instantly",
      color: "blue",
    },
    {
      icon: History,
      title: "Personalized Watch History",
      description:
        "Track your anime journey with detailed watch history, progress tracking, and personalized recommendations based on your viewing patterns.",
      benefit: "Discover your next favorite anime",
      color: "green",
    },
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      purple:
        "bg-purple-100 text-purple-600 group-hover:bg-purple-600 group-hover:text-white",
      blue: "bg-blue-100 text-blue-600 group-hover:bg-blue-600 group-hover:text-white",
      green:
        "bg-green-100 text-green-600 group-hover:bg-green-600 group-hover:text-white",
      orange:
        "bg-orange-100 text-orange-600 group-hover:bg-orange-600 group-hover:text-white",
    };
    return colors[color as keyof typeof colors] || colors.purple;
  };

  return (
    <section className="py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <span className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></span>
            Features
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
            Your Asynchronous Anime Hub
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Transform solo viewing into shared experiences with powerful
            features designed for anime lovers
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="group border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-white p-6"
            >
              <CardHeader className="p-0">
                <div
                  className={`w-14 h-14 rounded-xl flex items-center justify-center mb-2 transition-all duration-300 ${getColorClasses(
                    feature.color
                  )}`}
                >
                  <feature.icon className="h-7 w-7 transition-colors duration-300" />
                </div>
                <CardTitle className="text-xl font-bold text-gray-900 mb-2">
                  {feature.title}
                </CardTitle>
                <div className="text-sm font-medium text-purple-600 mb-3">
                  {feature.benefit}
                </div>
              </CardHeader>
              <CardContent className="p-0 pt-4">
                <CardDescription className="text-gray-600 text-base leading-relaxed mb-4">
                  {feature.description}
                </CardDescription>
                <Button
                  variant="ghost"
                  className="text-purple-600 hover:text-purple-700 p-0 h-auto font-medium group/btn"
                >
                  Learn more
                  <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <Button
            size="lg"
            className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Sign Up
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
}
