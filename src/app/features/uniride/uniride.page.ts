import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import * as L from 'leaflet';
import 'leaflet-routing-machine';
declare let navigator: any;
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';



@Component({
  selector: 'app-uniride',
  templateUrl: './uniride.page.html',
  styleUrls: ['./uniride.page.scss'],
})
export class UniridePage implements OnInit, AfterViewInit {

  @ViewChild('map') mapContainer: any;
  map: any;
  distance:  number = 0;


  constructor(private alertController: AlertController, private router: Router) {}


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

    // Define the maximum bounds for the map
    const maxBounds = L.latLngBounds(
      L.latLng(26.274757, 6.988017), // southwest corner
      L.latLng(40.947592, 14.370829) // northeast corner
    );



    // Restrict the map view to Tunisia
    this.map.setMaxBounds(maxBounds);
    this.map.on('drag', () => {
      this.map.panInsideBounds(maxBounds, { animate: false });
    });

    setTimeout(() => {
      this.map.invalidateSize();
    }, 10);


    // Define a custom icon for the current location
    const currentLocationIcon = L.icon({
      iconUrl: '../../assets/locate-outline-copy.svg',
      iconSize: [32, 32],
      iconAnchor: [16, 16],
    });

    // Add a marker for the current location with the custom icon
    navigator.geolocation.getCurrentPosition((position: GeolocationPosition) => {
      const { latitude, longitude } = position.coords;
      this.map.setView([latitude, longitude], 15);  // Set zoom level to 10
      L.marker([latitude, longitude], { icon: currentLocationIcon }).addTo(this.map);

      // Invalidate size here, after the map's view has been set
      setTimeout(() => {
        this.map.invalidateSize();
      }, 0);
    });
      // Remove the directions control
      if (this.map['osrmControl']) {
        this.map.removeControl(this.map['osrmControl']);
      }



    // Define routing options
    this.routingOptions = {
      waypoints: [
        L.latLng(36.833356, 10.147994), //depart
        L.latLng(36.8122548,10.1017097) //destination
      ],
      routeWhileDragging: true,
      show: false,
    };

    // Create the routing control and add it to the map
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
  setLocationToCurrent(title: string) {
    navigator.geolocation.getCurrentPosition((position: GeolocationPosition) => {
      const { latitude, longitude } = position.coords;
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
    // Remove the existing routing control
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
}
