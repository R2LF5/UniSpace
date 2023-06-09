import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';
import { PostService } from '../../services/post.service';
import { UserUniService } from '../../services/user-uni.service';
import { EventService } from '../../services/event.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { formatDistanceToNow } from 'date-fns';
import { enUS } from 'date-fns/locale';
import { ToastController } from '@ionic/angular';
import { User } from '../../models/user.model';


@Component({
  selector: 'app-uni-news',
  templateUrl: './uni-news.page.html',
  styleUrls: ['./uni-news.page.scss'],
})
export class UniNewsPage implements OnInit {
  posts: any[] = [];
  updateForm: FormGroup;
  eventForm: FormGroup;
  assignmentForm: FormGroup;
  userRole: string = '';

  constructor(
    private toastController: ToastController,
    private postService: PostService,
    private router: Router,
    private actionSheetController: ActionSheetController,
    private formBuilder: FormBuilder,
    private userUniService: UserUniService,
    private eventService: EventService,


  ) {
    this.userRole = localStorage.getItem('role') || '';
    this.updateForm = this.formBuilder.group({
      description:[''],
      timestamp: [''],
      type: ['Update'],
      hidden: ['false']
    });
    this.eventForm = this.formBuilder.group({
      description: [''],
      datetime: [''],
      department: [''],
    });

    this.assignmentForm = this.formBuilder.group({
      description: [''],
      datetime: [''],
      section: [''],
      course: [''],
    });
  }
  today!: string ;
  previewImages: string[] = [];
  currentUser!: User;
  id:string='';
  ngOnInit(): void {
    this.id= localStorage.getItem('id') || '';
    this.today = new Date().toISOString().split('T')[0];
    const userId = localStorage.getItem('id');
    if (userId) {
      this.userUniService.findUserById(+userId).subscribe(user => {
        this.currentUser = user;
      });
    }

    this.postService.findAllPosts().subscribe((data: any[]) => {
      this.posts = this.processPosts(data).reverse();
      console.log(this.posts);
    });
  }

  isMatchingId(id1: any, id2: any): boolean {
    return Number(id1) === Number(id2);
  }

  loadMorePosts(event: Event) {
    this.postService.findAllPosts().subscribe((data: any[]) => {
      // Reverse the order of the new posts and add them to the beginning of the existing posts
      this.posts = [...this.processPosts(data).reverse(), ...this.posts];

      (event.target as HTMLIonInfiniteScrollElement).complete();

      // Disable infinite loading when maximum is reached
      if (this.posts.length === 100) {
        (event.target as HTMLIonInfiniteScrollElement).disabled = true;
      }
    });
  }



  name:string='';
  description:string='';
  location:string='';
  Date:string='';
  departments:any;
  guest:string='';


  AddEvent(): void {

    const departmentControl = this.eventForm.get('department');
    const descriptionControl = this.eventForm.get('description');

    if (departmentControl && descriptionControl) {
      const departments = departmentControl.value;
      const description = descriptionControl.value;
      const datetimeControl = this.eventForm.get('datetime');

      const id = localStorage.getItem('id');
      if (datetimeControl) {
        const event = {
          name: this.name,
          description: `${description} Departments: ${departments.join(', ')}`,
          location: this.location,
          guestNumber: this.guest,
          startDate: this.Date,
          clubPresident: {
            id: id,
            role: 'ClubPresident'
          }
        };

        this.eventService.createEvent(event).subscribe(response => {
          console.log(response);
        });
      } else {
        console.error('Datetime control not found');
      }
    } else {
      console.error('Department or description control not found');
    }

  }









  descUpdate: string = '';

  submitUpdate() {
    let role= localStorage.getItem('role');


    this.postService.getCurrentTime().subscribe(timeData => {
      const timestamp = timeData.datetime;

      if (role=='Admin'){
        this.updateForm = this.formBuilder.group({
          description: [this.descUpdate],
          timestamp: timestamp,
          type: 'Update',
          hidden: false,
          admin:{
            id:localStorage.getItem('id'),
            role:role


        }

        });
      }else if(role=='Professor'){
        this.updateForm = this.formBuilder.group({
          description: [this.descUpdate],
          timestamp: timestamp,
          type: 'Update',
          hidden: false,
          professor:{
            id:localStorage.getItem('id'),
            role:role,
            firstName: localStorage.getItem('firstName'),
            lastName: localStorage.getItem('lastName')
        }

        });
      }

      this.postService.addPost(this.updateForm.value).subscribe(res => {
        // Create a new array with the new post and the existing posts
        this.posts = [res, ...this.posts];
        this.descUpdate='';
      }, error => {
        this.presentErrorAddToast(); // Display error toast if adding the post fails
      });
    });
  }




  private processPosts(data: any[]): any[] {
    return data.map((post) => ({
      ...post,
      formattedTimestamp: this.getFormattedTimestamp(post.timestamp),
    }));
  }

  private getFormattedTimestamp(timestamp: string): string {
    return formatDistanceToNow(new Date(timestamp), { locale: enUS });
  }

  goToHomePage() {
    this.router.navigateByUrl('/home');
  }

  goToLoginPage() {
    this.router.navigateByUrl('/login');
  }
  // toast messages
  async presentSuccessToast() {
    const toast = await this.toastController.create({
      message: 'Deleted Successfully',
      duration: 2000,
      color: 'success'
    });
    toast.present();
  }

  async presentErrorDelToast() {
    const toast = await this.toastController.create({
      message: 'Error deleting post',
      duration: 2000,
      color: 'danger'
    });
    toast.present();
  }
  async presentErrorAddToast() {
    const toast = await this.toastController.create({
      message: 'Error Adding post',
      duration: 2000,
      color: 'danger'
    });
    toast.present();
  }


  async presentActionSheet(id: number) {
    console.log(id);
    const actionSheet = await this.actionSheetController.create({
      buttons: [
        {
          text: 'Delete',
          icon: 'trash',
          handler: () => {
            this.postService.hidePost(id).subscribe((response) => {
              console.log(response); // Handle response here
              // Find the post and set its 'hidden' property to true
              const post = this.posts.find(p => p.id === id);
              if (post) {
                post.hidden = true;
              }
              this.presentSuccessToast();
            }, (error) => {
              console.log(error); // Handle error here
              this.presentErrorDelToast();
            });
          },
        },
        // add edit in the back lol
        // {
        //   text: 'Edit',
        //   icon: 'create',
        //   handler: () => {

        //   },
        // },
        {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel',
        },
      ],
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
// drag and drop files
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
          if (file) {
            this.handleFile(file);
          }
        }
      }
    } else if (event.dataTransfer?.files) {
      // Use DataTransfer interface to access the file(s)
      for (let i = 0; i < event.dataTransfer.files.length; i++) {
        this.handleFile(event.dataTransfer.files[i]);
      }
    }
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
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
