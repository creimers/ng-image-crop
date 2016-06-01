import 'croppie/croppie.css';
let croppie = require('croppie/croppie.js');
let EXIF = require('exif-js');

const MODULE_NAME = 'ngImageCrop';

export default MODULE_NAME;

const module = angular.module(MODULE_NAME, []);

class ImageCropDirectiveCtrl {
  constructor($scope, $document, $element, $timeout, $window) {
    this.$document = $document;
    this.$element = $element;
    this.$scope = $scope;
    this.$timeout = $timeout;
    this.$window = $window;
    this._initCroppie();
    this.$window.EXIF = EXIF;

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

  _saveCrop() {
    this.c.result('canvas').then((img)=> {
      this.$scope.$apply(()=> {
        var regex = /^data:[a-z]+\/[a-z]+;base64,(.+)/;
        var base64String = regex.exec(img);
        this.croppedImage = this._b64ToBlob(base64String[base64String.length - 1]);
      });
    });
  }

  _initCroppie() {
    this.c = new croppie(this.$element[0], this.options);
    var saveCallback = ()=> {
      this._saveCrop();
    };

    this.$element.on('mouseup touchend wheel', saveCallback);
  }

  _b64ToBlob(b64Data) {
    const byteCharacters = atob(b64Data);
    const byteArrays = [];
    const contentType = this._originalImage.type;
    const sliceSize = 512;

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);
      
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      
      const byteArray = new Uint8Array(byteNumbers);
      
      byteArrays.push(byteArray);
    }
    
    const blob = new Blob(byteArrays, {type: contentType});
    return blob;
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
