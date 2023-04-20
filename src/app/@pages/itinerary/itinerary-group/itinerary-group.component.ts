import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-itinerary-group',
  templateUrl: './itinerary-group.component.html',
  styleUrls: ['./itinerary-group.component.scss'],
})
export class ItineraryGroupComponent {
  @Input() title!: string;
}
