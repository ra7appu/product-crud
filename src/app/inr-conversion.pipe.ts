import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'inrConversion'
})
export class INRConversionPipe implements PipeTransform {
  transform(value: number, exchangeRate: number = 74): number {
    return value * exchangeRate;
  }
}
