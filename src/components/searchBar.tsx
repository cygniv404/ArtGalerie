"use client";
import "../styles/search-bar.css";
import { ISearchBarProps } from "@/components/SearchBarMobile";

const SearchBar = ({
  handleSearchForm,
  handleSearchInputChange,
  toggleMobileSearchBar,
}: ISearchBarProps) => {
  return (
    <div>
      <form className="search-bar-container" onSubmit={handleSearchForm}>
        <input
          type="text"
          className="search-field md:!flex"
          placeholder="Please type in your search"
          onChange={handleSearchInputChange}
        />
        <button
          type="submit"
          className="hidden search-bar-submit-button md:flex"
        >
          <div className="search-bar-submit-button-label mg:!inline-block">
            Search
          </div>
          <svg
            className="h-8 w-8 text-white mg:hidden"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </button>
        <button
          className="flex search-bar-submit-button md:hidden"
          onClick={toggleMobileSearchBar}
        >
          <div className="search-bar-submit-button-label mg:inline-block">
            Search
          </div>
          <svg
            className="h-8 w-8 text-white mg:hidden"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </button>
      </form>
    </div>
  );
};

export { SearchBar };
