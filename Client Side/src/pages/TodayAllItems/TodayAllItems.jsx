import { useMutation, useQuery } from '@tanstack/react-query';
import useAxiosPub from '../../Hooks/useAxiosPub';
import { ImSpinner3, ImSpinner9 } from 'react-icons/im';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { useState } from 'react';
import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import toast from 'react-hot-toast';

const TodayAllItems = () => {
  const axioss = useAxiosPub();
  const [viewBtn, setViewBtn] = useState(null);
  const [dtaFilter, setDtaFilter] = useState(null);
  const [modal, setModal] = useState(false);
  const [updateId, setUpdateId] = useState(null);
  const [imgErr, setImgErr] = useState(null);
  const [loading, setLoading] = useState(false);

  const { mutateAsync: update } = useMutation({
    mutationFn: async (item) => {
      const { data } = await axioss.put(`/update-item?id=${updateId}`, item);
      console.log(data);
    },
    onSuccess: () => {
      console.log('Updated item');
      toast.success('Successfully Updated!');
      setLoading(false);
      setModal(false);
    },
  });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    setImgErr(false);
    const photo = data.photo[0];
    if (photo.name === '' || photo.size === 0) {
      setImgErr(true);
      return;
    }
    const food_name = data.food_name;
    const food_description = data.food_description;
    const food_ingredients = data.food_ingredients;
    const food_details = data.food_details;
    const fromImg = new FormData();
    fromImg.append('image', photo);
    try {
      setLoading(true);
      const { data } = await axios.post(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API}`,
        fromImg
      );
      const food_image = data.data.display_url;
      const item = {
        food_name,
        food_description,
        food_image,
        food_ingredients,
        food_details,
      };
      //   console.log(item);
      //   return;
      await update(item);
      reset();
    } catch (error) {
      console.log(error);
      setLoading(false);
      Swal.fire({
        title: 'Oops...!',
        text: `Sorry, Item could not be Updated ! "${error.message}"`,
        icon: 'error',
      });
    }
    // reset();
  };
  console.log(errors);

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

  //   handleUpdate =====
  const handleUpdate = (id) => {
    setUpdateId(id);
    setViewBtn(null);
    const filterUpdate = allItem.filter((dta) => dta._id === id);
    setDtaFilter(filterUpdate[0]);
    setModal(true);
    // console.log(filterUpdate);
  };

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

  console.log(dtaFilter);
  return (
    <div className="relative">
      {modal && (
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] min-h-48 bg-red-300 rounded-md z-30">
          <div className="mx-auto overflow-auto">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-5 border p-5 rounded-md bg-slate-800 text-white"
            >
              <div>
                <input
                  defaultValue={dtaFilter.food_name}
                  className="w-full bg-transparent shadow-md shadow-slate-500 px-3 py-2 border rounded"
                  type="text"
                  placeholder="Updated Item Name"
                  {...register('food_name', { required: true })}
                />

                {errors.food_name && (
                  <span className="text-red-500">
                    Please Input New Item Name
                  </span>
                )}
              </div>
              <div>
                <div className="relative">
                  <label
                    htmlFor="img"
                    className={`absolute left-0 top-0 bg-slate-600 px-4 py-[11px] text-base botder text-white border border-r-0 rounded-l cursor-pointer`}
                  >
                    Choose Image
                  </label>
                  <input
                    id="img"
                    className="w-full bg-transparent shadow-md shadow-slate-500 px-3 py-2 border rounded pl-9"
                    type="file"
                    placeholder="Name"
                    {...register('photo', { required: true })}
                  />
                </div>
                {errors.photo && (
                  <span className="text-red-500">Please Upload Item Image</span>
                )}
                {imgErr && (
                  <span className="text-red-500">Please Upload Item Image</span>
                )}
              </div>
              <div>
                <input
                  defaultValue={dtaFilter?.food_description}
                  className="w-full bg-transparent shadow-md shadow-slate-500 px-3 py-2 border rounded"
                  type="text"
                  placeholder="Updated Item Description"
                  {...register('food_description', {
                    required: true,
                    minLength: 20,
                  })}
                />
                {errors.food_description?.type === 'required' && (
                  <p className="text-red-500">Please Input Item Description.</p>
                )}
                {errors.food_description?.type === 'minLength' && (
                  <p className="text-red-500">
                    Please input minimum 20 character
                  </p>
                )}
              </div>
              <div>
                <div>
                  <input
                    defaultValue={dtaFilter?.food_ingredients}
                    className="w-full bg-transparent shadow-md shadow-slate-500 px-3 py-2 border rounded"
                    placeholder="Item Ingredients [e.g. ingredient1, ingredient2, ingredient3]"
                    {...register('food_ingredients', {
                      required: true,
                      minLength: 20,
                    })}
                  />
                </div>
                {errors.food_ingredients?.type === 'required' && (
                  <p className="text-red-500">Please Input Item Ingredients.</p>
                )}
                {errors.food_ingredients?.type === 'minLength' && (
                  <p className="text-red-500">
                    Please Input More Item Ingredients.
                  </p>
                )}
              </div>
              <div>
                <textarea
                  defaultValue={dtaFilter?.food_details}
                  className="w-full bg-transparent shadow-md shadow-slate-500 px-3 py-2 border rounded min-h-20"
                  placeholder="Updated Item Details"
                  {...register('food_details', {
                    required: true,
                    minLength: 30,
                  })}
                />

                {errors.food_details?.type === 'required' && (
                  <p className="text-red-500">Please Input Item Details</p>
                )}

                {errors.food_details?.type === 'minLength' && (
                  <p className="text-red-500">
                    Please Input Item Details Minimum 30 Character
                  </p>
                )}
              </div>
              <button
                disabled={loading}
                className="rounded w-full py-2 font-semibold shadow-md shadow-slate-400 border cursor-pointer duration-200 hover:shadow-lg hover:shadow-slate-200"
              >
                {loading ? (
                  <ImSpinner9 className="animate-spin text-2xl mx-auto" />
                ) : (
                  'Update Item'
                )}
              </button>
            </form>
          </div>
        </div>
      )}
      {modal && (
        <div
          onClick={() => setModal(false)}
          className="w-full h-full absolute bg-[#0000006d]"
        ></div>
      )}
      <div className="p-5 abcd">
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
                                  className="py-2 w-full shadow-md shadow-slate-400 hover:shadow-slate-600 rounded-md updateItem"
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
    </div>
  );
};

export default TodayAllItems;
