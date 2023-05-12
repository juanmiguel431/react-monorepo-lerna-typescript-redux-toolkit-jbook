import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Cell } from '../cell';
import { InsertNewCellPayload, MoveCellPayload, UpdateCellPayload } from '../actions';

interface CellsState {
  loading: boolean;
  error: string | null;
  order: string[];
  data: {
    [key: string]: Cell
  }
}

const initialState: CellsState = {
  loading: false,
  error: null,
  order: [],
  data: {}
}

const cellsSlice = createSlice({
  name: 'cells',
  initialState: initialState,
  reducers: {
    updateCell: (state, action: PayloadAction<UpdateCellPayload>) => {
      const { id, content } = action.payload;
      state.data[id].content = content;
    },
    deleteCell: (state, action: PayloadAction<string>) => {
      delete state.data[action.payload]
      state.order = state.order.filter(a => a !== action.payload);
    },
    moveCell: (state, action: PayloadAction<MoveCellPayload>) => {
      const { direction } = action.payload;

      const index = state.order.findIndex(a => a === action.payload.id);
      const targetIndex = direction === 'up' ? index - 1 : index + 1;

      if (targetIndex < 0 || targetIndex > state.order.length - 1) {
        return;
      }

      state.order[index] = state.order[targetIndex];
      state.order[targetIndex] = action.payload.id;
    },
    insertCellBefore: (state, action: PayloadAction<InsertNewCellPayload>) => {
      const cell: Cell = {
        type: action.payload.type,
        content: '',
        id: randomId()
      };

      state.data[cell.id] = cell;

      const foundIndex = state.order.findIndex(a => a === action.payload.id);
      if (foundIndex === -1) {
        state.order.push(cell.id);
      } else {
        state.order.splice(foundIndex, 0, cell.id);
      }
    },
    insertCellAfter: (state, action: PayloadAction<InsertNewCellPayload>) => {
      const cell: Cell = {
        type: action.payload.type,
        content: '',
        id: randomId()
      };

      state.data[cell.id] = cell;

      const foundIndex = state.order.findIndex(a => a === action.payload.id);
      if (foundIndex === -1) {
        state.order.unshift(cell.id);
      } else {
        state.order.splice(foundIndex + 1, 0, cell.id);
      }
    }
  },
});

const randomId = () => {
  return Math.random().toString(36).substring(2, 5);
}

export const actions = cellsSlice.actions;
export const cellsReducer = cellsSlice.reducer;
