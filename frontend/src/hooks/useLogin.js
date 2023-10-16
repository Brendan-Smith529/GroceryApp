import { useState } from "react";
import { useAuthContext } from './useAuthContext';

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const login = async(email, password) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch('/api/user/login', {
      method: 'POST',
      body: JSON.stringify({email, password}),
      headers: {'Content-Type': 'application/JSON'}
    });

    const json = await response.json();
    
    if (!response.ok)
    {
      setIsLoading(false);
      setError(json.error);
    }

    if (response.ok)
    {
      // Save user to local storage
      localStorage.setItem('user', JSON.stringify(json));

      // Update auth context
      dispatch({type: 'LOGIN', payload: json});

      setIsLoading(false);
    }
  };

  return { login, isLoading, error };
};
