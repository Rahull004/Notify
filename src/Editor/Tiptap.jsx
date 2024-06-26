import { useEffect, useState } from "react";
import Editor from "./Editor";
import EditorNavbar from "../components/EditorNavbar";
import React from "react";


const TiptapEditor = () => {

  return (
    <>
      <div className="">
        <EditorNavbar />
        <Editor />
      </div>
    </>
  );
};

export default TiptapEditor;
