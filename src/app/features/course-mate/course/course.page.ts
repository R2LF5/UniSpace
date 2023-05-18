import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-course',
  templateUrl: './course.page.html',
  styleUrls: ['./course.page.scss'],

})
export class CoursePage implements OnInit {
  assignmentForm: FormGroup;
  constructor(private router: Router, private actionSheetController: ActionSheetController,private formBuilder: FormBuilder ){
    this.assignmentForm = this.formBuilder.group({
      description: [''],
      datetime: [''],
      section: [''],
      course: [''],
    });
   }
   //go to course mate with routerlink
   goToCourseMate(){
    this.router.navigateByUrl('/dashboard/CourseMate');
    }
  ngOnInit() {
  }

  previewImages: string[] = [];


  goToHomePage() {
    this.router.navigateByUrl('/home');
  }
  goToLoginPage() {
    this.router.navigateByUrl('/login');
  }
  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      buttons: [{
        text: 'Edit',
        icon: 'create',
        handler: () => {
          // Handle edit button click
        }
      }, {
        text: 'Delete',
        icon: 'trash',
        handler: () => {
          // Handle delete button click
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel'
      }]

    });
    await actionSheet.present();
  }
  text = '';
  isEditing = false;


  saveEdit() {
    // save the edited text and exit edit mode
    this.isEditing = false;
  }

  cancelEdit() {
    // reset the text to its original value and exit edit mode
    this.isEditing = false;
  }
  onDragOver(event: DragEvent) {
    event.preventDefault();
  }
  onDrop(event: DragEvent) {
    event.preventDefault();

    if (event.dataTransfer?.items) {
      // Use DataTransferItemList interface to access the file(s)
      for (let i = 0; i < event.dataTransfer.items.length; i++) {
        // If dropped items aren't files, reject them
        if (event.dataTransfer.items[i].kind === 'file') {
          const file = event.dataTransfer.items[i].getAsFile();
          if(file) {
            this.handleFile(file);
          }
        }
      }
    } else if(event.dataTransfer?.files){
      // Use DataTransfer interface to access the file(s)
      for (let i = 0; i < event.dataTransfer.files.length; i++) {
        this.handleFile(event.dataTransfer.files[i]);
      }
    }
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if(file) {
      this.handleFile(file);
    }
  }

  handleFile(file: File) {
    const reader = new FileReader();
    reader.onload = (event: any) => {
      this.previewImages.push(event.target.result);
    };
    reader.readAsDataURL(file);
  }

// post stuff

updateSelected = true;
eventSelected = false;
assignmentSelected = false;

eventFormVisible = false;
assignmentFormVisible = false;
selectUpdate() {
  this.updateSelected = true;
  this.assignmentSelected = false;
  this.eventSelected = false;

  this.assignmentFormVisible = false;
  this.eventFormVisible = false;
}

selectAssignment() {
  this.updateSelected = false;
  this.assignmentSelected = true;
  this.eventSelected = false;

  this.assignmentFormVisible = true;
  this.eventFormVisible = false;
}

selectEvent() {
  this.updateSelected = false;
  this.assignmentSelected = false;
  this.eventSelected = true;

  this.assignmentFormVisible = false;
  this.eventFormVisible = true;
}
}
