import Submenu from '@/ui/submenuBase';
import templateHtml from '@/ui/template/submenu/watermark';
import { assignmentForDestroy, isSupportFileApi } from '@/util';
import Range from '@/ui/tools/range';
import { defaultOpacityRangeValues } from '@/consts';

/**
 * Image ui class
 * @class
 * @ignore
 */
class Watermark extends Submenu {
  constructor(
    subMenuElement,
    { locale, makeSvgIcon, menuBarPosition, usageStatistics, menuParams }
  ) {
    super(subMenuElement, {
      locale,
      name: 'watermark',
      makeSvgIcon,
      menuBarPosition,
      templateHtml,
      usageStatistics,
      menuParams,
    });

    this._els = {
      imageButton: this.selector('.tie-watermark-file'),
      images: this.selectorAll('.watermark-default-img'),
      locations: this.selectorAll('.watermark-location'),
      opacityRange: new Range(
        {
          slider: this.selector('.watermark-opacity-range'),
          input: this.selector('.watermark-opacity-value'),
        },
        defaultOpacityRangeValues
      ),
    };
  }

  /**
   * Destroys the instance.
   */
  destroy() {
    this._removeEvent();

    assignmentForDestroy(this);
  }

  /**
   * Add event for image
   * @param {Object} actions - actions for crop
   *   @param {Function} actions.loadImageFromURL - load image action
   *   @param {Function} actions.applyFilter - apply filter action
   */
  addEvent(actions) {
    const loadImageFile = this._loadImageFile.bind(this);
    const imageClickHandler = this._imageClickHandler.bind(this);
    const locationClickHandler = this._locationClickHandler.bind(this);
    const opacityChangeHandler = this._opacityChangeHandler.bind(this);

    this.eventHandler = {
      loadImageFile,
      imageClickHandler,
      locationClickHandler,
      opacityChangeHandler,
    };

    this.actions = actions;

    this._els.imageButton.addEventListener('change', loadImageFile);
    if (this._els.images) {
      this._els.images.forEach((image) => {
        image.addEventListener('click', imageClickHandler);
      });
    }

    if (this._els.locations) {
      this._els.locations.forEach((location) => {
        location.addEventListener('click', locationClickHandler);
      });
    }

    this._els.opacityRange.on('change', this._opacityChangeHandler.bind(this));
  }

  /**
   * Remove event
   * @private
   */
  _removeEvent() {
    this._els.imageButton.removeEventListener('change', this.eventHandler.loadImageFile);
    if (this._els.images) {
      this._els.images.forEach((image) => {
        image.removeEventListener('click', this.eventHandler.imageClickHandler);
      });
    }
    if (this._els.locations) {
      this._els.locations.forEach((location) => {
        location.removeEventListener('click', this.eventHandler.locationClickHandler);
      });
    }
    this._els.opacityRange.off();
  }

  /**
   * Opacity change handler
   * @param value
   * @param isLast
   * @private
   */
  _opacityChangeHandler(value, isLast) {
    // value为透明值，0-100，需要转换为0-1，0不透明，100完全透明
    value = 1 - value / 100;
    this.actions.changeWatermarkStyle(
      {
        opacity: value,
      },
      !isLast
    );
  }

  /**
   * 设置透明度
   * @param obj
   */
  setOpacityOnAction(obj) {
    this._els.opacityRange.value = 100 - obj.opacity * 100;
  }

  /**
   * 图片点击事件
   * @param e
   * @private
   */
  _imageClickHandler(e) {
    // 获取默认定位
    const active = this.selector('.watermark-location-active');
    const originX = active.getAttribute('data-origin-x');
    const originY = active.getAttribute('data-origin-y');
    this.actions.loadImageFromURL(e.target.src, null, originX, originY);
  }

  /**
   * 定位点击事件
   * @param e
   * @private
   */
  _locationClickHandler(e) {
    // 先取消所有的active
    this._els.locations.forEach((location) => {
      location.classList.remove('watermark-location-active');
    });
    // 设置当前点击的active
    e.target.classList.add('watermark-location-active');
  }

  /**
   * Load Image file
   * @param {object} event - File change event object
   * @private
   */
  _loadImageFile(event) {
    let imgUrl;

    if (!isSupportFileApi()) {
      alert('This browser does not support file-api');
    }

    const [file] = event.target.files;
    // 将value重置为null，以便可以多次选择相同的文件
    event.target.value = null;
    if (file) {
      imgUrl = URL.createObjectURL(file);
      // 获取默认定位
      const active = this.selector('.watermark-location-active');
      const originX = active.getAttribute('data-origin-x');
      const originY = active.getAttribute('data-origin-y');
      this.actions.loadImageFromURL(imgUrl, file, originX, originY);
    }
  }
}

export default Watermark;
