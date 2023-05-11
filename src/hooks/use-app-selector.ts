import { useSelector, TypedUseSelectorHook } from 'react-redux';
import { RootState } from '../state';

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
