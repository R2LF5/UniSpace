import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ActionSheetController } from '@ionic/angular';
import { CourseService } from '../../services/course.service';
@Component({
  selector: 'app-course-mate',
  templateUrl: './course-mate.page.html',
  styleUrls: ['./course-mate.page.scss']
})
export class CourseMatePage implements OnInit {

  formCourse: FormGroup;
  constructor(private router: Router, private builder:FormBuilder , private courseService:CourseService,   private actionSheetController: ActionSheetController,private toastController: ToastController) {
    this.formCourse = this.builder.group({
      title: [''],
      section: this.builder.group({
        sectionId: ['']
      }),
      professor: this.builder.group({
        professorId: ['']
      })
    });

  }
  courses: any[] = [];
  ngOnInit() {
    this.courseService.findAllCourses().subscribe(data => {
      this.courses = data;
    });
  }

  goToCoursePage() {
    this.router.navigateByUrl('/dashboard/Course');
  }

  isMenuHidden = true;
  isMinimized = false;

  toggleMenu() {
    this.isMenuHidden = !this.isMenuHidden;
  }

  minimizeMenu() {
    this.isMenuHidden = true;
    this.isMinimized = true;
  }

  maximizeMenu() {
    this.isMinimized = false;
    this.isMenuHidden = false;
  }



  title: string='';
  section: string='';

  AddCourse(){
    this.formCourse = this.builder.group({
      title: [this.title],
      section: this.builder.group({
        sectionId: ['']
      }),
      professor: this.builder.group({
        professorId: [localStorage.getItem('idLogin')]
      })
    });

    this.courseService.addCourse(this.formCourse.value).subscribe(
      res => {
        this.presentToast('Course added successfully', 'success');
      },
      err => {
        this.presentToast('Failed to add course', 'danger');
      }
    );
  }

  async presentToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      color: color
    });
    toast.present();
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      buttons: [
        {
          text: 'Delete',
          icon: 'trash',

        },
        {
          text: 'Edit',
          icon: 'create',
          handler: () => {
            // Handle edit button click
          },
        },
        {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel',
        },
      ],
    });
    await actionSheet.present();
  }




}
