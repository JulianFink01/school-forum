import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Book} from '../../shared/models/Book';
import {Router} from '@angular/router';
import SwiperCore, {Navigation, Pagination} from 'swiper/core';
import Swiper from 'swiper/bundle';
import {BookService} from '../../shared/services/book.service';
import {select, Store} from '@ngrx/store';
import {AccountState, selectAccount} from '../../shared/store/reducers/account.reducer';
import {Observable} from 'rxjs';
import {Account} from '../../shared/models/Account';
import {Image} from '../../shared/models/Image';
import {tap} from 'rxjs/operators';



@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss'],
})
export class BookComponent implements OnInit {

  @Input() book?: Book;

  @Output() onDelete = new EventEmitter<boolean>();
  @Output() onEdit = new EventEmitter<Book>();

  swiper: Swiper | undefined;
  editMode = false;

  account$: Observable<Account>;
  images$: Observable<Image[]> | undefined;

  slideConfig = {slidesToShow: 1, slidesToScroll: 1};

  constructor(private router: Router, private bookService: BookService,
              private accountStateStore: Store<AccountState>) {
    this.account$ = this.accountStateStore.pipe(select(selectAccount));
  }

  navigateToURL(): void {
    if (this.book) {
      this.router.navigateByUrl('account/' + this.book?.seller?.id);
    }
  }

  initSwiper(): void {
    this.swiper = new Swiper('.swiper-container', {
      slidesPerView: 1,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
  }

  ngOnInit(): void {
    if (this.book && this.book.id) {
      this.images$ = this.bookService.getImages(this.book.id);
      this.images$.pipe(tap(() => {
        this.initSwiper();
      }));
    }
  }


  delete(): void {
    if (this.book) {
      this.bookService.delete(this.book);
      this.onDelete.emit(true);
    }
  }

  edit(): void {
    if (this.book) {
      this.onEdit.emit(this.book);
    }
  }
}
