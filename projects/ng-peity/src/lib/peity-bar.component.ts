import { Component } from '@angular/core';
import { PeityChartBase } from './peity-chart.base';

@Component({
  selector: 'ng-peity-bar, inline-bar-chart',
  standalone: true,
  template: '<span #host></span>',
  styles: `
    :host {
      display: inline-block;
    }
  `,
})
export class NgPeityBarComponent extends PeityChartBase {
  protected override readonly chartType = 'bar' as const;
}
