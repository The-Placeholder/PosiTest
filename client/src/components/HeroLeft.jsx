import longlogo from '/galvanize-logo-orange.png';
import { NavLink } from 'react-router-dom';

const HeroLeft = () => {
  return (
    <div
      id="hero-left"
      className="ctn w-5/12 h-full bg-g-blue flex flex-col flex-nowrap text-white content-evenly justify-center gap-8 p-20 text-center lg:p-30"
    >
      <NavLink to="/">
        <div className="mb-4 w-[90%] mx-auto 2xl:w-[32rem] xl:mb-16 ">
          <img src={longlogo} alt="galvanize logo" className="w-full h-full" />
        </div>
      </NavLink>

      <h1 className="text-xl font-bold lg:text-4xl">
        OUR GRADS
        <span className="text-orange-500"> CHANGE THE WORLD</span>
      </h1>
      <h2 className="text-md opacity lg:text-2xl">
        Transformational Software Engineering Bootcamps
      </h2>
    </div>
  );
};

export default HeroLeft;
