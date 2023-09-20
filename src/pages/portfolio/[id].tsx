import { useEffect } from "react";
import { useRouter } from "next/router";
import { PaintingPlaceholder } from "@/components/PaintingPlaceholder";
import { Loader } from "@/components/Loader";
import { Painting, useFetch } from "@/components/hooks/useFetch";

const PortfolioDetail = () => {
  const router = useRouter();
  const { setPaintingId, painting } = useFetch({});
  const getResultPageBack = () => router.back();

  useEffect(() => {
    const pId = router.query.id;
    if (pId) {
      setPaintingId(pId as string);
    }
  }, [router]);
  return (
    <>
      <div className="content-body">
        <button
          onClick={getResultPageBack}
          className="return-to-list-button pt-6"
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
              fill="#E10856"
            />
          </svg>

          <div className="back-to-the-list-label">Back to the List</div>
        </button>
        {(painting as Painting) ? (
          <>
            <div className="card">
              <div className="text-shadow-single" />
              {painting?.webImage?.url ? (
                <img
                  className="card-img-single h-full w-full object-cover object-center"
                  src={painting.webImage.url}
                  alt={painting.id}
                />
              ) : (
                <PaintingPlaceholder />
              )}
              <div className="painting-long-title pb-3">
                {painting?.longTitle}
              </div>
            </div>
            <div className="table">
              <div className="row-table">
                <div className="row-title">Title</div>
                <div className="row-title2">{painting?.longTitle ?? "-"}</div>
              </div>
              <div className="row-table">
                <div className="row-title">Artist</div>
                <div className="row-title2">
                  {painting?.principalMaker ?? "-"}
                </div>
              </div>
              <div className="row-table">
                <div className="row-title">Object Type</div>
                <div className="row-title2">
                  {painting?.objectTypes?.join(", ") ?? "-"}
                </div>
              </div>
              <div className="row-table">
                <div className="row-title">Measurements</div>
                <div className="row-title2">{painting?.subTitle ?? "-"}</div>
              </div>
              <div className="row-table2">
                <div className="row-title">Description</div>
                <div className="row-title2">{painting?.description ?? "-"}</div>
              </div>
            </div>
          </>
        ) : (
          <Loader />
        )}
      </div>
    </>
  );
};

export default PortfolioDetail;
