import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-course-mate',
  templateUrl: './course-mate.page.html',
  styleUrls: ['./course-mate.page.scss']
})
export class CourseMatePage implements OnInit {

  constructor(private router: Router) { }

  goToCoursePage() {
    this.router.navigateByUrl('/dashboard/Course');
  }

  ngOnInit() {
  }
}
