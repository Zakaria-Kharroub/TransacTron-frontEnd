import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

export default function Historique() {
  const [transactions, setTransactions] = useState([]);
  const { numero_compte } = useParams();

  const getTransactions = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`http://127.0.0.1:8000/api/historique/${numero_compte}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      console.log(response.data);
      if (response.data.length !== 0) {
        setTransactions(response.data.transactions);
      }
    } catch (error) {
      console.error('Error fetch transaction', error);
    }
  }

  useEffect(() => {
    getTransactions();
  }, []);




  



  return (
    <>
    <div className="container">
    <h1>Historique</h1>
  <p>Voici l'historique de ton compte:</p>
  <table className="table container">
    <thead>
      <tr>
        <th scope="col">Transaction ID</th>
        <th scope="col">Sender</th>
        <th scope="col">Receiver</th>
        <th scope='col'>montant</th>
      </tr>
    </thead>
    <tbody>
      {transactions.map((transaction, index) => (
        <tr key={index}>
          <td>{transaction.id}</td>
          <td>{transaction.numero_compte_sender}</td>
          <td>{transaction.numero_compte_receiver}</td>
          
            <td>{transaction.montant}</td>
        </tr>
      ))}
    </tbody>
  </table>
    </div>

    </>
  )
}