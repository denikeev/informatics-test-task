import React, { useState, useEffect } from 'react';
import cn from 'classnames';
import "bootstrap/dist/css/bootstrap.min.css"
import './App.css';
import arrow from './arrow-right.svg';

import {
  Container,
  Nav,
  Navbar,
} from 'react-bootstrap';

const App = () => {
  const initColl = [
    { text: 'А' },
    { text: 'Б' },
    { text: 'В' },
    { text: 'Г' },
    { text: 'Д' },
  ];

  const [coll, setColl] = useState(initColl);
  const [hiddenCount, setHidden] = useState(0);

  
  
  useEffect(() => {
    const handleScroll = (e) => {
      console.log('deltaY>>', e.deltaY);
      console.log('event working');
      if (e.deltaY > 0 && hiddenCount < 2) {
        const extractedItem = { ...coll.pop(), hidden: hiddenCount < 0 ? false : true };
        coll.unshift(extractedItem);
        const newColl = [...coll];
        console.log('newColl>>>', newColl);
        console.log('coll>>>', coll);
        setHidden(hiddenCount + 1);
        setColl(newColl);
      }
      if (e.deltaY < 0 && hiddenCount > -2) {
        console.log('delta minus');
        const [first, ...rest] = coll;
        const hiddenItem = { ...first, hidden: hiddenCount > 0 ? false : true};
        const newColl = [ ...rest, hiddenItem];
        setHidden(hiddenCount - 1);
        setColl(newColl);
      }
    };

    window.addEventListener('wheel', handleScroll);
    return () => window.removeEventListener('wheel', handleScroll);
  }, [coll, hiddenCount]);

  return (
    <>
      <div className="app">
        <div className="diagonal-box">
          <div className="content">
            <ul className="boxes">
              {coll.map((item, index) => {
                const classes = cn('box', { 'hide': !!item.hidden });
                return <li key={index} className={classes}>{item.text}</li>;
              })}
            </ul>
            <div className="centered"></div>
          </div>
        </div>
      </div>
      <Navbar expand="md" variant="dark" className="navbar-custom">
        <Container fluid className="px-md-5">
          <Navbar.Brand className="fs-6 me-0 navbar-custom__link" href="#">БИЛЕТЫ И АБОНЕМЕНТЫ</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="flex-grow-1 text-center">
              <Nav.Link className="flex-grow-1" href="#">Как купить?</Nav.Link>
              <Nav.Link className="flex-grow-1" href="#">Правила</Nav.Link>
              <Nav.Link className="flex-grow-1" href="#">Возврат билетов</Nav.Link>
            </Nav>
          </Navbar.Collapse>
          <a className="login navbar-custom__link text-decoration-none" href="#">
            <img src={arrow} alt="login" />
            <span className="d-none d-sm-block">Войти</span>
          </a>
        </Container>
      </Navbar>
    </>
  );
}

export default App;
