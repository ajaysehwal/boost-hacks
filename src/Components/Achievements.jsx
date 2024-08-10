import React from "react";
import { motion } from "framer-motion";

const AchievementSection = ({ title, description, imageSrc }) => {
  return (
    <motion.section 
      className="mb-20"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-4xl font-bold mb-6 text-center">{title}</h2>
      <p className="text-xl mb-8 text-center max-w-3xl mx-auto">{description}</p>
      {imageSrc && (
        <img 
          src={imageSrc} 
          alt={title} 
          className="w-full max-w-2xl mx-auto rounded-lg shadow-lg"
        />
      )}
    </motion.section>
  );
};

function Achievements() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-700 to-neutral-900 text-white p-8">
      <motion.div 
        className="max-w-6xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-6xl font-bold text-center mb-12">Achievements</h1>
        <p className="text-2xl text-center mb-16">
          ClubCollab has worked hard over the years to bring out these fruitful results.
        </p>

        <AchievementSection
          title="Successful AI-ML Bootcamp"
          description="In 2020, we organized a seven-day bootcamp on Artificial Intelligence and Machine Learning. It was a great success with many students participating and being honored to be part of the event."
        />

        <AchievementSection
          title="Smart India Hackathon"
          description="In 2021, about ten teams from our club participated in the Smart India Hackathon and achieved outstanding results. The projects spanned all domains of ClubCollab."
        />

        <AchievementSection
          title="Successful Internship"
          description="In 2022, we organized an internship based on Flutter Frontend and Backend for Second and Third Year students. Many students joined us in this program, establishing a strong foundation in Flutter development."
          imageSrc="https://pbs.twimg.com/media/E_4dGLGVEAUNAxz.jpg"
        />

        <AchievementSection
          title="ISRO Chandrayaan-3"
          description="In 2023, some of our ClubCollab students created a satellite named Beliefsat, which was used in the launch of Chandrayaan-3 at ISRO."
        />
      </motion.div>
    </div>
  );
}

export default Achievements;