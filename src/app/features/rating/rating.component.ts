import {Component, Input, OnInit} from '@angular/core';
import {Padlet} from "../../models/padlet";
import {Required} from "../../shared/required";
import {Post} from "../../models/post";
import {AuthService} from "../../core/auth.service";
import {RatingService} from "../../core/rating.service";

@Component({
  selector: 'tw-rating',
  templateUrl: './rating.component.html',
  styles: []
})
export class RatingComponent implements OnInit {
  @Input() @Required() post: Post = {
    id: 0,
    content: '',
    cover: '',
    created_at: '',
    updated_at: '',
    user_id: 0,
    ratings: [],
  };

  ratingScale = [1, 2, 3, 4, 5];

  constructor(protected auth: AuthService, protected ratingService: RatingService) {
  }

  ngOnInit(): void {
    if(!this.post.ratings) {
      this.post.ratings = [];
    }
  }

  get computedRating() {
    if (this.post.ratings?.length) {
      const ratingSum = this.post.ratings.reduce((acc, rating) => acc + rating.rating, 0);
      return ratingSum / this.post.ratings.length;
    }
    return 0;
  }

  protected isChecked(index: number) {
    if(index === this.roundedComputedRating) {
      return true;
    }
    return false;
  }

  get roundedComputedRating() {
    return Math.round(this.computedRating);
  }

  get computedRatingPercentage() {
    return Math.floor(this.computedRating * 20);
  }

  get ratingCount() {
    return this.post.ratings?.length ?? 0;
  }

  deleteRating() {
    this.ratingService.deleteRating(this.post.id).subscribe((response: any) => {
      console.log(response);
      this.post.ratings = this.post.ratings?.filter(r => r.user_id !== this.auth.user?.id) ?? [];
    });
  }

  rate(value: number) {
    const rating = this.post.ratings?.find(r => r.user_id === this.auth.user?.id);
    console.log(rating);
    if (rating) {
      this.ratingService.updateRating(this.post.id, value).subscribe((response: any) => {
        console.log(response);
        rating.rating = value;
      });
    } else {
      this.ratingService.createRating(this.post.id, value).subscribe((response: any) => {
        console.log(response);
        this.post.ratings?.push(response);
      });
    }
  }

}
