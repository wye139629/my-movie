"use client";

import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { useMemo, useState } from "react";

type PaginationListProps<T> = {
  data: Array<T>;
  total: number;
  pageSize: number;
  renderItem: (item: T, key: string) => React.ReactElement;
};

export function PaginationList<T>({
  data,
  total,
  pageSize,
  renderItem,
}: PaginationListProps<T>) {
  const totalPages = Math.ceil(total / pageSize);
  const [currentPageIdx, setCurrentPageIdx] = useState(0);
  const [pageList, setPageList] = useState(() => {
    if (totalPages >= 5) {
      return [1, 2, 3, 4, 5];
    } else {
      const result = [];
      for (let index = 0; index < totalPages; index++) {
        result[index] = index + 1;
      }

      return result;
    }
  });
  const dataWithPages = useMemo(() => {
    let currentPageIdx = 0;
    let result = new Array(totalPages);

    return data.reduce(
      (acc, curr) => {
        if (!acc[currentPageIdx]) {
          acc[currentPageIdx] = [curr];
        } else {
          acc[currentPageIdx].push(curr);
        }

        if (acc[currentPageIdx].length === pageSize) {
          currentPageIdx++;
        }

        return acc;
      },
      result as Array<Array<T>>,
    );
  }, [data, totalPages, pageSize]);

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
    if (currentPageIdx === totalPages - 1) {
      return;
    }

    const nextPageIdx = currentPageIdx + 1;

    mutatePageList(nextPageIdx);

    setCurrentPageIdx(nextPageIdx);
  }

  function goPrevious() {
    if (currentPageIdx === 0) {
      return;
    }

    const nextPageIdx = currentPageIdx - 1;

    mutatePageList(nextPageIdx);

    setCurrentPageIdx(nextPageIdx);
  }

  function goToPage(page: number) {
    const pageIdx = page - 1;

    if (pageIdx > totalPages - 1) {
      return;
    }

    mutatePageList(pageIdx);

    setCurrentPageIdx(pageIdx);
  }

  return (
    <div>
      <div>
        {dataWithPages[currentPageIdx].map((item, idx) =>
          renderItem(item, String(idx)),
        )}
      </div>

      <nav aria-label="Page navigation">
        <ul className="flex justify-end items-center -space-x-px h-8 text-sm">
          <li onClick={goPrevious}>
            <a
              href="#"
              className="flex items-center justify-center px-3 h-8 ml-0 leading-tight rounded-l-lg border cursor-pointer hover:bg-mv-blue-dark"
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
                className={`flex items-center justify-center px-3 h-8 leading-tight border hover:bg-mv-blue-dark cursor-pointer ${page === currentPageIdx + 1 && "bg-mv-blue-dark"
                  }`}
              >
                {page}
              </a>
            </li>
          ))}
          <li onClick={goNext}>
            <a
              href="#"
              className="flex items-center justify-center px-3 h-8 ml-0 leading-tight rounded-r-lg border cursor-pointer hover:bg-mv-blue-dark"
            >
              <ChevronRightIcon className="w-4 h-4" />
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}
