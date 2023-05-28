import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';
import { PostService } from '../../services/post.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { formatDistanceToNow } from 'date-fns';
import { enUS } from 'date-fns/locale';
import { ToastController } from '@ionic/angular';

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

  constructor(
    private toastController: ToastController,
    private postService: PostService,
    private router: Router,
    private actionSheetController: ActionSheetController,
    private formBuilder: FormBuilder
  ) {
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

  previewImages: string[] = [];

  ngOnInit(): void {
    this.postService.findAllPosts().subscribe((data: any[]) => {
      this.posts = this.processPosts(data).reverse();
    });
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
            id:localStorage.getItem('idLogin'),
            role:role
            // how do i test bech naaref eli it got sent b shih ?
            
        }

        });
      }else if(role=='Professor'){
        this.updateForm = this.formBuilder.group({
          description: [this.descUpdate],
          timestamp: timestamp,
          type: 'Update',
          hidden: false,
          professor:{
            id:localStorage.getItem('idLogin'),
            role:role

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


  async presentActionSheet(postId: number) {
    const actionSheet = await this.actionSheetController.create({
      buttons: [
        {
          text: 'Delete',
          icon: 'trash',
          handler: () => {
            this.postService.hidePost(postId).subscribe((response) => {
              console.log(response); // Handle response here
              // Find the post and set its 'hidden' property to true
              const post = this.posts.find(p => p.id === postId);
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
