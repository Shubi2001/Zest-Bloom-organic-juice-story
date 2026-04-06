import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { X, Mail, Lock, User as UserIcon } from 'lucide-react';
import { useJuiceTheme } from '@/src/context/ThemeContext';

const authSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password too short"),
  name: z.string().optional(),
});

type AuthForm = z.infer<typeof authSchema>;

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [isLogin, setIsLogin] = useState(true);
  const { theme, colors } = useJuiceTheme();
  
  const { register, handleSubmit, formState: { errors } } = useForm<AuthForm>({
    resolver: zodResolver(authSchema)
  });

  const onSubmit = (data: AuthForm) => {
    console.log(data);
    alert(`${isLogin ? 'Logged in' : 'Signed up'} successfully!`);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-juice-dark/60 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-md bg-white rounded-[3rem] p-10 shadow-2xl space-y-8"
          >
            <button onClick={onClose} className="absolute top-6 right-6 p-2 hover:bg-juice-dark/5 rounded-full transition-colors">
              <X size={20} />
            </button>

            <div className="text-center space-y-2">
              <h2 className="text-4xl font-display font-black uppercase tracking-tighter">
                {isLogin ? 'Welcome Back' : 'Join the Story'}
              </h2>
              <p className="text-juice-dark/50">
                {isLogin ? 'Your daily dose of fresh is waiting.' : 'Start your journey to a fresher life.'}
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {!isLogin && (
                <div className="relative">
                  <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-juice-dark/30" size={18} />
                  <input
                    {...register("name")}
                    placeholder="Full Name"
                    className="w-full pl-12 pr-4 py-4 bg-juice-dark/5 rounded-2xl outline-none focus:ring-2 ring-juice-orange/20 transition-all"
                  />
                </div>
              )}

              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-juice-dark/30" size={18} />
                <input
                  {...register("email")}
                  placeholder="Email Address"
                  className="w-full pl-12 pr-4 py-4 bg-juice-dark/5 rounded-2xl outline-none focus:ring-2 ring-juice-orange/20 transition-all"
                />
                {errors.email && <span className="text-red-500 text-xs mt-1 block">{errors.email.message}</span>}
              </div>

              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-juice-dark/30" size={18} />
                <input
                  {...register("password")}
                  type="password"
                  placeholder="Password"
                  className="w-full pl-12 pr-4 py-4 bg-juice-dark/5 rounded-2xl outline-none focus:ring-2 ring-juice-orange/20 transition-all"
                />
                {errors.password && <span className="text-red-500 text-xs mt-1 block">{errors.password.message}</span>}
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full py-4 rounded-2xl font-bold text-white shadow-lg"
                style={{ backgroundColor: colors[theme] }}
              >
                {isLogin ? 'Login' : 'Create Account'}
              </motion.button>
            </form>

            <div className="text-center">
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-sm font-bold text-juice-dark/50 hover:text-juice-dark transition-colors"
              >
                {isLogin ? "Don't have an account? Sign up" : "Already have an account? Login"}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
