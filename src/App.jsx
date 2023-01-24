/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import cn from 'classnames';
import {
  Container,
  Nav,
  Navbar,
  Button,
} from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.scss';
import arrow from './assets/img/arrow-right.svg';

const App = () => {
  const shapesClasses = [
    'hexagons__shape_small',
    'hexagons__shape_medium',
    'hexagons__shape_large',
    'hexagons__shape_medium',
    'hexagons__shape_small',
  ];

  const itemClasses = [
    'hexagons__item_small',
    'hexagons__item_medium',
    'hexagons__item_large',
    'hexagons__item_medium',
    'hexagons__item_small',
  ];

  const initColl = [
    {
      texts: {
        place: 'Стадион',
        date: '30 мая',
        shortDate: '30.05',
        time: '19:00',
      },
      shapeClass: 'hexagons__shape_small',
      itemClass: 'hexagons__item_small',
    },
    {
      texts: {
        place: 'Стадион',
        date: '17 июня',
        shortDate: '17.06',
        time: '19:00',
      },
      shapeClass: 'hexagons__shape_medium',
      itemClass: 'hexagons__item_medium',
    },
    {
      texts: {
        place: 'Стадион',
        date: '26 июня',
        shortDate: '26.06',
        time: '19:00',
      },
      shapeClass: 'hexagons__shape_large',
      itemClass: 'hexagons__item_large',
    },
    {
      texts: {
        place: 'Стадион',
        date: '16 июля',
        shortDate: '16.07',
        time: '19:00',
      },
      shapeClass: 'hexagons__shape_medium',
      itemClass: 'hexagons__item_medium',
    },
    {
      texts: {
        place: 'Стадион',
        date: '30 сентября',
        shortDate: '30.09',
        time: '19:00',
      },
      shapeClass: 'hexagons__shape_small',
      itemClass: 'hexagons__item_small',
    },
  ];

  const [hexagons, setHexagons] = useState(initColl);
  const [shiftCount, setShiftCount] = useState(0);

  useEffect(() => {
    const handleScroll = (e) => {
      console.log('shiftCount>>>', shiftCount);
      const currentShift = 1;

      if (e.deltaY > 0 && shiftCount < 2) {
        console.log('delta plus');
        const updatedHexagons = hexagons.map((hexagon, i) => {
          const shapeClass = shapesClasses[i + shiftCount + currentShift] || 'hexagons__shape_hide';
          const itemClass = [itemClasses[i + shiftCount + currentShift] || 'hexagons__item_width-null'];

          if (i === 0) {
            if (shiftCount === 0) {
              itemClass.push('hexagons__item_mls');
            }
            if (shiftCount === 1) {
              itemClass.push('hexagons__item_mlm');
            }
          }
          if (i === hexagons.length - 1 && shiftCount === -2) {
            itemClass.push('hexagons__item_mrs');
          }

          return { ...hexagon, shapeClass, itemClass: itemClass.join(' ') };
        });
        console.log('updatedHexagons>>>', updatedHexagons);
        setShiftCount(shiftCount + 1);
        setHexagons(updatedHexagons);
      }

      if (e.deltaY < 0 && shiftCount > -2) {
        console.log('delta minus');
        const updatedHexagons = hexagons.map((hexagon, i) => {
          const shapeClass = shapesClasses[i + shiftCount - currentShift] || 'hexagons__shape_hide';
          const itemClass = [itemClasses[i + shiftCount - currentShift] || 'hexagons__item_width-null'];

          if (i === hexagons.length - 1) {
            if (shiftCount === 0) {
              itemClass.push('hexagons__item_mrs');
            }
            if (shiftCount === -1) {
              itemClass.push('hexagons__item_mrm');
            }
          }
          if (i === 0 && shiftCount === 2) {
            itemClass.push('hexagons__item_mls');
          }

          return { ...hexagon, shapeClass, itemClass: itemClass.join(' ') };
        });
        console.log('updatedHexagons>>>', updatedHexagons);
        setShiftCount(shiftCount - 1);
        setHexagons(updatedHexagons);
      }
    };

    window.addEventListener('wheel', handleScroll);
    return () => window.removeEventListener('wheel', handleScroll);
  }, [hexagons, shiftCount]);

  return (
    <>
      <h1 className="visually-hidden">Билеты и абонементы</h1>
      <div className="app">
        <div className="diagonal-box">
          <ul className="hexagons">
            {hexagons.map((item) => {
              const classes = cn('hexagons__shape', item.shapeClass);
              return (
                <li key={item.texts} className={`hexagons__item ${item.itemClass}`}>
                  <div className={classes}>
                    <div className="hexagons__texts">
                      <p className="hexagons__text hexagons__text_place">{item.texts.place}</p>
                      <p className="hexagons__text hexagons__text_date">
                        <span className="hexagons__text_date_full">{item.texts.date}</span>
                        <span className="hexagons__text_date_short">{item.texts.shortDate}</span>
                      </p>
                      <p className="hexagons__text hexagons__text_time">{item.texts.time}</p>
                      <Button className="hexagons__text hexagons__text_btn" variant="outline-dark">Купить билет</Button>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
          <div className="circle" />
        </div>
      </div>

      <Navbar expand="md" variant="dark" className="navbar-custom">
        <Container fluid className="px-md-5">
          <Navbar.Brand className="me-0 navbar-custom__link" href="#">БИЛЕТЫ И АБОНЕМЕНТЫ</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="flex-grow-1 text-center">
              <Nav.Link className="flex-grow-1" href="#1">Как купить?</Nav.Link>
              <Nav.Link className="flex-grow-1" href="#2">Правила</Nav.Link>
              <Nav.Link className="flex-grow-1" href="#3">Возврат билетов</Nav.Link>
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
};

export default App;
