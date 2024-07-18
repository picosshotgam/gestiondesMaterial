import React, { useState } from 'react'
import './Consommable.css'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Consommable = () => {

    const[nom,setNom]=useState('');
    const[marque,setMarque]=useState('');
    const[quantité,setQuantité]=useState('');
  
    

    async function submit(e){
      e.preventDefault();

      try{

          await axios.post("http://localhost:3000/Consommable",{
            nom,marque,quantité
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
                setQuantité('');
               
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
   <center><div>
        
      <form action="POST" onSubmit={submit}>
      <h1>Consommable</h1>
        <label>Nom : </label><br />
        <input type="text" value={nom} required onChange={(e)=>setNom(e.target.value)} /> <br />
        <label>Marque : </label><br />
        <input type="text" value={marque} required onChange={(e)=>setMarque(e.target.value)} /> <br />
        <label>Quantité : </label><br />
        <input type="number" value={quantité} required onChange={(e)=>setQuantité(e.target.value)} /> <br />
        <button type='submit'>Ajouter</button><br />
       
        
      </form>
       <ToastContainer />
    </div></center>
  )
}

export default Consommable
