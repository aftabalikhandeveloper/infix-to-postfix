export interface ConversionStep {
  scannedChar: string;
  stack: string[];
  postfix: string;
  action: string;
}

export interface ConversionResult {
  postfix: string;
  steps: ConversionStep[];
}
