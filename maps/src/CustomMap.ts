// instructions to every other Class on how
// they can be an argument to "addMarker"
// by exporting it, we can import and implement this
// interface in our custom classes to make the relationship more clear
export interface Mappable {
  location: {
    lat: number;
    lng: number;
  };
  markerContent(): string;
}

// This CustomMap class is being used to limit the map access to only the google maps properties
// we want to reference in our app (as opposed to simply creating the google map directly
// in index.ts). This doesn't prevent other engineers from adding functionality to the class,
// but it helps make our intent more clear and limits the possibility of breakage
export class CustomMap {
  // needed to import the google maps type definitions - @types/googlemaps
  private googleMap: google.maps.Map;

  constructor(divId: string) {
    this.googleMap = new google.maps.Map(document.getElementById(divId), {
      zoom: 0,
      center: {
        lat: 0,
        lng: 0
      }
    });
  }

  // note when you use an union (or) operator to define/annotate allowable arg types, TS will evaluate
  // the 2 types and only allow you to reference properties of the arg that are common to
  // all annotated types. Then if you want to be able to add more allowable types,
  // you need to add more and more to the OR annotation. So in this case using an interface
  // makes more sense.
  addMarker(mappable: Mappable): void {
    const marker = new google.maps.Marker({
      map: this.googleMap,
      position: {
        lat: mappable.location.lat,
        lng: mappable.location.lng
      }
    });

    marker.addListener('click', () => {
      const infoWindow = new google.maps.InfoWindow({
        content: mappable.markerContent()
      });

      infoWindow.open(this.googleMap, marker);
    });
  }
}
