export type PeityChartType = 'pie' | 'donut' | 'bar' | 'line';

export interface PeityInstance {
  draw(): void;
  destroy(): void;
  options: Record<string, unknown>;
  element: HTMLElement;
}

export type PeityFill =
  | string
  | string[]
  | ((value: number, index: number, values: number[]) => string);

export interface PeityPieOptions {
  delimiter?: string | null;
  fill?: PeityFill;
  height?: number | null;
  radius?: number | null;
  width?: number | null;
}

export interface PeityDonutOptions extends PeityPieOptions {
  innerRadius?: number | null;
}

export interface PeityLineOptions {
  delimiter?: string;
  fill?: string;
  height?: number;
  max?: number | null;
  min?: number | null;
  stroke?: string;
  strokeWidth?: number;
  width?: number;
}

export interface PeityBarOptions {
  delimiter?: string;
  fill?: PeityFill;
  height?: number;
  max?: number | null;
  min?: number | null;
  padding?: number;
  width?: number;
}
