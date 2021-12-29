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
      className='mb-1 d-flex align-items-center'>
        Qualità:
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