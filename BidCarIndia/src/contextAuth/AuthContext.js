import React, { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {BASE_URL} from '../config/Config'

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [bidCounts, setBidCounts] = useState([]);
  const [bidCountWithoutPaper, setBidCountWithoutPaper] = useState([])
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      axios.post(`${BASE_URL}/api/verifyToken`, { token })
        .then(response => {
          const { jwtToken, username, roles, name, id } = response.data;
          setUser({ jwtToken, username, roles, name, id });
        })
        .catch(() => {
          localStorage.removeItem('jwtToken');
        });
    }
  }, []);

  useEffect(() => {
    if (user && user.roles && !user.roles.includes('ROLE_ADMIN')) {
      fetchBidCount().then(data => {
        setBidCounts(data);
      });
  
      fetchBidCountWithoutPaper().then(data => {
        setBidCountWithoutPaper(data);
      });
    }
  }, [user]);


  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('userObj')
    window.location.reload()
    navigate('/');
  };




  const fetchBidCountWithoutPaper = async () => {
    const token = localStorage.getItem('jwtToken'); // Adjust this according to your token storage method
  
    try {
      const response = await axios.get(`${BASE_URL}/bid/count/withoutPaper`, {
        headers: {
          'Authorization': `Bearer ${token}` // Include the token in the header
        }
      });
      const { data } = response;
      console.log(data);
  
      return data; 
    } catch (error) {
      console.error('Error fetching bid counts:', error);
    }
  };
  

  

  const fetchBidCount = async () => {
    const token = localStorage.getItem('jwtToken'); // Adjust this according to your token storage method
  
    try {
      const response = await axios.get(`${BASE_URL}/bid/count`, {
        headers: {
          'Authorization': `Bearer ${token}` // Include the token in the header
        }
      });
      const { data } = response;
      console.log(data);
  
      return data; 
    } catch (error) {
      console.error('Error fetching bid counts:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, bidCounts,setBidCounts, bidCountWithoutPaper, setBidCountWithoutPaper,}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
