import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../core/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {PostService} from "../../core/post.service";
import {Padlet, PadletFactory} from "../../models/padlet";
import {ImageService} from "../../core/image.service";
import {Post} from "../../models/post";

@Component({
  selector: 'tw-post-store',
  templateUrl: './post-store.component.html',
  styles: [
  ]
})
export class PostStoreComponent implements OnInit {
  storeForm: FormGroup = new FormGroup({});

  @Input() padlet: Padlet = PadletFactory.empty();
  @Output() postCreated = new EventEmitter<Post>();

  get cover() {
    return this.storeForm.get('cover')?.value;
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
      title: new FormControl('', [Validators.required]),
      content: new FormControl('', [Validators.required]),
      cover: new FormControl(this.imageService.randomThumbnailImage()),
    });
  }

  store() {
    if(this.storeForm.valid) {
      this.postService.createPost(this.padletId, this.storeForm.value).subscribe((response: any) => {
        console.log(response);
        if (response.id) {
          this.postCreated.emit(response);
        }
      });
    } else {
      this.storeForm.markAllAsTouched();
    }
  }
}
