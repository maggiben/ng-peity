import { Component, OnDestroy, signal } from '@angular/core';
import {
  NgPeityBarComponent,
  NgPeityDonutComponent,
  NgPeityLineComponent,
  NgPeityPieComponent,

} from 'ng-peity';

@Component({
  selector: 'app-root',
  imports: [
    NgPeityPieComponent,
    NgPeityDonutComponent,
    NgPeityBarComponent,
    NgPeityLineComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnDestroy {
  readonly pieData = signal([12, 8, 15, 6]);
  readonly pieOptions = signal<Record<string, unknown>>({
    radius: 48,
    fill: ['#58508d', '#ffa600', '#ff6361', '#bc5090'],
  });

  readonly donutData = signal([30, 20, 50]);
  readonly donutOptions = signal<Record<string, unknown>>({
    radius: 44,
    innerRadius: 22,
    fill: ['#4d89f9', '#edc240', '#e0e0e0'],
  });

  readonly barData = signal([5, 3, 9, 6, 5, 9, 7, 3, 5, 2]);
  readonly barOptions = signal<Record<string, unknown>>({
    width: 160,
    height: 48,
    fill: ['#4d89f9'],
  });

  readonly lineData = signal([1, 2, 3, 4, 3, 1, 5, 4, 2, 6]);
  readonly lineOptions = signal<Record<string, unknown>>({
    width: 160,
    height: 48,
    stroke: '#4d89f9',
    fill: 'rgba(77, 137, 249, 0.2)',
  });

  private readonly intervalId = window.setInterval(() => {
    const next = Math.round(Math.random() * 10);
    this.barData.update((values) => [...values.slice(1), next]);
    this.barOptions.update((opts) => ({
      ...opts,
      fill: [`#${Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, '0')}`],
    }));
  }, 1000);

  ngOnDestroy(): void {
    window.clearInterval(this.intervalId);
  }

  shufflePie(): void {
    this.pieData.set(
      Array.from({ length: 4 }, () => Math.round(Math.random() * 20) + 1)
    );
  }
}
