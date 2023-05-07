
// import { ActionType } from '../action-types';
import { CellTypes } from '../cell';

export type Direction = 'up' | 'down';

export interface MoveCellPayload {
  id: string;
  direction: Direction;
}

// export interface MoveCellAction {
//   type: ActionType.MOVE_CELL,
//   payload: MoveCellPayload
// }

// export interface DeleteCellAction {
//   type: ActionType.DELETE_CELL,
//   payload: string;
// }

export interface InsertCellBeforePayload {
  id: string | null;
  type: CellTypes;
}

// export interface InsertCellBeforeAction {
//   type: ActionType.INSERT_CELL_BEFORE,
//   payload: InsertCellBeforePayload
// }

export interface UpdateCellPayload {
  id: string;
  content: string;
}

// export interface UpdateCellAction {
//   type: ActionType.UPDATE_CELL,
//   payload: UpdateCellPayload
// }

// export type Action = MoveCellAction | DeleteCellAction | InsertCellBeforeAction | UpdateCellAction;
