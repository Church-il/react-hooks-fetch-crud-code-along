import React from "react";
import PropTypes from "prop-types";

function Item({ item, onDeleteItem, onUpdateItem }) {
  if (!item || typeof item !== "object") {
    console.error("Invalid item prop:", item);
    return <p>Item data is not available.</p>;
  }

  const handleAddToCartClick = () => {
    fetch(`http://localhost:4000/items/${item.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        isInCart: !item.isInCart,
      }),
    })
      .then((response) => response.json())
      .then((updatedItem) => onUpdateItem(updatedItem))
      .catch((error) => console.error("Error updating item:", error));
  };

  const handleDeleteClick = () => {
    fetch(`http://localhost:4000/items/${item.id}`, {
      method: "DELETE",
    })
      .then(() => onDeleteItem(item))
      .catch((error) => console.error("Error deleting item:", error));
  };

  return (
    <li className={item.isInCart ? "in-cart" : ""}>
      <span>{item.name}</span>
      <span className="category">{item.category}</span>
      <button className={item.isInCart ? "remove" : "add"} onClick={handleAddToCartClick}>
        {item.isInCart ? "Remove From Cart" : "Add to Cart"}
      </button>
      <button className="remove" onClick={handleDeleteClick}>
        Delete
      </button>
    </li>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    isInCart: PropTypes.bool.isRequired,
  }).isRequired,
  onDeleteItem: PropTypes.func.isRequired,
  onUpdateItem: PropTypes.func.isRequired,
};

export default Item;
