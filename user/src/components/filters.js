import React from 'react';

import { Dropdown } from 'react-bootstrap';

export class Filters extends React.Component {
  constructor(props) {
    super(props);
    if(props.type == 'product') {
      this.state = {
        filter1: ['Disponibilità', 'Tutti', 'Disponibili', 'Non dispobili'],
        choise1: 1,
        filter2: ['Ordina per', 'Prezzo crescente', 'Prezzo descrescente'],
        choise2: 1
      }
      // props.sort(true);
    } else if(props.type == 'reservation') {
      this.state = {
        filter1: ['Disponibilità', 'Tutte', 'Attive', 'Concluse'],
        choise1: 1,
        filter2: ['Ordina per', 'Data crescente', 'Data descrescente'],
        choise2: 1
      }
      // props.sort(true);
    }
  }

  render() {
    if(this.props.type == 'user') {
      return <></>
    } else {
      return (
        <div
        className='row p-2'>
          <div
          className='col-6 d-flex flex-row align-items-center'
          style={{ overflowX: 'visible !important' }}>
            <Dropdown>
              <Dropdown.Toggle>
                {this.state.filter1[0]}
              </Dropdown.Toggle>
              <Dropdown.Menu
              renderOnMount={true}>
                <Dropdown.Item
                active={this.state.choise1 == 1}
                onClick={() => {
                  this.setState({
                    choise1: 1
                  });
                  this.props.show(1);
                }}>
                  {this.state.filter1[1]}
                </Dropdown.Item>
                <Dropdown.Item
                active={this.state.choise1 == 2}
                onClick={() => {
                  this.setState({
                    choise1: 2
                  });
                  this.props.show(2);
                }}>
                  {this.state.filter1[2]}
                </Dropdown.Item>
                <Dropdown.Item
                active={this.state.choise1 == 3}
                onClick={() => {
                  this.setState({
                    choise1: 3
                  });
                  this.props.show(3);
                }}>
                  {this.state.filter1[3]}
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <div
          className='col-6 d-flex flex-row-reverse align-items-center'>
          <Dropdown>
            <Dropdown.Toggle>
              {this.state.filter2[0]}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item
              active={this.state.choise2 == 1}
              onClick={(e) => {
                this.setState({
                  choise2: 1
                });
                this.props.sort(true);
              }}>
                {this.state.filter2[1]}
              </Dropdown.Item>
              <Dropdown.Item
              active={this.state.choise2 == 2}
              onClick={() => {
                this.setState({
                  choise2: 2
                });
                this.props.sort(false);
              }}>
                {this.state.filter2[2]}
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          </div>
        </div>
      );
    }
  }
}