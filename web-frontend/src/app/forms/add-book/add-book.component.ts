import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Observable} from 'rxjs';
import {BookDTO} from '../../shared/models/DTO/BookDTO';
import {select, Store} from '@ngrx/store';
import {AccountState, selectAccount} from '../../shared/store/reducers/account.reducer';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {BookService} from '../../shared/services/book.service';
import {Firestore} from '../../shared/utils/firestore';
import {Account} from '../../shared/models/Account';
import {Topic} from '../../shared/models/Topic';
import {Image} from '../../shared/models/Image';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss']
})
export class AddBookComponent implements OnInit {
  account$: Observable<Account>;
  bookData: FormGroup;
  drawerElement: any;
  dashboardElement: any;
  showAddTags = false;
  bookImages: Image[] = [];
  selectedTopics: Topic[] = [];
  searchValue = '';
  searchIndex = 0;
  loading = false;
  selectedBookImages: any[] = [];
  errors: string[] = [];

  @Output() refresh = new EventEmitter<string>();

  constructor(private router: Router,
              private accountStateStore: Store<AccountState>,
              private bookService: BookService,
              private storageService: Firestore) {
    this.account$ = this.accountStateStore.pipe(select(selectAccount));
    this.bookData = new FormGroup(
      {
        name: new FormControl('', [Validators.required]),
        isbn: new FormControl('', [Validators.required]),
        author: new FormControl('', [Validators.required]),
        price: new FormControl('', [Validators.required]),
        seller: new FormControl('', [Validators.required]),
        description: new FormControl('', [Validators.required]),
        status: new FormControl('', [Validators.required])
      }
    );
  }

  ngOnInit(): void {
  }


   onFileChange(event: any): any {
    for (const image of event.target.files) {
      if (this.storageService.validateImage(image)) {
        this.selectedBookImages = event.target.files;
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
      this.bookImages.push(imageDTO);
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

  async postBook(): Promise<any> {
    this.loading = true;
    for (const image of this.selectedBookImages) {
      await this.getImage(image);
    }
    if (this.bookData.value.name !== '' && this.bookData.value.message !== '') {
      this.account$.subscribe(accountData => {
        // @ts-ignore
        const book: BookDTO = {
          name: this.bookData.value.name,
          description: this.bookData.value.description,
          images: [],
          topics: this.selectedTopics,
          seller: {id: accountData.id},
          author: this.bookData.value.author,
          isbn: this.bookData.value.isbn,
          price: this.bookData.value.price,
          isSold: false,
          status: this.bookData.value.status
        };
        this.bookService.post(book).subscribe((bookData) => {
          this.loading = false;
          this.bookData.reset();
          this.refresh?.emit();
          this.selectedTopics = [];
          this.selectedBookImages = [];
          for (const image of this.bookImages) {
            if (bookData.id){
              this.bookService.addImages(bookData.id, image).subscribe();
            }
          }
          }, () => {
          this.loading = false;
        });
      });
    }
  }

}
