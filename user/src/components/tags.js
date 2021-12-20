import React from 'react'
import Chip from '@mui/material/Chip';

export class Tags extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props.tags)
    const lista = this.props.tags.map((tag) => {
      return (
        <Chip
          className="m-1"
          key={tag}
          label={tag}
        />
      );
    });
    return (
      <div className="d-flex justify-content-center">
        {lista}
      </div>
    );
  }
}