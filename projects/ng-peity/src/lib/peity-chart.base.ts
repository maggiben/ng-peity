import {
  DestroyRef,
  Directive,
  ElementRef,
  ViewChild,
  afterNextRender,
  effect,
  inject,
  input,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { fromEvent } from 'rxjs';
import { auditTime } from 'rxjs/operators';
import { createPeityChart } from './peity-runtime';
import { PeityChartType, PeityInstance } from './peity.types';

@Directive()
export abstract class PeityChartBase {
  readonly data = input.required<number[]>();
  readonly options = input<Record<string, unknown>>({});

  @ViewChild('host', { static: true })
  protected host!: ElementRef<HTMLSpanElement>;

  protected abstract readonly chartType: PeityChartType;

  private readonly destroyRef = inject(DestroyRef);
  private peityInstance?: PeityInstance;
  private resizeObserver?: ResizeObserver;

  constructor() {
    afterNextRender(() => {
      this.initChart();

      effect(() => {
        const values = this.data();
        if (!this.peityInstance) {
          return;
        }
        this.host.nativeElement.textContent = this.formatData(values);
        this.peityInstance.draw();
      });

      effect(() => {
        const opts = this.options();
        if (!this.peityInstance) {
          return;
        }
        Object.assign(this.peityInstance.options, opts);
        this.peityInstance.draw();
      });
    });

    this.destroyRef.onDestroy(() => {
      this.resizeObserver?.disconnect();
      this.peityInstance?.destroy();
    });
  }

  private initChart(): void {
    const element = this.host.nativeElement;
    element.textContent = this.formatData(this.data());
    this.peityInstance = createPeityChart(element, this.chartType, this.options());
    this.observeResize();
    this.observeWindowResize();
  }

  private observeResize(): void {
    if (typeof ResizeObserver === 'undefined') {
      return;
    }

    this.resizeObserver = new ResizeObserver(() => this.peityInstance?.draw());
    this.resizeObserver.observe(this.host.nativeElement);
  }

  private observeWindowResize(): void {
    if (typeof window === 'undefined') {
      return;
    }

    fromEvent(window, 'resize')
      .pipe(auditTime(300), takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.peityInstance?.draw());
  }

  private formatData(values: number[]): string {
    return values.join(',');
  }
}
