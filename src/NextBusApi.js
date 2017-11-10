/**
 * Class NextBus API
 */
class NextBusApi {

  constructor(){
    this.src = 'http://webservices.nextbus.com/service/publicJSONFeed';
    this.api = this.api.bind(this);
    this.agencyList = this.agencyList.bind(this);
    this.routeList = this.routeList.bind(this);
    this.routeListOfSfMuni = this.routeListOfSfMuni.bind(this);
    this.vehicleLocations = this.vehicleLocations.bind(this);
    this.vehicleLocationsOfSfMuniNow = this.vehicleLocationsOfSfMuniNow.bind(this);
    this.vehicleLocationsOfSfMuniLast15Secs = this.vehicleLocationsOfSfMuniLast15Secs.bind(this);
  }

  api(command, params){
    let url = this.src + '?command=' + command;
    for(let idx in params) {
      url += '&' + idx + '=' + encodeURIComponent(params[idx]);
    }
    return fetch(url)
        .then( (response) => response.json() );
  }

  agencyList(){
    return this.api('agencyList', {});
  }

  routeList(agencyTag){
    return this.api('routeList', { 'a': agencyTag });
  }

  routeListOfSfMuni(){
    return this.routeList('sf-muni');
  }

  vehicleLocations(agencyTag, routeTag, timestampMicSecs){
    return this.api('vehicleLocations', { 'a': agencyTag, 'r': routeTag, 't': timestampMicSecs });
  }

  vehicleLocationsOfSfMuniNow(routeTag){
    const now = Date.now();
    return this.vehicleLocations('sf-muni', routeTag, now);
  }

  vehicleLocationsOfSfMuniLast15Secs(routeTag){
    const last15Secs = 0;
    return this.vehicleLocations('sf-muni', routeTag, last15Secs);
  }

}

export { NextBusApi };