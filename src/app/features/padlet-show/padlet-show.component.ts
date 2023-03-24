import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PadletService} from "../../core/padlet.service";
import {Padlet} from "../../models/padlet";
import {PostService} from "../../core/post.service";
import {Post} from "../../models/post";
import {AuthService} from "../../core/auth.service";
import {Utils} from "../../shared/utils";
import {AssocArray} from "../../shared/assoc-array";

@Component({
  selector: 'tw-padlet-show',
  templateUrl: './padlet-show.component.html',
  styles: []
})
export class PadletShowComponent implements OnInit {
  padletId: number = 0;
  padlet: Padlet = {
    id: 0,
    name: '',
    cover: '',
    description: '',
    created_at: '',
    updated_at: '',
    posts: [],
    user_id: 1,
    public: true
  }

  posts: Post[] = [];

  currentPost: Post | undefined = undefined;

  modals: AssocArray = {
    share: false,
    deletePost: false,
    editPost: false,
    editPadlet: false,
    addPost: false
  }

  constructor(
    private route: ActivatedRoute,
    protected auth: AuthService,
    private padletService: PadletService,
    private router: Router,
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

  updatePost(post: Post, event: any) {
    this.debouncedUpdatePost(post, event);
  }

  debouncedUpdatePost = Utils.debounce((post: Post, event: any) => {
    const content = event.target.value;
    this.postService.updatePost(post.id, {
      content: content,
      cover: post.cover
    }).subscribe((post: Post) => {
      console.log(post);
    });
  });

  deletePost(id: number) {
    this.postService.deletePost(id).subscribe(() => {
      this.posts = this.posts.filter((post) => post.id !== id);
    });
  }

  deletePadlet() {
    this.padletService.deletePadlet(this.padlet.id).subscribe(() => {
      this.router.navigate(['/']);
    });
  }

  togglePublic() {
    this.padletService.togglePadletPublic(this.padlet).subscribe(() => {
      console.log('toggled');
    });
  }

  showModal(name: string) {
    this.modals[name] = true;
  }

  closeModal(name: string) {
    this.modals[name] = false;
    console.log('close', name);
  }

  copyToClipboard() {
    Utils.copyToClipboard();
  }

  public get isPublic() {
    return this.padlet.public;
  }
}
