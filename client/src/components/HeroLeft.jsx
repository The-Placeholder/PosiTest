import longlogo from '/galvanize-logo-orange.png';

const HeroLeft = () => {
  return (
    <div
      id="hero-left"
      className="ctn w-5/12 h-full bg-g-blue flex flex-col flex-wrap text-white content-evenly justify-center gap-8 p-20 text-center"
    >
      <div className="mb-16">
        <img src={longlogo} alt="galvanize logo" className="w-[100%]" />
      </div>
      <h1 className="text-4xl font-bold">
        OUR GRADS
        <span className="text-orange-500"> CHANGE THE WORLD</span>
      </h1>
      <h2 className="text-2xl opacity">
        Transformational Software Engineering Bootcamps
      </h2>
    </div>
  );
};

export default HeroLeft;
