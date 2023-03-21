import {Component, Input} from '@angular/core';
import {Padlet} from '../../models/padlet';
@Component({
  selector: 'tw-padlet-card',
  templateUrl: './padlet-card.component.html',
  styles: [
  ]
})
export class PadletCardComponent {
  @Input() padlet: Padlet = {
    id: '',
    name: '',
    cover: '',
    description: ''
  };
}
