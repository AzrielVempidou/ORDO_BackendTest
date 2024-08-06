import { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function List({ updateList }) {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState('');

  // Fetch books from API or use updateList prop
  const fetchBooks = useCallback(async () => {
    try {
      const url = search
        ? `http://localhost:8000/bukus/search/${encodeURIComponent(search)}`
        : 'http://localhost:8000/bukus';
        
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch books');
      }

      const contentType = response.headers.get('Content-Type');
      if (contentType && contentType.includes('application/json')) {
        const data = await response.json();
        setBooks(data.data);
      } else {
        throw new Error('Invalid content type. Expected JSON.');
      }
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  }, [search]);

  // Effect to update books when updateList changes or search term changes
  useEffect(() => {
    if (updateList) {
      setBooks(updateList);
    } else {
      fetchBooks();
    }
  }, [updateList, search, fetchBooks]);

  // Handle book deletion
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      try {
        const response = await fetch(`http://localhost:8000/bukus/${id}`, {
          method: 'DELETE',
        });
        if (!response.ok) {
          throw new Error('Failed to delete book');
        }
        fetchBooks();
      } catch (error) {
        console.error('Error deleting book:', error);
      }
    }
  };

  return (
    <>    
    <div className="flex items-center max-w-md mx-auto bg-white rounded-lg">
      <div className="w-full">
        <input
          type="search"
          className="w-full px-4 py-1 text-gray-800 rounded-md focus:outline-none border-4 border-gray-200"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div>
        <button
          type="submit"
          className={`flex items-center justify-center w-12 h-12 text-white rounded-r-md ${
            search.length > 0 ? 'bg-purple-500' : 'bg-gray-500 cursor-not-allowed'
          }`}
          disabled={search.length === 0}
          onClick={fetchBooks}
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
        </button>
      </div>
    </div> <br/>
    
    <div className="card-wrapper max-w-full mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-full p-5">
      {books.length === 0 ? (
        <p>No books available.</p>
      ) : (
        books.map((book) => (
          <div key={book.id} className="max-w-full mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-full m-5">
            <div className="md:flex">
              <div className="md:flex-shrink-0">
                <img
                  className="h-48 w-full object-cover md:w-48"
                  src={book.image || 'https://via.placeholder.com/150'}
                  alt={book.title || 'Book image'}
                />
              </div>
              <div className="p-8">
                <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                  {book.name}
                </div>
                <p className="block mt-1 text-lg leading-tight font-medium text-black">
                  {book.description}
                </p>
                <p className="mt-2 text-gray-500">{book.details}</p>
                <div className="inline-flex items-center rounded-md shadow-sm">
                  <Link to={`/edit/${book.id}`}>
                    <button className="text-slate-800 hover:text-blue-600 text-sm bg-white hover:bg-slate-100 border border-slate-200 rounded-l-lg font-medium px-4 py-2 inline-flex space-x-1 items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-4 h-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                        />
                      </svg>
                    </button>
                  </Link>
                  <Link to={`/detail/${book.id}`}>
                    <button className="text-slate-800 hover:text-blue-600 text-sm bg-white hover:bg-slate-100 border-y border-slate-200 font-medium px-4 py-2 inline-flex space-x-1 items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-4 h-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </button>
                  </Link>
                  <button
                    onClick={() => handleDelete(book.id)}
                    className="text-slate-800 hover:text-red-600 text-sm bg-white hover:bg-slate-100 border border-slate-200 rounded-r-lg font-medium px-4 py-2 inline-flex space-x-1 items-center"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.337 6.722m-.065-2.9a2.25 2.25 0 01-.065-.737L4.6 2.25h14.8c.144 0 .283.018.42.048l.689.206a2.25 2.25 0 011.593 2.245l-1.09 3.275"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
    </>
  );
}

List.propTypes = {
  updateList: PropTypes.array,
};

List.defaultProps = {
  updateList: [],
};
