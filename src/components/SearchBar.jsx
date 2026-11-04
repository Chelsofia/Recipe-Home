export default function SearchBar({ search, setSearch, handleSubmit }) {

  return (
   <div>
        <form
              onSubmit={handleSubmit}
              className="max-w-md mx-auto"
            >
              <div className="flex items-center w-full h-12 rounded-lg bg-white overflow-hidden border border-gray-200">
                <input
                  className="h-full w-full outline-none text-gray-700 px-4 text-[16px]"
                  type="text"
                  placeholder="Search recipes..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <button
                  type="submit"
                  className=" text-white h-full px-5"
                >
                  Search
                </button>
              </div>
            </form>
   </div>
  );
}