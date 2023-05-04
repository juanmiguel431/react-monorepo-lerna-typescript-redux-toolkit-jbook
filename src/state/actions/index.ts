
import { ActionTypes } from '../action-types';
import { CellTypes } from '../cell';

interface MoveCellAction {
  type: ActionTypes.MOVE_CELL,
  payload: {
    id: string;
    direction: 'up' | 'down';
  }
}

interface DeleteCellAction {
  type: ActionTypes.DELETE_CELL,
  payload: string;
}

interface InsertCellBeforeAction {
  type: ActionTypes.INSERT_CELL_BEFORE,
  payload: {
    id: string;
    type: CellTypes;
  }
}

interface UpdateCellAction {
  type: ActionTypes.UPDATE_CELL,
  payload: {
    id: string;
    content: string;
  }
}

export type Action = MoveCellAction | DeleteCellAction | InsertCellBeforeAction | UpdateCellAction;
