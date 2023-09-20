"use client";
import { usePagination, DOTS } from "@/components/hooks/usePagination";
import { IPortfolioProps } from "@/pages";

const Pagination = ({
  currentPage,
  count,
  setCurrentPage,
}: IPortfolioProps) => {
  const paginationRange = usePagination({
    currentPage,
    count,
  });

  const onNext = () => {
    setCurrentPage((currentPage ?? 0) + 1);
  };

  const onPrevious = () => {
    setCurrentPage((currentPage ?? 0) - 1);
  };

  let lastPage = paginationRange[paginationRange.length - 1];

  return (
    <ul className="pagination">
      <li
        onClick={onPrevious}
        className={`pagination-item${
          (currentPage ?? 0) < 2 ? " " + "disabled" : ""
        }`}
      >
        <svg
          className="icons-chevron-left"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15 16L10.707 11.707L15 7.414L13.586 6L7.879 11.707L13.586 17.414L15 16Z"
            fill="#C4C4C4"
          />
        </svg>
      </li>
      {paginationRange.map((pageNumber) => {
        if (pageNumber === DOTS) {
          return <li className="pagination-item dots">&#8230;</li>;
        }

        return (
          <li
            className={`pagination-item${
              (currentPage ?? 0) + 1 === pageNumber ? " " + "current" : ""
            }`}
            onClick={() => setCurrentPage(pageNumber - 1)}
          >
            {pageNumber}
          </li>
        );
      })}
      <li
        className={`pagination-item${
          (currentPage ?? 0) + 1 === lastPage ? " " + "disabled" : ""
        }`}
        onClick={onNext}
      >
        <svg
          className="icons-chevron-left2"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9 8L13.293 12.293L9 16.586L10.414 18L16.121 12.293L10.414 6.586L9 8Z"
            fill="#C4C4C4"
          />
        </svg>
      </li>
    </ul>
  );
};

export { Pagination };
