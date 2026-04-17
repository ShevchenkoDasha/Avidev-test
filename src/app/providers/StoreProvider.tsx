import { memo } from 'react';
import type { ReactNode } from 'react';
import { Provider } from 'react-redux';

import { store } from '../store/store';

interface PropsModel {
  children: ReactNode;
}

const StoreProvider = memo((props: PropsModel) => {
  return <Provider store={store}>{props.children}</Provider>;
});

StoreProvider.displayName = 'StoreProvider';

export default StoreProvider;
