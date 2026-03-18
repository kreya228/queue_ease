import { ChevronLeft, ChevronRight } from "lucide-react";

const Pagination = ({ totalElements, elementsPerPage, currentPage, setCurrentPage }) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalElements / elementsPerPage); i++) {
    pageNumbers.push(i);
  }

  if (pageNumbers.length <= 1) return null;

  return (
    <nav className="flex justify-center mt-8">
      <ul className="flex items-center space-x-2">
        <li>
          <button
            onClick={() => setCurrentPage(currentPage > 1 ? currentPage - 1 : 1)}
            disabled={currentPage === 1}
            className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 dark:hover:bg-gray-800 transition"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </button>
        </li>
        {pageNumbers.map((number) => (
          <li key={number}>
            <button
              onClick={() => setCurrentPage(number)}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                currentPage === number
                  ? "bg-primary-600 text-white shadow-md dark:bg-primary-500"
                  : "bg-white text-gray-700 hover:bg-gray-100 dark:bg-dark-card dark:text-gray-300 dark:border-gray-700 dark:hover:bg-gray-800"
              }`}
            >
              {number}
            </button>
          </li>
        ))}
        <li>
          <button
            onClick={() => setCurrentPage(currentPage < pageNumbers.length ? currentPage + 1 : pageNumbers.length)}
            disabled={currentPage === pageNumbers.length}
            className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 dark:hover:bg-gray-800 transition"
          >
            <ChevronRight className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
