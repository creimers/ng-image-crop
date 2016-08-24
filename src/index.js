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
    this.$window.EXIF = EXIF;
    this.initialized = false;
    this._initCroppie();
  }

  set originalImage(value) {
    this._originalImage = value;
    if (this.c !== undefined) {
      this._bindImage();
    }
  }

  get originalImage() {
    return this._originalImage;
  }

  saveCrop() {
    // returns a blob of the cropped image
    this.c.result({
      type: 'canvas',
      quality: this.options.result.quality,
      size: {width: this.options.result.width},
      format: this.options.result.format
    }).then((img)=> {
      this.$scope.$apply(()=> {
        var regex = /^data:[a-z]+\/[a-z]+;base64,(.+)/;
        var base64String = regex.exec(img);
        var croppedImage = this._b64ToBlob(base64String[base64String.length - 1]);
        // call apply callback
        this.onApply({image: croppedImage});
      });
    });
  }

  _bindImage() {
    // binds image to croppie instance
    let reader = new FileReader();

    reader.onload = ()=> {
      this.c.bind(reader.result);
    };
    reader.readAsDataURL(this._originalImage);
  }

  _initCroppie() {
    // initializes a croppie instance
    this.c = new croppie(this.$element.find('.cropper')[0], this.options.croppie);
    if (this._originalImage) {
      this._bindImage();
    }
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
    let width = this.options.result.width;
    let height = this.options.result.height;
    let quality = this.options.result.quality;
    blob.name = width + '_' + height + '_' + quality + '_' + this._originalImage.name;
    return blob;
  }
}

class ImageCropDirective {

  constructor() {
    this.restrict = 'E';
    this.scope = {
      originalImage: '<',
      options: '<',
      onApply: '&',
      onCancel: '&'
    };
    this.bindToController = true;
    this.controller = ImageCropDirectiveCtrl;
    this.controllerAs = '$ctrl';
    this.template = require('./template.jade')();
  }

}

module.directive('imageCrop', () => new ImageCropDirective());
