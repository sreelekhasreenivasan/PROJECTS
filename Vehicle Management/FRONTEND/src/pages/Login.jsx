import React, {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom'

const Login = () => {

    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const navigate = useNavigate();

    const loginSubmit = async (e) => {
        e.preventDefault();
        const loginDetails = {
            email,
            password,
        };
        const res = await fetch('http://127.0.0.1:5000/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginDetails),
            credentials: 'include',
        });
        if(res.ok){
            const data = await res.json();
            toast.success(`Logged in as: ${data.userType}`);
            navigate('/home');
        } else{
            toast.error('Please check your credentials.');
        }
    } 
  return (
    <div className=" flex items-center justify-center mb-20 mt-12">
    <div className="bg-white p-10 rounded-lg shadow-lg max-w-sm w-full">
      <h2 className="text-3xl font-bold text-red-700 mb-4 text-center">Login</h2>
      <form onSubmit={loginSubmit}>
        
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded shadow-sm "
          />
        </div>
        
        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-700 font-bold mb-2">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded shadow-sm "
          />
        </div>
        
        <div className="flex items-center justify-between mb-6">
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded ml-28 "
          >
            Login
          </button>
        </div>
        
        <p className="text-center">
          Don't have an account? {' '}
          <Link to="/" className="text-red-700 hover:underline">Sign Up</Link>
        </p>
      </form>
    </div>
  </div>
  )
}

export default Login