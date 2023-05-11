import React from 'react';
import { useAppSelector } from '../hooks/use-app-selector';
import CellListItem from './cell-list-item';
import AddCell from './add-cell';

const CellList: React.FC = () => {
  const cells = useAppSelector(({ cells: { order, data } }) => order.map((id) => data[id]));

  const renderedCells = cells.map(cell => (
    <React.Fragment key={cell.id}>
      <CellListItem cell={cell}/>
      <AddCell previousCellId={cell.id}/>
    </React.Fragment>
  ));

  return (
    <div className="cell-list">
      <AddCell forceVisible={cells.length === 0} previousCellId={null}/>
      {renderedCells}
    </div>
  );
}

export default CellList;
