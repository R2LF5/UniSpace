import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ActionSheetController } from '@ionic/angular';
import { CourseService } from '../../services/course.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-course-mate',
  templateUrl: './course-mate.page.html',
  styleUrls: ['./course-mate.page.scss']
})
export class CourseMatePage implements OnInit {
  userRole: string = '';
  department: string = '';
  formCourse: FormGroup;
  constructor(private router: Router, private builder:FormBuilder,
    private courseService:CourseService,
    private actionSheetController: ActionSheetController,
    private toastController: ToastController,
    public alertController: AlertController
    ) {
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
    this.userRole = localStorage.getItem('role') || '';
    this.department = localStorage.getItem('department') || '';
    this.courseService.findAllCourses().subscribe(data => {
        console.log(data); // Add this line
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



  async presentToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      color: color
    });
    toast.present();
  }








  async presentActionSheet(courseId: number) {
    const actionSheet = await this.actionSheetController.create({
      buttons: [
        {
          text: 'Delete',
          icon: 'trash',
          handler: () => {
            // add delete course
          },
        },
        {
          text: 'Edit',
          icon: 'create',
          handler: () => {
            console.log(courseId);
            this.presentEditAlert(courseId);
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








  // edit form

  async presentEditAlert(courseId: number) {
  // Get course data
  const course = this.courses.find((course) => course.courseId === courseId);
  console.log(course);

  const alert = await this.alertController.create({
    header: 'Edit Course',
    inputs: [
      {
        name: 'title',
        type: 'text',
        value: course.title, // Initial input field value
        placeholder: 'Course Name'
      },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
        },
        {
          text: 'Update',
          handler: (data) => {
            // Create a new course object with the updated title
            const updatedCourse = { title: data.title };

            this.courseService.updateCourse(courseId, updatedCourse)
              .subscribe(
                res => {
                  // Find the course in the array, update its title
                  const courseToUpdate = this.courses.find(c => c.courseId === courseId);
                  if (courseToUpdate) {
                    courseToUpdate.title = data.title;
                  }
                  this.presentToast('Course updated successfully', 'success');
                },
                err => {
                  this.presentToast('Failed to update course', 'danger');
                }
              );
          }

        }
      ]
    });

    await alert.present();
  }



  AddCourse(){
    // Get the current user's id from local storage
    const currentUserId = localStorage.getItem('id');

    // Build the form
    this.formCourse = this.builder.group({
      title: this.title,
      section: this.builder.group({
        id: [1] // Change 'sectionId' to 'id' to match your JSON structure
      }),
      professor: this.builder.group({
        id: [currentUserId], // Change 'professorId' to 'id', add 'role'
        role: ['Professor']
      })
    });

    // Make the POST request
    this.courseService.addCourse(this.formCourse.value).subscribe(
      res => {
        this.courses.push(res);
        this.presentToast('Course added successfully', 'success');
      },
      err => {
        this.presentToast('Failed to add course', 'danger');
      }
    );
  }



}
