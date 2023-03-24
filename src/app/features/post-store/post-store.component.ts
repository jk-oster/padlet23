import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {AuthService} from "../../core/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {PostService} from "../../core/post.service";
import {Padlet} from "../../models/padlet";
import {ImageService} from "../../core/image.service";

@Component({
  selector: 'tw-post-store',
  templateUrl: './post-store.component.html',
  styles: [
  ]
})
export class PostStoreComponent implements OnInit {
  storeForm: FormGroup = new FormGroup({});

  @Input() padlet: Padlet = {
    id: 0,
    name: '',
    cover: '',
    description: '',
    public: true,
    created_at: '',
    updated_at: '',
    user_id: 0,
  }

  padletId: number = 0;

  constructor(
    protected auth: AuthService,
    private router: Router,
    private postService: PostService,
    private route: ActivatedRoute,
    private imageService: ImageService
  ) {
    this.auth = auth;
  }

  ngOnInit(): void {
    if(this.route.snapshot.paramMap.get('id')) {
      this.padletId = Number(this.route.snapshot.paramMap.get('id'));
    }
    else {
      this.padletId = this.padlet.id;
    }
    this.storeForm = new FormGroup({
      content: new FormControl(),
      cover: new FormControl(this.imageService.randomThumbnailImage()),
    });
  }

  store() {
    this.postService.createPost(this.padletId, this.storeForm.value).subscribe((response: any) => {
      console.log(response);
      if(response.id) {
        this.padlet.posts?.push(response);
      }
    });
  }
}
