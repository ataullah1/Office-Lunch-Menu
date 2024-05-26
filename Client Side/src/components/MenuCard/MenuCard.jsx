const MenuCard = ({ menu }) => {
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
          <button className="py-2 px-7 rounded-md shadow-md hover:shadow-slate-200 hover:-translate-y-2 duration-300 shadow-slate-500">
            Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuCard;
