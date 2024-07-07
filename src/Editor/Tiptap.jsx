import Editor from "./Editor";
import EditorNavbar from "../components/EditorNavbar";
import React from "react";
import { useUserContext } from "../AuthContext";
import { useNavigate } from "react-router";

const TiptapEditor = () => {
  const {user,isLoading} = useUserContext()
  const navigate = useNavigate()
  const id = window.location.pathname.split("/")[2]

  if(user.email === "" && !isLoading) {
    navigate("/signin")
  }
  return (
    <>
      <EditorNavbar />
      <div className="mt-6 max-w-6xl mx-auto rounded-2xl overflow-hidden">
        <div className="flex h-[650px] 2xl:h-[800px]  w-full border-gray900 border-4 rounded-2xl">
          <Editor user={user} id={id}/>
        </div>
      </div>
    </>
  );
};

export default TiptapEditor;
