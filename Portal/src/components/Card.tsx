import { useState } from 'react';
import { productsList } from '../db/db';

const Card = () => {
  const [meals] = useState(productsList);
  return (
    <>
      {meals.map(
        (meal): JSX.Element => (
          <div
            key={meal.id}
            className="card w-72 ssm:w-full lg:w-60 h-96 ssm:h-44 lg:h-96 overflow-hidden hover:scale-105 hover:cursor-pointer duration-200 flex flex-col gap-2 ssm:grid lg:flex ssm:grid-cols-12"
          >
            <div className="w-full h-44 col-span-3">
              <img src={`${meal.url}`} alt="Hamburguer-img" className="object-cover w-full h-full" />
            </div>
            <div className="p-2 ssm:p-4 lg:p-2 col-span-6 flex flex-col sm:gap-3 lg:gap-0">
              <h4 className="font-semibold leading-7">{meal.name}</h4>
              <p className="ssm:text-center lg:text-left opacity-80">{meal.description}</p>
            </div>
            <div className="px-2 col-span-3 grow">
              <hr />
              <div className="w-full h-full flex justify-between ssm:justify-evenly lg:justify-between items-center">
                <div className="h-full flex justify-center items-center gap-3 text-lg opacity-80">
                  <div className="w-8 h-8 border-2 border-secondary rounded-full flex justify-center items-center text-secondary cursor-pointer">
                    <i className="las la-pen-fancy"></i>
                  </div>
                  <div className="w-8 h-8 border-2 border-danger rounded-full flex justify-center items-center text-danger cursor-pointer">
                    <i className="las la-trash text-danger"></i>
                  </div>
                </div>
                <div className="cursor-pointer">
                  <i className="las la-ellipsis-v text-4xl opacity-80"></i>
                </div>
              </div>
            </div>
          </div>
        ),
      )}
    </>
  );
};

export default Card;
