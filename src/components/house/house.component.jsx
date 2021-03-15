import React, { Component } from 'react';
import './house.style.scss';

export class House extends Component {
  render() {
    return (
      <>
        <button className="house" onClick={() => this.props.onClick()}> 
          teste
        </button>
      </>
    );
  }
}

export default House;