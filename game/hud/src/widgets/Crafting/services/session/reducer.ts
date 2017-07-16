/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * @Author: Mehuge (mehuge@sorcerer.co.uk)
 * @Date: 2017-05-03 20:46:41
 * @Last Modified by: Mehuge (mehuge@sorcerer.co.uk)
 * @Last Modified time: 2017-05-17 20:48:46
 */


import { combineReducers } from 'redux';

import ui, { UIState } from './ui';
import job, { JobState } from './job';
import recipes, { RecipesState } from './recipes';
import templates, { TemplatesState } from './templates';

export {
  UIState,
  JobState,
  RecipesState,
  TemplatesState,
};

export default combineReducers({
  ui,
  job,
  recipes,
  templates,
});

export interface GlobalState {
  ui: UIState;
  job: JobState;
  recipes: RecipesState;
  templates: TemplatesState;
}