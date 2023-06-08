import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarpoolService } from 'src/app/services/carpool.service';
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

  constructor(private route: ActivatedRoute, private carpoolService : CarpoolService) { }
  depart: string | null = null;
  destination: string | null = null;


  ngOnInit() {
    this.depart = this.route.snapshot.paramMap.get('depart') || 'default_depart';
    this.destination = this.route.snapshot.paramMap.get('destination') || 'default_destination';
    this.carpoolService.findAllCarpools().subscribe((data: any) => {
        this.Carpools = data;
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
    });
  }


  requestJoin() {
    // handle request join logic here
  }

  viewOnMaps(from: string, to: string) {
    // Construct the Google Maps URL
    let url = `https://www.google.com/maps/dir/${from}/${to}`;
    // Open the URL in a new tab
    window.open(url, "_blank");
  }


}
