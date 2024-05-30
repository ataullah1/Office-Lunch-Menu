import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import useAxiosPub from '../../../Hooks/useAxiosPub';
import Swal from 'sweetalert2';
import { ImSpinner3 } from 'react-icons/im';

const DashboardHome = () => {
  const [viewBtn, setViewBtn] = useState(null);
  const axioss = useAxiosPub();
  const queryClient = useQueryClient();

  const toggle = (id) => {
    if (viewBtn === id) {
      setViewBtn(null);
    } else {
      setViewBtn(id);
    }
  };

  const {
    data: employees = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ['employees'],
    queryFn: async () => {
      const { data } = await axioss.get('/employees');
      return data;
    },
  });

  // Handle admin ======
  const { mutateAsync } = useMutation({
    mutationFn: async (dta) => {
      console.log(dta[0], dta[1]);
      const { data } = await axioss.patch(
        `/change-power?power=${dta[0]}&id=${dta[1]}`
      );
      console.log(data);
    },
    onSuccess: () => {
      refetch();
      queryClient.invalidateQueries(['employees']);
      console.log('Updated Power');
    },
  });
  const handleAddAdmin = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Are you sure you want to admin ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Add Admin!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        await mutateAsync(['admin', id]);
        toggle(id);
        toast.success('Successfully Admin.');
      }
    });
  };
  const handleRemoveAdmin = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Are you sure you want to remove admin?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Remove Admin!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        await mutateAsync(['employee', id]);
        toast.success('Successfully Remove Admin');
        toggle(id);
      }
    });
  };
  if (isError || error) {
    Swal.fire({
      title: 'Network Error',
      text: `Check network, ${error.message}`,
    });
  }

  const { data: orderLength = 0 } = useQuery({
    queryKey: ['order_length'],
    queryFn: async () => {
      const { data } = await axioss.get('/orders-length');
      return data;
    },
  });
  const { data: totalItem = 0 } = useQuery({
    queryKey: ['totalItem'],
    queryFn: async () => {
      const { data } = await axioss.get('/totalItem');
      return data;
    },
  });
  //   console.log(orderLength);
  return (
    <div className="flex flex-col flex-1 min-h-full overflow-y-auto overflow-x-hidden">
      <main className="flex-1 bg-gray-200 rounded-md">
        <div className="container px-6 py-8 mx-auto">
          <h3 className="text-3xl font-medium text-gray-700">Dashboard</h3>

          <div className="mt-4">
            <div className="flex flex-wrap -mx-6">
              <div className="w-full px-6 sm:w-1/2 xl:w-1/3">
                <div className="flex items-center px-5 py-6 bg-white rounded-md shadow-sm">
                  <div className="p-3 bg-indigo-600 bg-opacity-75 rounded-full">
                    <svg
                      className="w-8 h-8 text-white"
                      viewBox="0 0 28 30"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M18.2 9.08889C18.2 11.5373 16.3196 13.5222 14 13.5222C11.6804 13.5222 9.79999 11.5373 9.79999 9.08889C9.79999 6.64043 11.6804 4.65556 14 4.65556C16.3196 4.65556 18.2 6.64043 18.2 9.08889Z"
                        fill="currentColor"
                      ></path>
                      <path
                        d="M25.2 12.0444C25.2 13.6768 23.9464 15 22.4 15C20.8536 15 19.6 13.6768 19.6 12.0444C19.6 10.4121 20.8536 9.08889 22.4 9.08889C23.9464 9.08889 25.2 10.4121 25.2 12.0444Z"
                        fill="currentColor"
                      ></path>
                      <path
                        d="M19.6 22.3889C19.6 19.1243 17.0927 16.4778 14 16.4778C10.9072 16.4778 8.39999 19.1243 8.39999 22.3889V26.8222H19.6V22.3889Z"
                        fill="currentColor"
                      ></path>
                      <path
                        d="M8.39999 12.0444C8.39999 13.6768 7.14639 15 5.59999 15C4.05359 15 2.79999 13.6768 2.79999 12.0444C2.79999 10.4121 4.05359 9.08889 5.59999 9.08889C7.14639 9.08889 8.39999 10.4121 8.39999 12.0444Z"
                        fill="currentColor"
                      ></path>
                      <path
                        d="M22.4 26.8222V22.3889C22.4 20.8312 22.0195 19.3671 21.351 18.0949C21.6863 18.0039 22.0378 17.9556 22.4 17.9556C24.7197 17.9556 26.6 19.9404 26.6 22.3889V26.8222H22.4Z"
                        fill="currentColor"
                      ></path>
                      <path
                        d="M6.64896 18.0949C5.98058 19.3671 5.59999 20.8312 5.59999 22.3889V26.8222H1.39999V22.3889C1.39999 19.9404 3.2804 17.9556 5.59999 17.9556C5.96219 17.9556 6.31367 18.0039 6.64896 18.0949Z"
                        fill="currentColor"
                      ></path>
                    </svg>
                  </div>

                  <div className="mx-5">
                    <h4 className="text-2xl font-semibold text-gray-700">
                      {employees.length < 9
                        ? `0${employees.length}`
                        : employees.length}
                    </h4>
                    <div className="text-gray-500">Total Users</div>
                  </div>
                </div>
              </div>

              <div className="w-full px-6 mt-6 sm:w-1/2 xl:w-1/3 sm:mt-0">
                <div className="flex items-center px-5 py-6 bg-white rounded-md shadow-sm">
                  <div className="p-3 bg-orange-600 bg-opacity-75 rounded-full">
                    <svg
                      className="w-8 h-8 text-white"
                      viewBox="0 0 28 28"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M4.19999 1.4C3.4268 1.4 2.79999 2.02681 2.79999 2.8C2.79999 3.57319 3.4268 4.2 4.19999 4.2H5.9069L6.33468 5.91114C6.33917 5.93092 6.34409 5.95055 6.34941 5.97001L8.24953 13.5705L6.99992 14.8201C5.23602 16.584 6.48528 19.6 8.97981 19.6H21C21.7731 19.6 22.4 18.9732 22.4 18.2C22.4 17.4268 21.7731 16.8 21 16.8H8.97983L10.3798 15.4H19.6C20.1303 15.4 20.615 15.1004 20.8521 14.6261L25.0521 6.22609C25.2691 5.79212 25.246 5.27673 24.991 4.86398C24.7357 4.45123 24.2852 4.2 23.8 4.2H8.79308L8.35818 2.46044C8.20238 1.83722 7.64241 1.4 6.99999 1.4H4.19999Z"
                        fill="currentColor"
                      ></path>
                      <path
                        d="M22.4 23.1C22.4 24.2598 21.4598 25.2 20.3 25.2C19.1403 25.2 18.2 24.2598 18.2 23.1C18.2 21.9402 19.1403 21 20.3 21C21.4598 21 22.4 21.9402 22.4 23.1Z"
                        fill="currentColor"
                      ></path>
                      <path
                        d="M9.1 25.2C10.2598 25.2 11.2 24.2598 11.2 23.1C11.2 21.9402 10.2598 21 9.1 21C7.9402 21 7 21.9402 7 23.1C7 24.2598 7.9402 25.2 9.1 25.2Z"
                        fill="currentColor"
                      ></path>
                    </svg>
                  </div>

                  <div className="mx-5">
                    <h4 className="text-2xl font-semibold text-gray-700">
                      {orderLength.totalOrder < 9
                        ? `0${orderLength.totalOrder}`
                        : orderLength.totalOrder}
                    </h4>
                    <div className="text-gray-500">Total Orders</div>
                  </div>
                </div>
              </div>

              <div className="w-full px-6 mt-6 sm:w-1/2 xl:w-1/3 xl:mt-0">
                <div className="flex items-center px-5 py-6 bg-white rounded-md shadow-sm">
                  <div className="p-3 bg-pink-600 bg-opacity-75 rounded-full">
                    <svg
                      className="w-8 h-8 text-white"
                      viewBox="0 0 28 28"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6.99998 11.2H21L22.4 23.8H5.59998L6.99998 11.2Z"
                        fill="currentColor"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linejoin="round"
                      ></path>
                      <path
                        d="M9.79999 8.4C9.79999 6.08041 11.6804 4.2 14 4.2C16.3196 4.2 18.2 6.08041 18.2 8.4V12.6C18.2 14.9197 16.3196 16.8 14 16.8C11.6804 16.8 9.79999 14.9197 9.79999 12.6V8.4Z"
                        stroke="currentColor"
                        stroke-width="2"
                      ></path>
                    </svg>
                  </div>

                  <div className="mx-5">
                    <h4 className="text-2xl font-semibold text-gray-700">
                      {totalItem.totalItem < 9
                        ? `0${totalItem.totalItem}`
                        : totalItem.totalItem}
                    </h4>
                    <div className="text-gray-500">Total Items</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8"></div>

          <div className="flex flex-col mt-8">
            <div className="py-2 -my-2 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
              <div className="inline-block min-w-full align-middle border-b border-gray-200 shadow sm:rounded-lg">
                <table className="min-w-full">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                        Name
                      </th>
                      <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                        Email
                      </th>
                      <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                        Status
                      </th>
                      <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                        Role
                      </th>
                      <th className="px-6 py-3 border-b border-gray-200 bg-gray-50"></th>
                    </tr>
                  </thead>

                  {isLoading ? (
                    <div className="text-slate-800 m-14 text-center w-[60px] h-[60px] flex items-center justify-center text-8xl ">
                      <ImSpinner3 className="animate-spin" />
                    </div>
                  ) : (
                    <tbody className="bg-white">
                      {employees.slice(0, 6).map((dta) => (
                        <tr>
                          <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 w-10 h-10">
                                <img
                                  className="w-10 h-10 rounded-full"
                                  src={dta?.employeePhoto}
                                  alt=""
                                />
                              </div>

                              <div className="ml-4">
                                <div className="text-sm font-medium leading-5 text-gray-900">
                                  {dta?.employeeName}
                                </div>
                              </div>
                            </div>
                          </td>

                          <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                            <div className="text-sm leading-5 text-gray-900">
                              {dta?.employeeEmail}
                            </div>
                          </td>

                          <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                            <span className="inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full">
                              Active
                            </span>
                          </td>

                          <td className="px-6 py-4 text-sm leading-5 text-gray-500 whitespace-no-wrap border-b border-gray-200">
                            {dta.superPower ? dta.superPower : dta.power}
                          </td>

                          <td className="px-6 relative py-4 text-sm font-medium leading-5 text-right whitespace-no-wrap border-b border-gray-200">
                            <button
                              disabled={dta.superPower}
                              onClick={() => toggle(dta._id)}
                              className={
                                dta.superPower
                                  ? 'text-slate-300'
                                  : `text-indigo-600 hover:text-indigo-900`
                              }
                            >
                              Edit
                            </button>

                            {viewBtn === dta._id && (
                              <div className="absolute z-20 top-10 right-12">
                                {dta.power === 'admin' ? (
                                  <button
                                    onClick={() => handleRemoveAdmin(dta._id)}
                                    className="py-2 w-28 border bg-white rounded-md "
                                  >
                                    Remove Admin
                                  </button>
                                ) : (
                                  <button
                                    onClick={() => handleAddAdmin(dta._id)}
                                    className="py-2 w-24 border bg-white rounded-md "
                                  >
                                    Add Admin
                                  </button>
                                )}
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
      </main>
    </div>
  );
};

export default DashboardHome;
