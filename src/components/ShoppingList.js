import React, { useState, useEffect } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList() {
  const [items, setItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("http://localhost:4000/items")
      .then((response) => response.json())
      .then((items) => setItems(items));
  }, []);

  function handleAddItem(newItem) {
    setItems([...items, { ...newItem, isInCart: false }]);
  }

  function handleDeleteItem(deletedItem) {
    setItems(items.filter((item) => item.id !== deletedItem.id));
  }

  function handleUpdateItem(updatedItem) {
    const updatedItems = items.map((item) =>
      item.id === updatedItem.id ? updatedItem : item
    );
    setItems(updatedItems);
  }

  const itemsToDisplay = items
    .filter((item) => {
      if (selectedCategory === "All") return true;
      return item.category === selectedCategory;
    })
    .filter((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="ShoppingList">
      <ItemForm onAddItem={handleAddItem} />
      <Filter
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />
      <ul className="Items">
        {itemsToDisplay.map((item, index) => (
          <Item
            key={item.id} // Use unique item ID
            item={item}
            onDeleteItem={handleDeleteItem}
            onUpdateItem={handleUpdateItem}
          />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
