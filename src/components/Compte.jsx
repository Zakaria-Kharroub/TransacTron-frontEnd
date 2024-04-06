import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { NavLink, useNavigate } from 'react-router-dom';

const Compte = () => {
    
    const [compte, setCompte] = useState([]);
    const [errorMessage, setErrorMessage] = useState('Tu nas pas des compte');

    const [selectedSender, setSelectedSender] = useState('');

    const [transactionData, setTransactionData] = useState({
        receiver: '',
        montant: '',
    });




    const [formData, setFormData] = useState({
        type: '',
        solde: '',
    });

    const { type, solde } = formData;
    const { receiver, montant } = transactionData;




    const getCompte = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://127.0.0.1:8000/api/mescomptes', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log(response.data);
            setCompte(response.data);
        } catch (error) {
            console.error('error fetch comptes', error);
        }
    }

    useEffect(() => {
        getCompte();
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    const navigate = useNavigate();

    const handleSelectSender = (senderAccountNumber) => {
        setSelectedSender(senderAccountNumber);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post('http://127.0.0.1:8000/api/createcompte', formData, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log(response.data);
            alert('cmopte ajouter avec succes');
            getCompte();
            navigate("/compte");
        } catch (error) {
            console.error('error ajouter compte', error);
        }
    }

    const handleTransactionSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post('http://127.0.0.1:8000/api/createtransaction', {
                numero_compte_sender: selectedSender,
                numero_compte_receiver: receiver,
                montant,
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log(response.data);
            alert('transaction effectuer bien');
            getCompte();
            navigate("/compte");
        } catch (error) {
            console.error('error de transaction', error);
        }
    }

    return (
        <>
            <h1 className='text-center'>Mes comptes</h1>
            <div className='d-flex justify-content-center'>
                <button type="button" className="btn btn-success text-center" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    Ajouter compte
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
                                        <button type="button" className="btn btn-success text-center" data-bs-toggle="modal" data-bs-target="#envoyerMontant"
                                            onClick={() => handleSelectSender(compte.numero_compte)}
                                        >
                                            envoyer montant
                                        </button>

                                        <NavLink type="button" className="btn btn-danger" to={`/historique/${compte.numero_compte}`}> historique </NavLink>
                                        
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}

                {/* modal envoyer montant */}
                <div className="modal fade" id="envoyerMontant" tabIndex="-1" aria-labelledby="envoyerMontantLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="envoyerMontantLabel">Envoyer Montant</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={handleTransactionSubmit}>


                                    <div className="mb-3">
                                        <label htmlFor="sender" className="form-label">Compte émetteur</label>
                                        <input type="text" className="form-control" id="sender" name="sender" value={selectedSender} readOnly disabled />
                                    </div>


                                    <div className="mb-3">
                                        <label htmlFor="receiver" className="form-label">Compte récepteur</label>
                                        <input type="text" className="form-control"  id="receiver" name="receiver" value={receiver}
                                         onChange={(e) => setTransactionData({...transactionData, receiver: e.target.value })}
                                        />
                                    </div>



                                    <div className="mb-3">
                                        <label htmlFor="montant" className="form-label">Montant</label>
                                        <input type="number" className="form-control" id="montant" name="montant" value={montant}
                                            onChange={(e) => setTransactionData({ ...transactionData, montant: e.target.value })}
                                        />
                                    </div>
                                    <button type="submit" className="btn btn-primary">Envoyer</button>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>



            {/* modal ajouter compte */}
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Ajouter nouveau compte</h5>
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
        </>
    );
}

export default Compte;
