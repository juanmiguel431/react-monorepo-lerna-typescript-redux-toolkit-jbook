import { default as MDEditor } from '@uiw/react-md-editor';
import React, { useEffect, useRef, useState } from 'react';
import './text-editor.css';
import { Cell } from '../state';
import { useActions } from '../hooks/use-actions';

interface TextEditorProps {
  cell: Cell
}

const TextEditor: React.FC<TextEditorProps> = ({ cell }) => {
  const { updateCell } = useActions();
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
          value={cell.content}
          onChange={(value, event) => {
            updateCell({ id: cell.id, content: value || '' });
          }}
        />
      </div>
    );
  }

  return (
    <div
      className="text-editor card"
      onClick={_ => setEditing(true)}
    >
      <div className="card-content">
        <MDEditor.Markdown source={cell.content || 'Click to edit'}/>
      </div>
    </div>
  );
}

export default TextEditor;
