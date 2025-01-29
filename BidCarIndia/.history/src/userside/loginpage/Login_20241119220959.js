import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../contextAuth/AuthContext'; // Adjust the path as needed
import {BASE_URL} from '../../config/Config'

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BASE_URL}/api/signin`, {
        username: email,
        password: password
      });
      const { jwtToken, name, username, roles,id } = response.data;
      localStorage.setItem('jwtToken', jwtToken);
      localStorage.setItem("userObj", JSON.stringify({ jwtToken, username, roles, name, id }));
      login({name, roles,username,id});
      navigate('/'); // Redirect to the home page or another page
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  // return (
  //   <div className="min-h-screen bg-gray-100 flex flex-col justify-center mt-20 sm:px-6 lg:px-8">
  //     <div className="sm:mx-auto sm:w-full sm:max-w-md">
  //       <h2 className="text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
  //     </div>

  //     <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
  //       <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
  //         <form className="space-y-6" onSubmit={handleSubmit}>
  //           <div>
  //             <label htmlFor="email" className="block text-sm font-medium text-gray-700">
  //               Email address
  //             </label>
  //             <div className="mt-1">
  //               <input
  //                 id="email"
  //                 name="email"
  //                 type="email"
  //                 autoComplete="email"
  //                 required
  //                 value={email}
  //                 onChange={(e) => setEmail(e.target.value)}
  //                 className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
  //               />
  //             </div>
  //           </div>

  //           <div>
  //             <label htmlFor="password" className="block text-sm font-medium text-gray-700">
  //               Password
  //             </label>
  //             <div className="mt-1">
  //               <input
  //                 id="password"
  //                 name="password"
  //                 type="password"
  //                 autoComplete="current-password"
  //                 required
  //                 value={password}
  //                 onChange={(e) => setPassword(e.target.value)}
  //                 className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
  //               />
  //             </div>
  //           </div>

  //           {error && (
  //             <p className="text-sm text-red-600">{error}</p>
  //           )}

  //           <div>
  //             <button
  //               type="submit"
  //               className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
  //             >
  //               Sign in
  //             </button>
  //           </div>
  //         </form>

  //         <div className="mt-6">
  //           <div className="relative">
  //             <div className="absolute inset-0 flex items-center">
  //               <div className="w-full border-t border-gray-300"></div>
  //             </div>
  //             <div className="relative flex justify-center text-sm">
  //               <span className="px-2 bg-white text-gray-500">Or continue with</span>
  //             </div>
  //           </div>

  //           <div className="mt-6 grid grid-cols-2 gap-3">
  //             <div>
  //               <a
  //                 href="#"
  //                 className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
  //               >
  //                 <span className="sr-only">Sign in with Google</span>
  //                 <img className="h-5 w-5" src="https://image.similarpng.com/very-thumbnail/2020/06/Logo-google-icon-PNG.png" alt="Google" />
  //               </a>
  //             </div>
  //             <div>
  //                <Link
  //                 to="/signup"
  //                 className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
  //               >
  //                 Sign up
  //               </Link> 
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // );



  // return (
  //   <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 flex flex-col justify-center py-12 mt-20 sm:px-6 lg:px-8">
  //     <div className="sm:mx-auto sm:w-full sm:max-w-md">
  //       <h2 className="text-center text-4xl font-bold text-gray-900">Welcome Back!</h2>
  //       <p className="mt-2 text-center text-sm text-gray-600">
  //         Sign in to access your account
  //       </p>
  //     </div>
  
  //     <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
  //       <div className="bg-white py-8 px-6 shadow-lg rounded-lg border border-gray-200">
  //         <form className="space-y-6" onSubmit={handleSubmit}>
  //           <div>
  //             <label htmlFor="email" className="block text-sm font-semibold text-gray-700">
  //               Email Address
  //             </label>
  //             <div className="mt-1">
  //               <input
  //                 id="email"
  //                 name="email"
  //                 type="email"
  //                 autoComplete="email"
  //                 required
  //                 value={email}
  //                 onChange={(e) => setEmail(e.target.value)}
  //                 className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
  //                 placeholder="Enter your email"
  //               />
  //             </div>
  //           </div>
  
  //           <div>
  //             <label htmlFor="password" className="block text-sm font-semibold text-gray-700">
  //               Password
  //             </label>
  //             <div className="mt-1">
  //               <input
  //                 id="password"
  //                 name="password"
  //                 type="password"
  //                 autoComplete="current-password"
  //                 required
  //                 value={password}
  //                 onChange={(e) => setPassword(e.target.value)}
  //                 className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
  //                 placeholder="Enter your password"
  //               />
  //             </div>
  //           </div>
  
  //           {error && (
  //             <p className="text-sm text-red-500 font-medium">{error}</p>
  //           )}
  
  //           <div>
  //             <button
  //               type="submit"
  //               className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
  //             >
  //               Sign In
  //             </button>
  //           </div>
  //         </form>
  
  //         <div className="mt-6">
  //           <div className="relative">
  //             <div className="absolute inset-0 flex items-center">
  //               <div className="w-full border-t border-gray-300"></div>
  //             </div>
  //             <div className="relative flex justify-center text-sm">
  //               <span className="px-3 bg-white text-gray-500">Or continue with</span>
  //             </div>
  //           </div>
  
  //           <div className="mt-6 grid grid-cols-2 gap-4">
  //             <a
  //               href="#"
  //               className="w-full flex items-center justify-center py-3 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-gray-700 font-medium hover:bg-gray-50"
  //             >
  //               <img
  //                 className="h-5 w-5 mr-2"
  //                 src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png"
  //                 alt="Google"
  //               />
  //               Google
  //             </a>
  //             <Link
  //               to="/signup"
  //               className="w-full flex items-center justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
  //             >
  //               Sign Up
  //             </Link>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // );
  
}

export default Login;