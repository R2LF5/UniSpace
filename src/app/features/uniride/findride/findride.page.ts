import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarpoolService } from 'src/app/services/carpool.service';
import * as L from 'leaflet';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-findride',
  templateUrl: './findride.page.html',
  styleUrls: ['./findride.page.scss'],
})
export class FindridePage implements OnInit {
  Carpools: any[] = [];
  date: string = "";
  time: string = "";
  driverName: string = "John Doe";
  availableSeats: number = 2;
  pricePerSeat: number = 10;

  constructor(
    private route: ActivatedRoute,
    private carpoolService : CarpoolService,
    private http: HttpClient,
    private alertController: AlertController,
    private router: Router,
    private loadingController: LoadingController
  ){
  }

  depart: string | null = null;
  destination: string | null = null;


  async ngOnInit() {
    this.depart = this.route.snapshot.paramMap.get('depart') || 'default_depart';
    this.destination = this.route.snapshot.paramMap.get('destination') || 'default_destination';

      // Create the loading spinner
    let loading = await this.loadingController.create({
      message: 'Searching for carpools...',
    });
    // Present the loading spinner
    await loading.present();

    this.carpoolService.findAllCarpools().subscribe(async (data: any) => {
        // Filter out carpools that are more than 7km away from start or end
        let carpoolsWithinRangePromises = data.map(async (carpool:any) => {
            let startDistance = await this.getDistance(this.depart, carpool.fromLocation);
            let endDistance = await this.getDistance(this.destination, carpool.toLocation);
            return startDistance <= 5 && endDistance <= 5 ? carpool : null;
        });

        let carpoolsWithinRange = await Promise.all(carpoolsWithinRangePromises);
        this.Carpools = carpoolsWithinRange.filter(carpool => carpool !== null);

        // If no carpools found, present alert
        if (this.Carpools.length == 0) {
          await this.presentAlert();
        }

        // console log carpools
        console.log(this.Carpools);

        // Iterate over the carpools
        this.Carpools.forEach(carpool => {
            // Convert the departureTime to a JavaScript Date object
            let departureDate = new Date(carpool.departureTime);

            // Format the date and time
            carpool.date = `${departureDate.getDate()}/${departureDate.getMonth()+1}`;  // months are 0-based in JS
            carpool.time = `${departureDate.getHours()}:${departureDate.getMinutes() < 10 ? '0' : ''}${departureDate.getMinutes()}`;
        });
        await loading.dismiss();
    });
}

  async getDistance(start: string | null, end: string): Promise<number> {
    if (start === null || start === undefined) {
      return Infinity;
    }

    let startCoords = await this.getCoordinates(start);
    let endCoords = await this.getCoordinates(end);

    let startLatLng = L.latLng(startCoords.lat, startCoords.lng);
    let endLatLng = L.latLng(endCoords.lat, endCoords.lng);

    // Get the distance in meters, convert to kilometers, and round to one decimal place
    let distanceInKm = Math.round((startLatLng.distanceTo(endLatLng) / 1000) * 10) / 10;

    return distanceInKm;
  }


  getCoordinates(location: string): any {
    if (location === null || location === undefined) {
      return { lat: 0, lng: 0 };
    }

    // Replace spaces in the location with '+' for the API request
    location = location.replace(/ /g, '+');

    // Use OpenStreetMap's Nominatim API to get the latitude and longitude of the location
    let url = `https://nominatim.openstreetmap.org/search?q=${location}&format=json&limit=1`;

    let coords = this.http.get(url).pipe(map((response: any) => {
      if (response && response.length > 0) {
        return {
          lat: response[0].lat,
          lng: response[0].lon
        };
      } else {
        return { lat: 0, lng: 0 };
      }
    })).toPromise();

    return coords;
  }



  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'No Carpools Found',
      message: 'There are no carpools available within a 5km distance from your departure and destination locations.',
      buttons: ['OK']
    });

    await alert.present();
  }



  requestJoin() {

  }

  viewOnMaps(from: string, to: string) {
    // Construct the Google Maps URL
    let url = `https://www.google.com/maps/dir/${from}/${to}`;
    // Open the URL in a new tab
    window.open(url, "_blank");
  }


}
