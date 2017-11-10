import React, { Component } from 'react';

// presentation component
const Neighborhood = (props) => {
  return (
      <path
          id={ props.id }
          d={ props.path }
          className="neighborhood"
      />
  )
}

class Neighborhoods extends Component {

  render(){
    const data = this.props.data;
    const pathGenerator = this.props.pathGenerator;

    const list = data.map((feature, i) => {
      const id = 'neighborhood-' + i;
      return (
          <Neighborhood
              id={ id }
              key={ id }
              path={ pathGenerator(feature) }
          />
      )
    });

    return (
        <g className="neighborhoods">{ list }</g>
    )

  }

}

export { Neighborhoods }