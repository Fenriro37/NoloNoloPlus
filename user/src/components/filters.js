import React from 'react';
import { Form, Dropdown } from 'react-bootstrap';

export class Filters extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="row p-2">
        <div className="col-6 d-flex flex-row align-items-center">
          <Form.Check 
            type="checkbox"
            label="Disponibilità"
            className="m-0"
            onChange={(e) => { this.props.showOnlyAvailable(e.target.checked) }}/>
        </div>
        <div className="col-6 d-flex flex-row-reverse align-items-center">
        <Dropdown>
          <Dropdown.Toggle id="dropdown-basic">
            Ordina
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={(e) => {this.props.sort(true)}}>
              Prezzo crescente
            </Dropdown.Item>
            <Dropdown.Item onClick={(e) => {this.props.sort(false)}}>
              Prezzo decrescente
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        </div>
      </div>
    );
  }
}