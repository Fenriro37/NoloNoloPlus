import React from 'react';

import { Button } from 'react-bootstrap';

export class Invoice extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <Button
      className='w-100'
      disabled>
        Richiedi fattura
      </Button>    
    );
  }
}