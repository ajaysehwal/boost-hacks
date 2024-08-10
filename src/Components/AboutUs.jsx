import React from "react";
import { motion } from "framer-motion";

function AboutUs() {
  const domains = [
    {
      title: "AI-ML",
      description:
        "Artificial intelligence (AI) enables computers to perform advanced functions like understanding language, analyzing data, and making recommendations.",
      image:
        "https://www.fujitsu.com/global/imagesgig5/ai-banner-800x450_tcm100-7204059_tcm100-6286607-32.jpg",
    },
    {
      title: "App & Web Dev",
      description:
        "App and web development involves creating and maintaining mobile applications and websites, including design, programming, and database management.",
      image:
        "https://plus.unsplash.com/premium_photo-1678566153919-86c4ba4216f1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fHdlYiUyMGRldnxlbnwwfHwwfHx8MA%3D%3D",
    },
    {
      title: "Blockchain & Web3",
      description:
        "Web3 is a decentralized ecosystem based on blockchain, aiming to revolutionize internet management, monetization, and usage.",
      image:
        "https://images.unsplash.com/photo-1672911640671-65d5dfa97d26?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "Cyber Security",
      description:
        "Cybersecurity protects systems, networks, and programs from digital attacks, safeguarding sensitive information and business processes.",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwaOmpUMreDnHg12VV95_IoEfqWdGrlyoC_w&s",
    },
    {
      title: "Cloud Native",
      description:
        "Cloud-native applications are designed to leverage the elasticity and distributed nature of cloud computing.",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoU6nbFPfapnuwhj--5E1VEio9LHZqx-1upQ&s",
    },
    {
      title: "Data Science",
      description:
        "Data science combines computer science, statistics, and mathematics to extract insights and knowledge from data.",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBKEUZsgS84jRqYT-4y-t4OqsZwz3RJPlgZQ&s",
    },
    {
      title: "IoT",
      description:
        "Internet of Things (IoT) connects physical objects to exchange data over the internet, using embedded sensors and software.",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcHm_D8rjWPW82NGINmmDMFFgoTMK-MwV6PA&s",
    },
    {
      title: "Metaverse & AR/VR",
      description:
        "The metaverse combines augmented and virtual reality to create immersive, social, and persistent multiuser platforms.",
      image:
        "https://plus.unsplash.com/premium_photo-1661402170986-1b47b4b397ab?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-700 via-purple-800 to-pink-600 text-white">
      <div className="container mx-auto px-4 py-16">
        <header className="mb-16 text-center">
          <motion.h1
            className="text-6xl font-bold mb-6"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            About Us
          </motion.h1>
          <motion.p
            className="text-xl max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Welcome to our club, where learning and fun converge. Founded in
            2020 by AI and Data Science students, we offer an enriching
            experience you'll love.
          </motion.p>
        </header>

        <section className="mb-20">
          <motion.h2
            className="text-5xl font-bold mb-6"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            Our Vision
          </motion.h2>
          <motion.p
            className="text-lg leading-relaxed mb-4"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            We empower individuals in Data Science, fostering innovation and
            excellence for humanity's benefit. Our mission is to connect
            academia, industry, and society in a collaborative AI ecosystem.
          </motion.p>
        </section>

        <section>
          <motion.h2
            className="text-5xl font-bold mb-10 text-center"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Our Domains
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {domains.map((domain, index) => (
              <motion.div
                key={index}
                className="relative overflow-hidden rounded-xl shadow-lg"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <img
                  src={domain.image}
                  alt={domain.title}
                  className="w-full h-64 object-cover"
                />
                <motion.div
                  className="absolute inset-0 bg-black bg-opacity-70 flex flex-col justify-center items-center p-4 text-center"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-2xl font-semibold mb-2">
                    {domain.title}
                  </h3>
                  <p className="text-sm">{domain.description}</p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default AboutUs;
