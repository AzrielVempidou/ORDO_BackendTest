import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

export default function DetailPages() {
  const { id } = useParams(); // Get the book ID from the URL
  const [book, setBook] = useState(null);

  useEffect(() => {
    async function fetchBookDetails() {
      try {
        const response = await fetch(`http://localhost:8000/bukus/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch book details");
        }
        const data = await response.json();
        setBook(data.data); // Set the fetched book details to state
      } catch (error) {
        console.error("Error fetching book details:", error);
      }
    }

    fetchBookDetails();
  }, [id]);

  // Return loading or error state if book data is not available
  if (!book) {
    return <div>Loading...</div>;
  }

  return (
    <div className="card-wrapper max-w-full mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-full p-5">
      <section className="text-gray-700 body-font overflow-hidden bg-white">
        <div className="container px-5 py-24 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <img 
              alt={book.name} 
              className="lg:w-1/2 w-full object-cover object-center rounded border border-gray-200" 
              src={book.coverIMG || "https://via.placeholder.com/500"} 
            />
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h2 className="text-sm title-font text-gray-500 tracking-widest">Author: {book.author}</h2>
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{book.name}</h1>
              <p className="leading-relaxed">{book.description}</p>
              <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-200 mb-5">
                <div className="flex">
                  <span className="mr-3">Status</span>
                  <span className="text-gray-600">{book.status}</span>
                </div>
              </div>
              <div className="flex">
                <Link to="/">
                  <button className="flex ml-auto text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded">Back</button>
                </Link>

              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
