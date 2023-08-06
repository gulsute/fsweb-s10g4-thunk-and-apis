import React from "react";

function Item({ data }) {
  return (
    <div className="shadow-md bg-white text-center">
      <p className="text-2xl p-10">{data.activity}</p>
      <p className="text-xl p-2">Activity Type: {data.type}</p>
      <p className="text-xl p-2">Necassary Participants: {data.participants}</p>
    </div>
  );
}

export default Item;
