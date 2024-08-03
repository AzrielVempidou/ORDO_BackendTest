import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function UpdateFormPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: '',
    author: '',
    status: '',
    description: '',
    coverIMG: null,
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8000/bukus/${id}`);
        if (response.ok) {
          const { data } = await response.json();

          setFormData({
            name: data.name || '',
            author: data.author || '',
            status: data.status ? 'Published' : 'Not Published',
            description: data.description || '',
            coverIMG: null,
          });
        } else {
          setError('Error fetching data');
        }
      } catch (error) {
        setError('Network Error: ' + error.message);
      }
    };
    fetchData();
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
  
    const payload = {
      name: formData.name,
      author: formData.author,
      status: formData.status,
      description: formData.description,
    };
  
    try {
      const response = await fetch(`http://localhost:8000/bukus/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
  
      const result = await response.json();
      if (response.ok) {
        navigate('/');
      } else {
        setError('Error: ' + (result.message || 'An error occurred'));
      }
    } catch (error) {
      setError('Network Error: ' + error.message);
    }
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <div className="card-wrapper max-w-full mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-full p-5">
      <div className="bg-white p-10 md:w-3/4 lg:w-1/2 mx-auto">
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <form onSubmit={handleSubmit}>
          <FormFields formData={formData} handleChange={handleChange} />
          <div className="text-right">
            <button type="submit" className="py-3 px-8 bg-green-400 text-white font-bold">
              Update
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

function FormFields({ formData, handleChange }) {
  return (
    <>
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
    </>
  );
}

FormFields.propTypes = {
  formData: PropTypes.shape({
    name: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    coverIMG: PropTypes.instanceOf(File),
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
};
