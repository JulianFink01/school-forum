import {AfterContentInit, Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {selectGeneral, GeneralState} from '../shared/store/reducers/general.reducer';
import {General} from '../shared/store/models/general';
import {AccountState, selectAccount} from '../shared/store/reducers/account.reducer';
import {Book} from '../shared/models/Book';
import {BookService} from '../shared/services/book.service';
import {tap} from 'rxjs/operators';
import {setRoute} from '../shared/utils/functions';
import {Account} from '../shared/models/Account';
import {EditBookComponent} from '../forms/edit-book/edit-book.component';


@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})

export class BooksComponent implements OnInit, AfterContentInit {

  @ViewChild('editBookComponent') editBookComponent?: EditBookComponent;

  general$: Observable<General>;
  account$: Observable<Account>;
  books$: Observable<Book[]>;
  drawerElement: any;
  dashboardElement: any;
  searchValue = '';
  searchIndex = 0;

  constructor(private router: Router,
              private generalStateStore: Store<GeneralState>,
              private accountStateStore: Store<AccountState>, private bookService: BookService,
  ) {
    this.account$ = this.accountStateStore.pipe(select(selectAccount));
    this.general$ = this.generalStateStore.pipe(select(selectGeneral), tap((general) => {
        this.searchForValue(general.searchValue);
      }
    ));
    this.books$ = this.bookService.get();
  }

  ngOnInit(): void {
    this.setRoute();
  }


  setRoute(): void {
    setRoute(this.generalStateStore, 'Books', 'book', ['Books', 'Overview']);
  }

  refresh(): void {
    setTimeout(() => {
      this.books$ = this.bookService.get();
    }, 2);
  }

  searchForValue(filter: string): void {
    this.books$ = this.bookService.getBooksByFilter(filter);
  }

  ngAfterContentInit(): void {
    this.drawerElement = document.getElementsByClassName('mat-drawer-content')[0];
    this.dashboardElement = document.getElementById('dashboard');
    this.drawerElement?.addEventListener('scroll', this.onScroll.bind(this));
  }

  onScroll(event: Event): void {
    if (this.drawerElement.scrollTop >= 290 && !this.dashboardElement?.classList.contains('fixed-dashboard')) {
      this.dashboardElement?.classList.add('fixed-dashboard');
      document.getElementById('content-right')?.classList.add('scroll');
    } else if (this.drawerElement.scrollTop < 300 && this.dashboardElement?.classList.contains('fixed-dashboard')) {
      this.dashboardElement?.classList.remove('fixed-dashboard');
      document.getElementById('content-right')?.classList.remove('scroll');
    }
  }

  editBook(book: Book): void {
    this.editBookComponent?.toggleModal(book);
  }


}
