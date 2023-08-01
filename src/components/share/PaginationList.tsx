"use client";

import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { useMemo, useState } from "react";
import { SpinAnime } from "./";

type PaginationListProps<T> = {
  data: Array<T> | undefined;
  total: number;
  pageSize: number;
  renderItem: (item: T) => React.ReactElement;
  isLoading?: boolean;
  onPageChange?: (page: number) => void;
  direction?: "vertical" | "horizontal";
  rowKey?: string;
  skeletonLayout?: React.ReactElement;
};

function calcPageList(totalPages: number) {
  const defaultPages = [1, 2, 3, 4, 5];

  if (!totalPages) {
    return defaultPages;
  }

  if (totalPages >= 5) {
    return defaultPages;
  } else {
    return defaultPages.slice(0, totalPages);
  }
}

export function PaginationList<T>({
  data,
  total,
  pageSize,
  direction = "vertical",
  isLoading = false,
  rowKey,
  skeletonLayout = <SpinAnime />,
  onPageChange = (page: number) => {},
  renderItem,
}: PaginationListProps<T>) {
  const totalPages = Math.ceil(total / pageSize);
  const [currentPageIdx, setCurrentPageIdx] = useState(0);
  const [pageList, setPageList] = useState(() => calcPageList(totalPages));

  const displayData = useMemo(() => {
    if (!data) {
      return [];
    }

    if (data.length === pageSize) {
      return data;
    }

    const displayStartIdx = pageSize * currentPageIdx;
    const displayEndIdx = displayStartIdx + pageSize;

    return data.slice(displayStartIdx, displayEndIdx);
  }, [pageSize, data, currentPageIdx]);

  const noData = displayData.length === 0;

  function mutatePageList(nextPageIdx: number) {
    const nextPage = nextPageIdx + 1;
    const nextPageList = [nextPage];

    if (totalPages <= 5) {
      return;
    }

    for (let value = 1; nextPageList.length < 5; value++) {
      const left = nextPage - value;
      const right = nextPage + value;

      if (left >= 1) {
        nextPageList.unshift(left);
      }

      if (right <= totalPages) {
        nextPageList.push(right);
      }
    }

    setPageList(nextPageList);
  }

  function goNext() {
    if (noData) {
      return;
    }

    if (currentPageIdx === totalPages - 1) {
      return;
    }

    const nextPageIdx = currentPageIdx + 1;

    mutatePageList(nextPageIdx);

    setCurrentPageIdx(nextPageIdx);

    onPageChange(nextPageIdx + 1);
  }

  function goPrevious() {
    if (noData) {
      return;
    }

    if (currentPageIdx === 0) {
      return;
    }

    const nextPageIdx = currentPageIdx - 1;

    mutatePageList(nextPageIdx);

    setCurrentPageIdx(nextPageIdx);

    onPageChange(nextPageIdx + 1);
  }

  function goToPage(page: number) {
    if (noData) {
      return;
    }

    const pageIdx = page - 1;

    if (pageIdx > totalPages - 1) {
      return;
    }

    mutatePageList(pageIdx);

    setCurrentPageIdx(pageIdx);

    onPageChange(pageIdx + 1);
  }

  return (
    <div className="relative pb-10 min-h-[500px]">
      <div>
        {isLoading || noData ? (
          <div className="min-h-[400px] flex justify-center items-center">
            {skeletonLayout}
          </div>
        ) : (
          <ul
            className={`${
              direction === "horizontal" &&
              "grid grid-cols-1 md:grid md:grid-cols-2 lg:grid lg:grid-cols-3 xl:grid xl:grid-cols-4"
            }`}
          >
            {displayData.map((item, idx) => {
              const key = rowKey ? item[rowKey as keyof T] : idx;

              return <div key={key as string}>{renderItem(item)}</div>;
            })}
          </ul>
        )}
      </div>

      <nav
        className="absolute bottom-0 left-0 right-0 mx-auto"
        aria-label="Page navigation"
      >
        <ul className="flex justify-center items-center -space-x-px h-8 text-sm text-white">
          <li onClick={goPrevious}>
            <a
              href="#"
              className="flex items-center justify-center px-3 h-8 ml-0 leading-tight rounded-l-lg border cursor-pointer hover:bg-mv-blue-500"
            >
              <ChevronLeftIcon className="w-4 h-4" />
            </a>
          </li>
          {pageList.map((page) => (
            <li
              key={page}
              onClick={() => {
                goToPage(page);
              }}
            >
              <a
                href="#"
                className={`flex items-center justify-center px-3 h-8 leading-tight border hover:bg-mv-blue-500 cursor-pointer ${
                  page === currentPageIdx + 1 && "bg-mv-blue-500"
                }`}
              >
                {page}
              </a>
            </li>
          ))}
          <li onClick={goNext}>
            <a
              href="#"
              className="flex items-center justify-center px-3 h-8 ml-0 leading-tight rounded-r-lg border cursor-pointer hover:bg-mv-blue-500"
            >
              <ChevronRightIcon className="w-4 h-4" />
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}
