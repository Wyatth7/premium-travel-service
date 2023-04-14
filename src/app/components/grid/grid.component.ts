import { Component, Input } from '@angular/core';
import { GridItemModel } from 'src/app/models/grid-item-model';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
})
export class GridComponent {
  @Input() data!: GridItemModel[];
}
