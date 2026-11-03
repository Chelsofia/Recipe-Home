export default function Pagination({
  currentPage,
  setCurrentPage,
  totalPages
}) {

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const previousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <div className="flex items-center justify-center gap-4 mt-6">

      <button
        onClick={previousPage}
        disabled={currentPage === 1}
        className=" text-white px-4 py-2 rounded disabled:opacity-50"
      >
        Previous
      </button>

      <span>
        Page {currentPage} of {totalPages}
      </span>

      <button
        onClick={nextPage}
        disabled={currentPage === totalPages}
        className=" text-white px-4 py-2 rounded disabled:opacity-50"
      >
        Next
      </button>

    </div>
  );
}