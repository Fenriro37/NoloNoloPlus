import React from 'react'

export function Card(props) {
  return (
    <div className='m-2 p-2 bg-danger rounded-3'>
      <div className='row m-0'>
        <div className='col-5'>
          <img
            src={props.image}
            alt='Immagine'
            height='100'
            width='100'
          />
        </div>
        <div className='col-7 bg-primary align-self-center'>
          <div className='text-truncate'>
            {props.title}
          </div>
          <div>
            {props.brand}
          </div>
          <div>
            {props.price} euro al giorno
          </div>
        </div>
      </div>
    </div>
  )
}