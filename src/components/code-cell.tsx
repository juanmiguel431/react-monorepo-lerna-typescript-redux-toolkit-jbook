import React, { useEffect, useState } from 'react';
import CodeEditor from './code-editor';
import Preview from './preview';
import bundle from '../bundler';
import Resizable from './resizable';
import { Cell } from '../state';
import { useActions } from '../hooks/use-actions';

interface CodeCellProps {
  cell: Cell;
}

export const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {

  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState('');
  const [error, setError] = useState('');

  const { updateCell } = useActions();

  useEffect(() => {
    const timer = setTimeout(async () => {
      try {
        setLoading(true);
        const output = await bundle(cell.content);
        setCode(output.code);
        setError(output.error);
      } finally {
        setLoading(false);
      }
    }, 1000);

    return () => {
      clearTimeout(timer);
    }
  }, [cell.content]);

  return (
    <div className="code-cell">
      <Resizable direction="vertical">
        <div style={{ height: 'calc(100% - 10px)', display: 'flex', flexDirection: 'row' }}>
          <Resizable direction="horizontal">
            <CodeEditor initialValue={cell.content} onChange={value => updateCell({ id: cell.id, content: value })}/>
          </Resizable>
          <Preview code={code} bundlingStatus={error}/>
        </div>
      </Resizable>
    </div>
  );
}

export default CodeCell;
