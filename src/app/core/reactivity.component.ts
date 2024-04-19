import { Observable, from, mergeMap, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { createRenderScheduler } from './render-scheduler';

type ObservableDictionary<T> = {
  [P in keyof T]: Observable<T[P]>;
};

export abstract class ReactivityComponent {
  private readonly renderScheduler = createRenderScheduler();

  connect<T>(sources: ObservableDictionary<T>): T {
    const sink = {} as T;
    const sourceKeys = Object.keys(sources) as (keyof T)[];
    const updateSink$ = from(sourceKeys).pipe(
      mergeMap((sourceKey) =>
        sources[sourceKey].pipe(
          tap((sinkValue: any) => (sink[sourceKey] = sinkValue))
        )
      )
    );

    updateSink$
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.renderScheduler.schedule());

    return sink;
  }
}
