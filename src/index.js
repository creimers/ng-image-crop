import 'croppie/croppie.css';
let croppie = require('croppie/croppie.js');

const MODULE_NAME = 'ngImageCrop';

export default MODULE_NAME;

const module = angular.module(MODULE_NAME, []);

class ImageCropDirective {

  constructor($window) {
    this.$window = $window;
    this.restrict = 'E';
    this.template = require('./template.jade')();
    this.scope = {
      originalImage: '<',
      croppedImage: '='
    };
  }

  link(scope, element) {

    let c = new croppie(element[0]);
 
    scope.$watch('originalImage', ()=> {
      console.log('original image changed.');
      if (scope.originalImage !== undefined) {
        let reader = new FileReader();

        reader.onload = ()=> {
          c.bind(reader.result);
        };
        reader.readAsDataURL(scope.originalImage);
      }
    });
  }

}

module.directive('imageCrop', () => new ImageCropDirective());
