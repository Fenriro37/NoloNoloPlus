import React from 'react';

import Rating from '@mui/material/Rating';

export class Stars extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const val = parseInt(this.props.quality);
    return (
      <div
      className='d-flex align-items-center'
      tabIndex='0'>
        <b>Qualità:</b>
        <Rating
          name='read-only'
          value={val}
          max={3}
          readOnly
        />
      </div>
    );
  }
}