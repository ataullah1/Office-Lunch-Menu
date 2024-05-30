import axios from 'axios';
import { useForm } from 'react-hook-form';
import useAxiosPub from '../../Hooks/useAxiosPub';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { ImSpinner9 } from 'react-icons/im';

const AddItems = () => {
  const axioss = useAxiosPub();
  const [errPass, setErrPass] = useState(false);
  const [imgErr, setImgErr] = useState(null);
  const [isLoading, setLoading] = useState(false);

  const { mutateAsync } = useMutation({
    mutationFn: async ({ employeeDta }) => {
      const { data } = await axioss.post('/employee', employeeDta);
      console.log(data);
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
    setErrPass(false);
    if (data.Password !== data.Confirm_Password) {
      setErrPass(true);
      return;
    }
    const photo = data.photo[0];
    if (photo.name === '' || photo.size === 0) {
      setImgErr(true);
      return;
    }
    const name = data.Name;
    const email = data.Email;
    const password = data.Password;

    const fromImg = new FormData();
    fromImg.append('image', photo);
    try {
      setLoading(true);
      const { data } = await axios.post(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API}`,
        fromImg
      );
      const imgUrl = data.data.display_url;
      // const allDta = { name, email, password, imgUrl };
      // console.log(allDta);
      const result = await emlPassRegister(email, password);
      console.log(result.user);

      // Update Profile
      await profileUpdate(name, imgUrl);
      Swal.fire({
        title: 'Good job!',
        text: 'Your account has been successfully created. Please Login Now.',
        icon: 'success',
      });
      if (result.user) {
        const employeeName = result.user.displayName;
        const employeeEmail = result.user.email;
        const employeePhoto = user.photoURL;
        const power = 'employee';
        const employeeDta = {
          employeeName,
          employeeEmail,
          employeePhoto,
          power,
        };
        await mutateAsync({ employeeDta });
      }
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
   <div className=''>
    
        <div className='w-[600px] mx-auto overflow-auto'>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
            <div>
              <input
                className="w-full bg-transparent shadow-md shadow-slate-500 px-3 py-2 border rounded"
                type="text"
                placeholder="Name"
                {...register('Name', { required: true, maxLength: 20 })}
              />
    
              {errors.Name && (
                <span className="text-red-600">Please Input Your Name</span>
              )}
            </div>
            <div>
              <div className="relative">
                <label
                  htmlFor="img"
                  className={`absolute left-0 top-0 bg-slate-600 px-3.5 py-[11px] text-base botder text-white border border-r-0 rounded-l cursor-pointer`}
                >
                  Choose Profile
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
                <span className="text-red-600">Please Upload Your Photo</span>
              )}
              {imgErr && (
                <span className="text-red-600">Please Upload Your Photo</span>
              )}
            </div>
            <div>
              <input
                className="w-full bg-transparent shadow-md shadow-slate-500 px-3 py-2 border rounded"
                type="email"
                placeholder="Email"
                {...register('Email', {
                  required: true,
                  pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i,
                })}
              />
              {errors.Email?.type === 'required' && (
                <p className="text-red-600">Please Input Your Email.</p>
              )}
              {errors.Email?.type === 'pattern' && (
                <p className="text-red-600">Invalid Email</p>
              )}
            </div>
            <div>
              <div className="relative">
                <input
                  className="w-full bg-transparent shadow-md shadow-slate-500 px-3 py-2 border rounded"
                 
                  placeholder="Password"
                  {...register('Password', {
                    required: true,
                    max: 20,
                    min: 6,
                    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
                  })}
                />
              </div>
              {errors.Password?.type === 'required' && (
                <p className="text-red-600">Please Input a Password.</p>
              )}
            </div>
            <div>
              <input
                className="w-full bg-transparent shadow-md shadow-slate-500 px-3 py-2 border rounded"
                type="password"
                placeholder="Confirm Password"
                {...register('Confirm_Password', { required: true })}
              />
              {errors.Confirm_Password?.type === 'required' && (
                <p className="text-red-600">Confirm Password.</p>
              )}
              {errPass && <p className="text-red-600">Password is not matched!</p>}
            </div>
            <button
              disabled={isLoading}
              className="rounded w-full py-2 font-semibold shadow-md shadow-slate-400 border cursor-pointer duration-200 hover:shadow-lg hover:shadow-slate-200"
            >
              {isLoading ? (
                <ImSpinner9 className="animate-spin text-2xl mx-auto" />
              ) : (
                'Sign up'
              )}
            </button>
          </form>
        </div>
   </div>
  );
};

export default AddItems;
