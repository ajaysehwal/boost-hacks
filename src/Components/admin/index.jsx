import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import { BootcampForm, BootcampList } from "./Bootcamp";
import { DocumentUploadForm, DocumentList } from "./document";
import { Sidebar } from "./sidebar";
import { Header } from "./header";
import { EventForm, EventList } from "./events";

const AdminPanel = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("events");
  const [events, setEvents] = useState([]);
  const [bootcamps, setBootcamps] = useState([]);
  const [documents, setDocuments] = useState([]);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const fetchEvents = async () => {
    try {
      const eventsCollection = collection(db, "events");
      const eventsSnapshot = await getDocs(eventsCollection);
      const eventsList = eventsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setEvents(eventsList);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  const fetchBootcamps = async () => {
    try {
      const bootcampsCollection = collection(db, "bootcamps");
      const bootcampsSnapshot = await getDocs(bootcampsCollection);
      const bootcampsList = bootcampsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBootcamps(bootcampsList);
    } catch (error) {
      console.error("Error fetching bootcamps:", error);
    }
  };

  const fetchDocuments = async () => {
    try {
      const documentsCollection = collection(db, "documents");
      const documentsSnapshot = await getDocs(documentsCollection);
      const documentsList = documentsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setDocuments(documentsList);
    } catch (error) {
      console.error("Error fetching documents:", error);
    }
  };

  useEffect(() => {
    fetchEvents();
    fetchBootcamps();
    fetchDocuments();
  }, []);

  const handleAddDocument = async (newDocument) => {
    try {
      await addDoc(collection(db, "documents"), newDocument);
      fetchDocuments();
    } catch (error) {
      console.error("Error creating document:", error);
    }
  };

  const handleAddEvent = async (newEvent) => {
    try {
      await addDoc(collection(db, "events"), newEvent);
      fetchEvents();
    } catch (error) {
      console.error("Error creating event:", error);
    }
  };

  const handleAddBootcamp = async (newBootcamp) => {
    try {
      await addDoc(collection(db, "bootcamps"), newBootcamp);
      fetchBootcamps();
    } catch (error) {
      console.error("Error creating bootcamp:", error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex">
      <Sidebar
        isOpen={sidebarOpen}
        toggleSidebar={toggleSidebar}
        setActiveSection={setActiveSection}
        activeSection={activeSection}
      />
      <div className="flex-1 lg:ml-64">
        <Header toggleSidebar={toggleSidebar} activeSection={activeSection} />
        <main className="p-6">
          <AnimatePresence mode="wait">
            {activeSection === "events" && (
              <motion.div
                key="events"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <EventForm onSubmit={handleAddEvent} />
                <EventList events={events} />
              </motion.div>
            )}
            {activeSection === "bootcamps" && (
              <motion.div
                key="bootcamps"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <BootcampForm onSubmit={handleAddBootcamp} />
                <BootcampList bootcamps={bootcamps} />
              </motion.div>
            )}
            {activeSection === "documents" && (
              <motion.div
                key="documents"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-2xl font-bold mb-4 text-blue-800">
                  Document Management
                </h2>
                <DocumentUploadForm onSubmit={handleAddDocument} />
                <DocumentList documents={documents} />
              </motion.div>
            )}
            {activeSection === "settings" && (
              <motion.div
                key="settings"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-2xl font-bold mb-4 text-blue-800">
                  Settings
                </h2>
                <p className="text-gray-600">
                  Settings features coming soon...
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};

export default AdminPanel;
