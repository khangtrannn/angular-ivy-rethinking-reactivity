import { ApplicationRef, Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root',
  useFactory: () => inject(AnimationFrameTickScheduler),
})
export abstract class TickScheduler {
  abstract schedule(): void;
}

@Injectable({
  providedIn: 'root',
})
export class AnimationFrameTickScheduler extends TickScheduler {
  private isScheduled = false;

  constructor(private readonly appRef: ApplicationRef) {
    super();
  }

  schedule(): void {
    if (!this.isScheduled) {
      this.isScheduled = true;

      requestAnimationFrame(() => {
        this.appRef.tick();
        this.isScheduled = false;
      });
    }
  }
}
