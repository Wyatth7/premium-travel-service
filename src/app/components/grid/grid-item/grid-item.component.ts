import { Component, Input } from '@angular/core';
import { GridItemModel } from 'src/app/models/grid-item-model';

@Component({
  selector: 'app-grid-item',
  templateUrl: './grid-item.component.html',
  styleUrls: ['./grid-item.component.scss'],
})
export class GridItemComponent {
  @Input() title!: string;
  @Input() id!: string;
}
