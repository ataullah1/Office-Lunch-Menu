import { useMutation, useQuery } from '@tanstack/react-query';
import useAxiosPub from '../../Hooks/useAxiosPub';
import { ImSpinner3 } from 'react-icons/im';
import { useState } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import Swal from 'sweetalert2';

const TodayOrders = () => {
  const axioss = useAxiosPub();
  const [viewBtn, setViewBtn] = useState(null);

  const toggle = (id) => {
    if (viewBtn === id) {
      setViewBtn(null);
    } else {
      setViewBtn(id);
    }
  };
  const {
    data: todayOrders = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['todayOrder'],
    queryFn: async () => {
      const { data } = await axioss.get('/orders');
      return data;
    },
  });
  console.log(todayOrders);

  const { mutateAsync: update } = useMutation({
    mutationFn: async (statusDta) => {
      console.log(statusDta[0], statusDta[1]);
      const { data } = await axioss.patch(
        `/order-update?status=${statusDta[1]}&id=${statusDta[0]}`
      );
      console.log(data);
    },
    onSuccess: () => {
      refetch();
      console.log('Updated Order Status');
    },
  });
  //  handle status update ==========
  const handleStatus = async (id, statusDta) => {
    setViewBtn(null);
    console.log(id, statusDta);
    await update([id, statusDta]);
  };

  //  Delete Order======
  const { mutateAsync } = useMutation({
    mutationFn: async ({ id }) => {
      const { data } = await axioss.delete(`/my-order-delete/${id}`);
      console.log(data);
    },
    onSuccess: () => {
      refetch();
      console.log('Deleted Order');
    },
  });
  const handleDelete = (id) => {
    console.log(id);
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        await mutateAsync({ id });
        Swal.fire({
          title: 'Deleted!',
          text: 'Your order item has been deleted.',
          icon: 'success',
        });
      }
    });
  };

  return (
    <div className="p-5">
      <h1 className="pt-3 pb-5 text-3xl text-slate-700">Today Orders</h1>
      <div className="flex flex-col">
        <div className="py-2 -my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
          <div className="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg">
            <div className="flex flex-col gap-5">
              <table className="min-w-full">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50 ">
                      <span className="flex items-center gap-7">
                        <span>Item Image</span>
                        <span>Item Name</span>
                      </span>
                    </th>
                    <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                      Employee Name
                    </th>

                    <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                      Employee Email
                    </th>
                    <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                      Status
                    </th>

                    <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                      Action
                    </th>
                  </tr>
                </thead>

                {isLoading ? (
                  <div className="text-slate-800 m-14 text-center w-[60px] h-[60px] flex items-center justify-center text-8xl ">
                    <ImSpinner3 className="animate-spin" />
                  </div>
                ) : (
                  <tbody className="bg-white">
                    {todayOrders.map((dta) => (
                      <tr>
                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 w-24 h-20">
                              <img
                                className="w-24 h-20 rounded-md"
                                src={dta?.food_image}
                                alt=""
                              />
                            </div>

                            <div className="ml-4">
                              <div className="text-sm font-medium leading-5 text-gray-900">
                                {dta?.food_name}
                              </div>
                            </div>
                          </div>
                        </td>

                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                          <div className="text-sm leading-5 text-gray-900">
                            {dta?.userName}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                          <div className="text-sm leading-5 text-gray-900">
                            {dta?.userEmail}
                          </div>
                        </td>

                        <td className="px-6 py-4 text-sm leading-5 text-gray-500 whitespace-no-wrap border-b border-gray-200">
                          <div className="flex items-center gap-2">
                            <div
                              className={
                                dta.status === 'panding'
                                  ? 'h-3 w-3 rounded-full bg-[#F97316]'
                                  : dta.status === 'processing'
                                  ? 'h-3 w-3 rounded-full bg-yellow-400'
                                  : 'h-3 w-3 rounded-full bg-[#10B981]'
                              }
                            ></div>
                            {dta?.status}
                          </div>
                        </td>

                        <td className="px-6 relative py-4 text-sm font-medium leading-5 text-right whitespace-no-wrap border-b border-gray-200">
                          <button
                            onClick={() => toggle(dta._id)}
                            className={`text-xl text-indigo-600 hover:text-indigo-900`}
                          >
                            <BsThreeDotsVertical />
                          </button>

                          {viewBtn === dta._id && (
                            <div className="absolute z-20 top-[65px] right-[35px] w-36 border border-stone-600 rounded-md p-1 bg-white">
                              {dta.status !== 'panding' && (
                                <button
                                  onClick={() =>
                                    handleStatus(dta._id, 'panding')
                                  }
                                  className="py-2 w-full shadow-md shadow-slate-400 hover:shadow-slate-600 rounded-md"
                                >
                                  Pandding
                                </button>
                              )}
                              {dta.status !== 'processing' && (
                                <button
                                  onClick={() =>
                                    handleStatus(dta._id, 'processing')
                                  }
                                  className="py-2 w-full shadow-md shadow-slate-400 hover:shadow-slate-600 rounded-md"
                                >
                                  Processing
                                </button>
                              )}
                              {dta.status !== 'completed' && (
                                <button
                                  onClick={() =>
                                    handleStatus(dta._id, 'completed')
                                  }
                                  className="py-2 w-full shadow-md shadow-slate-400 hover:shadow-slate-600 rounded-md"
                                >
                                  Completed
                                </button>
                              )}
                              <button
                                onClick={() => handleDelete(dta._id)}
                                className="py-2 w-full shadow-md shadow-slate-400 hover:shadow-slate-600 rounded-md bg-red-500 text-white mt-2"
                              >
                                Delete
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                )}
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodayOrders;
