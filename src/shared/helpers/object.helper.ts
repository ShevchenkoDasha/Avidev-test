import cloneDeep from 'lodash/fp/cloneDeep';
import defaultsDeep from 'lodash/fp/defaultsDeep';
import flow from 'lodash/fp/flow';

import type { RecursivePartialModel } from '@/shared/types/recursive-partial.types';

export const deepObjectMerge = <T>(
  defaultObject: T,
  partialObject: RecursivePartialModel<T>,
): T => {
  return flow(cloneDeep, defaultsDeep(defaultObject))(partialObject);
};
