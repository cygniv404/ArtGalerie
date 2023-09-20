import Link from "next/link";
import { Pagination } from "@/components/Pager";
import { PaintingPlaceholder } from "@/components/PaintingPlaceholder";
import { LoaderHome } from "@/components/LoaderHome";

export type IPortfolioProps = {
  isLoading?: boolean;
  paints?: object[];
  count: number;
  currentPage: number | undefined;
  searchQ?: string | undefined;
  setCurrentPage: (p: number) => number | undefined;
};

const Portfolio = ({
  isLoading,
  paints,
  count,
  currentPage,
  searchQ,
  setCurrentPage,
}: IPortfolioProps) => (
  <>
    {isLoading ? (
      <LoaderHome />
    ) : (
      <>
        <span className="search-result py-6">
          {!searchQ && count ? "All artwork" : null}
          {searchQ
            ? count > 0
              ? `Found ${count} results` + " for: " + searchQ + "."
              : "No results found for: " + searchQ + "."
            : null}
        </span>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3 min-h-[800px]">
          {paints &&
            paints.map((painting: any) => (
              <Link
                className="border-none"
                key={painting.id}
                href={`/portfolio/${painting.objectNumber}`}
              >
                <div className="overflow-hidden image-container">
                  {painting.hasImage ? (
                    <img
                      className="card-img h-full w-full object-cover object-center"
                      loading="lazy"
                      src={painting.headerImage.url}
                      width={painting.headerImage.width}
                      height={painting.headerImage.height}
                      alt={painting.id}
                    />
                  ) : (
                    <PaintingPlaceholder isPreview />
                  )}

                  <div className="text-shadow" />
                  <div className="tag">
                    <div className="maker">
                      {painting.principalOrFirstMaker
                        ? painting.principalOrFirstMaker
                        : "anonymous"}
                    </div>
                  </div>
                  <div className="title">{painting.title}</div>
                </div>
              </Link>
            ))}
        </div>
        {count ? (
          <div className="pagination-container my-3">
            <Pagination
              currentPage={currentPage}
              count={count}
              setCurrentPage={setCurrentPage}
            />
          </div>
        ) : null}
      </>
    )}
  </>
);
export default Portfolio;
