import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { NavLink, useNavigate } from 'react-router-dom';



const Compte = () => {
    const [compte, setCompte] = useState([]);
    const [errorMessage, setErrorMessage] = useState('tu navez pas compes');

   

    const getCompte = async () => {
        try{
            const token = localStorage.getItem('token');
            const response = await axios.get('http://127.0.0.1:8000/api/mescomptes',{
                headers:{
                    'Authorization':`Bearer ${token}`
                }
            });
            console.log(response.data);
            if (response.data.length === 0) {
                
            } else {
                setCompte(response.data);
            }
        }catch(error){
            console.error('error  compte',error);
        }
    }

    useEffect(() => {
        getCompte();
    }, []);
    
    
     // ajout de compte

     const[formData,setFormData] = useState({
        type:'',
        solde:'',
    });

    const {type,solde} = formData;

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]:e.target.value
        });
    }

    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const token = localStorage.getItem('token');
            const response = await axios.post('http://127.0.0.1:8000/api/createcompte',formData,{
                headers:{
                    'Authorization':`Bearer ${token}`
                }
            });
            console.log(response.data);
            
            alert('compte ajouter avec success');
            getCompte();
            navigate("/compte");
        }

        catch(error){
            console.error('error compte',error);
        }
    }














    return (
        <>
          <h1 className='text-center'>mes comptes</h1>
          <div className='d-flex justify-content-center'>
            <button type="button" className="btn btn-success text-center" data-bs-toggle="modal" data-bs-target="#exampleModal">
              ajouter compte
            </button>
          </div>
    
          <div className='d-flex justify-content-center container'>
            {compte.length === 0 ? (
              <p>{errorMessage}</p>
            ) : (
              <table className='table'>
                <thead>
                  <tr>
                    <th>numero de compte</th>
                    <th>type</th>
                    <th>solde</th>
                    <th>action</th>
                  </tr>
                </thead>
                <tbody>
                  {compte.map((compte) => (
                    <tr key={compte.id}>
                      <td>{compte.numero_compte}</td>
                      <td>{compte.type}</td>
                      <td>{compte.solde}</td>
                      <td className='d-flex gap-2'>
                        <button type="button" className="btn btn-success text-center" data-bs-toggle="modal" data-bs-target="#envoeymontant">
                          envoyer montant
                        </button>       
    
                        <NavLink type="button" className="btn btn-danger" to={`/historique/${compte.numero_compte}`}>
                          historique
                        </NavLink>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
    
            <div className="modal fade" id="envoeymontant" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="staticBackdropLabel">Envoyer Montant</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div className="modal-body">

                    
                    
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" className="btn btn-primary">Understood</button>
                  </div>
                </div>
              </div>
            </div>

            
    
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">ajouter nouveau compte</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div className="modal-body">
                    <form onSubmit={handleSubmit}>
                      <div className="mb-3">
                        <label htmlFor="type" className="form-label">Type</label>
                        <input type="text" className="form-control" id="type" name="type" value={type} onChange={handleChange} />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="solde" className="form-label">Solde</label>
                        <input type="number" className="form-control" id="solde" name="solde" value={solde} onChange={handleChange} />
                      </div>
                      <button type="submit" className="btn btn-primary">Ajouter</button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      );
}

export default Compte;