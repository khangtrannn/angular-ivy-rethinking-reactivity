import { ChangeDetectorRef, Injectable, inject } from '@angular/core';
import { TickScheduler } from './tick-scheduler';

@Injectable()
export class RenderScheduler {
  constructor(
    private readonly cdRef: ChangeDetectorRef,
    private readonly tickScheduler: TickScheduler
  ) {}

  /**
   * Marks component and its ancestors as dirty.
   * It also schedules a new change detection cycle in zone-less mode.
   */
  schedule(): void {
    this.cdRef.markForCheck();
    this.tickScheduler.schedule();
  }
}

export function createRenderScheduler(): RenderScheduler {
  return new RenderScheduler(inject(ChangeDetectorRef), inject(TickScheduler));
}
