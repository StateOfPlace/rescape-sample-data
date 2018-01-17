/**
 * Created by Andy Likuski on 2017.03.28
 * Copyright (c) 2017 Andy Likuski
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

import * as R from 'ramda';
import {mergeDeep} from 'rescape-ramda';
const environment = process.env.NODE_ENV;

/**
 * The active environment according to env.js
 * @params {String} env Defaults to the environment string value in {ROOT_DIR}/env.js.
 * Overrideable for testing
 * @type {any|*}
 */
export const getCurrentConfig = (env = environment) => R.cond(
  [
    [R.equals('test'), () => require('testFiles/belgium/belgiumConfig').belgiumConfig],
    [R.equals('development'), () => require('testFiles/california/californiaConfig').californiaConfig],
    [R.equals('production'), () => {
 throw new Error('No production environment is implemented');
}],
    [R.T, () => {
 throw new Error('No known environment was specified in env.js');
}]
  ]
)(env);

/**
 * Resolves the current configuration based on the userSettings
 * This will all be dynamic eventually, not file based configuration
 * @param {Object} localSettings Default {}. Any localSettings that need to be deep merged into the conifg
 * @returns {Object} The resolved config
 */
export const currentConfigResolver = (localSettings = {}) => mergeDeep(getCurrentConfig(), localSettings);
