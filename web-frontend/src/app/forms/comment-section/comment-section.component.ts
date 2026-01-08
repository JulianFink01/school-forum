import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {Observable} from 'rxjs';
import {Post} from '../../shared/models/Post';
import {PostService} from '../../shared/services/post.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {select, Store} from '@ngrx/store';
import {AccountState, selectAccount} from '../../shared/store/reducers/account.reducer';
import {Account} from '../../shared/models/Account';

@Component({
  selector: 'app-comment-section',
  templateUrl: './comment-section.component.html',
  styleUrls: ['./comment-section.component.scss']
})
export class CommentSectionComponent implements OnInit {

  constructor(private postService: PostService, private snackBar: MatSnackBar, private accountStateStore: Store<AccountState>) {
    this.comments$ = null;
    this.account$ = this.accountStateStore.pipe(select(selectAccount));

  }

  @Input('post') post?: Post;
  @ViewChild('comment') comment?: ElementRef;

  commentData?: Post;
  comments$: Observable<Post[]> | null;
  showComments = false;
  account$: Observable<Account>;


  ngOnInit(): void {
    this.account$.subscribe((data) => {
      this.commentData = {
        message: '',
        id: null,
        provider: data,
        isComment: true,
        // topics: this.post?.topics ? this.post.topics : null,
        topics: [],
        images: [],
        title: this.post?.title ? this.post.title + ' response' : 'Response',
        comments: null,
        ratings: null,
        timestamp: null
      };
    });
  }

  public toggleModal(): void {
    this.showComments = !this.showComments;
    try {
      this.loadComments();
    } catch (e) {
      this.snackBar.open('Error fetching Comments', 'Close', {
        duration: 2000,
        panelClass: ['error-snackbar']
      });
    }
  }

  loadComments(): void {
    if (this.post) {
      this.comments$ = this.postService.getComments(this.post);
    }
  }

  submitComment(comment: string): void {
    if (this.commentData) {
      this.commentData.message = comment;
      if (this.commentData.message && this.commentData.message !== '') {
        if (this.post?.id) {
          this.postService.submitComment(this.post.id, this.commentData).subscribe((data) => {
            this.loadComments();
            if (this.comment) {
              this.comment.nativeElement.value = '';
            }
          });
        }
      }
    }
  }
}
