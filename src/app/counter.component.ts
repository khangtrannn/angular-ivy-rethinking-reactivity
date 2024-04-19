import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Subject, scan, startWith, tap } from 'rxjs';
import { createRenderScheduler } from './core/render-scheduler';

@Component({
  selector: 'app-counter',
  template: `
    <button (click)="value$.next(-1)">-</button>
    <h1>{{ count$ | async }}</h1>
    <button (click)="value$.next(1)">+</button>
  `,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AsyncPipe],
})
export class CounterComponent {
  private readonly renderScheduler = createRenderScheduler();

  value$ = new Subject<number>();
  count$ = this.value$.pipe(
    startWith(0),
    scan((count, next) => count + next),
    tap(() => this.renderScheduler.schedule())
  );
}
