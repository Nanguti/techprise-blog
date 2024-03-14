import { motion, AnimatePresence } from "framer-motion";

interface MotionWrapperProps {
  children: React.ReactNode;
}

const MotionWrapper: React.FC<MotionWrapperProps> = ({ children }) => {
  return (
    <>
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 15 }}
          transition={{ delay: 0.25 }}
          key="motion-wrapper"
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </>
  );
};

export default MotionWrapper;
