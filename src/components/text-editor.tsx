import { default as MDEditor } from '@uiw/react-md-editor';
import React, { useState } from 'react';

const TextEditor: React.FC = () => {
  const [value, setValue] = useState<string | undefined>('');
  return (
    <div className="text-editor">
      <MDEditor
        value={value}
        onChange={(value, event) => {
          setValue(value);
        }}
      />
    </div>
  );
}

export default TextEditor;
