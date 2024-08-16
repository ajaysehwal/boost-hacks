import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { FaRegSadTear, FaSpinner, FaSearch, FaTimes } from "react-icons/fa";

const TechNews = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("Artificial Intelligence");
  const [selectedArticle, setSelectedArticle] = useState(null);

  useEffect(() => {
    fetchNews();
  }, [searchTerm]);

  const fetchNews = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "https://content.guardianapis.com/search",
        {
          params: {
            q: searchTerm,
            "api-key": "807114c4-4454-4d6e-8738-a73be27c99b0",
            "page-size": 30,
            "show-fields": "thumbnail,bodyText",
          },
        }
      );
      setNews(response.data.response.results);
    } catch (error) {
      setError("Failed to fetch news");
    } finally {
      setLoading(false);
    }
  };

  if (error) return <ErrorScreen error={error} />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-700 to-neutral-900 text-white p-8">
      <Header />
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      {loading ? (
        <LoadingScreen />
      ) : (
        <NewsGrid news={news} setSelectedArticle={setSelectedArticle} />
      )}
      {selectedArticle && (
        <NewsModal
          article={selectedArticle}
          onClose={() => setSelectedArticle(null)}
        />
      )}
    </div>
  );
};

const LoadingScreen = () => (
  <div className="flex justify-center items-center h-64">
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
    >
      <FaSpinner className="text-white text-4xl" />
    </motion.div>
  </div>
);

const ErrorScreen = ({ error }) => (
  <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-b from-gray-900 to-blue-900 text-white">
    <FaRegSadTear size={50} className="mb-4" />
    <p className="text-xl">{error}</p>
  </div>
);

const Header = () => (
  <motion.h1
    initial={{ opacity: 0, y: -50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="text-6xl font-bold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-200"
  >
    Trending Tech News
  </motion.h1>
);

const SearchBar = ({ searchTerm, setSearchTerm }) => (
  <div className="mb-12 flex justify-center">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="relative w-full max-w-xl"
    >
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search for news..."
        className="w-full px-6 py-3 rounded-full bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
      />
      <FaSearch className="absolute right-6 top-4 text-gray-300" />
    </motion.div>
  </div>
);

const NewsGrid = ({ news, setSelectedArticle }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5, delay: 0.3 }}
    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
  >
    <AnimatePresence>
      {news.map((article, index) => (
        <NewsCard
          key={article.id}
          article={article}
          index={index}
          onClick={() => setSelectedArticle(article)}
        />
      ))}
    </AnimatePresence>
  </motion.div>
);

const NewsCard = ({ article, index, onClick }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white bg-opacity-5 backdrop-filter backdrop-blur-lg rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer"
      onClick={onClick}
    >
      <motion.img
        src={
          article.fields?.thumbnail ||
          "https://via.placeholder.com/300x200?text=No+Image"
        }
        alt={article.webTitle}
        className="w-full h-56 object-cover"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      />
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-4 line-clamp-2">
          {article.webTitle}
        </h2>
        <p className="text-gray-300 text-sm line-clamp-3">
          {article.fields?.bodyText || "No content available"}
        </p>
      </div>
    </motion.div>
  );
};

const NewsModal = ({ article, onClose }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
  >
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.9, opacity: 0 }}
      className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">{article.webTitle}</h2>
        <button onClick={onClose} className="text-gray-300 hover:text-white">
          <FaTimes size={24} />
        </button>
      </div>
      <img
        src={
          article.fields?.thumbnail ||
          "https://via.placeholder.com/600x400?text=No+Image"
        }
        alt={article.webTitle}
        className="w-full h-64 object-cover rounded-lg mb-4"
      />
      <p className="text-gray-300 mb-4">
        {article.fields?.bodyText || "No content available"}
      </p>
      <a
        href={article.webUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full transition-colors text-sm font-medium inline-block"
      >
        Read Full Article
      </a>
    </motion.div>
  </motion.div>
);

export default TechNews;
