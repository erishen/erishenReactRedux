import React from 'react';
import DuckImage from '../assets/Duck.jpg';
import './HomeView.scss';

export const HomeView = () => (
  <div id='home_head_operate'>
    <h4>Welcome!</h4>
    <img
      alt='This is a duck, because Redux!'
      className='duck'
      src={DuckImage} />
  </div>
);

export default HomeView;
