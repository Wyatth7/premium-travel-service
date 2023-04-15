import { Component, Input } from '@angular/core';
import { GridItemModel } from 'src/app/models/grid-item-model';
import { SelectService } from 'src/app/services/select.service';

@Component({
  selector: 'app-grid-item',
  templateUrl: './grid-item.component.html',
  styleUrls: ['./grid-item.component.scss'],
})
export class GridItemComponent {
  @Input() title!: string;
  @Input() id!: string;

  constructor(private selectService: SelectService) {}

  async selectAction() {
    try {
      await this.selectService.executeAction(this.id);
    } catch (e) {
      console.log(e);
    }
  }
}
