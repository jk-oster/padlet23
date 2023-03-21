import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PadletService} from "../../core/padlet.service";
import {Padlet} from "../../models/padlet";
import {PostService} from "../../core/post.service";
import {Post} from "../../models/post";

@Component({
  selector: 'tw-padlet-card-detail',
  templateUrl: './padlet-detail.component.html',
  styles: []
})
export class PadletDetailComponent implements OnInit {
  padletId: number = 0;
  padlet: Padlet = {
    id: '',
    name: '',
    cover: '',
    description: ''
  }

  posts: Post[] = [];

  constructor(
    private route: ActivatedRoute,
    private padletService: PadletService,
    private postService: PostService) {
    this.padletService = padletService;
    this.postService = postService;
  }

  ngOnInit() {
    this.padletId = Number(this.route.snapshot.paramMap.get('id'));

    // get the padlet from the padlet service
    this.padletService.getPadlet(this.padletId).subscribe((padlet: Padlet) => {
      this.padlet = padlet;
      this.posts = padlet.posts ?? [];
    });

  }

  deletePost(id: number) {
    this.postService.deletePost(id).subscribe(() => {
      this.posts = this.posts.filter((post) => post.id !== id);
    });
  }

}
