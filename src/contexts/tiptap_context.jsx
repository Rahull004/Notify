import React, { createContext, useEffect, useState } from "react";
import { common, createLowlight } from "lowlight";
import { useEditor } from "@tiptap/react";
import { Color } from "@tiptap/extension-color";
import TextStyle from "@tiptap/extension-text-style";
import ListItem from "@tiptap/extension-list-item";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import Image from "@tiptap/extension-image";
import Underline from "@tiptap/extension-underline";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import Highlight from "@tiptap/extension-highlight";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import Gapcursor from "@tiptap/extension-gapcursor";
import Table from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableHeader from "@tiptap/extension-table-header";
import TableCell from "@tiptap/extension-table-cell";
import { debounce } from "lodash";

const TiptapContext = createContext({
  editor: null,
  content: "",
  setContent: () => {},
  htmlContent: "",
  setHtmlContent: () => {},
});

function TiptapProvider({ children, onUpdate }) {
  const [content, setContent] = useState("");
  const [htmlContent, setHtmlContent] = useState("");

  const debouncedUpdate = debounce(({ editor }) => {
    const json = editor.getJSON();
    setContent(json);
    setHtmlContent(editor.getHTML());
    if (onUpdate) {
      onUpdate({ content: json, htmlContent: editor.getHTML() });
    }
  }, 500);

  const lowlight = createLowlight(common);

  const editor = useEditor({
    extensions: [
      Color.configure({ types: [TextStyle.name, ListItem.name] }),
      TextStyle.configure({ types: [ListItem.name] }),
      StarterKit.configure({
        bulletList: {
          keepMarks: true,
          keepAttributes: false,
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false,
        },
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Image.configure({
        inline: true,
        allowBase64: true,
      }),
      Underline.configure({
        HTMLAttributes: {
          class: "my-custom-class",
        },
      }),
      CodeBlockLowlight.configure({
        lowlight,
      }),
      Highlight,
      Document,
      Paragraph,
      Text,
      Gapcursor,
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
    ],
    editorProps: {
      attributes: {
        class: "m-2 focus:outline-none",
      },
    },
    content,
    onUpdate: debouncedUpdate,
  });

  return (
    <TiptapContext.Provider
      value={{
        editor,
        content,
        setContent,
        htmlContent,
        setHtmlContent,
      }}
    >
      {children}
    </TiptapContext.Provider>
  );
}

export { TiptapProvider, TiptapContext };
