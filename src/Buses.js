import React, { Component } from 'react';

// presentation component
const Bus = (props) => {
  return (
      <circle
          id={ props.id }
          cx={ props.cx }
          cy={ props.cy }
          r={ 1 }
          className="bus"
      />
  )
};

class Buses extends Component {

  render(){
    const data = this.props.data;
    const projection = this.props.projection;

    const list = data.map((bus, i) => {
      const id = 'bus-' + i;
      const point = projection(bus.coordinates);
      return (
          <Bus
              id={ id }
              key={ id }
              cx={ point[0] }
              cy={ point[1] }
          />
      )
    });

    return (
        <g className="buses">{ list }</g>
    )

  }

}

export { Buses }