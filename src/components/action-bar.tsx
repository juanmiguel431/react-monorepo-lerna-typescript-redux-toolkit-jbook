import React from 'react';
import { useActions } from '../hooks/use-actions';
import IconButton from './icon-button';
import './action-bar.css';

interface ActionBarProps {
  id: string;
}

const ActionBar: React.FC<ActionBarProps> = ({ id }) => {

  const { deleteCell, moveCell } = useActions();

  return (
    <div className="action-bar">
      <IconButton icon="fas fa-arrow-up" onClick={() => moveCell({ id: id, direction: 'up' })}/>
      <IconButton icon="fas fa-arrow-down" onClick={() => moveCell({ id: id, direction: 'down' })}/>
      <IconButton icon="fas fa-times" onClick={() => deleteCell(id)}/>
    </div>
  );
}

export default ActionBar;
