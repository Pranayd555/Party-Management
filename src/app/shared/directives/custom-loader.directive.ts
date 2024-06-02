import { Directive, ElementRef, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[appCustomLoader]'
})
export class CustomLoaderDirective{

  @Input() set isLoading(v: number) {
    if(!Number.isNaN(v) && this.element.nativeElement.id.includes(v)) {
      this.element.nativeElement.style.display = 'block';
    } else {
      this.element.nativeElement.style.display = 'none';
    }
  }

  constructor(private element: ElementRef) { }

  @HostBinding('style.display') display: string = 'none';


}
