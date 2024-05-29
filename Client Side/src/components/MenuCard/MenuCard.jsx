import { useMutation } from '@tanstack/react-query';
import useAxiosPub from '../../Hooks/useAxiosPub';
import useAuth from '../../Hooks/useAuth';
import toast from 'react-hot-toast';

const MenuCard = ({ menu }) => {
  const axioss = useAxiosPub();
  const { userDta } = useAuth();
  const { mutateAsync } = useMutation({
    mutationFn: async ({ menu }) => {
      // console.log(menu);
      const { data } = await axioss.post('/order', menu);
      if (data.acknowledged) {
        toast.success('Order Successfully send.');
      }
      console.log(data);
    },
  });
  const orderFunc = async () => {
    // console.log(menu);
    const orderDta = menu;
    orderDta.orderId = menu._id;
    delete orderDta._id;
    orderDta.userName = userDta.displayName;
    orderDta.userEmail = userDta.email;
    orderDta.userPhoto = userDta.photoURL;
    // console.log(orderDta);
    // return;
    await mutateAsync({ menu });
  };
  return (
    <div className="w-full max-w-[500px] mx-auto shadow-lg shadow-slate-700 hover:shadow-slate-200 hover:scale-105 duration-300 rounded-md">
      <div
        style={{
          backgroundImage: `url(${menu?.food_image})`,
        }}
        className="bg-cover h-60 rounded-t-md"
      ></div>
      <div className="p-4 text-center space-y-3">
        <div className="min-h-24">
          <h1 className="text-3xl pb-3">{menu?.food_name}</h1>
          <p>{menu?.food_description}</p>
        </div>
        <hr />
        <div className="min-h-14">
          {menu?.food_ingredients.map((dta) => (
            <span className="">{dta}, </span>
          ))}
        </div>
        <hr />
        <div className="flex justify-between items-center py-3">
          <button className="py-2 px-7 rounded-md shadow-md hover:shadow-slate-200 hover:-translate-y-2 duration-300 shadow-slate-500">
            Details
          </button>
          <button
            onClick={orderFunc}
            className="py-2 px-7 rounded-md shadow-md hover:shadow-slate-200 hover:-translate-y-2 duration-300 shadow-slate-500"
          >
            Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuCard;
