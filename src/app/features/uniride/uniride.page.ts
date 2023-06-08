import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import * as L from 'leaflet';
import 'leaflet-routing-machine';
declare let navigator: any;
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { CarpoolService } from 'src/app/services/carpool.service';


@Component({
  selector: 'app-uniride',
  templateUrl: './uniride.page.html',
  styleUrls: ['./uniride.page.scss'],
})
export class UniridePage implements OnInit, AfterViewInit {
  CL: string = '';

  @ViewChild('map') mapContainer: any;
  map: any;
  distance:  number = 0;


  constructor(
    private alertController: AlertController,
    private router: Router,
    public toastController: ToastController,
    private carpoolService : CarpoolService,
    ) {

  }
  startMarker!: L.Marker;
  endMarker!: L.Marker;

  routingOptions: any;
  routingControl: any;


  ngOnInit() {}

  ngAfterViewInit() {
    this.loadMap();
  }



  loadMap() {
    L.Icon.Default.imagePath = 'assets/UniRide/';
    this.map = L.map(this.mapContainer.nativeElement, {
      zoomControl: false // disable the default zoom control
    });

    L.tileLayer('https://{s}.tile.thunderforest.com/transport/{z}/{x}/{y}.png?apikey=3b6c4801abf149bf8fd975cc137192f3', {
      attribution: 'Map data &copy; <a href="https://www.thunderforest.com/">Thunderforest</a>, <a href="http://www.openstreetmap.org/">OpenStreetMap</a> contributors',
      maxZoom: 20,
      minZoom: 7,
    }).addTo(this.map);

    const maxBounds = L.latLngBounds(
      L.latLng(26.274757, 6.988017), // southwest corner
      L.latLng(40.947592, 14.370829) // northeast corner
    );

    this.map.setMaxBounds(maxBounds);
    this.map.on('drag', () => {
      this.map.panInsideBounds(maxBounds, { animate: false });
    });

    setTimeout(() => {
      this.map.invalidateSize();
    }, 10);

    const currentLocationIcon = L.icon({
      iconUrl: '../../assets/locate-outline-copy.svg',
      iconSize: [32, 32],
      iconAnchor: [16, 16],
    });

    navigator.geolocation.getCurrentPosition((position: GeolocationPosition) => {
      const { latitude, longitude } = position.coords;
      this.map.setView([latitude, longitude], 15);  // Set zoom level to 10
      L.marker([latitude, longitude], { icon: currentLocationIcon }).addTo(this.map);

      setTimeout(() => {
        this.map.invalidateSize();
      }, 0);
    });

    if (this.map['osrmControl']) {
      this.map.removeControl(this.map['osrmControl']);
    }

    this.routingOptions = {
      waypoints: [
        L.latLng(36.833356, 10.147994), //depart
        L.latLng(36.8122548,10.1017097) //destination
      ],
      routeWhileDragging: true,
      show: false,
      createMarker: (i: number, start: { latLng: L.LatLng }, n: number) => {
        const marker = L.marker(start.latLng, {
          draggable: true
        });
        if (i === 0) {
          marker.on('dragend', (event) => {
            const position = event.target.getLatLng();
            const lat = position.lat.toFixed(6);
            const lng = position.lng.toFixed(6);
            const searchBar = document.getElementById('departSearchbar') as HTMLInputElement;
            if (searchBar) {
              searchBar.value = `${lat},${lng}`;
            }
            this.routingOptions.waypoints[0] = L.latLng(lat, lng);
            this.refreshRoute();
          });
        } else {
          marker.on('dragend', (event) => {
            const position = event.target.getLatLng();
            const lat = position.lat.toFixed(6);
            const lng = position.lng.toFixed(6);
            const searchBar = document.getElementById('arrivalSearchbar') as HTMLInputElement;
            if (searchBar) {
              searchBar.value = `${lat},${lng}`;
            }
            this.routingOptions.waypoints[1] = L.latLng(lat, lng);
            this.refreshRoute();
          });
        }


        return marker;
      }
    };

    this.routingControl = L.Routing.control(this.routingOptions).addTo(this.map);

    this.routingControl.on('route', (e: any) => {
      const route = e.route;
      this.distance = route.totalDistance;
    });
  }




