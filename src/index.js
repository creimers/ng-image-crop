import 'croppie/croppie.css';
let croppie = require('croppie/croppie.js');
let EXIF = require('exif-js');

const MODULE_NAME = 'ngImageCrop';

export default MODULE_NAME;

const module = angular.module(MODULE_NAME, []);

class ImageCropDirectiveCtrl {
  constructor($scope, $element, $window) {
    this.$element = $element;
    this.$scope = $scope;
    this.$window = $window;
    this._initCroppie();
    this.$window.EXIF = EXIF;
  }

  _initCroppie() {
    let _updateCallback = (crop)=> {
      this.c.result('canvas').then((img)=> {
        this.$scope.$apply(()=> {
          this.croppedImage = img;
        });
      });
    }

    this.options.update = _updateCallback;

    this.c = new croppie(this.$element[0], this.options);
  }

  set originalImage(value) {
    this._originalImage = value;

    if (this._originalImage !== undefined && this.c !== undefined) {
      let reader = new FileReader();

      reader.onload = ()=> {
        this.c.bind(reader.result);
      };
      reader.readAsDataURL(this._originalImage);
    }
  }

  get originalImage() {
    return this._originalImage;
  }

}

class ImageCropDirective {

  constructor() {
    this.restrict = 'E';
    this.scope = {
      originalImage: '<',
      croppedImage: '=',
      options: '<'
    };
    this.bindToController = true;
    this.controller = ImageCropDirectiveCtrl;
    this.controllerAs = '$ctrl';
  }

}

module.directive('imageCrop', () => new ImageCropDirective());
