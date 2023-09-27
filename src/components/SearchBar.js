import React, { useState } from "react";

export default function SearchBar() {
  const [search, setSearch] = useState("");
  return (
    <>
      <input
        type="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </>
  );
}
