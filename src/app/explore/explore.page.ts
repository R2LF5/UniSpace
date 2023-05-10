import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
selector: 'app-explore',
templateUrl: './explore.page.html',
styleUrls: ['./explore.page.scss'],
standalone: true,
imports: [IonicModule, CommonModule, FormsModule]
})
export class ExplorePage implements OnInit {
currentFeature = 1;
features = [
{ title: "Feature 1", id: "#feature1" },
{ title: "Feature 2", id: "#feature2" },
{ title: "Feature 3", id: "#feature3" },
{ title: "Feature 4", id: "#feature4" },
];

constructor(private router: Router) { }

ngOnInit() { }

goToHomePage() {
this.router.navigateByUrl('/home');
}

goToLoginPage() {
this.router.navigateByUrl('/login');
}

scrollToSection(section: string) {
const element = document.querySelector(section);
if (element) {
element.scrollIntoView({ behavior: 'smooth' });
}
}

nextFeature() {
this.currentFeature = (this.currentFeature < this.features.length) ? this.currentFeature + 1 : 1;
const section = this.features[this.currentFeature - 1].id;
this.scrollToSection(section);
}
prevFeature() {
  this.currentFeature = (this.currentFeature > 1) ? this.currentFeature - 1 : this.features.length;
  const section = this.features[this.currentFeature - 1].id;
  this.scrollToSection(section);
  }
}
