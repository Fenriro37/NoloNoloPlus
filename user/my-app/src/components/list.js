import React from 'react'
import { Card } from './card.js'

export const List = () => {

  const numeri = [1, 2, 3]
  const lista = numeri.map((numero) => {
    return (
      <Card num={numero}/>
    )
  })

  return (
    <div>
      {lista}
    </div>
  )
}