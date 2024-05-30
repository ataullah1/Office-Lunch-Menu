import { useMutation, useQuery } from '@tanstack/react-query';
import useAxiosPub from '../../Hooks/useAxiosPub';
import { ImSpinner3 } from 'react-icons/im';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { useState } from 'react';
import Swal from 'sweetalert2';

const TodayAllItems = () => {
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
    data: allItem = [],
    isError,
    error,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['today-menu'],
    queryFn: async () => {
      const { data } = await axioss.get('/today-menu');
      return data;
    },
  });

  //  Delete Order======
  const { mutateAsync } = useMutation({
    mutationFn: async ({ id }) => {
      const { data } = await axioss.delete(`/item-delete/${id}`);
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

  if ((error, isError)) {
    return <Error />;
  }

  return (
    <div className="p-5">
      <h1 className="pt-3 pb-5 text-3xl text-slate-700">Today All Items</h1>
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
                      Item Description
                    </th>

                    <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                      Item Ingredients
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
                    {allItem.map((dta) => (
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
                            {dta?.food_description}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                          <div className="text-sm leading-5 text-gray-900">
                            {dta?.food_ingredients}
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
                              <button
                                onClick={() => handleUpdate(dta._id)}
                                className="py-2 w-full shadow-md shadow-slate-400 hover:shadow-slate-600 rounded-md"
                              >
                                Update
                              </button>

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

export default TodayAllItems;
