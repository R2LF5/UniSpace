import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { UserUniService } from '../../services/user-uni.service';
import {User} from '../../models/user.model'
import { Router } from '@angular/router';
import { SectionService } from '../../services/section.service';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-math',
  templateUrl: './math.page.html',
  styleUrls: ['./math.page.scss'],
})
export class MathPage implements OnInit {
  form: FormGroup;

  profSections: string[] = [];
  profLevels: string[] = [];

  id: string = ''; // Initialize id with an empty string
  // declare role and get it from local storage
  role: string | null = localStorage.getItem('role');
  constructor(private formBuilder: FormBuilder, private useruniService: UserUniService, private sectionService:SectionService, private router : Router) {
    this.form = this.formBuilder.group({
      LMSD: new FormControl(''),
      LMI: new FormControl(''),
      L1: new FormControl(''),
      L2: new FormControl(''),
      L3: new FormControl(''),

    });
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      section: [''],
      Level: ['']
    });
    const storedId = localStorage.getItem('id');
    this.id = storedId ? storedId : '';  // Retrieve id from local storage
  }



  selectedCheckboxesGroup1: any[] = [];
  selectedCheckboxesGroup2: any[] = [];


  toggleSelection(event: any, item: string, group: number) {
    // console.log('toggleSelection called with', event, item, group);
    let arrayToUse = group === 1 ? this.selectedCheckboxesGroup1 : this.selectedCheckboxesGroup2;

    if (event.detail.checked) {
      arrayToUse.push(item);
    } else {
      let index = arrayToUse.indexOf(item);
      if (index > -1) {
        arrayToUse.splice(index, 1);
      }
    }
    // console.log('Selected items in group 1:', this.selectedCheckboxesGroup1);
    // console.log('Selected items in group 2:', this.selectedCheckboxesGroup2);
  }






  update() {
    const formValue = this.form.value;

    let firstName: string | null = localStorage.getItem('firstName');
    let lastName: string | null = localStorage.getItem('lastName');
    let phoneNumber: string | null = localStorage.getItem('phoneNumber');
    let userId: string | null = localStorage.getItem('id');
    let photo: string | null = localStorage.getItem('photo');
    let role: string | null = localStorage.getItem('role');

    console.log('Role:', role);
    console.log('Section:', formValue.section);
    console.log('Level:', formValue.Level);
    // Handle multiple selections for Professors
    if (role === 'Professor') {
      this.sectionService.findIdsByNameAndDegreeLIST(this.selectedCheckboxesGroup1,this.selectedCheckboxesGroup2).subscribe(
        ids=>{
          console.log('Returned IDs:', ids);
        }, error => {
          console.error('Error occurred:', error);
          // Handle the error...
        }
      )


    }
    // Handle single selection for Students
    else if (role === 'Student') {
      this.sectionService.findIdByNameAndDegree(formValue.section, formValue.Level).subscribe(response => {
        let SectionId = response;

        const user: User = {
          id: userId ? parseInt(userId) : 0,
          firstName: firstName ? firstName : '',
          lastName: lastName ? lastName : '',
          photo: photo ? photo:'',
          firstLogin: 'false',
          phoneNumber: phoneNumber ? phoneNumber : '',
          role: role ? role : '',
          department:{
            id: 1,
          },
          sections: [{
            id: SectionId,
          }],
        };

        this.useruniService.updateStudent(user.id.toString(), user).subscribe(response => {
          console.log(response);
          // route to dashboard
          this.router.navigate(['/dashboard']);
        });
      });
    }
  }




}
