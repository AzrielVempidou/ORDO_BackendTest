import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function FormPages() {
  const navigate = useNavigate();
  const { id } = useParams(); // Get the `id` from the route parameters if updating
  const [formData, setFormData] = useState({
    name: '',
    author: '',
    status: '',
    description: '',
    coverIMG: null,
  });

  useEffect(() => {
    if (id) {
      // Fetch the existing data if `id` is provided (update mode)
      const fetchData = async () => {
        try {
          const response = await fetch(`http://localhost:8000/bukus/${id}`);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          setFormData({
            name: data.name || '',
            author: data.author || '',
            status: data.status || '',
            description: data.description || '',
            coverIMG: null, // You can't set the existing file to the state, handle file separately
          });
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      fetchData();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'file' ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataObj = new FormData();
    formDataObj.append('name', formData.name);
    formDataObj.append('author', formData.author);
    formDataObj.append('status', formData.status);
    formDataObj.append('description', formData.description);
    if (formData.coverIMG) {
      formDataObj.append('coverIMG', formData.coverIMG);
    }

    try {
      const url = id ? `http://localhost:8000/bukus/${id}` : 'http://localhost:8000/bukus';
      const method = id ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        body: formDataObj,
      });

      if (response.ok) {
        navigate('/');
      } else {
        const result = await response.json();
        console.error('Error:', result);
        // Display error message to user if needed
      }
    } catch (error) {
      console.error('Network Error:', error);
      // Display network error message to user if needed
    }
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <div className="card-wrapper max-w-full mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-full p-5">
      <div className="bg-white p-10 md:w-3/4 lg:w-1/2 mx-auto">
        <form onSubmit={handleSubmit}>
          <div className="flex items-center mb-5">
            <label htmlFor="name" className="inline-block w-20 mr-6 text-right font-bold text-gray-600">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              className="flex-1 py-2 border-b-2 border-gray-400 focus:border-green-400 text-gray-600 placeholder-gray-400 outline-none"
            />
          </div>

          <div className="flex items-center mb-5">
            <label htmlFor="author" className="inline-block w-20 mr-6 text-right font-bold text-gray-600">
              Author
            </label>
            <input
              type="text"
              id="author"
              name="author"
              placeholder="Author"
              value={formData.author}
              onChange={handleChange}
              className="flex-1 py-2 border-b-2 border-gray-400 focus:border-green-400 text-gray-600 placeholder-gray-400 outline-none"
            />
          </div>

          <div className="flex items-center mb-5">
            <label htmlFor="status" className="inline-block w-20 mr-6 text-right font-bold text-gray-600">
              Status
            </label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="flex-1 py-2 border-b-2 border-gray-400 focus:border-green-400 text-gray-600 placeholder-gray-400 outline-none"
            >
              <option value="" disabled>
                Select Status
              </option>
              <option value="Published">Published</option>
              <option value="Not Published">Not Published</option>
            </select>
          </div>

          <div className="flex items-center mb-5">
            <label htmlFor="description" className="inline-block w-20 mr-6 text-right font-bold text-gray-600">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
              className="flex-1 py-2 border-b-2 border-gray-400 focus:border-green-400 text-gray-600 placeholder-gray-400 outline-none"
            />
          </div>

          <div className="flex items-center mb-5">
            <label htmlFor="coverIMG" className="inline-block w-20 mr-6 text-right font-bold text-gray-600">
              Cover Image
            </label>
            <input
              type="file"
              id="coverIMG"
              name="coverIMG"
              onChange={handleChange}
              className="flex-1 py-2 border-b-2 border-gray-400 focus:border-green-400 text-gray-600 placeholder-gray-400 outline-none"
            />
          </div>

          <div className="text-right">
            <button type="submit" className="py-3 px-8 bg-green-400 text-white font-bold">
              {id ? 'Update' : 'Submit'}
            </button>
            <button type="button" onClick={handleCancel} className="py-3 px-8 bg-gray-400 text-white font-bold ml-4">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
