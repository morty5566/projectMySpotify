import React from 'react';
import {Nav, Navbar} from 'react-bootstrap';

export default function Header(props) {


  return (
    <div className="App">
     <Navbar bg='dark' variant="dark">
      <Nav  className="justify-content-center" activeKey="/home">
          <Nav.Item>
            <Nav.Link href="/artists">Active</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="/albums" href='/albums'>Albums</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="favorites" href='/favorites'>Favorites</Nav.Link>
          </Nav.Item>
          
      </Nav>
     </Navbar>
       
    
    </div>
  );
};