import React, { Component } from 'react';
import * as d3 from 'd3';

import './CityMap.css';
import './RouteSelector.css';
import './AjaxIndicator.css';

import { CityMapDataApi } from './CityMapDataApi';
import { NextBusApi } from './NextBusApi';

import { Neighborhoods } from './Neighborhoods';
import { Streets } from './Streets';
import { Buses } from './Buses';
import { RouteSelector } from './RouteSelector';

const center    = [ -122.433701, 37.767683 ];
const width     = 1200;
const height    = 700;
const scale     = 400 * 1000;
const translate = [ width / 2, height / 2 ];

// func
const projection = d3.geoMercator()
    .center(center)         // set centre
    .scale(scale)           // scale to fit
    .translate(translate)   // ensure centred in group
;
// func
const pathGenerator = d3.geoPath().projection(projection);

const mapApi = new CityMapDataApi();
const busApi = new NextBusApi();

const AjaxIndicator = (props) => {
  const cls = 'ajax-indicator ' + (props.visible ? '' : 'hidden');
  return (
      <img src='/loading.gif' className={cls} alt='Loading data' />
  )
}


class CityMap extends Component {
  constructor(props) {
    super(props);

    // initial state
    this.state = {
      neighborhoods: [],
      streets: [],
      buses: [],
      agency: 'sf-muni',// default agency tag
      routes: [],
      route: 'E',// default route tag
      ajaxCounter: 0
    }

    this.startLoadingMapData = this.startLoadingMapData.bind(this);

    this.getNeighborhoods = this.getNeighborhoods.bind(this);
    this.receivedNeighborhoods = this.receivedNeighborhoods.bind(this);

    this.getStreets = this.getStreets.bind(this);
    this.receivedStreets = this.receivedStreets.bind(this);

    this.getBusLocations = this.getBusLocations.bind(this);
    this.receivedBusData = this.receivedBusData.bind(this);

    this.getRoutes = this.getRoutes.bind(this);
    this.receivedRouteData = this.receivedRouteData.bind(this);
    this.handleRouteChange = this.handleRouteChange.bind(this);

    this.timer = 0;
    this.timerTick = this.timerTick.bind(this);

    this.ajaxInc = this.ajaxInc.bind(this);
    this.ajaxDec = this.ajaxDec.bind(this);
  }

  componentDidMount() {
    this.startLoadingMapData();
    setInterval(this.timerTick, 20 * 1000);// start timer
  }

  // increment ajaxCounter
  ajaxInc(){
    let ajaxCounter = this.state.ajaxCounter + 1;
    this.setState({ ajaxCounter });
  }

  // decrement ajaxCounter
  ajaxDec(){
    let ajaxCounter = this.state.ajaxCounter - 1;
    this.setState({ ajaxCounter });
  }

  startLoadingMapData(){
    // exec each api call after 2 seconds
    let i = 1;
    setTimeout(this.getNeighborhoods, 2000 * i++);
    setTimeout(this.getStreets, 2000 * i++);
    setTimeout(this.getRoutes, 2000 * i++);
    setTimeout(this.getBusLocations, 2000 * i++);
  }

  getNeighborhoods(){
    this.ajaxInc();
    mapApi.neighborhoods().then(this.receivedNeighborhoods);
  }

  receivedNeighborhoods(data){
    this.ajaxDec();
    // expected object { type: 'FeatureCollection', features: [...] }
    //TODO: validate data.features
    this.setState({ neighborhoods: data.features });
  };

  getStreets(){
    this.ajaxInc();
    mapApi.streets().then(this.receivedStreets);
  }

  receivedStreets(data){
    this.ajaxDec();
    // expected object { type: 'FeatureCollection', features: [...] }
    //TODO: validate data.features
    this.setState({ streets: data.features });
  };

  receivedBusData(data){
    this.ajaxDec();
    let buses = [];
    //TODO: validate data.vehicle
    data.vehicle.map((bus) => {
      return buses.push({
        coordinates: [ bus.lon, bus.lat ]
      });
    });

    this.setState({ buses });
  }

  getRoutes(){
    this.ajaxInc();
    busApi.routeList(this.state.agency).then(this.receivedRouteData);
  }

  receivedRouteData(data){
    this.ajaxDec();
    //TODO: validate data.route
    this.setState({ routes: data.route });
  }

  handleRouteChange(route){
    this.setState({ route, buses: [] });
    setTimeout(this.getBusLocations, 1000);
  }

  timerTick(){
    this.getBusLocations();
  }

  getBusLocations(){
    this.ajaxInc();
    const timeLast15Secs = 0;
    busApi.vehicleLocations(this.state.agency, this.state.route, timeLast15Secs)
        .then(this.receivedBusData);
  }

  componentWillUnmount(){
    clearInterval(this.timer);// stop timer
  }

  render() {
    const viewBox = '0 0 '+width+' '+height;
    const neighborhoods = this.state.neighborhoods;
    const streets = this.state.streets;
    const buses = this.state.buses;
    const routes = this.state.routes;
    const route = this.state.route;// current route
    const ajaxVisible = this.state.ajaxCounter > 0;

    return (
        <div className='city-map-wrapper'>

          <RouteSelector id='route' data={routes} defaultValue={route} onChange={this.handleRouteChange} />

          <AjaxIndicator visible={ ajaxVisible } />

          <div className='city-map-container'>
            <svg id='city-map' className='city-map' width={ width + 'px' } height={ height + 'px' } viewBox={ viewBox }>
              <Neighborhoods data={ neighborhoods } pathGenerator={ pathGenerator } />
              <Streets data={ streets } pathGenerator={ pathGenerator } />
              <Buses data={ buses } projection={ projection } />
            </svg>
          </div>

        </div>
    )
  }

}

export { CityMap };