  async centerToCurrentLocation() {
    console.log('Getting current position...');
    if (navigator.geolocation) {
      // Check for geolocation permission
      const permissionStatus = await navigator.permissions.query({ name: 'geolocation' });
      if (permissionStatus.state === 'denied') {
        console.error('Geolocation permission was previously denied.');
        const alert = await this.alertController.create({
          header: 'Error',
          message: 'Geolocation permission was previously denied. Please enable it in your browser settings.',
          buttons: ['OK']
        });
        await alert.present();
        return;
      }

      navigator.geolocation.getCurrentPosition(
        async (position: GeolocationPosition) => {
          console.log('Current position retrieved:', position);
          const { latitude, longitude } = position.coords;
          this.map.setView([latitude, longitude], 17);

        },
        async (error: GeolocationPositionError) => {
          console.error('Error getting current position:', error);
          const alert = await this.alertController.create({
            header: 'Error',
            message: `Could not get current position: ${error.message}`,
            buttons: ['OK']
          });
          await alert.present();
        },
        { enableHighAccuracy: true }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Geolocation is not supported by this browser.',
        buttons: ['OK']
      });
      await alert.present();
    }
  }


  currentLocation: string = '';

  // button for current location on searchbars
  setLocationToCurrent(title: string) {
    navigator.geolocation.getCurrentPosition((position: GeolocationPosition) => {
      const { latitude, longitude } = position.coords;
      this.currentLocation = `${latitude},${longitude}`;

      if (title === 'depCurrent') {
        this.routingOptions.waypoints[0] = L.latLng(latitude, longitude);
        // Update the search bar value
        const searchBar = document.getElementById('departSearchbar') as HTMLInputElement;
        if (searchBar) {
          searchBar.value = 'Current Location';
        }
      } else if (title === 'arrCurrent') {
        this.routingOptions.waypoints[1] = L.latLng(latitude, longitude);
        // Update the search bar value
        const searchBar = document.getElementById('arrivalSearchbar') as HTMLInputElement;
        if (searchBar) {
          searchBar.value = 'Current Location';
        }
      }
      // Refresh the route
      this.refreshRoute();
    });
    console.log('Setting location to current for ', title);
  }

  // buton for FST location on searchbars
  setLocationToFST(title: string) {
    const latitude = 36.833356;
    const longitude = 10.147994;
    if (title === 'depFST') {
      this.routingOptions.waypoints[0] = L.latLng(latitude, longitude);
      // Update the search bar value
      const searchBar = document.getElementById('departSearchbar') as HTMLInputElement;
      if (searchBar) {
        searchBar.value = 'FST';
      }
    } else if (title === 'arrFST') {
      this.routingOptions.waypoints[1] = L.latLng(latitude, longitude);
      // Update the search bar value
      const searchBar = document.getElementById('arrivalSearchbar') as HTMLInputElement;
      if (searchBar) {
        searchBar.value = 'FST';
      }
    }
    // Refresh the route
    this.refreshRoute();
  }

  // when inputing a custom coordinate it sets it on map
  onSearchChange(event: any, type: string) {
    const value = event.detail.value;
    const coordinates = value.split(',').map((coord: string) => parseFloat(coord.trim()));

    // Check if the input is valid coordinates
    if (coordinates.length === 2 && !isNaN(coordinates[0]) && !isNaN(coordinates[1])) {
      if (type === 'depart') {
        this.routingOptions.waypoints[0] = L.latLng(coordinates[0], coordinates[1]);
      } else if (type === 'arrival') {
        this.routingOptions.waypoints[1] = L.latLng(coordinates[0], coordinates[1]);
      }
      // Refresh the route
      this.refreshRoute();
    }
  }


  refreshRoute() {
    // Remove the existing route
    if (this.routingControl) {
      this.map.removeControl(this.routingControl);
    }

    // Create a new routing control with the updated waypoints
    this.routingControl = L.Routing.control(this.routingOptions).addTo(this.map);

    this.routingControl.on('route', (e: any) => {
      const route = e.route;
      this.distance = route.totalDistance;
    });
  }





  ngAfterViewChecked() {
    if (this.map) {
      this.map.invalidateSize();
    }
  }
  navigateToInbox() {
    this.router.navigate(['/inbox'], { skipLocationChange: true });
  }





