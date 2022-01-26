import React from 'react';

import { Header } from './header';
import { Card, Table } from 'react-bootstrap';
import { Page, Document, StyleSheet, Text, Image } from '@react-pdf/renderer';

export class Invoice extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <>
      <Header
        type='invoice'
        isAuthenticated={true}/>
      <Card className='m-0 p-3'>
        <div className='mb-3 element-to-hide-over-768'>
          Attenzione, abbiamo rilevato che sei sotto un attakko hacker.
          <br/>
          Se sei da un dispositivo mobile, gira il device per una migliore lettura.
        </div>
        <Table bordered responsive>
          <tbody>
            <tr>
              <td colSpan={3}>Ricevente</td>
              <td colSpan={3}>Emittente</td>
            </tr>
            <tr>
              <td colSpan={3}>Fattura</td>
              <td colSpan={3}>Data</td>
            </tr>
            <tr>
              <th>Descrizione</th>
              <th>Quantità</th>
              <th>Prezzo</th>
              <th>Sconto</th>
              <td>Iva</td>
              <th>Imponibile</th>
            </tr>
            <tr>
              <td>Titolo + Brand + id?</td>
              <td>1</td>
              <td>Prezzo</td>
              <td>Sconto</td>
              <td>22%</td>
              <td>Imponibile</td>
            </tr>
            <tr>
              <td>Noleggio Titolo + Brand + id?</td>
              <td>1</td>
              <td>Prezzo</td>
              <td>Sconto</td>
              <td>22%</td>
              <td>Imponibile</td>
            </tr>
            <tr>
              <td colSpan={5}>Totale imponibile</td>
              <td>totalPrice scorporato</td>
            </tr>
            <tr>
              <td colSpan={5}>IVA</td>
              <td>IVA</td>
            </tr>
            <tr>
              <td colSpan={5}>Totale Fattura</td>
              <td>Tot</td>
            </tr>
          </tbody>
        </Table>
      </Card>
      </>
    );
  }
}