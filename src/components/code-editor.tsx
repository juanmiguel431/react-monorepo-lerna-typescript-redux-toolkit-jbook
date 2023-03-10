import { default as MonacoEditor, OnMount } from '@monaco-editor/react';
import React from 'react';
import prettier from 'prettier';
import parser from 'prettier/parser-babel';
import { useRef } from 'react';
import { editor } from 'monaco-editor';
import IStandaloneCodeEditor = editor.IStandaloneCodeEditor;
import './code-editor.css';
import { parse } from '@babel/parser';
import traverse from '@babel/traverse';
import MonacoJSXHighlighter from 'monaco-jsx-highlighter';
import './syntax.css';

interface IProps {
  initialValue?: string;

  onChange?(value: string): void;
}

const CodeEditor: React.FC<IProps> = ({ initialValue, onChange }) => {

  const editorRef = useRef<IStandaloneCodeEditor | null>(null);

  const onEditorMount: OnMount = (editor, monaco) => {
    editorRef.current = editor;
    editor.onDidChangeModelContent(() => {
      onChange && onChange(editor.getValue());
    });

    // editor.getModel()?.updateOptions({ tabSize: 2 });

    // @ts-ignore
    const monacoJSXHighlighter = new MonacoJSXHighlighter(window.monaco, parse, traverse, editor);
    monacoJSXHighlighter.highlightOnDidChangeModelContent(100);
  }

  function onFormatClick() {
    // get the current value of the editor
    const unformatted = editorRef.current?.getValue();

    if (unformatted === undefined) {
      return;
    }

    // format that value
    const formatted = prettier.format(unformatted, {
      parser: 'babel',
      plugins: [parser],
      useTabs: false,
      semi: true,
      singleQuote: true
    }).replace(/\n$/, '');

    // set the formatted valued back in the editor
    editorRef.current?.setValue(formatted);
  }

  return (
    <div className="editor-wrapper">
      <button className="button button-format is-primary is-small" onClick={onFormatClick}>Format</button>
      <MonacoEditor
        value={initialValue}
        onMount={onEditorMount}
        height="500px"
        language="javascript"
        theme="vs-dark"
        options={{
          wordWrap: 'on',
          minimap: { enabled: false },
          showUnused: false,
          folding: false,
          lineNumbersMinChars: 3,
          fontSize: 16,
          scrollBeyondLastLine: false,
          automaticLayout: true,
          tabSize: 2
        }}
      />
    </div>
  );
}

export default CodeEditor;
