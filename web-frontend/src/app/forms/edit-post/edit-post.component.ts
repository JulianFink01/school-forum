import {
  Component,
  Input,
  OnInit,
} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Firestore} from '../../shared/utils/firestore';
import {PostService} from '../../shared/services/post.service';
import {Post} from '../../shared/models/Post';
import {Image} from '../../shared/models/Image';
import {PostUpdateDTO} from '../../shared/models/UpdateDTO/PostUpdateDTO';
import {ImageDTO} from '../../shared/models/DTO/ImageDTO';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.scss']
})
export class EditPostComponent implements OnInit {

  showModal = false;
  postData: FormGroup;
  errors: string[] = [];
  showAddTags = false;
  post: Post | undefined;
  selectedImages: ImageDTO[] = [];
  selectedImageFiles: any[] = [];
  loading = false;
  images$: Observable<Image[]> | null = null;

  constructor(private postService: PostService, private storageService: Firestore) {
    this.postData = new FormGroup(
      {
        title: new FormControl('', Validators.required),
        message: new FormControl('', Validators.required)
      }
    );
  }

  toggleModal(post: Post | null = null): void {
    if (post) {
      this.post = post;
      this.setInitialValues();
    }
    this.showModal = !this.showModal;
  }

  addTopic(value: string): void {
    const values = value.split(',');
    for (let val of values) {
      val = val.replace(' ', '');
      const topic = {
        id: null,
        name: val
      };
      this.post?.topics.push(topic);
    }
  }

  ngOnInit(): void {
    this.setInitialValues();
  }

  setInitialValues(): void {
    if (this.post) {
      this.postData.patchValue({title: this.post?.title ? (this.post?.title) : null});
      this.postData.patchValue({message: this.post?.message ? (this.post?.message) : null});
      if (this.post.id) {
        this.images$ = this.postService.getImages(this.post.id);
        this.images$.subscribe((data) => {
          // @ts-ignore
          this.post = {...this.post, images: data};
          this.post?.images.forEach((item) => {
            item.id = null;
          });
        });
      }
    }
  }

  onFileChange(event: any): any {
    this.selectedImageFiles = event.target.files;
    for (const image of event.target.files) {
      if (this.storageService.validateImage(image)) {
        const reader = new FileReader();
        reader.readAsDataURL(image);
        reader.onload = () => {
          if (typeof reader.result === 'string') {
            this.selectedImages.push({path: reader.result, description: ''});
          }
        };
        this.errors = [];
      } else {
        this.errors = [];
        this.errors.push('Your Image Size is to big. Try to upload another Image witch is smaller than 5MB');
      }
    }
  }

  async getImage(image: any): Promise<any> {
    const url = await this.storageService.getBase64Image(image);
    if (url) {
      const imageDTO: Image = {
        path: url.currentTarget.result,
        description: '',
        id: null
      };
      this.post?.images.push(imageDTO);
    }
  }

  removeTopic(index: number): void {
    this.post?.topics.splice(index, 1);
  }

  removeImage(index: number): void {
    this.selectedImages.splice(index, 1);
  }

  removeSubmittedImage(index: number): void {
    this.post?.images.splice(index, 1);
  }

  reset(): void {
    this.loading = false;
    this.selectedImageFiles = [];
    this.selectedImages = [];
    this.errors = [];
  }

  async savePost(): Promise<any> {
    if (this.post && this.post.id) {
      this.loading = true;
      for (const image of this.selectedImageFiles) {
        await this.getImage(image);
      }
      const post: PostUpdateDTO = {
        id: this.post.id,
        title: this.postData.value.title,
        message: this.postData.value.message,
        images: [],
        topics: this.post.topics
      };
      post.images.map(image => {
        // @ts-ignore
        delete image.id;
      });
      post.topics.map(topic => {
        // @ts-ignore
        delete topic.id;
      });

      this.postService.put(post).subscribe((postData) => {
          if (this.post?.images && postData.id) {
            for (const image of this.post?.images) {
              this.postService.addImages(postData.id, image).subscribe();
            }
          }
          this.reset();
        }, () => {
          this.reset();
        }
      );
    }
  }
}
