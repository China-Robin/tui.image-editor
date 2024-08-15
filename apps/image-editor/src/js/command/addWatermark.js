import commandFactory from '@/factory/command';
import { commandNames } from '@/consts';

const command = {
  name: commandNames.ADD_WATERMARK,

  /**
   * Add an watermark object
   * @param {Graphics} graphics - Graphics instance
   * @param {string} imgUrl - Image url to make object
   * @param originX
   * @param originY
   * @returns {Promise}
   */
  execute(graphics, imgUrl, originX = 'center', originY = 'center') {
    return graphics.addImageObject(imgUrl, originX, originY, 'watermark').then((objectProps) => {
      this.undoData.object = graphics.getObject(objectProps.id);

      return objectProps;
    });
  },

  /**
   * @param {Graphics} graphics - Graphics instance
   * @returns {Promise}
   */
  undo(graphics) {
    graphics.remove(this.undoData.object);

    return Promise.resolve();
  },
};

commandFactory.register(command);

export default command;
