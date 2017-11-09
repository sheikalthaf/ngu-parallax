# ngu-parallax

Angular Universal parallax

## Demo

Demo available [Here](https://sheikalthaf.github.io/ngu-parallax)

## Installation

`npm install @ngu/parallax --save`

## Sample

Include NguParallaxModule in your app module:

```javascript
import { NguParallaxModule } from '@ngu/parallax';

@NgModule({
  imports: [
    NguParallaxModule
  ],
})
export class AppModule { }
```

Then use in your component:

```javascript
import { Component } from '@angular/core';

@Component({
  selector: 'sample',
  template: `
    <ngu-parallax [image]="imageURL" style="height: 250px">
      // your elements goes here
    </ngu-parallax>
  `,
})
export class SampleComponent {}
```

**Treat `ngu-parallax` as a div element**

## License

[MIT](LICENSE) license.