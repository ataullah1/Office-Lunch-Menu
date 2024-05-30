import { useQuery } from '@tanstack/react-query';
import useAxiosPub from '../../Hooks/useAxiosPub';

const TodayOrders = () => {
  const axioss = useAxiosPub();
  const { data: todauOrders = [] } = useQuery({
    queryKey: ['todayOrder'],
    queryFn: async () => {
      const { data } = await axioss.get('/orders');
      return data;
    },
  });
  console.log(todauOrders);
  return (
    <div className="p-5">
      <h1 className="pt-3 pb-5 text-3xl text-slate-700">Today Orders</h1>
      <div className="flex flex-col">
        <div className="py-2 -my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
          <div className="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg">
           <div className='flex flex-col gap-5'>
            <div className='w-full'>
              
            </div>
           </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodayOrders;
