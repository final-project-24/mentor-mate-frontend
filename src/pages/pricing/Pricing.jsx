
import iconUrl from "../../assets/images/icon.svg"; // Importa el SVG como URL
import Layout from "../../components/layout/Layout"; // Import your Layout component

const PricingCards = () => {
  const cardData = [
    {
      image: (
        <img
          src={iconUrl}
          alt="Single User Icon"
          className="w-20 h-20 mx-auto"
        />
      ),
      title: "Monthly Subscription",
      price: "€120.00",
      features: [
        "18 classes",
        "€6,66 each class",
        "Lorem ipsum dolor sit amet, consectetur",
      ],
    },
    {
      image: (
        <img
          src={iconUrl}
          alt="Double User Icon"
          className="w-20 h-20 mx-auto"
        />
      ),
      title: "10 Classes",
      price: "€80",
      features: [
        "10 classes",
        "€8 each class",
        "Lorem ipsum dolor sit amet, consectetur",
      ],
    },
    {
      image: (
        <img
          src={iconUrl}
          alt="Triple User Icon"
          className="w-20 h-20 mx-auto"
        />
      ),
      title: "Book 1 Class",
      price: "€10",
      features: [
        "The second class 50% off",
        "Chat available",
        "Lorem ipsum dolor sit amet, consectetur",
      ],
    },
  ];

  return (
    <Layout>
      <h2 className="text-center text-xl pt-[100px] ]">Our Prices </h2>
      <div className="w-[90%] m-10 mx-auto  px-4 bg-white lg:h-[65vh]  ">
        <div className="max-w-[1240px] mx-auto grid  gap-12  md:w-[70%]  lg:grid lg:grid-cols-3 lg:w-full  lg:pt-5 ">
          {cardData.map((card, index) => (
            <div
              key={index}
              className={`w-full shadow-xl flex flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300 border border-accent  `}
            >
              <div className="w-20 mx-auto mt-[-3rem] bg-white">
                {card.image}
              </div>
              <h2 className="text-2xl font-bold text-center py-8">
                {card.title}
              </h2>
              <p className="text-center text-4xl font-bold">{card.price}</p>
              <div className="text-center font-medium">
                {card.features.map((feature, index) => (
                  <p
                    key={index}
                    className={`py-2 border-b mx-8 ${
                      index === 0 ? "mt-8" : ""
                    }`}
                  >
                    {feature}
                  </p>
                ))}
              </div>
              <button
                className={`bg-[#20dd58] hover:text-[#00df9a] hover:bg-gray-50 duration-150 w-[200px] rounded-md font-medium my-6 mx-auto px-6 py-3`}
              >
                Go!
              </button>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default PricingCards;
