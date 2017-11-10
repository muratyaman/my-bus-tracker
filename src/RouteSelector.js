import React, { Component } from 'react';

class RouteSelector extends Component {

  constructor(props){
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  onChange(event){
    const onChange = this.props.onChange;
    onChange(event.target.value);
  }

  render(){
    const { id, data, defaultValue } = this.props;
    const list = data.map( (route, i) => {
      const key = 'option-' + i;
      return (
          <option key={ key } value={ route.tag }>{ route.title }</option>
      )
    });
    return (
        <div className='route-selector'>
          <label htmlFor={ id }>My Bus Tracker - Show buses on route: </label>
          <select id={ id } defaultValue={ defaultValue } onChange={ this.onChange }>
            { list }
          </select>
        </div>
    )
  }

}

export { RouteSelector }
