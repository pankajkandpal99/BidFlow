import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex mb-3">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill={star <= rating ? "#FFD700" : "#94a3b8"}
          className="w-4 h-4"
        >
          <path
            fillRule="evenodd"
            d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
            clipRule="evenodd"
          />
        </svg>
      ))}
    </div>
  );
};

interface TestimonialCardProps {
  avatarUrl: string;
  rating: number;
  quote: string;
  name: string;
  location: string;
}

const TestimonialCard = ({
  avatarUrl,
  rating,
  quote,
  name,
  location,
}: TestimonialCardProps) => {
  return (
    <motion.div
      className="bg-[#121a2a]/70 rounded-lg p-6 border border-[#1e293b] shadow-lg relative backdrop-blur-sm h-full"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <div className="absolute -top-5 left-6">
        <div className="relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-[#6FFFB4]/30 to-[#3694FF]/30 rounded-full opacity-70 blur-sm"></div>
          <img
            src={avatarUrl}
            alt={`${name} avatar`}
            className="w-10 h-10 rounded-full border-2 border-[#121a2a] relative"
          />
        </div>
      </div>
      <div className="pt-6">
        <StarRating rating={rating} />
        <p className="text-[#94a3b8] mb-3">"{quote}"</p>
        <p className="font-semibold">{name}</p>
        <p className="text-xs text-[#94a3b8]">{location}</p>
      </div>
    </motion.div>
  );
};

const PlayerTestimonials = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Testimonials data
  const testimonials = [
    {
      id: 1,
      avatarUrl: "https://i.pravatar.cc/80?img=1",
      rating: 5,
      quote:
        "I won ₹15,000 in my first week! The games are fair and withdrawal process is super quick. Highly recommended!",
      name: "Raj Sharma",
      location: "Mumbai",
    },
    {
      id: 2,
      avatarUrl: "https://i.pravatar.cc/80?img=5",
      rating: 5,
      quote:
        "The best gaming platform I've used. Customer support is excellent and the tournaments are so exciting. I play every day!",
      name: "Priya Patel",
      location: "Delhi",
    },
    {
      id: 3,
      avatarUrl: "https://i.pravatar.cc/80?img=3",
      rating: 5,
      quote:
        "I was skeptical at first, but GameHiGame proved me wrong. Totally legitimate platform with instant withdrawals. Great experience!",
      name: "Vikram Singh",
      location: "Bangalore",
    },
    {
      id: 4,
      avatarUrl: "https://i.pravatar.cc/80?img=4",
      rating: 4,
      quote:
        "Playing Fantasy Cricket here has been amazing. The interface is smooth and the prizes are actually worth it.",
      name: "Ananya Desai",
      location: "Chennai",
    },
    {
      id: 5,
      avatarUrl: "https://i.pravatar.cc/80?img=7",
      rating: 5,
      quote:
        "Been using GameHiGame for 6 months now. Earnings are consistent and the games keep getting better!",
      name: "Mohammed Khan",
      location: "Hyderabad",
    },
    {
      id: 6,
      avatarUrl: "https://i.pravatar.cc/80?img=9",
      rating: 5,
      quote:
        "The weekend tournaments are the highlight of my week. Already won twice and the competition is fair.",
      name: "Kavita Reddy",
      location: "Pune",
    },
  ];

  return (
    <section className="py-12 bg-[#0a101f]/90 relative">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">Player Testimonials</h2>
          <p className="text-[#94a3b8] mt-2 max-w-2xl mx-auto">
            See what our players have to say about their experience with
            GameHiGame
          </p>
        </div>

        {isMobile ? (
          <div className="relative">
            <div className="overflow-x-auto pb-4 scrollbar-hide">
              <div className="flex space-x-6 w-max px-4">
                {testimonials.map((testimonial) => (
                  <div key={testimonial.id} className="w-80 flex-shrink-0">
                    <TestimonialCard
                      avatarUrl={testimonial.avatarUrl}
                      rating={testimonial.rating}
                      quote={testimonial.quote}
                      name={testimonial.name}
                      location={testimonial.location}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {testimonials.slice(0, 3).map((testimonial) => (
              <TestimonialCard
                key={testimonial.id}
                avatarUrl={testimonial.avatarUrl}
                rating={testimonial.rating}
                quote={testimonial.quote}
                name={testimonial.name}
                location={testimonial.location}
              />
            ))}
          </div>
        )}

        {/* Optional: Add button to view more testimonials */}
        {!isMobile && testimonials.length > 3 && (
          <div className="text-center mt-10">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2 rounded-lg text-sm font-medium bg-[#121a2a] text-[#94a3b8] hover:text-white border border-[#1e293b] hover:border-[#6FFFB4]/30 transition-colors"
            >
              View More Testimonials
            </motion.button>
          </div>
        )}
      </div>
    </section>
  );
};

export default PlayerTestimonials;
