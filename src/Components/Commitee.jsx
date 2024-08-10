import React from "react";
import { motion } from "framer-motion";

const CommitteeMember = ({ name, role, description, imageSrc }) => {
  return (
    <motion.div 
      className="flex flex-col sm:flex-row items-center bg-gradient-to-tr from-purple-600 to-indigo-600 rounded-lg shadow-2xl shadow-gray-950 overflow-hidden"
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
    >
      <img
        className="w-full sm:w-1/3 h-52 object-cover"
        src={imageSrc}
        alt={`${name} avatar`}
      />
      <div className="p-6 sm:w-2/3">
        <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">{name}</h3>
        <span className="text-xl text-gray-200 mb-3 block">{role}</span>
        <p className="text-white">{description}</p>
      </div>
    </motion.div>
  );
};

function Committee() {
  const committeeMembers = [
    {
      name: "Bonnie Green",
      role: "CEO",
      description: "Bonnie drives the technical strategy of ClubCollab.",
      imageSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOsMTNjSmlX8NA3AEnFGtpK0ggJuT8shFuXQ&s"
    },
    {
      name: "John Green",
      role: "President",
      description: "John Green leads the overall strategy of ClubCollab.",
      imageSrc: "https://png.pngtree.com/png-clipart/20210704/original/pngtree-d-character-male-cartoon-with-eye-glasses-and-yellow-orange-polo-png-image_6502959.jpg"
    },
    {
      name: "Michael Gough",
      role: "Vice President",
      description: "Michael oversees the operations of ClubCollab.",
      imageSrc: "https://png.pngtree.com/png-clipart/20210704/original/pngtree-d-character-male-cartoon-with-eye-glasses-and-yellow-orange-polo-png-image_6502959.jpg"
    },
    {
      name: "Lana Byrd",
      role: "Tech Lead",
      description: "Lana drives the technical innovation of ClubCollab.",
      imageSrc: "https://png.pngtree.com/png-clipart/20210704/original/pngtree-d-character-male-cartoon-with-eye-glasses-and-yellow-orange-polo-png-image_6502959.jpg"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-700 to-neutral-900 py-16 px-4 sm:px-6 lg:px-8">
      <motion.div 
        className="max-w-7xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-4xl sm:text-5xl font-extrabold text-white text-center mb-8">Our Team</h2>
        <p className="text-xl text-gray-200 text-center max-w-3xl mx-auto mb-16">
          The ClubCollab Committee is the backbone of our organization, ensuring smooth operations, organizing events, and fostering a vibrant community. Each member brings a unique set of skills and experiences, contributing to our shared vision of growth and innovation.
        </p>
        
        <div className="grid gap-8 md:grid-cols-2">
          {committeeMembers.map((member, index) => (
            <CommitteeMember key={index} {...member} />
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export default Committee;