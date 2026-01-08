import {AfterContentInit, Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {selectGeneral, GeneralState} from '../shared/store/reducers/general.reducer';
import {General} from '../shared/store/models/general';
import {AccountState, selectAccount} from '../shared/store/reducers/account.reducer';
import {Post} from '../shared/models/Post';
import {PostService} from '../shared/services/post.service';
import {tap} from 'rxjs/operators';
import {setRoute} from '../shared/utils/functions';
import {Firestore} from '../shared/utils/firestore';
import {Account} from '../shared/models/Account';


@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.scss']
})

export class ForumComponent implements OnInit, AfterContentInit {
  general$: Observable<General>;
  account$: Observable<Account>;
  posts$: Observable<Post[]>;
  drawerElement: any;
  dashboardElement: any;
  searchValue = '';
  searchIndex = 0;

  constructor(private router: Router,
              private generalStateStore: Store<GeneralState>,
              private accountStateStore: Store<AccountState>, private postService: PostService) {
    this.account$ = this.accountStateStore.pipe(select(selectAccount));
    this.general$ = this.generalStateStore.pipe(select(selectGeneral), tap((general) => {
        this.searchForValue(general.searchValue);
      }
    ));
    this.posts$ = this.postService.get();
  }

  ngOnInit(): void {
    this.setRoute();
  }

  setRoute(): void {
    setRoute(this.generalStateStore, 'Forum', 'accessibility', ['Forum', 'Overview']);
  }

  searchForValue(filter: string): void {
    this.posts$ = this.postService.getPostsByFilter(filter);
  }

  ngAfterContentInit(): void {
    this.drawerElement = document.getElementsByClassName('mat-drawer-content')[0];
    this.dashboardElement = document.getElementById('dashboard');
  }

  refresh(): void{
    this.posts$ = this.postService.get();
  }

}
