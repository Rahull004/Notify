import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NoteCard } from "../components/NoteCard";
import { NewNoteCard } from "../components/NewNoteCard";
import { getCommunityNotes, getPersonalNotes, getDraftNotes } from "../appwrite/api";
import { useUserContext } from "../AuthContext";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { RingLoader } from "react-spinners";
import { Search } from "lucide-react";

const tabVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 }
};

const noteVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export const AllNotes = () => {
  const [showNewNoteCard, setShowNewNoteCard] = useState(false);
  const [activeTab, setActiveTab] = useState("PERSONAL");
  const { user, isLoading } = useUserContext();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [notes, setNotes] = useState({ personal: [], community: [], draft: [] });

  const filterNotes = (notes) =>
    notes.filter(note =>
      [note.title, note.content].some(field =>
        field?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );

  const filteredNotes = useMemo(() => ({
    personal: filterNotes(notes.personal),
    community: filterNotes(notes.community),
    draft: filterNotes(notes.draft)
  }), [notes, searchQuery]);

  useEffect(() => {
    const fetchNotes = async () => {
      const [community, personal, draft] = await Promise.all([
        getCommunityNotes(user?.$id),
        getPersonalNotes(user?.$id),
        getDraftNotes(user?.$id)
      ]);
      setNotes({
        personal: personal.documents,
        community: community.documents,
        draft: draft.documents
      });
    };
    if (user?.$id) fetchNotes();
  }, [user]);


  if (isLoading) return (
    <div className="flex justify-center items-center w-screen h-screen">
      <RingLoader color="#0362e9" size={120} />
    </div>
  );

  return (
    <motion.div
      className="min-h-screen bg-gray-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <nav className="bg-white shadow-sm p-4">
        <div className="max-w-7xl mx-auto flex items-center gap-4">
          <motion.div
            className="flex-1 relative"
            whileFocus={{ scale: 1.02 }}
          >
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search notes..."
              className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </motion.div>

          <motion.button
            onClick={() => setShowNewNoteCard(true)}
            className="px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            + Add
          </motion.button>

          <Link to="/profile" className="shrink-0">
            <motion.img
              src={user?.url || "/default-avatar.png"}
              alt="Profile"
              className="w-10 h-10 rounded-full border-2 border-white shadow"
              whileHover={{ scale: 1.1 }}
            />
          </Link>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto p-6">
        <motion.div
          className="flex gap-6 mb-8 border-b border-gray-200"
          variants={tabVariants}
        >
          {["PERSONAL", "COMMUNITY", "DRAFT"].map((tab) => (
            <motion.button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-2 px-4 relative ${activeTab === tab ? "text-blue-500" : "text-gray-500"}`}
              variants={tabVariants}
            >
              {tab}
              {activeTab === tab && (
                <motion.div
                  className="absolute bottom-0 left-0 w-full h-1 bg-blue-500"
                  layoutId="underline"
                />
              )}
            </motion.button>
          ))}
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          layout
        >
          <AnimatePresence>
            {filteredNotes[activeTab.toLowerCase()].map(note => (
              <motion.div
                key={note.$id}
                variants={noteVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                layout
              >
                <NoteCard note={note} user={user} type={activeTab} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <AnimatePresence>
        {showNewNoteCard && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4"
          >
            <NewNoteCard
              onClose={() => setShowNewNoteCard(false)}
              type="NEW"
              user={user}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};