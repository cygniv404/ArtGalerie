import { useEffect, useState } from "react";

export type Painting = {
  webImage: { url: string };
  id: string;
  longTitle: string;
  principalMaker: string;
  objectTypes: string[];
  subTitle: string;
  description: string;
};
export type Paint = {
  id: string;
  objectNumber: string;
  hasImage: boolean;
  headerImage: { url: string; width: number; height: number };
  principalOrFirstMaker: string;
  title: string;
};
interface IUseFetchProps {
  paintingId?: string;
  currentPage?: number | undefined;
  searchQ?: string | undefined;
}
const useFetch = ({
  paintingId: initPaintingId = "",
  currentPage: initCurrentPage = undefined,
  searchQ: initSearchQ = undefined,
}: IUseFetchProps) => {
  const [paints, setPaints] = useState<Paint[] | []>([]);
  const [count, setCount] = useState(0);
  const [painting, setPainting] = useState<Painting | undefined>(undefined);
  const [paintingId, setPaintingId] = useState<string>(initPaintingId);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [currentPage, setCurrentPage] = useState<number | undefined>(
    initCurrentPage,
  );
  const [searchQ, setSearchQuery] = useState<string | undefined>(initSearchQ);

  const encodeGetParams = (p: object) =>
    Object.entries(p)
      .filter((kv) => kv[1])
      .map((kv) => kv.join("="))
      .join("&");

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        const response = await fetch(
          `/api/rijksData?${encodeGetParams({
            currentPage,
            searchQ,
            paintingId,
          })}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          },
        );
        const artApiResponse = await response.json();
        if (artApiResponse.hasOwnProperty("artObject")) {
          const { artObject } = artApiResponse;
          setPainting(artObject);
        } else {
          const { artObjects, count } = artApiResponse;
          setPaints(artObjects);
          setCount(count);
        }
      } catch (error) {
        setIsError(true);
      }

      setIsLoading(false);
    };

    fetchData();
  }, [currentPage, searchQ, paintingId]);
  return {
    paints,
    count,
    isLoading,
    isError,
    setCurrentPage,
    currentPage,
    setSearchQuery,
    searchQ,
    setPaintingId,
    painting,
  };
};

export { useFetch };
