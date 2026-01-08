import {
  Component,
  Input,
  OnInit,
} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Firestore} from '../../shared/utils/firestore';
import {BookService} from '../../shared/services/book.service';
import {Book} from '../../shared/models/Book';
import {Image} from '../../shared/models/Image';
import {BookUpdateDTO} from '../../shared/models/UpdateDTO/BookUpdateDTO';
import {ImageDTO} from '../../shared/models/DTO/ImageDTO';
import {Observable} from "rxjs";

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.scss']
})
export class EditBookComponent implements OnInit {

  showModal = false;
  bookData: FormGroup;
  errors: string[] = [];
  showAddTags = false;
  book: Book | undefined;
  selectedImages: ImageDTO[] = [];
  selectedImageFiles: any[] = [];
  loading = false;
  images$: Observable<Image[]> | null = null;

  constructor(private bookService: BookService, private storageService: Firestore) {
    this.bookData = new FormGroup(
      {
        name: new FormControl('', Validators.required),
        isbn: new FormControl('', Validators.required),
        author: new FormControl('', Validators.required),
        price: new FormControl('', Validators.required),
        description: new FormControl('', Validators.required),
        status: new FormControl('', Validators.required)
      }
    );
  }

  toggleModal(book: Book | null = null): void {
    if (book) {
      this.book = book;
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
      this.book?.topics.push(topic);
    }
  }

  ngOnInit(): void {
    this.setInitialValues();
  }

  setInitialValues(): void {
    if (this.book) {
      this.bookData.patchValue({title: this.book?.name ? (this.book?.name) : null});
      this.bookData.patchValue({name: this.book?.name ? (this.book?.name) : null});
      this.bookData.patchValue({isbn: this.book?.isbn ? (this.book?.isbn) : null});
      this.bookData.patchValue({author: this.book?.author ? (this.book?.author) : null});
      this.bookData.patchValue({description: this.book?.description ? (this.book?.description) : null});
      this.bookData.patchValue({status: this.book?.status ? (this.book?.status) : null});
      if (this.book.id) {
        this.images$ = this.bookService.getImages(this.book.id);
        this.images$.subscribe((data) => {
          // @ts-ignore
          this.book = {...this.book, images: data};
          this.book?.images.forEach((item) => {
            item.id = null;
          });
          console.log(this.book);
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
      this.book?.images.push(imageDTO);
    }
  }

  removeTopic(index: number): void {
    this.book?.topics.splice(index, 1);
  }

  removeImage(index: number): void {
    this.selectedImages.splice(index, 1);
  }

  removeSubmittedImage(index: number): void {
    this.book?.images.splice(index, 1);
  }

  reset(): void {
    this.loading = false;
    this.selectedImageFiles = [];
    this.selectedImages = [];
    this.errors = [];
  }

  async saveBook(): Promise<any> {
    if (this.book && this.book.id) {
      this.loading = true;
      for (const image of this.selectedImageFiles) {
        await this.getImage(image);
      }
      const book: BookUpdateDTO = {
        id: this.book.id,
        name: this.bookData.value.name,
        description: this.bookData.value.description,
        images: [],
        topics: this.book.topics,
        author: this.bookData.value.author,
        isbn: this.bookData.value.isbn,
        price: this.bookData.value.price,
        seller: this.book.seller,
        sold: this.book.sold,
        status: this.bookData.value.status
      };
      book.images.map(image => {
        // @ts-ignore
        delete image.id;
      });
      book.topics.map(topic => {
        // @ts-ignore
        delete topic.id;
      });

      this.bookService.put(book).subscribe((bookData) => {
        if (this.book?.images && bookData.id) {
          for (const image of this.book?.images) {
            this.bookService.addImages(bookData.id, image).subscribe();
          }
        }
        this.reset();
      }, () => {
        this.reset();
      });
    }
  }
}
