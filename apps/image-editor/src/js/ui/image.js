import Submenu from '@/ui/submenuBase';
import templateHtml from '@/ui/template/submenu/image';
import { assignmentForDestroy, isSupportFileApi } from '@/util';

/**
 * Image ui class
 * @class
 * @ignore
 */
class Image extends Submenu {
  constructor(subMenuElement, { locale, makeSvgIcon, menuBarPosition, usageStatistics }) {
    super(subMenuElement, {
      locale,
      name: 'image',
      makeSvgIcon,
      menuBarPosition,
      templateHtml,
      usageStatistics,
    });

    this._els = {
      imageButton: this.selector('.tie-image-file'),
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

    this.eventHandler = {
      loadImageFile,
    };

    this.actions = actions;
    this._els.imageButton.addEventListener('change', loadImageFile);
  }

  /**
   * Remove event
   * @private
   */
  _removeEvent() {
    this._els.imageButton.removeEventListener('change', this.eventHandler.loadImageFile);
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
      this.actions.loadImageFromURL(imgUrl, file);
    }
  }
}

export default Image;
