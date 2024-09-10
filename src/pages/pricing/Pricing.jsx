import React from "react";
import iconUrl from "../../assets/images/icon.svg"; // Importa el SVG como URL

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
      features: ["18 classes", "€6,66 each class", "Lorem ipsum dolor sit amet, consectetur"],
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
      features: ["10 classes", "€8 each class", "Lorem ipsum dolor sit amet, consectetur"],
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
      features: ["The second class 50% off", "Chat available", "Lorem ipsum dolor sit amet, consectetur"],
    },
  ];

  return (
    <div className="w-full py-[10rem] px-4 bg-white">
      <div className="max-w-[1240px] mx-auto grid md:grid-cols-3 gap-8">
        {cardData.map((card, index) => (
          <div
            key={index}
            className={`w-full shadow-xl flex flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300`}
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
              className={`bg-[#141414] text-white hover:text-[#242424]
                 hover:bg-green-500 duration-150 w-[200px] rounded-md font-medium my-6 mx-auto px-6 py-3`}
            >
              Start Trial
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PricingCards;
