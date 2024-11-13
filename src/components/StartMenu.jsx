import React from 'react';
import HeroImg from '../images/animal_study_neko.png'
import HeroText1 from '../images/herotext1.png'
import HeroText2 from '../images/herotext2.png'
import HeroText3 from '../images/herotext3.png'
import '../styles/StartMenu.css'

const StartMenu = () => {
  return (
    <div className='startMenu'>
      <div className='start-left'>
        <img src={HeroText1}/>
        <img src={HeroText2}/>
        <img src={HeroText3}/>
      </div>
      <div className='start-right'>
        <img src={HeroImg}/>
      </div>
    </div>
  );
};

export default StartMenu;