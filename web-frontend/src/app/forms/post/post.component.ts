import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Post} from '../../shared/models/Post';
import {Router} from '@angular/router';
import SwiperCore, {Navigation, Pagination} from 'swiper/core';
import Swiper from 'swiper/bundle';
import {PostService} from '../../shared/services/post.service';
import {select, Store} from '@ngrx/store';
import {AccountState, selectAccount} from '../../shared/store/reducers/account.reducer';
import {Observable} from 'rxjs';
import {Account} from '../../shared/models/Account';
import {Image} from "../../shared/models/Image";

SwiperCore.use([Navigation, Pagination]);

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  @Input() post?: Post;

  @Output() onDelete = new EventEmitter<boolean>();
  @Output() onEdit = new EventEmitter<Post>();

  swiper: Swiper | undefined;
  editMode = false;
  account$: Observable<Account>;
  images$: Observable<Image[]> | undefined;

  constructor(private router: Router, private postService: PostService,
              private accountStateStore: Store<AccountState>) {
    this.account$ = this.accountStateStore.pipe(select(selectAccount));
  }


  navigateToURL(): void {
    if (this.post) {
      this.router.navigateByUrl('account/' + this.post?.provider?.id);
    }
  }

  ngOnInit(): void {
    if (this.post && this.post.id) {
      this.images$ = this.postService.getImages(this.post.id);
    }
  }


  delete(): void {
    if (this.post) {
      this.postService.delete(this.post);
      this.onDelete.emit(true);
    }
  }

  edit(): void {
    if (this.post) {
      this.onEdit.emit(this.post);
    }
  }
}
