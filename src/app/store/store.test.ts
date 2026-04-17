import { describe, it, expect } from 'vitest';
import { createStore } from './store';
import {
  authSliceName,
  authInitialState,
} from '@/features/auth/model/auth.slice';
import {
  notificationSliceName,
  notificationInitialState,
} from '@/features/notification/model/notification.slice';
import {
  localeSliceName,
  localeInitialState,
} from '@/features/locale/model/locale.slice';

describe('Store Configuration', () => {
  describe('createStore', () => {
    it('should create store with default initial state', () => {
      const store = createStore();
      const state = store.getState();

      expect(state).toHaveProperty(authSliceName);
      expect(state).toHaveProperty(notificationSliceName);
      expect(state).toHaveProperty(localeSliceName);
    });

    it('should have correct initial state for auth slice', () => {
      const store = createStore();
      const state = store.getState();

      expect(state[authSliceName]).toEqual(authInitialState);
    });

    it('should have correct initial state for notification slice', () => {
      const store = createStore();
      const state = store.getState();

      expect(state[notificationSliceName]).toEqual(notificationInitialState);
    });

    it('should have correct initial state for locale slice', () => {
      const store = createStore();
      const state = store.getState();

      expect(state[localeSliceName]).toEqual(localeInitialState);
    });

    it('should accept preloaded state for auth', () => {
      const preloadedState = {
        [authSliceName]: {
          isAuthenticated: true,
          admin: {
            id: 'test-id',
            email: 'test@example.com',
            name: 'Test User',
          },
          loading: false,
          error: null,
        },
      };

      const store = createStore(preloadedState);
      const state = store.getState();

      expect(state[authSliceName].isAuthenticated).toBe(true);
      expect(state[authSliceName].admin?.email).toBe('test@example.com');
    });

    it('should accept partial preloaded state', () => {
      const preloadedState = {
        [authSliceName]: {
          isAuthenticated: true,
        },
      };

      const store = createStore(preloadedState);
      const state = store.getState();

      expect(state[authSliceName].isAuthenticated).toBe(true);
      expect(state[authSliceName].admin).toBeNull();
      expect(state[authSliceName].loading).toBe(true);
    });

    it('should merge preloaded state with initial state', () => {
      const preloadedState = {
        [notificationSliceName]: {
          data: {
            ariaLabel: 'Test',
            text: 'Test notification',
            type: 'success' as const,
          },
        },
      };

      const store = createStore(preloadedState);
      const state = store.getState();

      expect(state[notificationSliceName].data).toEqual({
        ariaLabel: 'Test',
        text: 'Test notification',
        type: 'success',
      });

      expect(state[authSliceName]).toEqual(authInitialState);
    });

    it('should allow dispatching actions', () => {
      const store = createStore();

      store.dispatch({
        type: `${notificationSliceName}/setNotification`,
        payload: {
          ariaLabel: 'Test',
          text: 'Test message',
          type: 'info',
        },
      });

      const state = store.getState();
      expect(state[notificationSliceName].data).toEqual({
        ariaLabel: 'Test',
        text: 'Test message',
        type: 'info',
      });
    });

    it('should have dispatch method', () => {
      const store = createStore();
      expect(store.dispatch).toBeDefined();
      expect(typeof store.dispatch).toBe('function');
    });

    it('should have getState method', () => {
      const store = createStore();
      expect(store.getState).toBeDefined();
      expect(typeof store.getState).toBe('function');
    });

    it('should have subscribe method', () => {
      const store = createStore();
      expect(store.subscribe).toBeDefined();
      expect(typeof store.subscribe).toBe('function');
    });
  });
});
