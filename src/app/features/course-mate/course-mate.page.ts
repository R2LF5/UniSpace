import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-course-mate',
  templateUrl: './course-mate.page.html',
  styleUrls: ['./course-mate.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class CourseMatePage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
