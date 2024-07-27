import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLogIn } from '../hooks/useLogin';

const Login = () => {
  const navigate = useNavigate();
  const { login, error, isLoading } = useLogIn();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(formData.email, formData.password);
    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="bg-slate-100 rounded-lg shadow-md backdrop-blur-5 border border-white/30 p-8  w-96 flex flex-col justify-center items-center">
        <h2 className="text-2xl font-semibold mb-4 text-black">Log In</h2>
        <form onSubmit={handleSubmit} className='w-full'>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <input
              placeholder='Enter Email'
              type="text"
              id="email"
              name="email"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-3xl focus:outline-none focus:border-blue-500 text-black"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
              Password
            </label>
            <input
              placeholder='Enter Password'
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-3xl focus:outline-none focus:border-blue-500 text-black"
              required
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-3xl hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
          >
            Log-In
          </button>

          {error &&
            <div>
              {error}
            </div>
          }
          <div className='mt-3'>
            <p className="text-sm font-light text-gray-900 ">
              Don’t have an account yet? <Link to='/register' className="font-medium text-blue-700 hover:underline">Sign up</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
