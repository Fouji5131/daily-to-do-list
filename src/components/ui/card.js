import React from "react";

const Card = (props) => {
  return (
    <div className="w-3/4 xl:w-2/4 h-3/4 bg-white/30 rounded-3xl  shadow-2xl px-5 xl:px-32 py-5">
      {props.children}
    </div>
  );
};

export default Card;
