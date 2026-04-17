import { describe, it, expect } from 'vitest';
import { getProjectDetailsLink } from './navigation.helper';
import { ROUTES } from '@/shared/constants/routes';

describe('navigation.helper', () => {
  describe('getProjectDetailsLink', () => {
    it('should generate correct project details link', () => {
      const projectId = 'project-123';
      const link = getProjectDetailsLink(projectId);
      expect(link).toBe(`${ROUTES.PROJECTS}/project-123`);
    });

    it('should handle different project IDs', () => {
      expect(getProjectDetailsLink('abc')).toBe(`${ROUTES.PROJECTS}/abc`);
      expect(getProjectDetailsLink('123')).toBe(`${ROUTES.PROJECTS}/123`);
      expect(getProjectDetailsLink('project-xyz')).toBe(
        `${ROUTES.PROJECTS}/project-xyz`,
      );
    });

    it('should handle empty string', () => {
      const link = getProjectDetailsLink('');
      expect(link).toBe(`${ROUTES.PROJECTS}/`);
    });

    it('should handle special characters in ID', () => {
      const link = getProjectDetailsLink('project-with-dashes');
      expect(link).toBe(`${ROUTES.PROJECTS}/project-with-dashes`);
    });
  });
});
