import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Required} from "../../shared/required";
import {Post, PostFactory} from "../../models/post";
import {Comment} from "../../models/comment";
import {CommentService} from "../../core/comment.service";
import {PostService} from "../../core/post.service";
import {AuthService} from "../../core/auth.service";
import {Utils} from "../../shared/utils";
import {timeout} from "rxjs";

@Component({
  selector: 'tw-post-show',
  templateUrl: './post-show.component.html',
  styles: []
})
export class PostShowComponent {
  @Input() @Required() post: Post = PostFactory.empty();

  @Output() postDeleteEvent = new EventEmitter<number>();
  @Output() postEditEvent = new EventEmitter<Post>();

  commentInput: string = '';

  constructor(protected commentService: CommentService, protected postService: PostService, protected auth: AuthService) {}

  ngOnInit(): void {
    this.commentService.getComments(this.post.id).subscribe((response: any) => {
      this.post.comments = response ?? [];
    });
  }

  public updatePost(post: Post) {
    this.debouncedUpdatePost(post);
  }

  deletePost(id: number) {
    this.postService.deletePost(id).subscribe(() => {
      this.postDeleteEvent.emit(id);
    });
  }

  debouncedUpdatePost = Utils.debounce((post: Post) => {
    this.postService.updatePost(post.id, {
      title: post.title,
      content: post.content,
      cover: post.cover
    }).subscribe((post: Post) => {
      console.log(post);
      this.post = post;
      this.postEditEvent.emit(post);
    });
  });

  isUserComment(comment: Comment) {
    return comment.user_id === this.auth.user?.id;
  }

  public containsUrl(text: string) {
    return Utils.containsUrl(text);
  }

  public getUrl(text: string) {
    try {
      console.log(Utils.getUrl(text));
      return Utils.getUrl(text);
    }
    catch (e) {
      return '';
    }
  }

  formatTime(time: string) {
    return new Date(time).toLocaleString();
  }

  addComment() {
    this.commentService.createComment(this.post.id, this.commentInput).subscribe((response: any) => {
      this.post.comments.push(response);
      this.commentInput = '';
    });
  }

  editedPost(post: Post) {
    this.post = post;
    this.postEditEvent.emit(post);
  }

}