// add carpool form
  async AddPool() {
    const departSearchBar = document.getElementById('departSearchbar') as HTMLInputElement;
    const destinationSearchBar = document.getElementById('arrivalSearchbar') as HTMLInputElement;
    let depart = departSearchBar.value;
    let destination = destinationSearchBar.value;
    console.log('Depart: ', depart);
    console.log('Destination: ', destination);
    // If the input is "Current Location", get user's current location
    if (depart === 'Current Location' || destination === 'Current Location') {
      if (depart === 'Current Location') {
        depart = this.CL;
      }
      if (destination === 'Current Location') {
        destination = this.CL;
      }
    }



    // If the input is "FST", use the FST coordinates
    if (depart === 'FST') {
      depart = '36.8116786,10.0614824';
    }
    if (destination === 'FST') {
      destination = '36.8116786,10.0614824';
    }

    const id = localStorage.getItem('id');
    const role = localStorage.getItem('role');
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();
    let formattedToday = yyyy + '-' + mm + '-' + dd;
    if (depart !== 'Insert Coordinates' &&  destination !== 'Insert Coordinates' ) {
      if (depart !== '' || destination !== '') {
      const alert = await this.alertController.create({
        header: 'Add Ride',
        subHeader: 'Departure and destination were selected from the map',
        mode: 'ios',  // Force iOS look
        inputs: [
          {
            name: 'seats',
            type: 'number',
            min: 1,
            max: 4,
            placeholder: 'Number of seats'
          }, {
            name: 'price',
            type: 'number',
            min: 0,
            placeholder: 'Price per seat (TND)'
          }, {
            name: 'time',
            type: 'time',
            placeholder: 'Time'
          }, {
            name: 'date',
            type: 'date',
            value: formattedToday,
            min: formattedToday,
            placeholder: 'Date (YYYY-MM-DD, defaults to today)'
          }
      ],
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
          }, {
            text: 'Add',
            handler: (alertData) => {
              if (!alertData.seats || !alertData.price || !alertData.time || !alertData.date) {
                this.presentToast('All fields must be filled');
                return false;
              }

              else if (alertData.seats < 1 || alertData.seats > 4) {
                this.presentToast('Number of seats must be between 1 and 4');
                return false;
              }

              else if (alertData.price <= 0) {
                this.presentToast('Price must be greater than 0');
                return false;
              }
              else{
                let carpoolData = {
                  "fromLocation": depart,
                  "toLocation": destination,
                  "departureTime": `${alertData.date}T${alertData.time}`,
                  "availableSeats": alertData.seats,
                  "price": alertData.price,
                  "driver": {
                    "id": id,
                    "role": role,
                  }

                }
                this.carpoolService.addCarpool(carpoolData).subscribe(response => {
                  console.log(response);
                  this.presentToast('Ride added');
                }, error => {
                  this.presentToast('Error adding ride');
                  console.log(error);
                });
              }
              this.presentToast('Ride added');

              return true;  // Close the alert
          }


          }
        ]
      });
      await alert.present();
    }
    }
    else{
      this.presentToast('Dont forget to set Depart and Destination');
    }
  }
  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }


  // find ride button route to find page with all the values from inputs
  async navigateToFindRide() {
    const departSearchBar = document.getElementById('departSearchbar') as HTMLInputElement;
    const destinationSearchBar = document.getElementById('arrivalSearchbar') as HTMLInputElement;

    if (departSearchBar && destinationSearchBar) {
      const depart = departSearchBar.value;
      const destination = destinationSearchBar.value;

      if (depart && destination) {
        this.router.navigate(['/dashboard/UniRide/findride', depart, destination]);
      } else {
        // Display an alert or some other message to indicate that both values need to be filled in
        const toast = await this.toastController.create({
          message: 'Both departure and destination coordinates must be filled in.',
          duration: 2000
        });
        toast.present();
      }
    }
  }
}
