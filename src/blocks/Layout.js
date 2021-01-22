import React from 'react';
import Header from './Header.js';


export default function Layout(props) {


  return (
    <div className="layout">
     
      <Header />
      
        <div className='layout-body'>
          {props.children}
        </div>
    
    </div>
  );
};