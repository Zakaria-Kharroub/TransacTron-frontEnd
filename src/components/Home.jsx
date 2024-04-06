import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Home() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {

    
    const getUser = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://127.0.0.1:8000/api/user', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }); 
        setUser(response.data);
      } catch (error) {
        console.error('Failed to fetch user:', error);
      }
    };

    getUser();
  }, []);




  const logout = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://127.0.0.1:8000/api/logout', {}, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      localStorage.removeItem('token');
      navigate('/login'); 
    } catch (error) {
      console.error('Logout failed:', error.response.data.message);
    }
  };

  return (
    <div className='container'>
      <h1 className='text-center'>Home</h1>
      {user && <h2>Name: {user.name}</h2>}
        {user && <h2>Email: {user.email}</h2>}
      <button onClick={logout}>Logout</button>

      <div className='d-flex justify-content-center'>

            <form action="" className='d-flex gap-2'>
                <input type="text" className='form-control mt-2' placeholder="name d'utilisateur" />
                <button type='submit' className='btn btn-primary mt-2'>chercher</button>
            </form>
        </div>

      
    </div>
  );
}