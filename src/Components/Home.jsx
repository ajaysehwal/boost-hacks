import React from "react";
import { motion } from "framer-motion";

function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-700 to-neutral-900 text-white py-16 px-4 sm:px-6 lg:px-8"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.h1 
        className="text-4xl sm:text-5xl font-bold text-center mb-6"
        variants={itemVariants}
      >
        Welcome to Club Collab
      </motion.h1>
      <motion.p 
        className="text-xl sm:text-2xl text-center mb-16"
        variants={itemVariants}
      >
        Your gateway to connect with your college community.
      </motion.p>

      <motion.section variants={itemVariants}>
        <h2 className="text-3xl font-semibold text-center mb-8">Our Aims</h2>
        <p className="text-lg text-center mb-12">
          Projects | Skills | Collaboration
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {["INNOVATE", "GROW", "SERVE"].map((aim, index) => (
            <motion.div 
              key={aim}
              className="bg-white bg-opacity-10 p-6 rounded-lg shadow-xl"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <div className="h-1.5 w-16 bg-blue-500 mb-4"></div>
              <h3 className="text-3xl font-light mb-4">{aim}</h3>
              <p className="text-gray-300">
                {index === 0 && "ClubCollab gives you a platform to explore advanced technologies and provides momentum to your innovation."}
                {index === 1 && "Share your ideas with others and build real-time projects to foster personal and collective growth."}
                {index === 2 && "This club is meant for collaboration, where members provide solutions and support to those with queries."}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </motion.div>
  );
}

export default Home;