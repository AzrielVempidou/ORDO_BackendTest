import { useState, useEffect } from "react";
import List from "../components/List";

export default function HomePage() {
  const [searchResults, setSearchResults] = useState([]);

  // Example function to fetch search results or filter them
  async function fetchSearchResults(query) {
    try {
      const response = await fetch(`http://localhost:8000/bukus?search=${query}`);
      if (!response.ok) {
        throw new Error("Failed to fetch search results");
      }
      const contentType = response.headers.get("Content-Type");
      if (contentType && contentType.includes("application/json")) {
        const data = await response.json();
        setSearchResults(data.data);
      } else {
        throw new Error("Invalid content type. Expected JSON.");
      }
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  }

  // Example usage: Fetch search results when component mounts
  useEffect(() => {
    fetchSearchResults(""); // Or pass any initial search query if needed
  }, []);

  return (
    <>
      <List updateList={searchResults} />
    </>
  );
}
