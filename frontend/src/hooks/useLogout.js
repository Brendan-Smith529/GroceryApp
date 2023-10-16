import { useAuthContext } from './useAuthContext';
import { useGroceriesContext } from './useGroceriesContext';

export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const { dispatch: groceriesDispatch } = useGroceriesContext();

  const logout = () => {
    // Remover user from local storage
    localStorage.removeItem('user');

    groceriesDispatch({type: 'SET_GROCERIES', payload: null});
    dispatch({type: 'LOGOUT'});
  }

  return {logout};
}
