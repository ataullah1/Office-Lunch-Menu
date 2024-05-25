import { Link } from 'react-router-dom';
import MultyImageBanner from '../../components/MultyImageBanner/MultyImageBanner';

const img1 =
  'https://img.freepik.com/premium-photo/high-angle-view-hand-holding-drink-table_1048944-2054656.jpg?w=900';

const img2 =
  'https://img.freepik.com/premium-photo/high-angle-view-hand-holding-drink-table_1048944-2054656.jpg?w=900';
const img3 =
  'https://img.freepik.com/free-photo/young-brunette-with-paper-bags-shop_23-2147786815.jpg?t=st=1716099082~exp=1716102682~hmac=e91263a9bfd23ae0f8b65961e882f9dffb66872bc99f10521a1f8a028e9d47e7&w=900';
const img4 =
  'https://img.freepik.com/premium-photo/fruity-gummy-worms-bright-colors_1234738-8256.jpg?w=900';
const img5 =
  'https://img.freepik.com/premium-photo/wireless-earbuds-wired-tangled-earphones-brown-pink-background-top-view-flat-lay_175682-24386.jpg?w=996';

const AllMenu = () => {
  return (
    <div>
      {/* Banner Part */}
      <div className="h-64 sm:h-72 w-full bg-red-200 relative">
        <MultyImageBanner
          img1={img1}
          img2={img2}
          img3={img3}
          img4={img4}
          img5={img5}
        />
        <div className="absolute z-10 top-0 left-0 bg-[#00000073] w-full h-full">
          <div className="h-full w-10/12 mx-auto flex items-center justify-center pt-10 sm:pt-20 text-center">
            <button className="text-5xl">TODAY ALL MENU</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllMenu;
