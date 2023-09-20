"use client";
import type {
  ChangeEvent,
  FormEvent,
  JSXElementConstructor,
  ReactElement,
  KeyboardEvent,
} from "react";

import { SearchBar } from "@/components/searchBar";
import { Logo } from "@/components/Logo";
import { cloneElement, MouseEvent, useState } from "react";
import { Header } from "@/templates/Header";
import { Footer } from "@/templates/Footer";
import { SearchBarMobile } from "@/components/SearchBarMobile";
import { useRouter } from "next/router";
import { useFetch } from "@/components/hooks/useFetch";

type IMainProps = {
  children: ReactElement<any, string | JSXElementConstructor<any>>;
};
const Main = (props: IMainProps) => {
  const router = useRouter();
  const {
    paints,
    count,
    isLoading,
    setCurrentPage,
    currentPage,
    setSearchQuery,
    searchQ,
  } = useFetch({ currentPage: 0, searchQ: undefined });
  const [showMobileSearchBar, setShowMobileSearchBar] = useState(false);
  const [searchInput, setSearchInput] = useState<string | undefined>(undefined);

  const handleSearchForm = async (
    e: FormEvent<HTMLFormElement> | KeyboardEvent<HTMLInputElement>,
  ) => {
    e.preventDefault();
    if (searchInput) {
      if (router.asPath !== "/") {
        await router.push("/");
      }
      setCurrentPage(0);
      setSearchQuery(searchInput);
    }
  };

  const goToHomePage = async () => {
    if (router.asPath !== "/") {
      await router.push("/");
    }
    setCurrentPage(undefined);
    setSearchQuery(undefined);
  };

  const handleSearchInputChange = (e: ChangeEvent<HTMLInputElement>) =>
    setSearchInput(e.target.value);

  const toggleMobileSearchBar = (e: MouseEvent<any>) => {
    e.preventDefault();
    setShowMobileSearchBar(!showMobileSearchBar);
  };

  return (
    <div className="w-full antialiased p-4 bg-gradient-to-br from-slate-800 to-stone-900 flex-col justify-start items-start gap-8 px-5 app-container ">
      <div className="mx-auto max-w-screen-2xl h-[100%]">
        <Header
          searchBar={
            <SearchBar
              handleSearchForm={handleSearchForm}
              handleSearchInputChange={handleSearchInputChange}
              toggleMobileSearchBar={toggleMobileSearchBar}
            />
          }
          logo={<Logo goToHomePage={goToHomePage} />}
          searchBarMobile={
            <SearchBarMobile
              toggleMobileSearchBar={toggleMobileSearchBar}
              handleSearchForm={handleSearchForm}
              handleSearchInputChange={handleSearchInputChange}
            />
          }
          showMobileSearchBar={showMobileSearchBar}
        />
        <main>
          {cloneElement(props.children, {
            isLoading,
            paints,
            count,
            currentPage,
            searchQ,
            setCurrentPage,
          })}
        </main>
        <Footer />
      </div>
    </div>
  );
};

export { Main };
