import { useMemo } from "react";
import { RIJKSDATA_API_MAX_QUERY_RESULTS } from "@/libs/rijksData";

export const DOTS = null;

const range = (start: number, end: number) => {
  let length = end - start + 1;
  return Array.from({ length }, (_, idx) => idx + start);
};
type IUsePaginationProps = {
  count: number;
  pageSize?: number;
  siblingCount?: number;
  currentPage: number | undefined;
};
export const usePagination = ({
  count,
  pageSize = 9,
  siblingCount = 1,
  currentPage,
}: IUsePaginationProps) => {
  return useMemo(() => {
    let totalPageCount;
    if (count > RIJKSDATA_API_MAX_QUERY_RESULTS) {
      totalPageCount = Math.ceil(RIJKSDATA_API_MAX_QUERY_RESULTS / pageSize);
    } else {
      totalPageCount = Math.ceil(count / pageSize);
    }
    // Pages count is determined as siblingCount + firstPage + lastPage + currentPage + 2*DOTS
    const totalPageNumbers = siblingCount + 5;

    if (totalPageNumbers >= totalPageCount) {
      return range(1, totalPageCount);
    }

    const leftSiblingIndex = Math.max((currentPage ?? 0) - siblingCount, 1);
    const rightSiblingIndex = Math.min(
      (currentPage ?? 0) + siblingCount,
      totalPageCount,
    );

    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2;

    const firstPageIndex = 1;
    const lastPageIndex = totalPageCount;

    if (!shouldShowLeftDots && shouldShowRightDots) {
      let leftItemCount = 3 + 2 * siblingCount;
      let leftRange = range(1, leftItemCount);
      return [...leftRange, DOTS, totalPageCount];
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      let rightItemCount = 3 + 2 * siblingCount;
      let rightRange = range(
        totalPageCount - rightItemCount + 1,
        totalPageCount,
      );

      return [firstPageIndex, DOTS, ...rightRange];
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      let middleRange = range(leftSiblingIndex, rightSiblingIndex);

      return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
    }

    return [];
  }, [count, pageSize, siblingCount, currentPage]);
};
