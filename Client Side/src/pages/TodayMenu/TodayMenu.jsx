import { useEffect, useState } from 'react';
import MenuCard from '../../components/MenuCard/MenuCard';
import MultyImageBanner from '../../components/MultyImageBanner/MultyImageBanner';
import { useQuery } from '@tanstack/react-query';
import useAxiosPub from '../../Hooks/useAxiosPub';
import Loding from '../Loding/Loding';
import Error from '../Error/Error';

const img1 =
  'https://img.freepik.com/free-photo/healthy-lunch_1098-13259.jpg?t=st=1716614363~exp=1716617963~hmac=9920e78854a3895e14978703a3416d260959dbd34367b6691da1ceb805f9d506&w=900';

const img2 =
  'https://img.freepik.com/free-photo/pre-prepared-food-showcasing-ready-eat-delicious-meals-go_23-2151187696.jpg?t=st=1716614390~exp=1716617990~hmac=a9821314c1ef579333ceeb0d92074b7aea2b200ae2f1874ae12b0cd2f0734a62&w=900';
const img3 =
  'https://img.freepik.com/free-photo/view-delicious-food-dish_23-2150777859.jpg?t=st=1716614410~exp=1716618010~hmac=51844331ca7222fa2109cd9ab45b33444f4f8e21560a3f2ae29a5b3eb36552f0&w=900';
const img4 =
  'https://img.freepik.com/free-photo/high-angle-delicious-brazilian-food-composition_23-2148739223.jpg?t=st=1716614431~exp=1716618031~hmac=4baaf78d35bbb5a60af2bc9f44d49a94cc7135dcace8e09a7c4b90ea4e5a5a74&w=740';
const img5 =
  'https://img.freepik.com/free-photo/high-angle-delicious-food-keyboard_23-2149182227.jpg?t=st=1716614451~exp=1716618051~hmac=97512321bcaba8efcd71e5e5e891d8e29717a1d36c53a2794aa94873c4d17035&w=900';

const TodayMenu = () => {
  const axioss = useAxiosPub();

  const {
    data: menu = [],
    isError,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['today-menu'],
    queryFn: async () => {
      const { data } = await axioss.get('/today-menu');
      return data;
    },
  });

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
              TODAY ALL ITEM
            </button>
          </div>
        </div>
      </div>
      <div className="w-11/12 mx-auto">
        <div className="py-8 mt-8 bg-slate-500 rounded-t-md"></div>
        <div className=" w-full">
          {isLoading ? (
            <Loding />
          ) : (
            <div className="w-full mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 gap-y-10">
              {menu.map((dta) => (
                <MenuCard key={dta._id} menu={dta} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TodayMenu;
