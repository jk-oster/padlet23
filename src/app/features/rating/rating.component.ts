import {Component, Input} from '@angular/core';
import {Required} from "../../shared/required";
import {Post} from "../../models/post";
import {AuthService} from "../../core/auth.service";
import {RatingService} from "../../core/rating.service";

@Component({
  selector: 'tw-rating',
  templateUrl: './rating.component.html',
  styles: []
})
export class RatingComponent {
  @Input() @Required() post: Post = {
    id: 0,
    content: '',
    cover: '',
    created_at: '',
    updated_at: '',
    user_id: 0,
    rating: 0,
    rating_count: 0,
    user_rating: 0,
    comments_count: 0,
    comments: [],
  };

  constructor(protected auth: AuthService, protected ratingService: RatingService) {
  }

  get liked() {
    return this.post.user_rating === 1;
  }

  get disliked() {
    return this.post.user_rating === -1;
  }

  deleteRating() {
    this.ratingService.deleteRating(this.post.id).subscribe((response: any) => {
      console.log(response);
      this.post = response;
    });
  }

  rate(value: number) {
    const rating = this.post.user_rating !== 0;
    console.log(rating);
    if (rating) {
      this.ratingService.updateRating(this.post.id, value).subscribe((response: any) => {
        console.log(response);
        this.post = response;
      });
    } else {
      this.ratingService.createRating(this.post.id, value).subscribe((response: any) => {
        console.log(response);
        this.post = response;
      });
    }
  }

}
