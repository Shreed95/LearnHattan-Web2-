import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const RegisterTutor = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
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
    const response = await fetch("/api/tutor/register", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: formData.username,
        email: formData.email,
        password: formData.password
      })
    });
    const json = await response.json();
    console.log(json);
    if (!json.success) {
      alert(json.errors);
    }
    if (json.success) {
      navigate('/login');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="bg-slate-100 backdrop-blur-5 border border-white/30 p-8 rounded shadow-md flex flex-col justify-center items-center w-96">
        <h2 className="text-2xl font-semibold mb-4 text-black">Tutor Registration</h2>
        <form onSubmit={handleSubmit} className='w-full'>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Username</label>
            <input
              placeholder='Enter Username'
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-3xl focus:outline-none focus:border-blue-500 text-black"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-bold mb-2 text-black">Email</label>
            <input
              placeholder='Enter Email'
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-3xl focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Password</label>
            <input
              placeholder='Enter Password'
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-3xl focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white mt-3 py-2 px-4 rounded-3xl hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
          >
            Sign Up
          </button>
          <div className='mt-3'>
            <p className="text-sm font-light text-gray-900 ">
              Already have an Account ? <Link to='/login-tutor' className="font-medium text-blue-700 hover:underline">Log In as tutor</Link>
            </p>
            <p className="text-sm font-light text-gray-900 ">
              Register as User instead? <Link to='/register' className="font-medium text-blue-700 hover:underline">Register as User</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterTutor;
