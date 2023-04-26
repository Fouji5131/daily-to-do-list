import React from "react";

const Card = (props) => {
  return (
    <div className="w-2/4 h-3/4 bg-white rounded-3xl border-2 shadow-2xl px-32 py-5">
      {props.children}
    </div>
  );
};

export default Card;
