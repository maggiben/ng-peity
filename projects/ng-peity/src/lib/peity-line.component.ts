import { Component } from '@angular/core';
import { PeityChartBase } from './peity-chart.base';

@Component({
  selector: 'ng-peity-line, inline-line-chart',
  standalone: true,
  template: '<span #host></span>',
  styles: `
    :host {
      display: inline-block;
    }
  `,
})
export class NgPeityLineComponent extends PeityChartBase {
  protected override readonly chartType = 'line' as const;
}
