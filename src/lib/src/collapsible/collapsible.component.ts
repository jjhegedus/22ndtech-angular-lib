import { Component, Input } from '@angular/core';

@Component({
  selector: 'my-collapsible',
  templateUrl: './collapsible.component.html',
  styleUrls: ['./collapsible.component.scss']
})
export class CollapsibleComponent {
  @Input() title: string;

  constructor(
  ) {
  }

}
