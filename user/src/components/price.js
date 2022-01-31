import React from 'react';

export class Price extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      originalFixedPrice: this.props.originalFixedPrice,
      discountedFixedPrice: this.props.discountedFixdedPrice,
      originalVariablePrice: this.props.originalVariablePrice,
      variableDiscount: this.props.variableDiscount,
    }
  }

  render() {
    if(this.state.originalFixedPrice != this.state.discountedFixedPrice) {
      return (
        <>
          <div>
            <span style={{ textDecorationLine: 'line-through'}} tabIndex='0'>
              <b>Prezzo fisso: </b> {this.state.originalFixedPrice} €
            </span>
            <br/>
            <span style={{ color: 'red' }} tabIndex='0'>
              <b>Prezzo fisso scontato: </b> {this.state.discountedFixedPrice} €
            </span>
          </div>
          <div>
            <span tabIndex='0'>
              <b>Prezzo giornaliero: </b> {this.state.originalVariablePrice} €
            </span>
            <br/>
            {
              this.state.variableDiscount.onSale
              ? <span style={{ color: 'red' }} tabIndex='0'>
                  Sconto {this.state.variableDiscount.onSaleType ? 'del ' : 'di '}
                  {parseFloat(this.state.variableDiscount.onSaleValue).toFixed(2)}
                  {this.state.variableDiscount.onSaleType ? '% ' : '€ '}
                  sul costo giornaliero se superi {this.state.variableDiscount.days} {parseInt(this.state.variableDiscount.days) > 1 ? 'giorni ' : 'giorno '} 
                  di noleggio.
                </span>
              : <></>
            }
          </div>
        </>
      );
    } else {
      return (
        <div>
          <span tabIndex='0'>
            <b>Prezzo fisso: </b> {parseFloat(this.state.originalFixedPrice).toFixed(2)} €
          </span>
          <br/>
          <span tabIndex='0'>
            <b>Prezzo giornaliero: </b> {parseFloat(this.state.originalVariablePrice).toFixed(2)} €
          </span>
          <br/>
            {
              this.state.variableDiscount.onSale
              ? <span style={{ color: 'red' }} tabIndex='0'>
                  Sconto {this.state.variableDiscount.onSaleType ? 'del ' : 'di '}
                  {parseFloat(this.state.variableDiscount.onSaleValue).toFixed(2)}
                  {this.state.variableDiscount.onSaleType ? '% ' : '€ '}
                  sul prezzo giornaliero se superi {this.state.variableDiscount.days} {parseFloat(this.state.variableDiscount.days) > 1 ? 'giorni ' : 'giorno '} 
                </span>
              : <></>
            }
        </div>
      );
    }
    
  }
}