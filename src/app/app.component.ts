import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Subject, scan, startWith, tap } from 'rxjs';
import { TickScheduler } from './core/tick-scheduler';
import { CounterComponent } from './counter.component';

@Component({
  selector: 'app-root',
  template: ` <app-counter /> `,
  standalone: true,
  imports: [CounterComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {}
