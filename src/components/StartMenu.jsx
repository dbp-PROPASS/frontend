import React from 'react';
import HeroImg from '../images/animal_study_neko.png'
import '../styles/StartMenu.css'

const StartMenu = () => {
  return (
    <div className='startMenu'>
        <div className='HeroImg'>
            <img src={HeroImg} className='heroImg' alt="heroImg" />
        </div>
    </div>
  );
};

export default StartMenu;