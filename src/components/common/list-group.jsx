import React from "react";
const ListGroup = props => {
  const {
    items,
    selectedItem,
    textProperty,
    valueProperty,
    onItemSelect
  } = props;
  return (
    <ul className="list-group">
      <li
        className={
          onItemSelect === "all" ? "list-group-item active" : "list-group-item"
        }
        onClick={() => selectedItem("all")}
      >
        All Genre
      </li>
      {items.map(item => {
        return (
          <li
            className={
              item === onItemSelect
                ? "list-group-item active"
                : "list-group-item"
            }
            key={item[textProperty]}
            onClick={() => selectedItem(item)}
          >
            {item[valueProperty]}
          </li>
        );
      })}
    </ul>
  );
};
ListGroup.defaultProps = {
  textProperty: "_id",
  valueProperty: "name"
};
export default ListGroup;
