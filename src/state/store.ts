import { configureStore } from '@reduxjs/toolkit'
import { cellsReducer } from './reducers';

export const store = configureStore({
  reducer: {
    cells: cellsReducer
  },
})

//https://react-redux.js.org/using-react-redux/usage-with-typescript#define-root-state-and-dispatch-types
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
