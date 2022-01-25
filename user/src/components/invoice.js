import React from 'react';

import { Card, Table } from 'react-bootstrap';

export class Invoice extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <Card className='m-3 p-4 w-100'>
        <div className='row d-flex justify-content-between'>
          <div className='col-4'>
            Intestazione Destinatario
          </div>
          <div className='col-4'>
            Intestazione Emittente
          </div>
        </div>
        <hr/>
        <div className='row d-flex justify-content-between'>
          <div className='col-4'>
            Fattura
          </div>
          <div className='col-4'>
            Data di emissione GG/MM/AAAA
          </div>
        </div>
        <hr/>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Descrizione</th>
              <th>Quantità</th>
              <th>Prezzo</th>
              <th>Sconto</th>
              <td>Iva</td>
              <th>Imponibile</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Titolo + Brand + id?</td>
              <td>1</td>
              <td>Prezzo</td>
              <td>Sconto</td>
              <td>22</td>
              <td>Imponibile</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Noleggio Titolo + Brand + id?</td>
              <td>1</td>
              <td>Prezzo</td>
              <td>Sconto</td>
              <td>22</td>
              <td>Imponibile</td>
            </tr>
            <tr>
              <td colSpan={6}>Totale imponibile</td>
              <td>totalPrice scorporato</td>
            </tr>
            <tr>
              <td colSpan={6}>IVA</td>
              <td>IVA</td>
            </tr>
            <tr>
              <td colSpan={6}>Totale Fattura</td>
              <td>Tot</td>
            </tr>
          </tbody>
        </Table>
      </Card>
    );
  }
}