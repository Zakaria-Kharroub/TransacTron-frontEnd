import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import imageLogin from '../images/img-login.png'; 
import {
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBRow,
  MDBCol,
} from 'mdb-react-ui-kit';

export default function Login() {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate(); 

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/login', credentials);

      console.log(response.data); 

      localStorage.setItem('token', response.data.token);
      navigate('/');

    } catch (error) {
      console.error('error login:', error.response.data.message);
    }
  };



  

  return (
    <MDBContainer className="my-1 mt-5">
      <MDBCard>
        <MDBRow className='g-0'>
          <MDBCol md='6'>
            <img src={imageLogin} alt='login'  className='w-100 h-100' />
          </MDBCol>
          <MDBCol md='5'>
            <MDBCardBody className='d-flex flex-column'>
              <h2 className="fw-normal my-4 text-center " style={{letterSpacing: '1px'}}>Login</h2>
              <form onSubmit={handleSubmit}>
                <label htmlFor="email" className="form-label">Email</label>
                <input type="email" name="email" className="form-control mb-2" id="email" placeholder="Enter your email" style={{height: '50px'}} onChange={handleChange} />

                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" name="password" className="form-control mb-4" id="password" placeholder="Enter your password" style={{height: '50px'}} onChange={handleChange} />

                <button type="submit" className="mb-4 px-5 w-100" size='lg' style={{
                  backgroundColor: '#603376',
                  color: 'white',
                  height: '50px',
                  border : 'none',
                  borderRadius: '5px',
                  boxShadow: '5px 5px 5px rgba(0,0,0,0.2)',
                }}>
                  Login
                </button>
              </form>
              <p className="mb-5  d-flex justify-content-between" style={{color: '#393f81'}}>
                <span>Don't have an account? </span>
                <Link to="/register" style={{color: '#393f81'}}>Register here</Link>
              </p>
            </MDBCardBody>
          </MDBCol>
        </MDBRow>
      </MDBCard>
    </MDBContainer>
  )
}