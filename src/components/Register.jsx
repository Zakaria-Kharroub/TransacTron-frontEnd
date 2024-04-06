import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import imageLogin from '../images/img-login.png';
import { useNavigate } from 'react-router-dom';

import {
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBRow,
  MDBCol,
} from 'mdb-react-ui-kit';

export const Register = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post('http://127.0.0.1:8000/api/register', {
                name,
                email,
                password
            });
            console.log(data);
            alert('register successfully');

            setName('');
            setEmail('');
            setPassword('');

            // Redirect to /login
            navigate('/login');

        } catch (error) {
            console.log(error);
        }
    };



  return (
    <MDBContainer className="my-1 mt-5">
      <MDBCard>
        <MDBRow className='g-0'>
          <MDBCol md='6'>
            <img src={imageLogin} alt='register' className='w-100 h-100' />
          </MDBCol>
          <MDBCol md='5'>
            <MDBCardBody className='d-flex flex-column'>

              <h2 className="fw-normal my-4 text-center " style={{letterSpacing: '1px'}}>Register</h2>

              <form onSubmit={handleRegister} >
                <label htmlFor="name" className="form-label">Name</label>
                <input type='text' placeholder='Name' name='name' value={name}
                  onChange={(e) => setName(e.target.value)} required className="form-control mb-2" style={{height: '50px'}} />

                <label htmlFor="email" className="form-label">Email</label>
                <input type='email' placeholder='Email' name='email' value={email}
                  onChange={(e) => setEmail(e.target.value)} required className="form-control mb-2" style={{height: '50px'}} />

                <label htmlFor="password" className="form-label">Password</label>
                <input type='password' placeholder='Password' name='password' value={password}
                  onChange={(e) => setPassword(e.target.value)} required className="form-control mb-4" style={{height: '50px'}} />
                

                <input type='submit' value='Register' className="mb-4 px-5 w-100" size='lg' style={{
                  backgroundColor: '#603376',
                  color: 'white',
                  height: '50px',
                  border : 'none',
                  borderRadius: '5px',
                  boxShadow: '5px 5px 5px rgba(0,0,0,0.2)',
                }} />

                
              </form>
              <p className="mb-5  d-flex justify-content-center" style={{color: '#393f81'}}>
                <span>avez vous compte </span>
                <Link to="/login" style={{color: '#393f81'}}>Login</Link>
              </p>
            </MDBCardBody>
          </MDBCol>
        </MDBRow>
      </MDBCard>
    </MDBContainer>
  );
};