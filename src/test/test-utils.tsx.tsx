import {
  type FC,
  Fragment,
  type PropsWithChildren,
  type ReactElement,
  type ReactNode,
} from 'react';
import { type Store } from 'redux';
import { MemoryRouter } from 'react-router-dom';
import { render, type RenderOptions, renderHook } from '@testing-library/react';
import { Provider } from 'react-redux';
import { vi } from 'vitest';
import userEvent from '@testing-library/user-event';

import type { RootState } from '@/app/store/rootReducer';
import { createStore } from '@/app/store/store';
import {
  QueryClient,
  QueryClientProvider as ReactQueryClientProvider,
} from '@tanstack/react-query';

type WrapperPropType = {
  children: ReactNode;
};

// type ExtendedOptions = {
//   preloadedState?: PreloadedState<RootState>;
//   route?: string;
// } & Omit<RenderOptions, "wrapper">;

// export function renderWithProviders(
//   ui: ReactElement,
//   {
//     preloadedState,
//     route = "/",
//     ...renderOptions
//   }: ExtendedOptions = {}
// ) {
//   const store = createTestStore(preloadedState);

//   function Wrapper({ children }: PropsWithChildren) {
//     return (
//       <Provider store={store}>
//         <MemoryRouter initialEntries={[route]}>{children}</MemoryRouter>
//       </Provider>
//     );
//   }

//   return {
//     store,
//     ...render(ui, { wrapper: Wrapper, ...renderOptions }),
//   };
// }

export const createReduxState = (state: Partial<RootState>) => state;

export const createMockStore = (initialMockState?: Partial<RootState>) => {
  const store = createStore(initialMockState as RootState);

  vi.spyOn(store, 'dispatch');

  return store;
};

// export function renderWithUserEventSetup(jsx: React.ReactElement, options?: Omit<RenderOptions, 'queries'>) {
//     return {
//         user: userEvent.setup(),
//         ...render(jsx, options),
//     };
// }

// export function renderWithStore(jsx: React.ReactElement, mockStore: any = createMockStore()) {
//     return renderWithUserEventSetup(<Provider store={mockStore}>{jsx}</Provider>);
// }

// export function renderWithRoute(
//   jsx: React.ReactElement,
//   {
//     store,
//     path,
//     route = "/",
//   }: {
//     store?: Store;
//     route?: string;
//     path?: string;
//   } = {},
// ) {
//   const ui = (
//     <MemoryRouter initialEntries={[route]}>
//       {path ? (
//         <Routes>
//           <Route path={path} element={jsx} />
//         </Routes>
//       ) : (
//         jsx
//       )}
//     </MemoryRouter>
//   );

//   return store ? renderWithStore(ui, store) : renderWithUserEventSetup(ui);
// }

// export function renderHookWithStore<T>(hookFn: any, mockStore: Store<RootState> = createMockStore(), initialProps: any = {}, CustomWrapper: FC<any> = Fragment) {
//     return renderHook<T, T>(hookFn, {
//         wrapper: ({ children }: WrapperPropType) => (
//             <Provider store={mockStore}>
//                 <CustomWrapper>
//                     {children}
//                 </CustomWrapper>
//             </Provider>
//         ),
//         initialProps,
//     });
// }

export function renderHookWithStore<TResult>(
  hookFn: () => TResult,
  mockStore: Store<RootState> = createMockStore(),
  CustomWrapper: FC<{ children: ReactNode }> = Fragment,
) {
  return renderHook(hookFn, {
    wrapper: ({ children }: WrapperPropType) => (
      <Provider store={mockStore}>
        <CustomWrapper>{children}</CustomWrapper>
      </Provider>
    ),
  });
}

type ExtendedOptions = {
  store?: ReturnType<typeof createMockStore>;
  route?: string;
  withRouter?: boolean;
} & Omit<RenderOptions, 'wrapper'>;

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });

export function renderWithProviders(
  ui: ReactElement,
  {
    store = createMockStore(),
    route = '/',
    withRouter = true,
    ...options
  }: ExtendedOptions = {},
) {
  const queryClient = createTestQueryClient();

  const Wrapper = ({ children }: PropsWithChildren) => {
    const content = withRouter ? (
      <MemoryRouter initialEntries={[route]}>{children}</MemoryRouter>
    ) : (
      children
    );

    return (
      <Provider store={store}>
        <ReactQueryClientProvider client={queryClient}>
          {content}
        </ReactQueryClientProvider>
      </Provider>
    );
  };

  return {
    user: userEvent.setup(),
    store,
    ...render(ui, { wrapper: Wrapper, ...options }),
  };
}
