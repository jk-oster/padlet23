import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {FormControl, FormGroup} from "@angular/forms";
import {AuthService} from "../../core/auth.service";
import {Router} from "@angular/router";
import {PadletService} from "../../core/padlet.service";
import {ImageService} from "../../core/image.service";

@Component({
  selector: 'tw-padlet-store',
  templateUrl: './padlet-store.component.html',
  styles: []
})
export class PadletStoreComponent implements OnInit {
  storeForm: FormGroup = new FormGroup({});

  constructor(
    private location: Location,
    private imageService: ImageService,
    protected auth: AuthService,
    private router: Router,
    private padletService: PadletService) {
  }

  ngOnInit(): void {
    this.storeForm = new FormGroup({
      name: new FormControl(),
      description: new FormControl(),
      cover: new FormControl(this.imageService.randomThumbnailImage()),
    });
  }

  store() {
    this.padletService.createPadlet(this.storeForm.value).subscribe(response => {
      console.log(response);
      this.location.back();
    });
  }

  back() {
    this.location.back();
  }
}
