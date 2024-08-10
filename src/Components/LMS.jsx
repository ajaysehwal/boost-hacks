import React from "react";
import { motion } from "framer-motion";
function LMS() {
  return (
    <motion.div>
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-700
      to-neutral-900 p-6 text-white"
    </motion.div>
  );
}
export default LMS;
