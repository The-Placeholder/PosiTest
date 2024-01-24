import longlogo from '/galvanize-logo-orange.png';

const HeroLanding = ({ setnavHide, newUserHandler }) => {
  setnavHide(true);
  // newUserHandler(true);

  return (
    <>
      <div className="min-h-screen flex fixed overflow-hidden top-0 left-0 w-full h-full">
        <div className="z-10 flex flex-row w-full h-full">
          <div className="ctn w-5/12 h-full bg-blue-800 flex flex-col flex-wrap text-white content-evenly justify-center gap-8 p-20 text-center">
            <div className="mb-16">
              <img src={longlogo} alt="galvanize logo" className="w-[100%]" />
            </div>
            <h1 className="text-4xl font-bold">OUR GRADS CHANGE THE WORLD</h1>
            <h2 className="text-2xl opacity">
              Transformational Software Engineering Bootcamps
            </h2>
          </div>
          {/* end left*/}
          <div className="ctn w-7/12 h-full bg-gray-300"></div>
          {/* end right*/}
        </div>
      </div>
    </>
  );
};

export default HeroLanding;
