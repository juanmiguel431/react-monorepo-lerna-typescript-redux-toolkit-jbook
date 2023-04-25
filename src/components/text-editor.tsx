import { default as MDEditor } from '@uiw/react-md-editor';
import React, { useEffect, useRef, useState } from 'react';

const TextEditor: React.FC = () => {
  const [value, setValue] = useState<string | undefined>('JMPC');
  const [editing, setEditing] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (ref.current && event.target && ref.current.contains(event.target as Node)) {
        return;
      }

      setEditing(false);
    };

    document.addEventListener('click', listener, { capture: true });

    return () => {
      document.removeEventListener('click', listener, { capture: true });
    }
  }, []);

  if (editing) {
    return (
      <div className="text-editor" ref={ref}>
        <MDEditor
          value={value}
          onChange={(value, event) => {
            setValue(value);
          }}
        />
      </div>
    );
  }

  return (
    <div className="text-editor" onClick={_ => setEditing(true)}>
      <MDEditor.Markdown source={value}/>
    </div>
  );
}

export default TextEditor;