import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '@env/environment';

@Pipe({
  name: 'imageUrl',
})
export class ImageUrlPipe implements PipeTransform {
  transform(filename: string): string {
    if (!filename) return '';

    return `${environment.apiBaseUrl}/api/${encodeURIComponent(filename)}`;
  }
}
