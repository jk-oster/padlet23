import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PadletService} from "../../core/padlet.service";
import {Padlet, PadletFactory} from "../../models/padlet";
import {PostService} from "../../core/post.service";
import {Post, PostFactory} from "../../models/post";
import {AuthService} from "../../core/auth.service";
import {Utils} from "../../shared/utils";
import {AssocArray} from "../../shared/assoc-array";
import {ModalContainer} from "../../shared/modal-container";
import {SearchService} from "../../core/search.service";
import {debounceTime, distinctUntilChanged} from "rxjs";

@Component({
  selector: 'tw-padlet-show',
  templateUrl: './padlet-show.component.html',
  styles: []
})
export class PadletShowComponent implements OnInit, ModalContainer {
  padletId: number = 0;

  currentPost: Post = PostFactory.empty();
  padlet: Padlet = PadletFactory.empty();

  posts: Post[] = [];

  modals: AssocArray = {
    share: false,
    deletePost: false,
    editPost: false,
    editPadlet: false,
    deletePadlet: false,
    addPost: false
  }

  constructor(
    private route: ActivatedRoute,
    protected auth: AuthService,
    private padletService: PadletService,
    private router: Router,
    protected search: SearchService
  ) {
  }

  ngOnInit() {
    this.padletId = Number(this.route.snapshot.paramMap.get('id'));

    // get the padlet from the padlet service
    this.padletService.getPadlet(this.padletId).subscribe((padlet: Padlet) => {
      this.padlet = padlet;
      this.posts = padlet.posts ?? [];
    });

  }

  openPost(post: Post) {
    this.currentPost = post;
    this.modals['editPost'] = true;
  }

  deletePost(id: number) {
    this.closeModal('editPost');
    this.posts = this.posts.filter((post) => post.id !== id);
  }

  updatePost(post: Post) {
    const currentPost = this.posts.find((p) => p.id === post.id);
    if (currentPost) {
      // @ts-ignore
      Object.assign(currentPost, post);
    }
  }

  updatePadlet(padlet: Padlet, event: any, property:string){
    this.debouncedUpdatePadlet(padlet, event, property);
  }

  debouncedUpdatePadlet = Utils.debounce((padlet: Padlet, event: any, property: string) => {
    const prop = event.target.value;
    const newPadletData: AssocArray = {
      name: padlet.name,
      description: padlet.description,
      cover: padlet.cover
    };
    newPadletData[property] = prop;
    this.padletService.updatePadlet(padlet.id, newPadletData).subscribe((padlet: Padlet) => {
      console.log('updated padlet',padlet);
    });
  });

  deletePadlet() {
    this.modals['deletePadlet'] = false;
    this.padletService.deletePadlet(this.padlet.id).subscribe(() => {
      this.router.navigate(['/']);
    });
  }

  togglePublic() {
    this.padletService.togglePadletPublic(this.padlet).subscribe(() => {
      this.padlet.public = !this.padlet.public;
      console.log('toggled');
    });
  }

  showModal(name: string) {
    this.modals[name] = true;
  }

  closeModal(name: string) {
    this.modals[name] = false;
  }

  copyToClipboard() {
    Utils.copyToClipboard();
  }

  public addPost(post: Post) {
    this.posts.push(post);
    this.closeModal('addPost');
  }

  public wrapUrl(text: string) {
    return Utils.wrapUrl(text);
  }

  public containsUrl(text: string) {
    return Utils.containsUrl(text);
  }

  public getUrl(text: string) {
    return Utils.getUrl(text) ?? '';
  }

  public get isPublic() {
    return this.padlet.public;
  }
}
