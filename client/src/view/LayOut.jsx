import { Outlet } from "react-router-dom";
import { useState } from "react";
import Navbar from "../components/Navbar ";
export default function LayOut() {
  console.log("LayOut rendered");
  const [ setSearchResults] = useState([]);

  const handleSearchQuery = (data) => {
    setSearchResults(data);
  };
  return (
    <>
     <Navbar setSearchQuery={handleSearchQuery} />
      <div className="bg-green-200 py-32 px-10 min-h-screen">
      <Outlet />
      </div>
    </>
  );
}
