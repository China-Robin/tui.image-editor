/**
 * @param {Object} submenuInfo - submenu info for make template
 *   @param {Locale} locale - Translate text
 *   @param {Function} makeSvgIcon - svg icon generator
 * @returns {string}
 */
export default ({ locale, makeSvgIcon }) => `
    <ul class="tui-image-editor-submenu-item">
        <li>
            <div class="tui-image-editor-button">
                <div>
                    <input type="file" accept="image/*" class="tie-image-file">
                    ${makeSvgIcon(['normal', 'active'], 'icon-load', true)}
                </div>
                <label> ${locale.localize('Load Image')} </label>
            </div>
        </li>
    </ul>
`;
