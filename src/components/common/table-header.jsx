import React, { Component } from "react";

class TableHeader extends Component {
  raiseSort(path) {
    const sortColumn = { ...this.props.sortColumn };
    if (sortColumn.path === path) {
      sortColumn.ord = sortColumn.ord === "asc" ? "desc" : "asc";
      this.props.onSort(sortColumn);
    } else {
      sortColumn.path = path;
      sortColumn.ord = "asc";
      this.props.onSort(sortColumn);
    }
  }
  renderIcon = column => {
    if (column.path !== this.props.sortColumn.path) return null;
    if (this.props.sortColumn.ord === "asc")
      return <i className="fa fa-sort-asc" />;
    return <i className="fa fa-sort-desc" />;
  };
  render() {
    const { columns } = this.props;
    return (
      <thead>
        <tr>
          {columns.map(column => {
            return (
              <th
                key={column.title || column.key}
                onClick={() => this.raiseSort(column.path)}
                scope="col"
                className="clickable"
              >
                {column.title}
                {this.renderIcon(column)}
              </th>
            );
          })}
        </tr>
      </thead>
    );
  }
}

export default TableHeader;
