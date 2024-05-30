import MultyImageBanner from '../../components/MultyImageBanner/MultyImageBanner';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import useAxiosPub from '../../Hooks/useAxiosPub';
import Error from '../Error/Error';
import useAuth from '../../Hooks/useAuth';
import Swal from 'sweetalert2';
import { ImSpinner3 } from 'react-icons/im';
import { FaTrashAlt } from 'react-icons/fa';

const noDataImg =
  'https://img.freepik.com/free-vector/hand-drawn-no-data-illustration_23-2150570252.jpg?t=st=1716966151~exp=1716969751~hmac=292d7ef949cf63cbd60258b2fcf3a739db3599cd65048c87ed072ebe9195d48d&w=900';
const img1 =
  'https://img.freepik.com/free-photo/side-view-breakfast-table-served-with-various-food-fried-eggs-sausages-cheese-fresh-salad-dessert-tea_140725-11862.jpg?t=st=1716964983~exp=1716968583~hmac=31b7a2996c8fc93d2b1abb3008f92de2693372330cef975aca0009056179e761&w=900';

const img2 =
  'https://img.freepik.com/premium-photo/high-angle-view-food-table_1048944-9124875.jpg?w=900';
const img3 =
  'https://img.freepik.com/free-photo/lunch-setup-with-rice-chicken-skewers-greek-salad-lentil-soup_140725-6906.jpg?t=st=1716965052~exp=1716968652~hmac=d5f18f5a8a5cc6bab56a66ae82efdff5c2e43404950e35de0b1cdaddcccae0d6&w=740';
const img4 =
  'https://img.freepik.com/free-photo/dish-set-soup-salad-main-course-juice-bread_141793-17448.jpg?t=st=1716965077~exp=1716968677~hmac=ff8772adbfc95eb1d92a8790af9118c823862ce7063940028b83875588d0ade1&w=900';
const img5 =
  'https://img.freepik.com/free-photo/dinner-set-with-chicken-served-with-rice-french-fries-caesar-vegetable-salads-lemonade_140725-7825.jpg?t=st=1716965096~exp=1716968696~hmac=9d9f688e72f7ae277800cd7bd48eb441fe6cd08678a21312841aa5f6ed46f2f0&w=900';

const MyOrders = () => {
  const axioss = useAxiosPub();
  const { userDta } = useAuth();
  const queryClient = useQueryClient();

  const {
    data: my_order = [],
    isError,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['myOrder'],
    queryFn: async () => {
      const { data } = await axioss.get(`/orderDta/${userDta.email}`);
      return data;
    },
  });

  //  Delete Order======
  const { mutateAsync } = useMutation({
    mutationFn: async ({ id }) => {
      const { data } = await axioss.delete(`/my-order-delete/${id}`);
      console.log(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['myOrder']);
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
    <div>
      {/* Banner Part */}
      <div className="h-52 sm:h-72 w-full bg-red-200 relative">
        <MultyImageBanner
          img1={img1}
          img2={img2}
          img3={img3}
          img4={img4}
          img5={img5}
        />
        <div className="absolute z-10 top-0 left-0 bg-[#00000073] w-full h-full">
          <div className="h-full w-10/12 mx-auto flex items-center justify-center pt-10 sm:pt-20 text-center">
            <button className="text-3xl md:text-5xl font-bold">
              Today My Order
            </button>
          </div>
        </div>
      </div>

      {/* table part */}
      <div className="w-11/12 mx-auto">
        {/* Table Part */}
        <div className="w-full mx-auto pt-10">
          <div className="overflow-x-auto rounded-md">
            <table className="min-w-full border rounded-md">
              <thead>
                <tr className="rounded-md font-semibold">
                  <th className="px-4 py-3 text-xs font-medium leading-4 tracking-wider text-lefttext-slate-800 uppercase border-b border-gray-200 bg-gray-50 text-slate-800">
                    <span className="flex items-center gap-16">
                      <span>Image</span>
                      <span>Name</span>
                    </span>
                  </th>
                  <th className="px-4 py-3 text-xs font-medium leading-4 tracking-wider text-left text-slate-800 uppercase border-b border-gray-200 bg-gray-50">
                    Description
                  </th>

                  <th className="px-4 py-3 text-xs font-medium leading-4 tracking-wider text-left text-slate-800 uppercase border-b border-gray-200 bg-gray-50">
                    Ingredients
                  </th>
                  <th className="px-4 py-3 text-xs font-medium leading-4 tracking-wider text-left text-slate-800 uppercase border-b border-gray-200 bg-gray-50">
                    Status
                  </th>

                  <th className="px-4 py-3 text-xs font-medium leading-4 tracking-wider text-left  uppercase border-b border-gray-200 bg-gray-50 text-slate-800">
                    Action
                  </th>
                </tr>
              </thead>

              {isLoading ? (
                <div className="text-slate-800 m-14 text-center w-[60px] h-[60px] flex items-center justify-center text-8xl ">
                  <ImSpinner3 className="animate-spin" />
                </div>
              ) : (
                <tbody className="text-white">
                  {my_order.map((dta) => (
                    <tr>
                      <td className="px-4 py-4 whitespace-no-wrap border-b border-gray-200">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 w-24 h-20">
                            <img
                              className="w-24 h-20 rounded-md"
                              src={dta?.food_image}
                              alt=""
                            />
                          </div>

                          <div className="ml-4 w-44">
                            <div className="text-sm font-medium leading-5 ">
                              {dta?.food_name}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="px-4 py-4 whitespace-no-wrap border-b border-gray-200">
                        <div className="text-sm leading-5 ">
                          <p>
                            {dta.food_description.slice(0, 32)}
                            {dta.food_description.length > 32 && '...'}
                          </p>
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-no-wrap border-b border-gray-200">
                        <div className="text-sm leading-5 ">
                          <p>
                            {dta?.food_ingredients.map((data) => (
                              <span className="">{data}, </span>
                            ))}
                          </p>
                        </div>
                      </td>

                      <td className="px-4 py-4 text-sm leading-5  whitespace-no-wrap border-b border-gray-200">
                        <div className="flex items-center justify-center gap-2">
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

                      <td className="text-center border-b border-gray-200">
                        <button
                          onClick={() => handleDelete(dta._id)}
                          className="text-2xl text-red-500 hover:scale-125 duration-300"
                        >
                          <FaTrashAlt />
                        </button>
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

export default MyOrders;
