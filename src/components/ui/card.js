import React from "react";

const Card = (props) => {
  return (
    <div className="flex flex-col xl:flex-row items-center space-y-10 xl:space-x-10 xl:space-y-0  w-full h-full p-10 xl:w-11/12 xl:h-5/6">
      {props.children}
    </div>
  );
};

export default Card;
