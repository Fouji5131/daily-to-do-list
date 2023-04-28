import React, { useState } from "react";
import Card from "./components/ui/card";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [items, setItems] = useState([]);

  const noOfItems = items.length;
  const noOfCompleted = items.filter((item) => item.isChecked).length;
  const noOfUnCompleted = noOfItems - noOfCompleted;
  const progress = Math.trunc((noOfCompleted / noOfItems) * 100);

  const isDisabled = inputValue.trim() === "";
  const buttonStyle = isDisabled
    ? {
        cursor: "not-allowed",
        backgroundColor: "gray",
      }
    : {};

  const handleFormSubmit = (event) => {
    event.preventDefault();
    setItems((prevItems) => [
      ...prevItems,
      {
        id: Date.now(),
        label: inputValue,
        completed: false,
        isChecked: false,
      },
    ]);
    setInputValue("");
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  function handleCheckboxClick(id) {
    setItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            completed: !item.completed,
            isChecked: !item.isChecked,
          };
        }
        return item;
      })
    );
  }

  const deleteAllToDos = () => {
    setItems([]);
  };

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
                className="w-3/4 focus:outline-none bg-transparent placeholder:text-black/50"
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

            <div
              className="flex flex-col h-full overflow-y-auto overflow-x-auto"
              style={
                {
                  // boxShadow: "inset 0px 0px 36px 0px rgba(0, 0, 0, 0.3)",
                }
              }
            >
              <ul className="space-y-1 xl:px-5 xl:py-2 xl:space-y-2">
                {items.map((item) => {
                  return (
                    <li key={item.id}>
                      <label
                        htmlFor={item.id}
                        className="flex text-md xl:text-lg font-normal h-6 hover:text-blue-400"
                      >
                        <input
                          id={item.id}
                          type="checkbox"
                          checked={item.completed}
                          onChange={() => handleCheckboxClick(item.id)}
                          className="accent-green-500 h-5 w-5 xl:h-6 xl:w-6 mr-2 xl:mr-4 rounded-2xl"
                        />
                        <h1
                          // className={testCheck(item)}
                          style={{
                            textDecoration: item.isChecked
                              ? "line-through"
                              : "none",
                            color: item.isChecked ? "black" : "white",
                          }}
                        >
                          {item.label}
                        </h1>
                      </label>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="flex flex-col items-center space-y-2 text-black">
              <div className="w-full border-b-2 border-black"></div>
              <div className="w-full flex flex-col sm:flex-row justify-between ">
                <h1>Total {noOfItems}</h1>
                <h1>Completed {noOfCompleted}</h1>
                <h1>Uncompleted {noOfUnCompleted}</h1>
                {/* <h1>Progress {progress}%</h1> */}
              </div>
              <button
                className="w-1/4 py-0 xl:px-2 xl:py-0 rounded-md bg-blue-400 hover:scale-110"
                onClick={deleteAllToDos}
              >
                Clear All
              </button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default App;
