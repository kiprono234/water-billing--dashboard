import { motion, AnimatePresence } from "framer-motion";

const AnimatedNumber = ({ value }) => (
  <AnimatePresence mode="wait">
    <motion.span
      key={value}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.3 }}
      style={{ display: "inline-block" }}
    >
      {value}
    </motion.span>
  </AnimatePresence>
);

export default AnimatedNumber;