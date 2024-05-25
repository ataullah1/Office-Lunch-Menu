import { useContext } from 'react';
import { ContextAuth } from '../provider/Provider';

const useAuth = () => {
  const data = useContext(ContextAuth);
  return data;
};

export default useAuth;
