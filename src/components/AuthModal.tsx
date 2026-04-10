import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { X, Mail, Lock, User as UserIcon } from 'lucide-react';
import { useJuiceTheme } from '@/src/context/ThemeContext';
import { auth, db, handleFirestoreError, OperationType } from '@/src/firebase.tsx';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  updateProfile
} from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';

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
  const [error, setError] = useState<string | null>(null);
  const { theme, colors } = useJuiceTheme();
  
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<AuthForm>({
    resolver: zodResolver(authSchema)
  });

  const onSubmit = async (data: AuthForm) => {
    setError(null);
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, data.email, data.password);
      } else {
        const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
        const user = userCredential.user;
        
        if (data.name) {
          await updateProfile(user, { displayName: data.name });
        }

        // Create user profile in Firestore
        const userPath = `users/${user.uid}`;
        try {
          await setDoc(doc(db, 'users', user.uid), {
            uid: user.uid,
            name: data.name || null,
            email: data.email,
            role: 'user',
            createdAt: serverTimestamp(),
          });
        } catch (err) {
          handleFirestoreError(err, OperationType.CREATE, userPath);
        }
      }
      onClose();
    } catch (err: any) {
      // We only log the full error if it's NOT a common user-input error
      const errorCode = err.code || (err.message?.includes('(') ? err.message.split('(')[1].split(')')[0] : '');
      
      const commonErrors = [
        'auth/email-already-in-use',
        'auth/invalid-credential',
        'auth/user-not-found',
        'auth/wrong-password',
        'auth/invalid-email',
        'auth/too-many-requests'
      ];

      if (!commonErrors.includes(errorCode)) {
        console.error("Unexpected Auth Error:", err);
      }

      let message = "An error occurred. Please check your details and try again.";
      
      if (errorCode === 'auth/email-already-in-use') {
        message = "This email is already in use. Try logging in instead of signing up.";
      } else if (
        errorCode === 'auth/invalid-credential' || 
        errorCode === 'auth/user-not-found' || 
        errorCode === 'auth/wrong-password'
      ) {
        message = "Incorrect email or password. Please try again.";
      } else if (errorCode === 'auth/invalid-email') {
        message = "Please enter a valid email address.";
      } else if (errorCode === 'auth/too-many-requests') {
        message = "Too many attempts. Please wait a moment before trying again.";
      } else if (errorCode === 'auth/network-request-failed') {
        message = "Connection error. Please check your internet.";
      } else if (err.message && !err.message.includes('auth/')) {
        message = err.message;
      }
      
      setError(message);
    }
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
            className="relative w-full max-w-md bg-white dark:bg-[#1A1A1A] rounded-[3rem] p-10 shadow-2xl space-y-8 border border-juice-dark/5"
          >
            <button onClick={onClose} className="absolute top-6 right-6 p-2 hover:bg-juice-dark/5 rounded-full transition-colors">
              <X size={20} className="text-juice-dark" />
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
              {error && (
                <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-xs text-center">
                  {error}
                </div>
              )}

              {!isLogin && (
                <div className="relative">
                  <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-juice-dark/30" size={18} />
                  <input
                    {...register("name")}
                    placeholder="Full Name"
                    disabled={isSubmitting}
                    className="w-full pl-12 pr-4 py-4 bg-juice-dark/5 rounded-2xl outline-none focus:ring-2 ring-juice-orange/20 transition-all disabled:opacity-50"
                  />
                </div>
              )}

              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-juice-dark/30" size={18} />
                <input
                  {...register("email")}
                  placeholder="Email Address"
                  disabled={isSubmitting}
                  className="w-full pl-12 pr-4 py-4 bg-juice-dark/5 rounded-2xl outline-none focus:ring-2 ring-juice-orange/20 transition-all disabled:opacity-50"
                />
                {errors.email && <span className="text-red-500 text-xs mt-1 block">{errors.email.message}</span>}
              </div>

              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-juice-dark/30" size={18} />
                <input
                  {...register("password")}
                  type="password"
                  placeholder="Password"
                  disabled={isSubmitting}
                  className="w-full pl-12 pr-4 py-4 bg-juice-dark/5 rounded-2xl outline-none focus:ring-2 ring-juice-orange/20 transition-all disabled:opacity-50"
                />
                {errors.password && <span className="text-red-500 text-xs mt-1 block">{errors.password.message}</span>}
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-2xl font-bold text-white shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ backgroundColor: colors[theme] }}
              >
                {isSubmitting ? 'Processing...' : (isLogin ? 'Login' : 'Create Account')}
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
