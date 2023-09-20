import type { ReactNode } from "react";

type IHeaderProps = {
  logo: ReactNode;
  searchBar: ReactNode;
  searchBarMobile: ReactNode;
  showMobileSearchBar: boolean;
};
const Header = (props: IHeaderProps) => {
  const { logo, searchBar, searchBarMobile, showMobileSearchBar } = props;
  return (
    <>
      <header className="header-container">
        {logo}
        {searchBar}
      </header>
      <div
        className={`${
          showMobileSearchBar ? "" : "hidden"
        } search-bar-mobile-container absolute flex`}
      >
        {searchBarMobile}
      </div>
    </>
  );
};

export { Header };
