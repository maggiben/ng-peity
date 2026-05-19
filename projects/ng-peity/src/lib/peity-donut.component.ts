import { Component } from '@angular/core';
import { PeityChartBase } from './peity-chart.base';

@Component({
  selector: 'ng-peity-donut, inline-donut-chart',
  standalone: true,
  template: '<span #host></span>',
  styles: `
    :host {
      display: inline-block;
    }
  `,
})
export class NgPeityDonutComponent extends PeityChartBase {
  protected override readonly chartType = 'donut' as const;
}
