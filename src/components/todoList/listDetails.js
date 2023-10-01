import React, { useState, useEffect } from "react";
import Card from "../ui/card";

const ListDetails = (props) => {
  const noOfItems = props.items.length;
  const noOfCompleted = props.items.filter((item) => item.isChecked).length;
  const noOfUnCompleted = noOfItems - noOfCompleted;
  const percentage = (noOfCompleted / noOfItems) * 100;
  const progress = props.items.length === 0 ? "0.0" : percentage.toFixed(1);

  const deleteAllToDos = () => {
    props.getItemsValue([]);
  };

  const [inputValue, setInputValue] = useState("");

  const [addItem, setAddItem] = useState(false);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const isDisabled = inputValue.trim() === "";
  const buttonStyle = isDisabled
    ? {
        cursor: "not-allowed",
        backgroundColor: "gray",
      }
    : {};

  const addNewItem = () => {
    setAddItem(!addItem);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    props.getItemsValue((prevItems) => [
      ...prevItems,
      {
        id: Date.now(),
        label: inputValue,
        completed: false,
        isChecked: false,
      },
    ]);
    setInputValue("");

    console.log("hi");
  };

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(props.items));
  }, [props.items]);

  return (
    <Card>
      <div className="relative flex flex-col justify-between items-center space-y-5 w-full py-9 font-mono rounded-3xl shadow-2xl bg-white">
        <div className="flex flex-row justify-between w-4/5">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-5 w-4/5 ">
            <h1>
              Total: <span className="font-bold">{noOfItems}</span>
            </h1>
            <h1>
              Completed: <span className="font-bold">{noOfCompleted}</span>
            </h1>
            <h1>
              Uncompleted: <span className="font-bold">{noOfUnCompleted}</span>
            </h1>
            <h1>
              Progress: <span className="font-bold">{progress}%</span>
            </h1>
          </div>
          <div className="flex justify-center">
            <button
              className="w-full  py-0 xl:px-2 xl:py-0 rounded-md bg-blue-300 text-white hover:scale-125"
              onClick={deleteAllToDos}
            >
              Clear All
            </button>
          </div>
        </div>

        {addItem && (
          <div className="space-y-0 w-4/5">
            <form
              onSubmit={handleFormSubmit}
              className="flex justify-between p-2 border-2 border-blue-300 rounded-2xl space-x-0"
            >
              <input
                className="w-4/5 focus:outline-none bg-transparent placeholder:text-black/50"
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="add to-do"
              />
              <button
                className="px-2 py-1 xl:px-5 xl:py-2 rounded-xl bg-blue-300 text-white"
                style={buttonStyle}
                type="submit"
                disabled={isDisabled}
              >
                Add
              </button>
            </form>
          </div>
        )}

        <button
          className={`absolute flex items-center justify-center bg-white w-16 h-16 rounded-full text-6xl text-blue-300 ${
            addItem
              ? "top-48 md:top-36 lg:top-32"
              : "top-28 md:top-16 lg:top-10"
          }`}
          onClick={addNewItem}
        >
          {addItem ? "-" : "+"}
        </button>
      </div>
    </Card>
  );
};

export default ListDetails;
