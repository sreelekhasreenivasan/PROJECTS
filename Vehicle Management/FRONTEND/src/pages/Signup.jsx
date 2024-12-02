import React,{useState} from 'react'
import {Link,useNavigate} from 'react-router-dom'

const Signup = () => {
    const [FirstName,setFirstName] = useState('');
    const [LastName,setLastName] = useState('');
    const [UserName,setUserName] = useState('');
    const [Password,setPassword] = useState('');
    const [Role, setRole] = useState('admin');
    const navigate = useNavigate();

    const signupSubmit = async (userDetails) => {
        const res = await fetch('http://127.0.0.1:5000/signup',{
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userDetails),
        });

        if(res.ok){
            navigate('/login');
        } else{
            toast.error('Please check the input data');
        }
    };
    const submitForm = (e) => {
        e.preventDefault();
        const userDetails = {
            FirstName,
            LastName,
            UserName,
            Password,
            Role,
        };
        signupSubmit(userDetails);
    }
    return (
        <div className="mt-4 mb-8 ml-96">
          <div className="bg-white p-10 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-3xl font-bold text-red-700 mb-2 text-center">Sign Up</h2>
            <form onSubmit={submitForm}>
            <label htmlFor="FirstName" className=" text-gray-700 font-bold mb-2">First Name:</label>
                <input
                  type="text"
                  id="FirstName"
                  name="FirstName"
                  value={FirstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full px-3 py-2 border rounded shadow-sm "
                />
             <label htmlFor="LastName" className=" text-gray-700 font-bold mb-2">Last Name:</label>
                <input
                  type="text"
                  id="LastName"
                  name="LastName"
                  value={LastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full px-3 py-2 border rounded shadow-sm "
                />

                <label htmlFor="UserName" className=" text-gray-700 font-bold mb-2">User Name:</label>
                <input
                  type="text"
                  id="UserName"
                  name="UserName"
                  value={UserName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="w-full px-3 py-2 border rounded shadow-sm "
                />
            
                <label htmlFor="Password" className="block text-gray-700 font-bold mb-2">Password:</label>
                <input
                  type="password"
                  id="Password"
                  name="Password"
                  value={Password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border rounded shadow-sm "
                />
             
                <label htmlFor="Role" className="block text-gray-700 font-bold mb-2">User Type:</label>
                <select
                  id="Role"
                  name="Role"
                  required
                  value={Role}
                  onChange={(e) => setRole(e.target.value)}
                  className="border rounded w-full py-2 px-3 "
                >
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </select>
            
                <button
                  type="submit"
                  className="bg-green-500 text-white px-4 py-2 rounded  ml-28 mt-4"
                >
                  Sign Up
                </button>

           
              <p className="text-center">
                Already have an account? {' '}
                <Link to="/login" className="text-red-700 hover:underline">
                Login</Link>
              </p>
            </form>
          </div>
        </div>
          )
}

export default Signup