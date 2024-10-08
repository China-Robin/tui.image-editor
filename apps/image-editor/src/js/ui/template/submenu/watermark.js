/**
 * 根据menuParams生成动态模板字符串
 */
function generateDynamicHtml(locale, menuParams) {
  if (
    menuParams &&
    menuParams.watermark &&
    menuParams.watermark.defaultWatermark &&
    menuParams.watermark.defaultWatermark.length > 0
  ) {
    let watermarkHtml = `
      <li class="tui-image-editor-submenu-align" style="width: 75%;margin-left: auto;margin-right: auto">
        <div class="watermark-title">
          ${locale.localize('Default watermark')}
        </div>
        <div class="watermark-default-img-box">
    `;
    menuParams.watermark.defaultWatermark.forEach((watermark, index) => {
      watermarkHtml += `
        <img class="watermark-default-img" src="${watermark}" alt="watermark ${index}" />
      `;
    });
    watermarkHtml += `
        </div>
      </li>
      <li class="tui-image-editor-partition only-left-right">
        <div></div>
      </li>
    `;

    return watermarkHtml;
  }

  return '';
}

/**
 * @param {Object} submenuInfo - submenu info for make template
 *   @param {Locale} locale - Translate text
 *   @param {Function} makeSvgIcon - svg icon generator
 *   @param {Object} menuParams - menu parameters
 * @returns {string}
 */
export default ({ locale, makeSvgIcon, menuParams }) => `
    <ul class="tui-image-editor-submenu-item">
        ${generateDynamicHtml(locale, menuParams)}
        <li class="tui-image-editor-submenu-align" style="width: 75%;margin-left: auto;margin-right: auto">
          <div class="watermark-title">
            ${locale.localize('Default location')}
          </div>
          <table class="watermark-location-table" border="1">
            <tr>
              <td class="watermark-location" data-origin-x="left" data-origin-y="top">
                ${locale.localize('Left top')}
              </td>
              <td class="watermark-location" data-origin-x="center" data-origin-y="top">
                ${locale.localize('Center top')}
              </td>
              <td class="watermark-location" data-origin-x="right" data-origin-y="top">
                ${locale.localize('Right top')}
              </td>
            </tr>
            <tr>
              <td class="watermark-location" data-origin-x="left" data-origin-y="center">
                ${locale.localize('Left center')}
              </td>
              <td class="watermark-location" data-origin-x="center" data-origin-y="center">
                ${locale.localize('Center')}
              </td>
              <td class="watermark-location" data-origin-x="right" data-origin-y="center">
                ${locale.localize('Right center')}
              </td>
            </tr>
            <tr>
              <td class="watermark-location" data-origin-x="left" data-origin-y="bottom">
                ${locale.localize('Left bottom')}
              </td>
              <td class="watermark-location" data-origin-x="center" data-origin-y="bottom">
                ${locale.localize('Center bottom')}
              </td>
              <td class="watermark-location watermark-location-active" data-origin-x="right" data-origin-y="bottom">
                ${locale.localize('Right bottom')}
              </td>
            </tr>
          </table>
        </li>
        <li class="tui-image-editor-partition only-left-right">
          <div></div>
        </li>
        <li class="tui-image-editor-submenu-align" style="width: 75%;margin-left: auto;margin-right: auto">
          <div class="watermark-title">
            ${locale.localize('Watermark opacity')}
          </div>
          <div class="watermark-opacity-box">
            <div class="watermark-opacity-range tui-image-editor-range"></div>
            <input class="watermark-opacity-value" value="0"/>
          </div>
        </li>
        <li class="tui-image-editor-partition only-left-right">
          <div></div>
        </li>
        <li>
            <div class="tui-image-editor-button">
                <div>
                    <input type="file" accept="image/*" class="tie-watermark-file">
                    ${makeSvgIcon(['normal', 'active'], 'icon-load', true)}
                </div>
                <label> ${locale.localize('Add watermark')} </label>
            </div>
        </li>
    </ul>
`;
