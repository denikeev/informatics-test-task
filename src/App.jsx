import React, { useState, useEffect } from 'react';
import cn from 'classnames';
import "bootstrap/dist/css/bootstrap.min.css"
import './App.css';
import './styles.scss'
import arrow from './arrow-right.svg';

import {
  Container,
  Nav,
  Navbar,
} from 'react-bootstrap';

const App = () => {
  const classes = [
    'hexagons__item_small',
    'hexagons__item_medium',
    'hexagons__item_large',
    'hexagons__item_medium',
    'hexagons__item_small',
  ]
  const initColl = [
    { text: 'А', class: 'hexagons__item_small' },
    { text: 'Б', class: 'hexagons__item_medium' },
    { text: 'В', class: 'hexagons__item_large' },
    { text: 'Г', class: 'hexagons__item_medium' },
    { text: 'Д', class: 'hexagons__item_small' },
  ];

  const [coll, setColl] = useState(initColl);
  const [hiddenCount, setHidden] = useState(0);

  
  useEffect(() => {
    const handleScroll = (e) => {
      console.log('event working');
      console.log('hiddenCount>>>', hiddenCount);
      if (e.deltaY > 0 && hiddenCount < 2) {
        console.log('delta plus');
        const newColl = coll.map((item, index) => {
          const switchedClass = classes[index + hiddenCount + 1] || 'hexagons__item_hide';
          const positionClass = index === 0 && hiddenCount >= 0 ? 'ms-auto' : '';
          const newClass = `${switchedClass} ${positionClass}`;

          return { ...item, class: newClass };
        });
        console.log('newColl>>>', newColl);
        setHidden(hiddenCount + 1);
        setColl(newColl);
      }

      if (e.deltaY < 0 && hiddenCount > -2) {
        console.log('delta minus');
        const newColl = coll.map((item, index) => {
          const switchedClass = classes[index + hiddenCount - 1] || 'hexagons__item_hide';
          const positionClass = index === coll.length - 1 && hiddenCount < 0 ? 'me-auto' : '';
          const positionClass2 = index === 0 && hiddenCount > 0 ? 'ms-auto' : '';
          const newClass = `${switchedClass} ${positionClass} ${positionClass2}`;

          return { ...item, class: newClass };
        });
        console.log('newColl>>>', newColl);
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
          <ul className="hexagons">
            {coll.map((item, index) => {
              const classes = cn('hexagons__item', { 'hide': !!item.hidden }, item.class);
              return <li key={index} className="item-wrap">
                <div className={classes}>
                  <span>{item.text}</span>
                </div>
              </li>;
            })}
          </ul>
          <div className="circle"></div>
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
