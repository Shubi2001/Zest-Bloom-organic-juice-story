import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Package, Calendar, CreditCard, Loader2 } from 'lucide-react';
import { useJuiceTheme } from '@/src/context/ThemeContext';
import { db, auth, handleFirestoreError, OperationType } from '@/src/firebase.tsx';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';

interface SubscriptionData {
  id: string;
  planName: string;
  price: string;
  status: string;
  startDate: any;
}

interface OrdersModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function OrdersModal({ isOpen, onClose }: OrdersModalProps) {
  const { theme, colors } = useJuiceTheme();
  const [subscriptions, setSubscriptions] = useState<SubscriptionData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isOpen && auth.currentUser) {
      fetchSubscriptions();
    }
  }, [isOpen]);

  const fetchSubscriptions = async () => {
    setLoading(true);
    const path = 'subscriptions';
    try {
      const q = query(
        collection(db, path),
        where('userId', '==', auth.currentUser?.uid),
        orderBy('startDate', 'desc')
      );
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as SubscriptionData[];
      setSubscriptions(data);
    } catch (error) {
      handleFirestoreError(error, OperationType.LIST, path);
    } finally {
      setLoading(false);
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
            className="relative w-full max-w-2xl bg-white dark:bg-[#1A1A1A] rounded-[3rem] p-10 shadow-2xl space-y-8 max-h-[80vh] overflow-hidden flex flex-col border border-juice-dark/5"
          >
            <button onClick={onClose} className="absolute top-6 right-6 p-2 hover:bg-juice-dark/5 rounded-full transition-colors">
              <X size={20} className="text-juice-dark" />
            </button>

            <div className="space-y-2">
              <h2 className="text-4xl font-display font-black uppercase tracking-tighter">
                Your <span style={{ color: colors[theme] }}>Subscriptions</span>
              </h2>
              <p className="text-juice-dark/50">
                Manage your fresh juice orders and history.
              </p>
            </div>

            <div className="flex-1 overflow-y-auto pr-2 space-y-4 custom-scrollbar">
              {loading ? (
                <div className="flex flex-col items-center justify-center py-20 space-y-4">
                  <Loader2 className="animate-spin text-juice-dark/20" size={40} />
                  <p className="text-juice-dark/40 font-medium">Fetching your orders...</p>
                </div>
              ) : subscriptions.length > 0 ? (
                subscriptions.map((sub) => (
                  <motion.div
                    key={sub.id}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    className="bg-juice-dark/5 dark:bg-white/5 p-6 rounded-3xl border border-juice-dark/5 flex flex-col md:flex-row md:items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-4 rounded-2xl bg-white dark:bg-white/10 shadow-sm" style={{ color: colors[theme] }}>
                        <Package size={24} />
                      </div>
                      <div>
                        <h3 className="font-display font-bold text-xl">{sub.planName} Plan</h3>
                        <div className="flex items-center gap-2 text-sm text-juice-dark/50">
                          <Calendar size={14} />
                          <span>Started {sub.startDate?.toDate().toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between md:justify-end gap-8">
                      <div className="text-right">
                        <div className="font-black text-xl">{sub.price}</div>
                        <div className="text-xs font-bold uppercase tracking-widest opacity-30">Monthly</div>
                      </div>
                      <div 
                        className="px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-white"
                        style={{ backgroundColor: sub.status === 'active' ? colors.green : colors.red }}
                      >
                        {sub.status}
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="text-center py-20 space-y-4">
                  <div className="w-20 h-20 bg-juice-dark/5 rounded-full flex items-center justify-center mx-auto text-juice-dark/20">
                    <CreditCard size={40} />
                  </div>
                  <div className="space-y-1">
                    <p className="font-display font-bold text-xl">No subscriptions yet</p>
                    <p className="text-juice-dark/40">Ready to start your fresh journey?</p>
                  </div>
                  <button 
                    onClick={onClose}
                    className="px-6 py-2 rounded-full text-white font-bold text-sm shadow-lg"
                    style={{ backgroundColor: colors[theme] }}
                  >
                    Explore Plans
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
