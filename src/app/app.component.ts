import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CounterComponent } from './counter.component';

@Component({
  selector: 'app-root',
  template: ` <app-counter /> `,
  standalone: true,
  imports: [CounterComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {}
