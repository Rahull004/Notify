import React, { useState, useEffect } from "react";
import { useUserContext } from "../AuthContext";
import { useNavigate } from "react-router";
import Editor from "./Editor";
import EditorNavbar from "../components/EditorNavbar";
import { TiptapProvider } from "../contexts/tiptap_context";
import { getDraft, getNote, updateDraft, updateNote } from "../appwrite/api";
import { RingLoader } from "react-spinners";

const TiptapEditor = () => {
  const { user, isLoading } = useUserContext();
  const navigate = useNavigate();
  const [draft, setDraft] = useState(null);
  const [note, setnote] = useState(null);
  const id = window.location.pathname.split("/")[2];
  const type = window.location.pathname.split("/")[1];

  useEffect(() => {
    const fetchDraft = async () => {
      if(type==="note"){
        const note = await getNote(id);
        setnote(note);
      } else {
        const draft = await getDraft(id);
        setDraft(draft);
      }
    };
    fetchDraft();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center w-screen h-screen">
        <RingLoader color="#0362e9" loading size={120} speedMultiplier={1} />.
      </div>
    );
  }

  if (!user) {
    navigate("/login");
    return null;
  }

  const handleBodyChange = async (body) => {
    try {
      console.log(body.content);
      
      const updatedDraft = await updateDraft(body.content, id);
      return updatedDraft;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  return (
    <div>
      {type === "note" ? (
        <EditorNavbar note={note} type={type} />
      ) : (
        <EditorNavbar note={draft} type={type} />
      )}
      <TiptapProvider onUpdate={(body) => handleBodyChange(body)}>
        <div className="mt-6 max-w-6xl mx-auto rounded-2xl overflow-hidden">
          <div className="flex h-[600px] 2xl:h-[800px] w-full border-gray900 border-4 rounded-2xl">
            {type === "note" ? (
              <Editor body={note?.body} id={id} user={user} note={note} type={type} />
            ) : (
              <Editor body={draft?.body} id={id} user={user} note={draft} type={type} />
            )}
          </div>
        </div>
      </TiptapProvider>
    </div>
  );
};

export default TiptapEditor;
