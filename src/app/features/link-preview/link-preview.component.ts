import {Component, Input, OnInit} from '@angular/core';
import {LinkPreviewService} from "../../core/link-preview.service";
import {Required} from "../../shared/required";

interface LinkPreview {
  title: string;
  description: string;
  image_url: string;
  url: string;
}

@Component({
  selector: 'tw-link-preview',
  templateUrl: './link-preview.component.html',
  styles: [
  ]
})
export class LinkPreviewComponent implements OnInit {

  @Input() @Required() url: string = '';
  linkData: LinkPreview = {
    title: '',
    description: '',
    image_url: '',
    url: '',
  };
  constructor(protected linkPreview: LinkPreviewService) { }

  ngOnInit(): void {
    console.log(this.url);
    this.linkPreview.getLinkPreview(this.url).then((linkData: LinkPreview) => {
      console.log(linkData);
      this.linkData = linkData;
    });
  }
}
