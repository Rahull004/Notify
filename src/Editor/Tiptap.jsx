import React, { useState, useEffect } from "react";
import { useUserContext } from "../AuthContext";
import { useNavigate } from "react-router";
import Editor from "./Editor";
import EditorNavbar from "../components/EditorNavbar";
import { TiptapProvider } from "../contexts/tiptap_context";
import { getDraft, getNote, updateDraft, updateNote } from "../appwrite/api";

const TiptapEditor = () => {
  const { user, isLoading } = useUserContext();
  const navigate = useNavigate();
  const [draft, setDraft] = useState(null);
  const [note, setnote] = useState(null);

    const id = window.location.pathname.split("/")[2];
    const type = window.location.pathname.split("/")[1];

  console.log(type);

  useEffect(() => {
    const fetchDraft = async () => {
      const currDraft = await getDraft(id);
      setnote(currDraft)
      setDraft(currDraft.body);
    };
    const fetchNote = async () => {
      const currNote = await getNote(id);
      setnote(currNote);
      setDraft(currNote.body);
    };
    if(type==="note") {
      fetchNote()
    } else {
      fetchDraft()
    }
  }, []);

  console.log(draft);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!user) {
    navigate("/login");
    return null;
  }



  const handleBodyChange = async ({ content }) => {
    try {
      if (type === "note") {
        const updatedNote = await updateNote(content, id);
        return updatedNote;
      } else {
        const updatedDraft = await updateDraft(content, id);
        return updatedDraft;
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  return (
    <div>
      <EditorNavbar note={note}/>
      <TiptapProvider onUpdate={({ content }) => handleBodyChange({ content })}>
        <div className="mt-6 max-w-6xl mx-auto rounded-2xl overflow-hidden">
          <div className="flex h-[650px] 2xl:h-[800px] w-full border-gray900 border-4 rounded-2xl">
            <Editor id={id} user={user} body={draft} />
          </div>
        </div>
      </TiptapProvider>
    </div>
  );
};

export default TiptapEditor;
