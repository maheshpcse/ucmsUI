import { Directive, ElementRef, HostBinding, HostListener, Renderer } from '@angular/core';

@Directive({
  selector: '[appCustom]'
})
export class CustomDirective {

  @HostBinding('class.card-outline-primary') private ishovering: boolean;

  constructor(
    private el: ElementRef,
    private renderer: Renderer
  ) {
    // renderer.setElementStyle(el.nativeElement, 'backgroundColor', 'gray');
  }

  @HostListener('mouseover') onMouseOver() {
    let part = this.el.nativeElement.querySelector('.card-text');
    this.renderer.setElementStyle(part, 'display', 'block');
    this.ishovering = true;
  }

  @HostListener('mouseout') onMouseOut() {
    let part = this.el.nativeElement.querySelector('.card-text');
    this.renderer.setElementStyle(part, 'display', 'none');
    this.ishovering = true;
  }

}
