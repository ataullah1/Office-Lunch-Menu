import axios from 'axios';
import { useForm } from 'react-hook-form';
import useAxiosPub from '../../Hooks/useAxiosPub';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { ImSpinner9 } from 'react-icons/im';
import Swal from 'sweetalert2';

const AddItems = () => {
  const axioss = useAxiosPub();
  const [imgErr, setImgErr] = useState(null);
  const [isLoading, setLoading] = useState(false);

  const { mutateAsync } = useMutation({
    mutationFn: async ({ item }) => {
      const { data } = await axioss.post('/add-item', item);
      console.log(data);
    },
    onSuccess: () => {
      console.log('added item');
      setLoading(false);
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
        food_image,
        food_description,
        food_ingredients,
        food_details,
      };
    //   console.log(item);
    //   return;
      await mutateAsync({ item });
      reset();
    } catch (error) {
      console.log(error);
      setLoading(false);
      Swal.fire({
        title: 'Oops...!',
        text: `Sorry, your account could not be Created ! "${error.message}"`,
        icon: 'error',
      });
    }
    // reset();
  };
  console.log(errors);

  return (
    <div className="p-5">
      <h1 className="pt-3 pb-5 text-3xl text-slate-700 text-center">
        Add New Item
      </h1>
      <div className="w-[650px] mx-auto overflow-auto">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-5 border p-5 rounded-md bg-slate-800 text-white"
        >
          <div>
            <input
              className="w-full bg-transparent shadow-md shadow-slate-500 px-3 py-2 border rounded"
              type="text"
              placeholder="Item Name"
              {...register('food_name', { required: true })}
            />

            {errors.food_name && (
              <span className="text-red-500">Please Input New Item Name</span>
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
              className="w-full bg-transparent shadow-md shadow-slate-500 px-3 py-2 border rounded"
              type="text"
              placeholder="Item Description"
              {...register('food_description', {
                required: true,
                minLength: 20,
              })}
            />
            {errors.food_description?.type === 'required' && (
              <p className="text-red-500">Please Input Item Description.</p>
            )}
            {errors.food_description?.type === 'minLength' && (
              <p className="text-red-500">Please input minimum 20 character</p>
            )}
          </div>
          <div>
            <div>
              <input
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
              className="w-full bg-transparent shadow-md shadow-slate-500 px-3 py-2 border rounded min-h-20"
              placeholder="Item Details"
              {...register('food_details', { required: true, minLength: 30 })}
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
            disabled={isLoading}
            className="rounded w-full py-2 font-semibold shadow-md shadow-slate-400 border cursor-pointer duration-200 hover:shadow-lg hover:shadow-slate-200"
          >
            {isLoading ? (
              <ImSpinner9 className="animate-spin text-2xl mx-auto" />
            ) : (
              'Add New Item'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddItems;
