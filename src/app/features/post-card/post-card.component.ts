import {Component, Input} from '@angular/core';
import {Post} from "../../models/post";

@Component({
  selector: 'tw-post-card',
  templateUrl: './post-card.component.html',
  styles: [
  ]
})
export class PostCardComponent {
  @Input() post: Post = {
    id: '',
    cover: '',
    content: ''
  };
}
