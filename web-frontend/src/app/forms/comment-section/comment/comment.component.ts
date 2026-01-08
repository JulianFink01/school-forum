import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {Post} from "../../../shared/models/Post";
import {Observable} from "rxjs";
import {select, Store} from "@ngrx/store";
import {AccountState, selectAccount} from "../../../shared/store/reducers/account.reducer";
import {Account} from "../../../shared/models/Account";
import {PostService} from "../../../shared/services/post.service";

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {

  @Input('comment') comment?: Post;
  @Input('parent') parent?: Post;

  @Output('refresh') refresh = new EventEmitter<boolean>();

  account$: Observable<Account>;

  constructor(private accountStateStore: Store<AccountState>, private postService: PostService) {
    this.account$ = this.accountStateStore.pipe(select(selectAccount));
  }

  ngOnInit(): void {
  }

  delete(): void {
    if (this.parent && this.comment) {
      this.postService.deleteComment(this.parent, this.comment);
      this.refresh.emit(true);
    }
  }
}
