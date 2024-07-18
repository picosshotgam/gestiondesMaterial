import React, { useEffect, useState } from 'react';
import './statustique.css';
import { FaRegUser } from 'react-icons/fa';
import { VscTools } from 'react-icons/vsc';
import axios from 'axios';
import { motion } from "framer-motion"
import { ToastContainer, toast } from 'react-toastify';
import { RiDeleteBin6Line } from "react-icons/ri";
import 'react-toastify/dist/ReactToastify.css';

const Statistique = () => {
  const [utilisateurInfo, setUtilisateurInfo] = useState([]);
  const [ConsommableInfo, setConsommableInfo] = useState([]);
  const [NONConsommableInfo, setNONConsommableInfo] = useState([]);
  const [selectedOption, setSelectedOption] = useState('Utilisateurs'); 
  const [selectt, setSelectt] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  const visible = { opacity: 1, y: 0, transition: { duration: 0.5 } };
  const itemVariants = {hidden: { opacity: 0, y: 10 },visible };

  useEffect(() => {
    axios.get('http://localhost:3000/utilisateur')
      .then(res => setUtilisateurInfo(res.data.data))
      .catch(error => console.error('Error fetching utilisateur data:', error));
    axios.get('http://localhost:3000/Consommable')
      .then(res => setConsommableInfo(res.data.data))
    axios.get('http://localhost:3000/NonCnsommable')
      .then(res => setNONConsommableInfo(res.data.data));
  }, []);


  const handlemodifier = (index) => {
    setEditIndex(index === editIndex ? null : index);
    if (editIndex === index) {
      // Submit the new role
      const updatedUser = selectt[index];
      axios.put(`http://localhost:3000/utilisateur/${updatedUser._id}`, { role: updatedUser.role })
        .then(res => {
          if (res.data.status === "success") {
            // Update the local state with the new role
            const updatedList = [...selectt];
            updatedList[index] = updatedUser;
            setSelectt(updatedList);
            toast.success("Role updated successfully");
          } else {
            toast.error("Failed to update role");
          }
        })
        .catch(error => {
          console.error("Error updating role:", error);
          toast.error("Error updating role");
        });
      setEditIndex(null); // Exit edit mode
    } else {
      setEditIndex(index); // Enter edit mode
    }
  };

  const handleRoleChange = (index, newRole) => {
    const updatedList = [...selectt];
    updatedList[index] = { ...updatedList[index], role: newRole };
    setSelectt(updatedList);
  };
  
  
  

  useEffect(() => {
    // Update selectt based on the selectedOption
    switch (selectedOption) {
      case 'Utilisateurs':
        setSelectt(utilisateurInfo);
        break;
      case 'Consommable':
        setSelectt(ConsommableInfo);
        break;
      case 'NonConsommable':
        setSelectt(NONConsommableInfo);
        break;
      default:
        setSelectt([]);
    }
  }, [selectedOption, utilisateurInfo, ConsommableInfo, NONConsommableInfo]);

  const handleSelectChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedOption(selectedValue);
  };

  const handleDelete = (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet élément ?')){
      
    axios.delete(`http://localhost:3000/Consommable/${id}`)
      .then(res => {
        if (res.data.status === "success") {
          axios.get('http://localhost:3000/Consommable')
          .then(res => setConsommableInfo(res.data.data))
        }
        toast.info(' Matériel supprimé', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
      })
      .catch(error => console.error('Error deleting item:', error));
    }
};

  return (
    <div style={{ height: '100%' }}>
       <motion.article
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, transition: { duration: 1 } }}
              variants={{ visible: { transition: { staggerChildren: 0.3 } } }}
           >
      <div id="boxx">
        <h1 style={{ color: 'white', paddingTop: '20px' }}>Statistiques</h1>
        <div className="containerr">
          <div>
            <p>Utilisatueur</p>
           <motion.h1 variants={itemVariants} >{utilisateurInfo.length}</motion.h1>
            <div id="iconn-div"><FaRegUser style={{ fontSize: '22px', marginTop: '13px' }} /></div>
          </div>
          <div>
            <p> Consommable</p>
            <motion.h1 variants={itemVariants} >{ConsommableInfo.length}</motion.h1>
            <div id="iconn-div"><VscTools style={{ fontSize: '23px', marginTop: '13px' }} /></div>
          </div>
          <div>
            <p> NonConsommable</p>
            <motion.h1 variants={itemVariants} >{NONConsommableInfo.length}</motion.h1>
            <div id="iconn-div"><VscTools style={{ fontSize: '23px', marginTop: '13px' }} /></div>
          </div>
        </div>
        <div style={{ width: '200px', marginLeft: '50px' }}>
          <select className="selectOP" onChange={handleSelectChange} value={selectedOption}>
            <option value="Utilisateurs">Utilisateurs</option>
            <option value="Consommable">Consommable</option>
            <option value="NonConsommable">NonConsommable</option>
          </select>
        </div>

        <div className="table-container" style={{ maxHeight: '300px', overflow: 'auto' }}>
          {selectt.length > 0 && (
            <table className="table" >
              <thead>
                {selectedOption === 'Utilisateurs' && (
                  <tr>
                    <th>Nom</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Action</th>
                  </tr>
                )}
                {selectedOption === 'Consommable' && (
                  <tr>
                    <th>Nom</th>
                    <th>Marque</th>
                    <th>Quantité</th>
                    <th>supprime</th>
                  </tr>
                )}
                {selectedOption === 'NonConsommable' && (
                  <tr>
                    <th>Nom</th>
                    <th>Marque</th>
                    <th>Numero reference</th>
                  </tr>
                )}
              </thead>
              <tbody>
                {selectt.map((item, index) => (
                  <tr key={index}>
                    <motion.td variants={itemVariants}>{item.nom}</motion.td>
                    <motion.td variants={itemVariants}>{selectedOption === 'Utilisateurs' ? item.email : (selectedOption === 'Consommable' ? item.marque : item.marque)}</motion.td>
                    
                    <td >
                      <motion.div variants={itemVariants} style={{
                        borderRadius: '5px',
                        background: item.role === 'technicien' ? '#ff9900' : 'green',
                        width: '80px',
                        height: '25px',
                        display: 'flex',
                        fontSize: '14px',
                        justifyContent: 'center',
                        alignItems: 'center',
                        color: 'white'
                      }}>
                        {selectedOption === 'Utilisateurs' ?
                         (editIndex === index?
                           <select value={item.role} className='roleselect' onChange={(e) => handleRoleChange(index, e.target.value)}>
                          <option value="admin">admin</option> 
                          <option value="technicien">technicien</option>
                          </select>:item.role) :
                           (selectedOption === 'Consommable' ? item.quantité : item.numref)}
                      </motion.div>
                    </td>
                    {selectedOption === 'Consommable' ?
                     <td>
                      <button id='sup' onClick={() => handleDelete(item._id)}>supprime</button>
                      </td>:
                      ( selectedOption === 'Utilisateurs' ?
                      <td>
                      <button id='modifier' onClick={() => handlemodifier(index)}>
                        {editIndex === index ? 'submit' : 'modifier'}
                      </button>
  
                    </td>:null)}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
      </motion.article>
      <ToastContainer />
    </div>
  );
};

export default Statistique;
