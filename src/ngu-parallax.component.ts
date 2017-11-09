import {
  Component,
  OnInit,
  AfterViewChecked,
  Renderer,
  HostListener,
  Input,
  ViewChild,
  ElementRef
} from '@angular/core';

@Component({
  selector: 'ngu-parallax',
  template: `<img #img [src]="image" (load)="isLoaded($event)"><div><ng-content></ng-content></div>`,
  styles: [`
    :host {
        display: block;
        overflow: hidden;
        position: relative;
    }

    img {
        width: 100%;
        position: absolute;
        top: 0px;
        left: 0px;
    }

    div {
        z-index: 1;
        position: absolute;
        top: 0px;
        left: 0px;
    }
  `]
})
export class NguParallaxComponent implements OnInit {
  imgToBeScroll: number;
  imgheit: number;
  parallaxOffestTop: any;
  windowHeight: number;
  parallaxHeight: any;
  img: any;
  @Input('image') image: string;
  @ViewChild('img', { read: ElementRef })
  img1: ElementRef;
  transformImg = 0;
  imageHeight: number;

  constructor(private renderer: Renderer, private el: ElementRef) {}

  ngOnInit() {
    this.img = this.img1.nativeElement;
    this.parallaxHeight = this.el.nativeElement.offsetHeight;
    this.renderer.listenGlobal('window', 'scroll', () =>
      this.onWindowScrolling()
    );
    this.windowHeight = window.innerHeight;
    // console.log(this.parallaxOffestTop, this.windowHeight, this.parallaxHeight);
  }

  public isLoaded(event: Event) {
    this.imageHeight = this.img.offsetHeight;
    this.parallaxOffestTop = this.el.nativeElement.offsetTop;
    this.imgheit = Math.round(
        (this.imageHeight - this.parallaxHeight) / this.imageHeight * 100
      );
      this.imgToBeScroll = Math.round(
        this.parallaxHeight / this.imageHeight * 100
      );
    // console.log(this.parallaxOffestTop, this.windowHeight, this.parallaxHeight)
    // console.log(this.imageHeight);
  }

  // @HostListener('window:scroll', ['$event'])
  private onWindowScrolling(): void {
    const scrollY = window.scrollY;
    const cond =
      this.parallaxOffestTop <= scrollY + this.windowHeight &&
      this.parallaxOffestTop + this.parallaxHeight >= scrollY;
      // console.log(this.el.nativeElement.offsetTop, this.parallaxOffestTop);
    if (cond) {
      const minss =
        this.parallaxOffestTop > this.windowHeight
          ? this.parallaxOffestTop - this.windowHeight
          : 0;
      const tot = scrollY - minss;
      // const cond = tot <= this.imageHeight;
      const result = Math.round(tot / (this.windowHeight + this.parallaxHeight) * 100);
      const finalPer = Math.round(result / 100 * this.imgToBeScroll);
      // console.log(cond, tot, this.imgToBeScroll, result, finalPer);
      // console.log(this.windowHeight)
      // tslint:disable-next-line:no-unused-expression
      // cond &&
      this.renderer.setElementStyle(
        this.img,
        'transform',
        `translate3d(0, -${finalPer}%, 0)`
      );
    }
  }

}

/**
 * scroll - window height and parallax div height with image height
 */
