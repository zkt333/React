import React from 'react';
import { render } from 'react-dom';
import Hello from './Hello';
import Search from './searchbar';
import Login from './nikelogintest';
import Footer from './footer';
const styles = {
  fontFamily: 'sans-serif',
  textAlign: 'center',
  backgroundImage: 'url(//s3.amazonaws.com/nikeinc/assets/76732/Nike-News-Mercurial-Soccer-Logo_native_600.jpg?1516396993)',
  minHeight:'1000px',
  color:'white',

};

const App = () => (
  <div style={styles}>
    <Hello/>
    <Search/>
    <Footer/>
  </div>
);

render(<App />, document.getElementById('root'));
