import Editor from "./Editor";
import EditorNavbar from "../components/EditorNavbar";
import React from "react";

const TiptapEditor = () => {
  return (
    <>
      <EditorNavbar />
      <div className="mt-6 max-w-6xl mx-auto rounded-2xl overflow-hidden">
        <div className="flex h-[650px] 2xl:h-[800px]  w-full border-gray900 border-4 rounded-2xl">
          <Editor />
        </div>
      </div>
    </>
  );
};

export default TiptapEditor;
