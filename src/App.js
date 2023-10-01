import React, { useState } from "react";
import ListDetails from "./components/todoList/listDetails";
import ItemsList from "./components/todoList/itemsList";

function App() {
  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem("items");
    const initialValue = JSON.parse(saved);
    return initialValue || [];
  });

  const itemValue = (items) => {
    setItems(items);
  };

  // useEffect(() => {
  //   const tasks = JSON.parse(localStorage.getItem("items"));
  //   if (tasks) {
  //     setItems(tasks);
  //   }
  // }, []);

  return (
    <div className="w-screen h-screen flex flex-col items-center space-y-5 py-10 bg-blue-300 scrollbar overflow-y-auto overflow-x-auto">
      <h1 className="font-bold text-3xl sm:text-4xl xl:text-5xl text-center font-bouncy text-white">
        Daily To Do List
      </h1>

      <div className="w-4/5 h-4/5 space-y-12">
        <div className="pb-5">
          <ListDetails items={items} getItemsValue={itemValue} />
        </div>

        <div className="pb-12">
          <ItemsList items={items} getItemsValue={itemValue} />
        </div>
      </div>
    </div>
  );
}

export default App;
