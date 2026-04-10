import { motion } from 'motion/react';
import { useJuiceTheme } from '@/src/context/ThemeContext';
import { Quote, Star } from 'lucide-react';

const testimonials = [
  {
    name: "Sarah Jenkins",
    role: "Yoga Instructor",
    content: "The Green Juice is my post-workout ritual. It's incredibly fresh and gives me the perfect energy boost without the crash.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200"
  },
  {
    name: "David Chen",
    role: "Tech Lead",
    content: "I've tried many juice cleanses, but Zest & Bloom is on another level. The glass bottles are a great touch, and the flavors are so complex.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200"
  },
  {
    name: "Elena Rodriguez",
    role: "Nutritionist",
    content: "As a professional, I highly recommend their cold-pressed process. It preserves the enzymes perfectly. My favorite is the Beetroot & Ginger.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200"
  }
];

export default function Testimonials() {
  const { theme, colors } = useJuiceTheme();

  return (
    <section className="py-32 px-8 space-y-16 max-w-7xl mx-auto overflow-hidden">
      <div className="text-center space-y-4">
        <h2 className="text-6xl md:text-8xl font-display font-black uppercase tracking-tighter">
          What Our <span style={{ color: colors[theme] }}>Community</span> Says
        </h2>
        <p className="text-xl text-juice-dark/50 dark:text-juice-paper/50 max-w-2xl mx-auto">
          Real stories from people who have embraced the fresh life with Zest & Bloom.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-white/5 p-10 rounded-[3rem] shadow-xl border border-juice-dark/5 relative space-y-6"
          >
            <div className="absolute -top-6 -right-6 p-4 rounded-full bg-white dark:bg-juice-dark shadow-lg" style={{ color: colors[theme] }}>
              <Quote size={24} />
            </div>

            <div className="flex gap-1">
              {[...Array(t.rating)].map((_, i) => (
                <Star key={i} size={16} fill={colors[theme]} stroke={colors[theme]} />
              ))}
            </div>

            <p className="text-lg italic leading-relaxed text-juice-dark/80 dark:text-juice-paper/80">
              "{t.content}"
            </p>

            <div className="flex items-center gap-4 pt-4">
              <img 
                src={t.image} 
                alt={t.name} 
                className="w-12 h-12 rounded-full object-cover border-2"
                style={{ borderColor: colors[theme] }}
                referrerPolicy="no-referrer"
              />
              <div>
                <h4 className="font-bold text-juice-dark dark:text-juice-paper">{t.name}</h4>
                <p className="text-xs font-bold uppercase tracking-widest opacity-40">{t.role}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
