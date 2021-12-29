import React from 'react'

import Chip from '@mui/material/Chip';

export class Tags extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const lista = this.props.tags.map((tag) => {
      return (
        <Chip
          className='m-1'
          key={tag}
          label={tag}/>
      );
    });
    return (
      <div
      className='mb-1 d-flex justify-content-center flex-wrap'>
        {lista}
      </div>
    );
  }
}