import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';
import { RiArrowDropDownLine } from "react-icons/ri";
import { FaRegUser } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";
import { IoStatsChart } from "react-icons/io5";
import { RiArrowDropUpLine } from "react-icons/ri";

const Navbar = ({ handleLogout }) => {
  const [activeLink, setActiveLink] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className='container'>
      <div className='left'>
        <img src="./img/logo.png" alt=""  />
        <ul>
          <li onClick={toggleDropdown} style={{display:'flex', justifyContent: 'space-between'}}>
            Ajouter Matériel 
           {isDropdownOpen ? <RiArrowDropUpLine  className='icons'/>:<RiArrowDropDownLine  className='icons'/> } 
          </li>
          {isDropdownOpen && (
            <ul className="dropdown-menu">  
              <Link to={'/Consommable'}>
                <li onClick={() => handleLinkClick('/Consommable')} className={activeLink === '/Consommable' ? 'active' : ''}>
                  Consommable
                </li>
              </Link>
              <Link to={'/NonCnsommable'}>
                <li onClick={() => handleLinkClick('/NonCnsommable')} className={activeLink === '/NonCnsommable' ? 'active' : ''}>
                  NonCnsommable
                </li>
              </Link>
            </ul>
          )}
          <Link to={'/Utilisateur'}>
            <li onClick={() => handleLinkClick('/Utilisateur')} className={activeLink === '/Utilisateur' ? 'active' : ''}>
              <FaRegUser  style={{marginRight:'10px'}}/>  Ajouter Utilisateur
            </li>
          </Link>
          <Link to={'/Statistique'}>
            <li onClick={() => handleLinkClick('/Statistique')} className={activeLink === '/Statistique' ? 'active' : ''}>
              <IoStatsChart style={{marginRight:'10px'}} />   Statistique
            </li>
          </Link>
          <Link>
            <li onClick={ handleLogout } className={activeLink === '/Deconnexion' ? 'active' : ''} style={{display:'flex'}}> 
              <IoIosLogOut  style={{marginRight:'10px',fontSize:'21px'}}/><p>Se déconnecter</p>
            </li>
          </Link> 
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
