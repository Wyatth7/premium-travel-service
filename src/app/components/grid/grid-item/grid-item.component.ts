import { Component, ElementRef, Input, Renderer2 } from '@angular/core';
import { GridItemModel } from 'src/app/models/grid-item-model';
import { ApplicationStateService } from 'src/app/services/application-state.service';
import { NavigationService } from 'src/app/services/navigation.service';
import { SelectService } from 'src/app/services/select.service';

@Component({
  selector: 'app-grid-item',
  templateUrl: './grid-item.component.html',
  styleUrls: ['./grid-item.component.scss'],
})
export class GridItemComponent {
  @Input() title!: string;
  @Input() id!: string;
  @Input() extraText?: string;

  private isColored = false;

  constructor(
    private selectService: SelectService,
    private renderer: Renderer2,
    public gridItemRef: ElementRef
  ) {}

  async selectAction() {
    try {
      // add code here to color the background blue on click,
      // then revert when clicked again
      if (this.isColored) {
        this.isColored = false;
        this.renderer.removeClass(this.gridItemRef.nativeElement, 'colored');
      } else {
        this.isColored = true;
        this.renderer.addClass(this.gridItemRef.nativeElement, 'colored');
      }

      await this.selectService.executeAction(this.id);
    } catch (e) {
      console.log(e);
    }
  }
}
