import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import useAxiosPub from '../../Hooks/useAxiosPub';
import { useState } from 'react';
import Swal from 'sweetalert2';
import { ImSpinner3 } from 'react-icons/im';

const AllEmployee = () => {
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

  return (
    <div className="p-5">
      <h1 className="pt-3 pb-5 text-3xl text-slate-700">All Employee</h1>
      <div className="flex flex-col">
        <div className="py-2 -my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
          <div className="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg">
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
                <div className="m-14 text-center w-[60px] h-[60px] flex items-center justify-center text-8xl text-white">
                  <ImSpinner3 className="animate-spin" />
                </div>
              ) : (
                <tbody className="bg-white">
                  {employees.map((dta) => (
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
  );
};

export default AllEmployee;
