import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Subject, scan, startWith } from 'rxjs';
import { ReactivityComponent } from './core/reactivity.component';

@Component({
  selector: 'app-counter',
  template: `
    <button (click)="value$.next(-1)">-</button>
    <h1>{{ state.count }}</h1>
    <button (click)="value$.next(1)">+</button>
  `,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
})
export class CounterComponent extends ReactivityComponent {
  value$ = new Subject<number>();

  state = this.connect({
    count: this.value$.pipe(
      startWith(0),
      scan((count, next) => count + next)
    ),
  });
}
