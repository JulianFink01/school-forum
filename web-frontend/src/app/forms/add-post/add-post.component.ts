import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Observable} from 'rxjs';
import {PostDTO} from '../../shared/models/DTO/PostDTO';
import {select, Store} from '@ngrx/store';
import {AccountState, selectAccount} from '../../shared/store/reducers/account.reducer';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {PostService} from '../../shared/services/post.service';
import {Firestore} from '../../shared/utils/firestore';
import {Account} from '../../shared/models/Account';
import {Topic} from '../../shared/models/Topic';
import {Image} from '../../shared/models/Image';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss']
})
export class AddPostComponent implements OnInit {
  account$: Observable<Account>;
  postData: FormGroup;
  drawerElement: any;
  dashboardElement: any;
  showAddTags = false;
  postImages: Image[] = [];
  selectedTopics: Topic[] = [];
  searchValue = '';
  searchIndex = 0;
  loading = false;
  selectedPostImages: any[] = [];
  errors: string[] = [];

  @Output('refresh') refresh = new EventEmitter<string>();

  constructor(private router: Router,
              private accountStateStore: Store<AccountState>,
              private postService: PostService,
              private storageService: Firestore) {
    this.account$ = this.accountStateStore.pipe(select(selectAccount));
    this.postData = new FormGroup(
      {
        title: new FormControl('', [Validators.required]),
        message: new FormControl('', [Validators.required])
      }
    );
  }

  ngOnInit(): void {
  }


  onFileChange(event: any): any {
    this.selectedPostImages = [];
    for (const image of event.target.files) {
      if (this.storageService.validateImage(image)) {
        this.selectedPostImages = event.target.files;
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
      this.postImages.push(imageDTO);
    }
  }

  addTopic(value: string): void {
    const topic = {
      id: null,
      name: value
    };
    this.selectedTopics.push(topic);
  }

  removeTopic(index: number): void {
    this.selectedTopics.splice(index, 1);
  }

  loadImage(path: string): Observable<any> {
    return this.storageService.getImage(path);
  }

  async postQuestion(): Promise<any> {
    this.loading = true;
    for (const image of this.selectedPostImages) {
      await this.getImage(image);
    }
    if (this.postData.value.title !== '' && this.postData.value.message !== '') {
      this.account$.subscribe(accountData => {
        // @ts-ignore
        const post: PostDTO = {
          title: this.postData.value.title,
          message: this.postData.value.message,
          provider: {id: accountData.id},
          isComment: false,
          images: [],
          topics: this.selectedTopics
        };
        this.postService.post(post).subscribe((postData) => {
          this.loading = false;
          this.postData.reset();
          this.refresh?.emit();
          for (const image of this.postImages) {
            if (postData.id){
              this.postService.addImages(postData.id, image).subscribe();
            }
          }
        }, () => {
          this.loading = false;
        });
      });
    }
  }

}
