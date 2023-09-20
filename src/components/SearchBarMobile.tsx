import "../styles/search-bar-mobile.scss";
import { KeyboardEvent, ChangeEventHandler, FormEvent } from "react";
import type { MouseEvent } from "react";
export type ISearchBarProps = {
  handleSearchForm: (
    e: FormEvent<HTMLFormElement> | KeyboardEvent<HTMLInputElement>,
  ) => void;
  handleSearchInputChange: ChangeEventHandler<HTMLInputElement>;
  toggleMobileSearchBar: (event: MouseEvent<any>) => void;
};
export const SearchBarMobile = ({
  handleSearchForm,
  handleSearchInputChange,
  toggleMobileSearchBar,
}: ISearchBarProps) => {
  return (
    <form
      className="search-bar-container search-form "
      action="/"
      method="get"
      autoComplete="off"
      onSubmit={handleSearchForm}
    >
      <input
        type="text"
        className="!inline-block search-field"
        placeholder="Please type in your search"
        onChange={handleSearchInputChange}
        onKeyPress={(e) => (e.key === "Enter" ? handleSearchForm(e) : null)}
      />
      <div className="search-form-button-container">
        <button
          onClick={toggleMobileSearchBar}
          className="search-bar-submit-button flex"
        >
          <div className="!inline-block search-bar-submit-button-label">
            cancel
          </div>
        </button>
        <button type="submit" className="search-bar-submit-button flex">
          <div className="!inline-block search-bar-submit-button-label">
            search
          </div>
        </button>
      </div>
    </form>
  );
};

export default { SearchBarMobile };
