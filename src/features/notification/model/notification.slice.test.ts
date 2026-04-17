import { describe, it, expect } from 'vitest';
import {
  notificationSlice,
  notificationInitialState,
} from './notification.slice';
import type { NotificationDataModel } from './notification.slice.types';
import { ToastTypeEnum } from '@/shared/ui/toast/Toast.types';

const { reducer, actions } = notificationSlice;

describe('notificationSlice', () => {
  describe('initial state', () => {
    it('should have correct initial state', () => {
      expect(notificationInitialState).toEqual({
        data: null,
      });
    });
  });

  describe('reducers', () => {
    it('should handle setNotification with notification data', () => {
      const notification: NotificationDataModel = {
        ariaLabel: 'Test notification',
        text: 'Test notification message',
        type: ToastTypeEnum.SUCCESS,
      };

      const newState = reducer(
        notificationInitialState,
        actions.setNotification(notification),
      );

      expect(newState.data).toEqual(notification);
    });

    it('should handle setNotification with null to clear notification', () => {
      const stateWithNotification = {
        data: {
          ariaLabel: 'Test notification',
          text: 'Test notification message',
          type: ToastTypeEnum.SUCCESS,
        },
      };

      const newState = reducer(
        stateWithNotification,
        actions.setNotification(null),
      );

      expect(newState.data).toBeNull();
    });

    it('should handle setNotification with warning type', () => {
      const notification: NotificationDataModel = {
        ariaLabel: 'Warning',
        text: 'Warning message',
        type: ToastTypeEnum.WARNING,
      };

      const newState = reducer(
        notificationInitialState,
        actions.setNotification(notification),
      );

      expect(newState.data).toEqual(notification);
      expect(newState.data?.type).toBe(ToastTypeEnum.WARNING);
    });

    it('should handle setNotification with info type', () => {
      const notification: NotificationDataModel = {
        ariaLabel: 'Info',
        text: 'Info message',
        type: ToastTypeEnum.INFO,
      };

      const newState = reducer(
        notificationInitialState,
        actions.setNotification(notification),
      );

      expect(newState.data).toEqual(notification);
      expect(newState.data?.type).toBe(ToastTypeEnum.INFO);
    });

    it('should override previous notification when setting new one', () => {
      const firstNotification: NotificationDataModel = {
        ariaLabel: 'First',
        text: 'First notification',
        type: ToastTypeEnum.INFO,
      };

      const secondNotification: NotificationDataModel = {
        ariaLabel: 'Second',
        text: 'Second notification',
        type: ToastTypeEnum.SUCCESS,
      };

      let state = reducer(
        notificationInitialState,
        actions.setNotification(firstNotification),
      );
      expect(state.data).toEqual(firstNotification);

      state = reducer(state, actions.setNotification(secondNotification));
      expect(state.data).toEqual(secondNotification);
      expect(state.data?.text).toBe('Second notification');
    });
  });
});
