import { Component } from '@angular/core';
import { PeityChartBase } from './peity-chart.base';

@Component({
  selector: 'ng-peity-pie, inline-pie-chart',
  standalone: true,
  template: '<span #host></span>',
  styles: `
    :host {
      display: inline-block;
    }
  `,
})
export class NgPeityPieComponent extends PeityChartBase {
  protected override readonly chartType = 'pie' as const;
}
