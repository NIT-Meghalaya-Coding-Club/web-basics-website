"use client";

import { useEffect, useRef } from "react";
import { EditorState } from "@codemirror/state";
import { EditorView, keymap } from "@codemirror/view";
import { defaultKeymap, indentWithTab } from "@codemirror/commands";
import { html } from "@codemirror/lang-html";
import { css } from "@codemirror/lang-css";
import { javascript } from "@codemirror/lang-javascript";
import { oneDark } from "@codemirror/theme-one-dark";

type Language = "html" | "css" | "javascript";

interface CodeEditorProps {
  value: string;
  language: Language;
  onChange: (value: string) => void;
}

export default function CodeEditor({
  value,
  language,
  onChange,
}: CodeEditorProps) {
  const editorContainer = useRef<HTMLDivElement>(null);
  const editorView = useRef<EditorView | null>(null);

  useEffect(() => {
    if (!editorContainer.current) return;

    let languageExtension;

    if (language === "html") {
      languageExtension = html();
    } else if (language === "css") {
      languageExtension = css();
    } else {
      languageExtension = javascript();
    }

    const state = EditorState.create({
      doc: value,
      extensions: [
        keymap.of([
          ...defaultKeymap,
          indentWithTab,
        ]),

        languageExtension,

        oneDark,

        EditorView.updateListener.of((update) => {
          if (update.docChanged) {
            onChange(update.state.doc.toString());
          }
        }),
      ],
    });

    const view = new EditorView({
      state,
      parent: editorContainer.current,
    });

    editorView.current = view;

    return () => {
      view.destroy();
      editorView.current = null;
    };
  }, []);

  return (
    <div
      ref={editorContainer}
      className="h-full overflow-auto"
    />
  );
}