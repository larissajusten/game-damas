import React from 'react';
import { NavLink } from 'react-router-dom';
import './menu.style.scss';

export const MenuScreen = () => {

  const renderOptions = () => {
    return (
      <ul className="options-container">
        <li id="option"><NavLink to="/board" className="option-link" >Iniciar partida</NavLink></li>
        <li id="option"><NavLink to="/options" className="option-link">Opções</NavLink></li>
        <li id="option"><NavLink to="/rules" className="option-link">Regras</NavLink></li>
        <li id="option"><NavLink to="/credits" className="option-link">Créditos</NavLink></li>
      </ul>
    );
  }
  
  return (
    <div className="menu-screen-container">
      <span id="title">Damas</span>
      {renderOptions()}
    </div>
  );
}
