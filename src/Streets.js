import React, { Component } from 'react';

// presentation component
const Street = (props) => {
  return (
      <path
          id={ props.id }
          d={ props.path }
          className="street"
      />
  )
}

class Streets extends Component {

  render(){
    const data = this.props.data;
    const pathGenerator = this.props.pathGenerator;
    const list = data.map((feature, i) => {
      const id = 'street-' + i;
      return (
          <Street
              id={ id }
              key={ id }
              path={ pathGenerator(feature) }
          />
      )
    });

    return (
        <g className="streets">{ list }</g>
    )

  }

}

export { Streets }