import React from 'react';
import { Link } from 'react-router-dom';
import imageLogin from '../images/img-login.png'; 

import {
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBRow,
  MDBCol,
  
}
from 'mdb-react-ui-kit';

export default function Login() {
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

                <label htmlFor="email" className="form-label">Email</label>
                <input type="email" className="form-control mb-2" id=" " placeholder="Enter your email" style={{height: '50px'}}/>

                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control mb-4" id=" " placeholder="Enter your password" style={{height: '50px'}}/>

              <button className="mb-4 px-5" size='lg' style={{
                backgroundColor: '#603376',
                // #373B3E
                 color: 'white',
                 height: '50px',
                 border : 'none',
                 borderRadius: '5px',
                 boxShadow: '5px 5px 5px rgba(0,0,0,0.2)',

                 }}>
                Login
              </button>

              <p className="mb-5  d-flex justify-content-between" style={{color: '#393f81'}}>
                <span>Don't have an account? </span>
                <Link to="/register" style={{color: '#393f81'}}>Register here</Link></p>
            </MDBCardBody>
          </MDBCol>

        </MDBRow>
      </MDBCard>

    </MDBContainer>
  )
}
