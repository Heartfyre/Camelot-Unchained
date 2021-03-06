/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */


import { combineReducers } from 'redux';

import ui, { UIState } from './ui';
import job, { JobState } from './job';
import recipes, { RecipesState } from './recipes';

export {
  UIState,
  JobState,
  RecipesState,
};

export default combineReducers({
  ui,
  job,
  recipes,
});

export interface GlobalState {
  ui: UIState;
  job: JobState;
  recipes: RecipesState;
}
