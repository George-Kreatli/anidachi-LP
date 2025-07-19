import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";

export function SocialProof() {
  const testimonials = [
    {
      name: "Alex Chen",
      role: "Anime Enthusiast",
      avatar: "AC",
      rating: 5,
      text: "Finally! No more trying to sync up with friends manually. The extension works flawlessly with Crunchyroll.",
      anime: "Attack on Titan",
    },
    {
      name: "Sarah Kim",
      role: "College Student",
      avatar: "SK",
      rating: 5,
      text: "The chat feature makes watching anime so much more fun. It's like having a watch party every time!",
      anime: "Demon Slayer",
    },
    {
      name: "Mike Rodriguez",
      role: "Working Professional",
      avatar: "MR",
      rating: 5,
      text: "Perfect for busy schedules. I can watch with friends even when we're all free at different times.",
      anime: "One Piece",
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-purple-50 to-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Loved by Anime Fans Worldwide
          </h2>
          <div className="flex justify-center items-center gap-2 mb-6">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
            ))}
            <span className="ml-2 text-lg font-semibold text-gray-700">
              4.9/5 from 2,000+ reviews
            </span>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white"
            >
              <CardContent className="p-6">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 text-yellow-400 fill-current"
                    />
                  ))}
                </div>

                <Quote className="w-8 h-8 text-purple-200 mb-4" />

                <p className="text-gray-700 mb-6 leading-relaxed">
                  &quot;{testimonial.text}&quot;
                </p>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                    <span className="text-purple-600 font-semibold text-sm">
                      {testimonial.avatar}
                    </span>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-gray-500">
                      {testimonial.role}
                    </div>
                    <div className="text-xs text-purple-600">
                      Currently watching: {testimonial.anime}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
