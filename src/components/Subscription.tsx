import { motion } from 'motion/react';
import { useJuiceTheme } from '@/src/context/ThemeContext';
import { Check, Loader2 } from 'lucide-react';
import { db, auth, handleFirestoreError, OperationType } from '@/src/firebase.tsx';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useState } from 'react';

const plans = [
  {
    name: "Starter",
    price: "$29",
    period: "month",
    features: ["5 Juices per week", "Free delivery", "Standard flavors"],
    color: "orange"
  },
  {
    name: "Pro",
    price: "$59",
    period: "month",
    features: ["12 Juices per week", "Priority delivery", "All flavors", "Glass bottles"],
    color: "green"
  },
  {
    name: "Family",
    price: "$99",
    period: "month",
    features: ["24 Juices per week", "Eco-friendly packaging", "Custom blends", "Nutritionist consult"],
    color: "red"
  }
];

export default function Subscription({ id }: { id?: string }) {
  const { colors } = useJuiceTheme();
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);

  const handleSubscribe = async (plan: typeof plans[0]) => {
    if (!auth.currentUser) {
      alert("Please login to subscribe!");
      return;
    }

    setLoadingPlan(plan.name);
    const path = 'subscriptions';
    try {
      await addDoc(collection(db, path), {
        userId: auth.currentUser.uid,
        planName: plan.name,
        price: plan.price,
        status: 'active',
        startDate: serverTimestamp(),
      });
      alert(`Successfully subscribed to ${plan.name} plan!`);
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, path);
    } finally {
      setLoadingPlan(null);
    }
  };

  return (
    <section id={id} className="py-32 px-8 space-y-16">
      <div className="text-center space-y-4">
        <h2 className="text-6xl md:text-8xl font-display font-black uppercase tracking-tighter">
          Choose Your <span className="text-juice-orange">Plan</span>
        </h2>
        <p className="text-xl text-juice-dark/50 max-w-2xl mx-auto">
          Freshness delivered to your doorstep. Choose a plan that fits your lifestyle.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {plans.map((plan, i) => (
          <motion.div
            key={plan.name}
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: i * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ y: -10 }}
            className="bg-white dark:bg-white/5 p-10 rounded-[3rem] shadow-2xl border border-juice-dark/5 space-y-8 flex flex-col"
          >
            <div className="space-y-2">
              <span className="text-sm font-bold uppercase tracking-widest opacity-50">{plan.name}</span>
              <div className="flex items-baseline gap-1">
                <span className="text-5xl font-display font-black">{plan.price}</span>
                <span className="text-juice-dark/50">/{plan.period}</span>
              </div>
            </div>

            <div className="flex-1 space-y-4">
              {plan.features.map((feature) => (
                <div key={feature} className="flex items-center gap-3">
                  <div className="p-1 rounded-full bg-juice-orange/10 text-juice-orange">
                    <Check size={16} />
                  </div>
                  <span className="text-juice-dark/70">{feature}</span>
                </div>
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={loadingPlan === plan.name}
              onClick={() => handleSubscribe(plan)}
              className="w-full py-4 rounded-2xl font-bold text-white shadow-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
              style={{ backgroundColor: colors[plan.color as keyof typeof colors] }}
            >
              {loadingPlan === plan.name ? <Loader2 className="animate-spin" size={20} /> : 'Subscribe Now'}
            </motion.button>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
