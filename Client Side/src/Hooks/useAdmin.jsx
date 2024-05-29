import { useQuery } from '@tanstack/react-query';
import useAuth from './useAuth';
import useAxiosPub from './useAxiosPub';

const useAdmin = () => {
  const { userDta } = useAuth();
  const axioss = useAxiosPub();
  const { data: isAdmin = false } = useQuery({
    queryKey: [userDta?.email, 'isAdmin'],
    queryFn: async () => {
      const { data } = await axioss.get(`user/admin/${userDta.email}`);
      return data.admin;
    },
  });
  return isAdmin;
};

export default useAdmin;
