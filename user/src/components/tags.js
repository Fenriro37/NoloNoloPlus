import React from 'react'

import { Badge, Pill } from 'react-bootstrap';

export class Tags extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const lista = this.props.tags.map((tag) => {
      return (
        <Badge
        pill
        bg='primary'
        className='m-1'
        key={tag}>
          {tag}
        </Badge>
      );
    });
    return (
      <div>
        <b>Categoria:</b>
        <div
        className='d-flex justify-content-center flex-wrap'>
          {lista}
        </div>
      </div>
    );
  }
}