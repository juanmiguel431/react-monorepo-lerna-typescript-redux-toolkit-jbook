import { default as MonacoEditor, OnMount } from '@monaco-editor/react';
import React from 'react';

interface IProps {
  initialValue?: string;

  onChange?(value: string): void;
}

const CodeEditor: React.FC<IProps> = ({ initialValue, onChange }) => {

  const onEditorMount: OnMount = (editor, monaco) => {
    editor.onDidChangeModelContent(() => {
      onChange && onChange(editor.getValue());
    });

    // editor.getModel()?.updateOptions({ tabSize: 2 });
  }

  return (
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
  );
}

export default CodeEditor;
