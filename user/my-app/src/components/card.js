import React from 'react'

export function Card(props) {
  return (
    <div className='m-2 p-2 bg-danger rounded-3'>
      <div className='row m-0'>
        <div className='col-5'>
          <img
            src='https://cdn.discordapp.com/attachments/918079016651604009/918090490405077013/Zona_calda.png'
            alt='Immagine'
            height='100'
          />
        </div>
        <div className='col-7 bg-primary align-self-center'>
          <div className='text-truncate'>
            Titolo Brand asdhuasdfhjkfhk
          </div>
          <div>
            Prezzo al giorno
          </div>
        </div>
      </div>
    </div>
  )
}