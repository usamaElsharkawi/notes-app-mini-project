export default function SearchInput({
  value,
  setSearchQuery,
}) {
  return (
    <div className="mb-6 p-4 bg-gray-900 rounded-lg border border-gray-700">
      <input
        type="text"
        placeholder="Search Notes..."
        className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"
        value={value}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
  );
}


// export default function