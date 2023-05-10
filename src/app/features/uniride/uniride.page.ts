import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import * as L from 'leaflet';
import 'leaflet-routing-machine';
declare let navigator: any;

@Component({
  selector: 'app-uniride',
  templateUrl: './uniride.page.html',
  styleUrls: ['./uniride.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class UniridePage implements OnInit, AfterViewInit {
  departureLocation = '';
  destinationLocation = '';
  @ViewChild('map') mapContainer: any;
  map: any;
  distance:  number = 0;
  departureLocations: string[] = [];
  arrivalLocations: string[] = [];

  constructor() {}




  ngOnInit() {}

  ngAfterViewInit() {
    this.loadMap();
  }

  loadMap() {
    L.Icon.Default.imagePath = 'assets/UniRide/';
    this.map = L.map(this.mapContainer.nativeElement, {
      zoomControl: false // disable the default zoom control
    }).setView([34.8531, 9.5188], 7);

    L.tileLayer('https://{s}.tile.thunderforest.com/transport/{z}/{x}/{y}.png?apikey=3b6c4801abf149bf8fd975cc137192f3', {
      attribution: 'Map data &copy; <a href="https://www.thunderforest.com/">Thunderforest</a>, <a href="http://www.openstreetmap.org/">OpenStreetMap</a> contributors',
      maxZoom: 24,
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
    }, 0);

    // Define a custom icon for the current location
    const currentLocationIcon = L.icon({
      iconUrl: '../../assets/locate-outline-copy.svg',
      iconSize: [32, 32],
      iconAnchor: [16, 16],
    });

    // Add a marker for the current location with the custom icon
    navigator.geolocation.getCurrentPosition((position: GeolocationPosition) => {
      const { latitude, longitude } = position.coords;
      this.map.setView([latitude, longitude], 15);
      L.marker([latitude, longitude], { icon: currentLocationIcon }).addTo(this.map);
    });

    // Define routing options
    const routingOptions = {
      waypoints: [
        L.latLng(36.833356, 10.147994), //depart
        L.latLng(36.8122548,10.1017097) //destination
      ],
      routeWhileDragging: true,
      show: false
    };

    // Create the routing control and add it to the map
    const routingControl = L.Routing.control(routingOptions).addTo(this.map);

    routingControl.on('route', (e) => {
      const route = e.route;
      this.distance = route.totalDistance;
    });
  }

  //get current location
  centerToCurrentLocation() {
    console.log('Getting current position...');
    navigator.geolocation.getCurrentPosition(
      (position: GeolocationPosition) => {
        console.log('Current position retrieved:', position);
        const { latitude, longitude } = position.coords;
        this.map.setView([latitude, longitude], 17);
      },
      (error: GeolocationPositionError) => {
        console.error('Error getting current position:', error);
      }
    );
  }


}
