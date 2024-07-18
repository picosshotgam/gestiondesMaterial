// App.js

import React, { useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Navbar from './Navbarr';
import Utilisateur from './pagess/utilisateur/Utilisateur';
import Statistique from './pagess/statistique/Statistique';
import Consommable from './pagess/ajouter/Consommable';
import NonCnsommable from './pagess/ajouter/NonCnsommable';
import axios from 'axios';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const history = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:3000/", {
        user,
        password
      });

      if (res.data === "exist") {
        setIsLoggedIn(true);
        history("/Statistique", { state: { id: user } });
      } else if (res.data === "notexist") {
        alert("utilisateur ou mot de passe incorrect");
      }
    } catch (e) {
      alert("Wrong details");
      console.log(e);
    }
    setUser('');
    setPassword('');
  };
  const handleLogout = () => {
    if (window.confirm('Êtes-vous sûr de vouloir vous déconnecter?')){
    setIsLoggedIn(false);
   
    }
  };

 

  return (
    <div>
      <div style={{}}>
        {isLoggedIn ? (
            <div style={{display:'flex'}}>
            <div>
            <Navbar handleLogout={handleLogout}/>
           </div>
           <div style={{flexGrow:'1',backgroundColor:'#f1f5f8'}}>
           <Routes>
            <Route path={'/Consommable'} element={<Consommable/>}/>
            <Route path={'/NonCnsommable'} element={<NonCnsommable/>}/>
            <Route path={'/Utilisateur'} element={<Utilisateur/>}/>
            <Route path={'/Statistique'} element={<Statistique/>}/>
           </Routes>
           </div>
          </div>
        ) : (
          <center>
            <div>
            
              <form onSubmit={handleLogin}>
              <img src="./img/logo.png" style={{margin:'auto',marginTop:'10px', padding:'auto',border:'5px solid #604bfc',borderRadius:'50%'}} /><br />
                <label>User : </label>
                <input type="text" required value={user} onChange={(e) => setUser(e.target.value)} /> <br />
                <label>Password : </label>
                <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} /> <br />
                <button type='submit'>Login</button>
                <p style={{marginTop:'10px',color:'#748186'}}>Connectez-vous au tableau de bord de gestion du matériel</p>
              </form>
            </div>
          </center>
        )}
      </div>
    </div>
  );
};

export default App;
