import { useEffect, useState } from "react";
import EditorComponent from "./Editor";
import EditorNavbar from "../components/EditorNavbar";
import React from "react";


const TiptapEditor = () => {

  return (
    <>
      <div className="">
        <EditorNavbar />
        <EditorComponent />
      </div>
    </>
  );
};

export default TiptapEditor;
