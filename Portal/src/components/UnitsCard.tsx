import { useState } from 'react';
import { unitsList } from '../db/db';

const UnitsCard = () => {
  const [ingredients] = useState(unitsList);

  return (
    <div className="w-full h-44 flex gap-4 overflow-x-scroll scrollbar-thin scrollbar-thumb-givvy_blue_strong scrollbar-track-gray-200 scrollbar-thumb-rounded">
      {ingredients.map(
        (ingredient, index): JSX.Element => (
          <div
            key={index}
            className={`card min-w-[240px] h-32 flex justify-evenly items-center ${
              ingredient.unitiName === 'Papas a la francesa' ? 'bg-danger text-white' : null
            } ${ingredient.amount === 3 ? 'bg-warning text-white' : null} cursor-pointer hover:h-36 duration-200`}
          >
            <div className="text-5xl">
              <i className="las la-shopping-basket"></i>
            </div>
            <div className="flex flex-col gap-2">
              <p className="font-semibold">{ingredient.unitiName}</p>
              <p className="opacity-80">{ingredient.amount} Unidades</p>
            </div>
          </div>
        ),
      )}
    </div>
  );
};

export default UnitsCard;
