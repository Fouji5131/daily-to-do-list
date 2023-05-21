import { useState } from "react";

export const useItems = () => {
  const [items, setItems] = useState([]);

  const tasks = [...items];

  const noOfItems = items.length;
  const noOfCompleted = items.filter((item) => item.isChecked).length;
  const noOfUnCompleted = noOfItems - noOfCompleted;
  const progress =
    items.length == 0 ? "0" : Math.trunc((noOfCompleted / noOfItems) * 100);

  const deleteAllToDos = () => {
    setItems([]);
  };

  const deleteToDo = (id) => {
    const newItems = [...items];
    newItems.splice(id, 1);
    // console.log(newItems);
    setItems(newItems);
  };

  return {
    items,
    setItems,
    noOfItems,
    noOfCompleted,
    noOfUnCompleted,
    progress,
    deleteAllToDos,
    deleteToDo,
  };
};
