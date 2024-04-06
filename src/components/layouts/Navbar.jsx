import React from 'react'
import { Link } from 'react-router-dom';
import logo from '../../images/logo.png';


export default function Navbar() {


  
  return (
    <>
    

    <nav className="navbar navbar-expand-lg bg-body-tertiary container">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/"><img src={logo} alt="logo" style={{width: '150' , height: '50px'}}/></Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse justify-content-center" id="navbarSupportedContent">
      <ul className="navbar-nav align-items-center">
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/historique">historique</Link>
        </li>
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="#">virement</a>
        </li>

        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/compte">compte</Link>
        </li>


      </ul>
    </div>
    <div className="d-flex" role="search">
      <ul className="navbar-nav align-items-center gap-1">
        
        <li className="nav-item">
          <Link className="nav-link active btn  w-100 ps-3 pe-3 text-light" style={{backgroundColor: '#603376'}} aria-current="page" to="/login">login</Link> 
        </li>

        <li className="nav-item">
          <Link className="nav-link activebtn btn  ps-3 pe-3 text-light" style={{backgroundColor: '#603376'}} aria-current="page" to="/register">register</Link>
        </li>

        {/* <li className="nav-item">
          <button className="nav-link active btn  w-100 ps-3 pe-3 text-light" style={{backgroundColor: '#603376'}} aria-current="page" onClick={logout}>logout</button>

        </li> */}

      </ul>
    </div>
  </div>
</nav>


  </>




  )
}

