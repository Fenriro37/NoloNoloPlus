import React from "react";
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';

export class Stars extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props.quality);
    console.log(parseInt(this.props.quality));
    const val = parseInt(this.props.quality);
    return (
      <div className="mb-1 d-flex align-items-center">
        Qualità:
        <Rating
          name="read-only"
          value={val}
          max={3}
          readOnly
        />
      </div>
    );
  }
}