import { FC } from "react";

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  className?: string;
}

const Pagination: FC<PaginationProps> = ({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
  className = "",
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const getVisiblePages = () => {
    const visiblePages = [];
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, currentPage + 2);

    if (currentPage <= 3) {
      endPage = Math.min(5, totalPages);
    } else if (currentPage >= totalPages - 2) {
      startPage = Math.max(totalPages - 4, 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      visiblePages.push(i);
    }

    return visiblePages;
  };

  const visiblePages = getVisiblePages();

  return (
    <div className={`flex justify-center ${className}`}>
      <nav className="flex items-center gap-1">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 rounded border border-gray-300 disabled:opacity-50 hover:bg-gray-100 transition-colors text-sm"
        >
          قبلی
        </button>

        {!visiblePages.includes(1) && (
          <>
            <button
              onClick={() => onPageChange(1)}
              className={`px-3 py-1 rounded border ${
                1 === currentPage
                  ? "bg-indigo-600 text-white border-indigo-600"
                  : "border-gray-300 hover:bg-gray-100"
              } text-sm`}
            >
              1
            </button>
            {currentPage > 4 && <span className="px-2">...</span>}
          </>
        )}

        {visiblePages.map((number) => (
          <button
            key={number}
            onClick={() => onPageChange(number)}
            className={`px-3 py-1 rounded border text-sm ${
              currentPage === number
                ? "bg-indigo-600 text-white border-indigo-600"
                : "border-gray-300 hover:bg-gray-100"
            }`}
          >
            {number}
          </button>
        ))}

        {!visiblePages.includes(totalPages) && (
          <>
            {currentPage < totalPages - 3 && <span className="px-2">...</span>}
            <button
              onClick={() => onPageChange(totalPages)}
              className={`px-3 py-1 rounded border text-sm ${
                totalPages === currentPage
                  ? "bg-indigo-600 text-white border-indigo-600"
                  : "border-gray-300 hover:bg-gray-100"
              }`}
            >
              {totalPages}
            </button>
          </>
        )}

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 rounded border border-gray-300 disabled:opacity-50 hover:bg-gray-100 transition-colors text-sm"
        >
          بعدی
        </button>
      </nav>
    </div>
  );
};

export default Pagination;
