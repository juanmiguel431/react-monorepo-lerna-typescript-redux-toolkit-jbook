import { default as MonacoEditor } from '@monaco-editor/react';

const CodeEditor = () => {
  return (
    <MonacoEditor
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
        automaticLayout: true
      }}
    />
  );
}

export default CodeEditor;
