interface Markable {
  location: {
    lat: number;
    lng: number;
  };
}

class Map {
  private googleMap: google.maps.Map;

  constructor(id: string) {
    this.googleMap = new google.maps.Map(document.getElementById(id)!, {
      zoom: 1,
      center: {
        lat: 0,
        lng: 0,
      },
    });
  }

  addMarker(markable: Markable): void {
    new google.maps.Marker({
      map: this.googleMap,
      position: markable.location,
    });
  }
}

export { Map };
