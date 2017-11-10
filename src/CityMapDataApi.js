/**
 * Class CityMapDataApi
 */
class CityMapDataApi {

  constructor(){
    this.arteries = this.arteries.bind(this);
    this.freeways = this.freeways.bind(this);
    this.neighborhoods = this.neighborhoods.bind(this);
    this.streets = this.streets.bind(this);
  }

  arteries(){
    return fetch('/sfmaps/arteries.json').then( (response) => response.json() );
  }

  freeways(){
    return fetch('/sfmaps/freeways.json').then( (response) => response.json() );
  }

  neighborhoods(){
    return fetch('/sfmaps/neighborhoods.json').then( (response) => response.json() );
  }

  streets(){
    return fetch('/sfmaps/streets.json').then( (response) => response.json() );
  }

}

export { CityMapDataApi };