import circle from '../plugins/circle'
import convolute from '../plugins/convolute'
import rectangle from '../plugins/rect'
import round from '../plugins/round'
import abbrev from '../plugins/abbrev'
import renderEmoji from '../plugins/renderEmoji'

/**
 * @typedef {object} Plugins
 * @property {Function} circle Circle plugin
 * @property {Function} convolute Convolute plugin
 * @property {Function} rectangle Rectangle plugin
 * @property {Function} round Round plugin
 * @property {Function} abbrev Abbrev plugin
 * @property {Function} renderEmoji Emoji rendering plugin
 */
const data = {
    circle,
    convolute,
    rectangle,
    round,
    abbrev,
    renderEmoji,
};

export default data;