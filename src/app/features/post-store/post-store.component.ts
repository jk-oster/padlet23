import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {Location} from "@angular/common";
import {AuthService} from "../../core/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {PostService} from "../../core/post.service";

@Component({
  selector: 'tw-post-store',
  templateUrl: './post-store.component.html',
  styles: [
  ]
})
export class PostStoreComponent implements OnInit {
  storeForm: FormGroup = new FormGroup({});
  padletId: number = 0;

  constructor(
    private location: Location,
    protected auth: AuthService,
    private router: Router,
    private postService: PostService,
    private route: ActivatedRoute
  ) {
    this.auth = auth;
  }

  ngOnInit(): void {
    this.padletId = Number(this.route.snapshot.paramMap.get('id'));
    this.storeForm = new FormGroup({
      content: new FormControl(),
      cover: new FormControl(),
    });
  }

  store() {
    this.postService.createPost(this.padletId, this.storeForm.value).subscribe((response: any) => {
      console.log(response);
      this.location.back();
    });
  }

  back() {
    this.location.back();
  }
}
