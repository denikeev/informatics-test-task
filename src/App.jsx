/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
// import cn from 'classnames';
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
      onClick: {
        dir: 'top',
        shift: 2,
      },
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
      onClick: {
        dir: 'top',
        shift: 1,
      },
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
      onClick: {
        dir: 'top',
        shift: 0,
      },
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
      onClick: {
        dir: 'bottom',
        shift: 1,
      },
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
      onClick: {
        dir: 'bottom',
        shift: 2,
      },
    },
  ];

  const [hexagons, setHexagons] = useState(initColl);
  const [shiftCount, setShiftCount] = useState(0);

  const switchHexagons = (direction, shift = null) => {
    console.log('func work!');
    if (shift === 0) {
      console.log('0 shift!');
      setHexagons(initColl);
      setShiftCount(0);
      return;
    }
    if (direction === 'top' && (shiftCount > 1 && shift === null)) return;
    if (direction === 'bottom' && (shiftCount < -1 && shift === null)) return;

    const typeMap = {
      top: 1,
      bottom: -1,
    };
    const symbol = typeMap[direction];
    console.log('direction>>>', direction);
    console.log('shift>>>', shift);
    const currentShift = shift ? shift - 1 : shiftCount;
    const currentShift2 = shift ? shift * symbol : shiftCount + symbol;
    console.log('currentShift >>>', currentShift);
    console.log('currentShift2 >>>', currentShift2);
    const updatedHexagons = hexagons.map((hexagon, i) => {
      const shapeClass = shapesClasses[i + currentShift2] || 'hexagons__shape_hide';
      const itemClass = [itemClasses[i + currentShift2] || 'hexagons__item_width-null'];
      switch (direction) {
        case 'top':
          if (i === 0) {
            if (currentShift === 0) {
              itemClass.push('hexagons__item_mls');
            }
            if (currentShift === 1) {
              itemClass.push('hexagons__item_mlm');
            }
          }
          if (i === hexagons.length - 1 && currentShift === -2) {
            itemClass.push('hexagons__item_mrs');
          }
          break;
        case 'bottom':
          if (i === hexagons.length - 1) {
            if (currentShift === 0) {
              itemClass.push('hexagons__item_mrs');
            }
            if (currentShift === -1 || currentShift2 === -2) {
              itemClass.push('hexagons__item_mrm');
            }
          }
          if (i === 0 && currentShift === 2) {
            itemClass.push('hexagons__item_mls');
          }
          break;
        default:
          throw new Error(`Unknown direction ${direction}`);
      }

      return { ...hexagon, shapeClass, itemClass: itemClass.join(' ') };
    });
    setShiftCount(shift * symbol || shiftCount + typeMap[direction]);
    setHexagons(updatedHexagons);
  };

  useEffect(() => {
    const handleScroll = (e) => {
      console.log('shiftCount>>>', shiftCount);

      if (e.deltaY > 0) {
        console.log('delta top');
        switchHexagons('top');
      }
      if (e.deltaY < 0) {
        console.log('delta bottom');
        switchHexagons('bottom');
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
            {hexagons.map((item) => (
              <li key={item.texts.date} className={`hexagons__item ${item.itemClass}`}>
                <div
                  onClick={() => switchHexagons(item.onClick.dir, item.onClick.shift)}
                  className={`hexagons__shape ${item.shapeClass}`}
                >
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
            ))}
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
