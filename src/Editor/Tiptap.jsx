import React, { useState, useEffect, useCallback } from "react";
import { useUserContext } from "../AuthContext";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { RingLoader } from "react-spinners";
import { ArrowLeftIcon, ExclamationTriangleIcon, DocumentTextIcon } from "@heroicons/react/24/outline";
import Editor from "./Editor";
import EditorNavbar from "../components/EditorNavbar";
import { TiptapProvider } from "../contexts/tiptap_context";
import { getDraft, getNote, updateDraft } from "../appwrite/api";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BookOpenIcon } from "@heroicons/react/24/outline";

const TiptapEditor = () => {
  const { user, isLoading: authLoading } = useUserContext();
  const navigate = useNavigate();
  const [draft, setDraft] = useState(null);
  const [note, setNote] = useState(null);
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState(null);

  const id = window.location.pathname.split("/")[2];
  const type = window.location.pathname.split("/")[1];
  const isOwner = type === "note"
    ? note?.user?.$id === user?.$id
    : draft?.user?.$id === user?.$id;

  const fetchContent = useCallback(async () => {
    try {
      setIsFetching(true);
      setError(null);

      if (type === "note") {
        const data = await getNote(id);
        setNote(data);
      } else {
        const data = await getDraft(id);
        setDraft(data);
      }
    } catch (err) {
      setError(err.message);
      console.error("Fetch error:", err);
    } finally {
      setIsFetching(false);
    }
  }, [id, type]);

  useEffect(() => {
    if (user) fetchContent();
  }, [user, fetchContent]);

  const handleBodyChange = useCallback(async (body) => {
    try {
      return await updateDraft(body.content, id);
    } catch (err) {
      console.error("Update error:", err);
      return null;
    }
  }, [id]);

  if (authLoading) {
    return (
      <div className="flex justify-center items-center w-screen h-screen">
        <RingLoader color="#0362e9" loading size={120} speedMultiplier={1} />
      </div>
    );
  }

  if (!user) {
    navigate("/login");
    return null;
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {type === "note" ? (
        <EditorNavbar note={note} type={type} />
      ) : (
        <EditorNavbar note={draft} type={type} />
      )}

      <TiptapProvider onUpdate={handleBodyChange}>
        <main className="flex-1 px-4 sm:px-6 lg:px-8 py-8">
          <div className="max-w-7xl mx-auto space-y-8">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
            >
              <ArrowLeftIcon className="w-5 h-5" />
              Back to {type === "note" ? "Notes" : "Drafts"}
            </button>

            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="p-4 bg-red-50 text-red-700 rounded-xl border border-red-100"
                >
                  <p className="flex items-center gap-2">
                    <ExclamationTriangleIcon className="w-5 h-5" />
                    {error}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {type === "note" && (
              <AnimatePresence>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-8 relative overflow-hidden"
                >
                  {/* Animated background elements */}
                  <motion.div
                    animate={{
                      scale: [1, 1.1, 1],
                      rotate: [0, 2, -2, 0],
                    }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="absolute -top-32 -right-32 w-64 h-64 bg-blue-100/20 rounded-full blur-xl"
                  />

                  <div className="relative bg-gradient-to-br from-white to-blue-50 border border-gray-100 rounded-xl shadow-sm overflow-hidden group">
                    {/* Particle background */}
                    <div className="absolute inset-0 opacity-30">
                      {[...Array(12)].map((_, i) => (
                        <motion.div
                          key={i}
                          animate={{
                            y: [0, 15, 0],
                            x: [0, Math.random() * 20 - 10, 0],
                          }}
                          transition={{
                            duration: 4 + Math.random() * 4,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                          className="absolute w-2 h-2 bg-blue-300 rounded-full"
                          style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                          }}
                        />
                      ))}
                    </div>

                    <div className="relative z-10 px-8 py-12 text-center">
                      {/* Animated icon */}
                      <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="mb-6 flex justify-center"
                      >
                        <div className="p-4 bg-blue-100/50 rounded-2xl inline-flex">
                          <BookOpenIcon className="w-12 h-12 text-blue-600 transform transition-transform group-hover:scale-110" />
                        </div>
                      </motion.div>

                      {/* Title with staggered animation */}
                      <AnimatePresence>
                        <motion.h1
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 }}
                          className="text-3xl font-bold text-gray-800 mb-4"
                        >
                          {note?.title}
                        </motion.h1>
                      </AnimatePresence>

                      {/* Description with fade-in */}
                      <AnimatePresence>
                        {note?.description && (
                          <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed"
                          >
                            {note.description}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>

                  {/* Animated separator */}
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 0.8 }}
                    className="relative h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent"
                  >
                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-blue-100 rounded-full border-2 border-blue-200" />
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            )}

            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              {isFetching ? (
                <div className="h-[600px] flex items-center justify-center">
                  <RingLoader color="#3b82f6" size={60} />
                </div>
              ) : (
                <ScrollArea className="h-[calc(100vh-220px)]">
                  <div className="p-6">
                    {type === "note" ? (
                      <Editor
                        body={note?.body}
                        id={id}
                        user={user}
                        note={note}
                        type={type}
                        isOwner={isOwner}
                      />
                    ) : (
                      <Editor
                        body={draft?.body}
                        id={id}
                        user={user}
                        note={draft}
                        type={type}
                        isOwner={true}
                      />
                    )}
                  </div>
                </ScrollArea>
              )}
            </div>
          </div>
        </main>
      </TiptapProvider>
    </div>
  );
};

export default React.memo(TiptapEditor);