import React from "react";
import _ from "lodash";
const Pagination = props => {
  const { itemsCount, pageSize, onPageChange, currentPage } = props;
  const pageCount = Math.ceil(itemsCount / pageSize);
  if (pageCount === 1) {
    return null;
  }
  const pages = _.range(1, pageCount + 1);
  return (
    <nav>
      <ul className="pagination">
        {pages.map(page => (
          <li
            key={page}
            className={page === currentPage ? "page-item active" : "page-item"}
          >
            <span onClick={() => onPageChange(page)} className="page-link">
              {page}
            </span>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
