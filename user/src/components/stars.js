import React from 'react';

import Rating from '@mui/material/Rating';

import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { buttonBaseClasses } from '@mui/material';

export class Stars extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const val = parseInt(this.props.quality);
    var description = '';
    switch(val) {
      case 1:
        description = 'condizioni accettabili';
        break;
      case 2:
        description = 'condizioni buone';
        break;
      case 3:
        description = 'condizioni ottime';
        break;
      default:
        description = '';
    }
    return (
      <div
      className='d-flex align-items-center'
      tabIndex='0'>
        <OverlayTrigger
        placement='right'
        overlay={
          <Tooltip>
            {description}
          </Tooltip>
        }>
          <span class='d-flex align-items-center'>
            <b>Qualità:</b>
              <Rating
              name='read-only'
              value={val}
              max={3}
              readOnly/>
          </span>
        </OverlayTrigger>
      </div>
    );
  }
}