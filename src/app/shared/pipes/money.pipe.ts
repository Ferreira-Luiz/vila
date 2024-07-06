import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'money',
  standalone: true
})
export class moneyPipe implements PipeTransform {

  transform(value: number): string {
    if (value == null) {
      return '';
    }

    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    });

    return formatter.format(value);
  }

}
