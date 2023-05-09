import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Required} from "../../shared/required";
import {Post, PostFactory} from "../../models/post";
import {AuthService} from "../../core/auth.service";
import {RatingService} from "../../core/rating.service";

@Component({
  selector: 'tw-rating',
  templateUrl: './rating.component.html',
  styles: []
})
export class RatingComponent {
  @Input() @Required() post: Post = PostFactory.empty();
  @Output() rated = new EventEmitter<Post>();

  constructor(protected auth: AuthService, protected ratingService: RatingService) {
  }

  get liked() {
    return this.post.rating?.user_rating === 1;
  }

  get disliked() {
    return this.post.rating?.user_rating === -1;
  }

  // deleteRating() {
  //   this.ratingService.deleteRating(this.post.id).subscribe((response: any) => {
  //     console.log(response);
  //     this.post = response;
  //   });
  // }

  rate(value: number) {
    const rating = this.post.rating?.user_rating != 0;
    const ratingId = this.post.rating?.user_rating_id ?? 0;
    console.log('ratings', rating, ratingId);
    if (rating || ratingId) {
      console.log('update');
      this.ratingService.updateRating(ratingId, value).subscribe((response: any) => {
        console.log(response);
        this.post = response;
        this.rated.emit(this.post);
      });
    } else {
      console.log('create');
      this.ratingService.createRating(this.post.id, value).subscribe((response: any) => {
        console.log(response);
        this.post = response;
        this.rated.emit(this.post);
      });
    }
  }
}
