import React from 'react'
import { useState } from 'react';
import './Consommable.css'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const NonCnsommable = () => {
    const[nom,setNom]=useState('');
    const[marque,setMarque]=useState('');
    const[numref,setNumref]=useState('');


    async function submit(e){
      e.preventDefault();

      try{

          await axios.post("http://localhost:3000/NonCnsommable",{
            nom,marque,numref
          })
          .then(res=>{
              if(res.data==="exist"){
                toast.error('le matériel déjà existe ', {
                  position: "top-center",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "light",
                  
                  });
              }else{
                setNom('');
                setMarque('');
                setNumref('')
                toast.success(' Materials Enregistrer', {
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
   <center> <div>
        
      <form action="POST" onSubmit={submit}>
      <h1>NonCnsommable</h1>
        <label>Nom: </label>
        <input type="text" value={nom} required onChange={(e)=>setNom(e.target.value)} /> <br />
        <label>Marque: </label>
        <input type="text" value={marque} required onChange={(e)=>setMarque(e.target.value)} /> <br />
        <label>N-Ref: </label>
        <input type="text" value={numref} required onChange={(e)=>setNumref(e.target.value)} /> <br />
        <button type='submit'>Ajouter</button>
      </form>
      <ToastContainer />
    </div></center>
  )
}

export default NonCnsommable
