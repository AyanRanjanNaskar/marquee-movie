
import { motion } from "framer-motion";

const Intro = ({ onFinish }) => {
  return (
    <motion.div
      className="fixed inset-0 bg-black text-white flex items-center justify-center"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 0.200 , delay: 1 }}
      onAnimationComplete={onFinish}
    >
      <h1 className="self-edited text-6xl font-bold">MARQUEE MOVIES</h1>
    </motion.div>
  );
};

export default Intro;
