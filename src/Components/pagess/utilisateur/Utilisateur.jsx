import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import './utilisateur.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const Utilisateur = () => {
  
  const[nom,setNom]=useState('');
  const[email,setEmail]=useState('');
  const[role,setRole]=useState('');
  const[password,setPassword]=useState('');
 
  

  async function submit(e){
    e.preventDefault();

    try{

        await axios.post("http://localhost:3000/Utilisateur",{
          nom,email,role,password
        })
        .then(res=>{
            if(res.data==="exist"){
                alert("materail already exists")
            }else{
              setNom('');
              setEmail('');
              setPassword('');
              setRole('');
              toast.success('Utilisateur Enregistrer', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
            }
            
        })
        .catch(e=>{
            alert("wrong details")
            console.log(e);
        })

    }
    catch(e){
        console.log(e);

    }

   

}

return (
 <center><div>
      
    <form action="POST" onSubmit={submit} className='formU'>
    <h1>Ajouter Utilisateur</h1>
      <label>Nom : </label>
      <input type="text" value={nom} required onChange={(e)=>setNom(e.target.value)} /> <br />
      <label>Email : </label>
      <input type="email" value={email} required onChange={(e)=>setEmail(e.target.value)} /> <br />
      <label className='role'>Role : </label>
      <select onChange={(e)=>setRole(e.target.value)} required >
        <option value="" disabled selected >select</option>
        <option value="admin">Admin</option>
        <option value="technicien">Technicien</option>
      </select><br />
      <label>Password : </label>
      <input type="text" value={password} required onChange={(e)=>setPassword(e.target.value)} /> <br />
      <button type='submit'>Ajouter</button><br />
   
    </form>
    <ToastContainer />
  </div></center>
)
}

export default Utilisateur
