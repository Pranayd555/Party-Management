import { Directive, ElementRef, HostBinding, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appBetterHighlighter]'
})
export class BetterHighlighterDirective {

  @Input() colorBefore: string = '#dce8fc';
  @Input() colorAfter: string = '#98bdfa';

  constructor( private element: ElementRef) { }

  @HostBinding('style.backgroundColor') backgroundColor: string = this.colorBefore;

  @HostListener('mouseenter', ['$event']) onMouseEnter () {
    this.element.nativeElement.style.backgroundColor = this.colorAfter;
  }

  @HostListener('mouseleave', ['$event']) onMouseLeave () {
    this.element.nativeElement.style.backgroundColor = this.colorBefore;
  }

}
