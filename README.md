# angular image crop

A slimple directive to harness the power of [Croppie](https://foliotek.github.io/Croppie/) for angular1.

Built with the superb [webpack-library-starter](https://github.com/krasimir/webpack-library-starter).

# usage

## installation

```
npm install git+https://git@github.com/byteyard/ng-image-crop
```

## angular module

```
import ngImageCrop from 'ng-image-crop'

angular.module('moduleName', [..., ngImageCrop, ...])
```

## controller

```
this.options = {
  result: {
    quality: .75,
    width: 1500,
    height: 400,
    format: 'jpeg'
  },
  croppie: {
    enableExif: true,
    boundary: {width: 350, height: 300},
    viewport: {
      width: 300,
      height: 200,
      type: 'square',
    },
    showZoomer: true
  }
}
```

## template

```
<image-crop
  original-image="$ctrl.originalImage"
  options="$ctrl.options"
  on-apply="$ctrl.applyCrop(croppedImage)"
  on-cancel="$ctrl.cancel()"
  >
  </image-crop>
```
