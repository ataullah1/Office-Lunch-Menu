import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaEye, FaEyeSlash, FaGithub } from 'react-icons/fa';
import Swal from 'sweetalert2';
import useAuth from '../../Hooks/useAuth';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ImSpinner9 } from 'react-icons/im';
import { FcGoogle } from 'react-icons/fc';
import Loding from '../Loding/Loding';
import useAxiosSec from '../../Hooks/useAxiosSec';

export default function Login() {
  const axioss = useAxiosSec();
  const [eye, setEye] = useState(false);
  const naviget = useNavigate();
  const location = useLocation();
  const {
    emlPassLogin,
    gitHubLogin,
    googleLogin,
    userDta,
    setLoading,
    isLoading,
  } = useAuth();

  if (userDta) {
    naviget('/');
  }

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    const email = data.Email;
    const password = data.Password;

    try {
      setLoading(true);

      const result = await emlPassLogin(email, password);
      console.log(result.user);
      // const jwtRequet = async () => {
      //   const { data } = await axiosSecu.post(`/jwt`, {
      //     email: result?.user?.email,
      //   });
      //   console.log('JWT Token,', data);
      // };
      // jwtRequet();

      Swal.fire({
        title: 'Good job!',
        text: 'Your account has been successfully Login.',
        icon: 'success',
      });
      naviget(location?.state ? location.state : '/');

      reset();
      // naviget('/login');
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
  // console.log(errors);

  // all Social Login
  const socialLogin = (socialLogin) => {
    socialLogin()
      .then(async (result) => {
        const user = result.user;
        // const jwtRequet = async () => {
        //   const { data } = await axiosSecu.post(`/jwt`, {
        //     email: user?.email,
        //   });
        //   console.log('JWT Token,', data);
        // };
        // jwtRequet();

        const userEmail = result.user.email;
        const userName = result.user.displayName;
        const userDta = {
          userEmail,
          userName,
        };
        const { data: userDtaa } = await axioss.post('/users', userDta);
        console.log(userDtaa);
        naviget(location?.state ? location.state : '/');
        console.log(user);
        Swal.fire({
          title: 'Good job!',
          text: 'Your account has been successfully logged in.',
          icon: 'success',
        });
      })
      .catch((error) => {
        const errorMessage = error.message;
        setLoading(false);
        console.log(errorMessage);
        Swal.fire({
          title: 'Oops...!',
          text: 'Sorry, your account could not be logged in!',
          icon: 'error',
        });
      });
  };

  if (userDta) {
    return <Loding />;
  }
  return (
    <div className="w-10/12 mx-auto">
      <h1 className="text-center pt-10 pb-8 text-3xl underline sm:text-4xl font-bold font-mono">
        SignUp Snowy Restaurant
      </h1>
      <div className="w-full md:w-[500px] mx-auto">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
          <div>
            <input
              className="w-full"
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
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xl cursor-pointer">
                {eye ? (
                  <span onClick={() => setEye(!eye)}>
                    <FaEyeSlash />
                  </span>
                ) : (
                  <span onClick={() => setEye(!eye)}>
                    <FaEye />
                  </span>
                )}
              </span>
              <input
                className="w-full"
                type={eye ? 'text' : 'password'}
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
            {errors.Password?.type === 'min' && (
              <p className="text-red-600">Password must be 6 word</p>
            )}
            {errors.Password?.type === 'max' && (
              <p className="text-red-600">Password must be less 20 word</p>
            )}
            {errors.Password?.type === 'pattern' && (
              <p className="text-red-600">
                Password must be uppercase, lowercase & number
              </p>
            )}
          </div>
          <button
            disabled={isLoading}
            className="w-full bg-yellow-600 text-white py-2 font-semibold hover:bg-yellow-700 cursor-pointer duration-200"
          >
            {isLoading ? (
              <ImSpinner9 className="animate-spin text-2xl mx-auto" />
            ) : (
              'Sign in'
            )}
          </button>
        </form>
        <p className="pt-3 text-slate-800 dark:text-slate-100">
          Already have an account?{' '}
          <Link to={'/register'} className="underline text-mClr">
            Sign Up
          </Link>
        </p>
        <div>
          <div className="w-full relative h-5 my-5 flex items-center justify-center">
            <div className="h-[1px] w-full bg-yellow-600"></div>
            <span className="absolute px-3 font-medium text-gray-900 dark:text-slate-100 -translate-x-1/2 bg-white left-1/2 dark:bg-[#353b48]">
              or
            </span>
          </div>
          <div className="flex flex-col lg:flex-row gap-2 xl:gap-3 w-full text-slate-900 dark:text-stone-100">
            <button
              disabled={isLoading}
              onClick={() => socialLogin(googleLogin)}
              className="py-2 px-1 w-full font-medium border hover:shadow-lg shadow-indigo-900/20 rounded-md flex items-center justify-center gap-1 border-mClr"
            >
              <span className=" text-2xl">
                <FcGoogle />
              </span>
              Login With Google
            </button>
            <button
              disabled={isLoading}
              onClick={() => socialLogin(gitHubLogin)}
              className="py-2 px-1 w-full font-medium border hover:shadow-lg shadow-blue-500/20 rounded-md  flex items-center justify-center gap-1 border-mClr"
            >
              <span className="text-mClr dark:text-white text-2xl">
                <FaGithub />
              </span>
              Login With Twitter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
