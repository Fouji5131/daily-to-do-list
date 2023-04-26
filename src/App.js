import React, { useState } from "react";
import Card from "./components/ui/card";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [items, setItems] = useState([]);

  const noOfItems = items.length;

  const handleInputChange = (event) => {
    if (event.target.value == null) {
      return;
    }
    setInputValue(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    setItems([...items, inputValue]);
    setInputValue("");
  };

  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };

  const deleteAllToDos = () => {
    setItems([]);
  };

  const isDisabled = inputValue.trim() === "";

  const buttonStyle = isDisabled
    ? {
        cursor: "not-allowed",
        backgroundColor: "gray",
      }
    : {};

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-light-blue">
      <Card>
        <div className="space-y-5 h-full">
          <h1 className="font-bold text-3xl sm:text-4xl xl:text-6xl text-center font-bouncy">
            Daily To Do List
          </h1>

          <div className="flex flex-col justify-between h-5/6 space-y-5 font-mono">
            <form
              onSubmit={handleFormSubmit}
              className="flex justify-between p-1 xl:p-2 border-2 border-black rounded-md space-x-5"
            >
              <input
                className="w-3/4 focus:outline-none bg-transparent placeholder:text-black"
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Add new list item"
              />
              <button
                className="px-2 py-1 xl:px-5 xl:py-2 rounded-md bg-blue-400 text-black"
                style={buttonStyle}
                type="submit"
                disabled={isDisabled}
              >
                Add
              </button>
            </form>

            <div className="flex flex-col h-full space-y-1 xl:px-5 xl:space-y-2 overflow-y-auto overflow-x-auto">
              {items.map((item, index) => {
                return (
                  <label
                    htmlFor="box"
                    key={index}
                    id={index}
                    className="flex text-md xl:text-lg font-normal h-6 hover:text-blue-400"
                  >
                    <input
                      id="box"
                      key={index}
                      type="checkbox"
                      checked={isChecked}
                      onChange={handleCheckboxChange}
                      className="accent-green-500 h-5 w-5 xl:h-6 xl:w-6 mr-2 xl:mr-4 rounded-2xl"
                    />
                    <h1
                      style={{
                        textDecoration: isChecked ? "line-through" : "none",
                        color: isChecked ? "black" : "white",
                      }}
                    >
                      {item}
                    </h1>
                  </label>
                );
              })}
            </div>

            <div className="space-y-2 text-black">
              <div className="border-b-2 border-black"></div>
              <div className="flex flex-col sm:flex-row justify-between ">
                <h1>{noOfItems} Total</h1>
                <h1>{noOfItems} Completed</h1>
                <h1>{noOfItems} Uncompleted</h1>
                <button
                  className="py-0 xl:px-2 xl:py-0 rounded-md bg-blue-400 hover:scale-110"
                  onClick={deleteAllToDos}
                >
                  Clear All
                </button>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default App;
