import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion } from 'motion/react';
import { useJuiceTheme } from '@/src/context/ThemeContext';
import { Send } from 'lucide-react';

const feedbackSchema = z.object({
  name: z.string().min(2, "Name is too short"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message is too short"),
  rating: z.number().min(1).max(5),
});

type FeedbackForm = z.infer<typeof feedbackSchema>;

export default function Feedback() {
  const { theme, colors } = useJuiceTheme();
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FeedbackForm>({
    resolver: zodResolver(feedbackSchema),
    defaultValues: { rating: 5 }
  });

  const onSubmit = (data: FeedbackForm) => {
    console.log(data);
    alert("Thank you for your feedback!");
    reset();
  };

  return (
    <section className="py-32 px-8 bg-juice-dark text-white rounded-[4rem] mx-4 md:mx-12 overflow-hidden relative">
      {/* Background Accent */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
        transition={{ duration: 20, repeat: Infinity }}
        className="absolute -top-40 -right-40 w-[40rem] h-[40rem] rounded-full blur-[100px] opacity-20"
        style={{ backgroundColor: colors[theme] }}
      />

      <div className="max-w-4xl mx-auto space-y-12 relative z-10">
        <div className="text-center space-y-4">
          <h2 className="text-6xl md:text-8xl font-display font-black uppercase tracking-tighter">
            Share Your <span style={{ color: colors[theme] }}>Experience</span>
          </h2>
          <p className="text-xl text-white/50 max-w-2xl mx-auto">
            We love hearing from our community. Tell us what you think about our juices.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest opacity-50">Name</label>
              <input
                {...register("name")}
                className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 focus:border-white/30 outline-none transition-colors"
                placeholder="Your name"
              />
              {errors.name && <span className="text-red-400 text-xs">{errors.name.message}</span>}
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest opacity-50">Email</label>
              <input
                {...register("email")}
                className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 focus:border-white/30 outline-none transition-colors"
                placeholder="your@email.com"
              />
              {errors.email && <span className="text-red-400 text-xs">{errors.email.message}</span>}
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest opacity-50">Message</label>
              <textarea
                {...register("message")}
                rows={5}
                className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 focus:border-white/30 outline-none transition-colors resize-none"
                placeholder="How was your juice?"
              />
              {errors.message && <span className="text-red-400 text-xs">{errors.message.message}</span>}
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full py-4 rounded-2xl font-bold text-white shadow-lg flex items-center justify-center gap-2"
              style={{ backgroundColor: colors[theme] }}
            >
              <Send size={20} />
              Send Feedback
            </motion.button>
          </div>
        </form>
      </div>
    </section>
  );
}
