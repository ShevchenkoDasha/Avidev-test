import { screen } from '@testing-library/react';
import { describe, expect, it, beforeEach, vi } from 'vitest';

import { ProjectsPreview } from './ProjectsPreview';
import { useProjects } from '@/entities/project';
import { renderWithProviders } from '@/test/test-utils.tsx';
import { PROJECTS } from '../../../test/mocks/projects';

vi.mock('@/entities/project', () => ({
  useProjects: vi.fn(),
}));

vi.mock('@/entities/project/ui', () => ({
  ProjectCard: ({
    title,
    description,
    id,
  }: {
    title: string;
    description: string;
    id: string;
  }) => (
    <div data-testid={`project-card-${id}`}>
      <span>{title}</span>
      <span>{description}</span>
    </div>
  ),
}));

const mockedUseProjects = vi.mocked(useProjects);

describe('ProjectsPreview', () => {
  beforeEach(() => {
    mockedUseProjects.mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: false,
      error: null,
      isFetching: false,
    } as any);
  });

  it('renders title and view all button', () => {
    renderWithProviders(<ProjectsPreview />);

    expect(
      screen.getByRole('heading', { name: 'projectPreview.title' }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole('button', { name: 'projectPreview.viewAllButton' }),
    ).toBeInTheDocument();
  });

  it('renders loading state', () => {
    mockedUseProjects.mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
      error: null,
      isFetching: false,
    } as any);

    renderWithProviders(<ProjectsPreview />);

    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('renders error state', () => {
    mockedUseProjects.mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: true,
      error: new Error('projects.loadError'),
      isFetching: false,
    } as any);

    renderWithProviders(<ProjectsPreview />);

    expect(screen.getByText('projects.loadError')).toBeInTheDocument();
  });

  it('renders project cards from data', () => {
    mockedUseProjects.mockReturnValue({
      data: PROJECTS,
      isLoading: false,
      isError: false,
      error: null,
      isFetching: false,
    } as any);

    renderWithProviders(<ProjectsPreview />);

    expect(
      screen.getByTestId('project-card-delivery-drones'),
    ).toBeInTheDocument();
    expect(screen.getByText('Delivery Drones')).toBeInTheDocument();
    expect(
      screen.getByText('Development of autonomous delivery drones'),
    ).toBeInTheDocument();

    expect(screen.getByTestId('project-card-recon-drones')).toBeInTheDocument();
    expect(screen.getByText('Recon Drones')).toBeInTheDocument();
    expect(
      screen.getByText('Surveillance drones for military operations'),
    ).toBeInTheDocument();
  });

  it('renders link to projects page', () => {
    renderWithProviders(<ProjectsPreview />);

    const viewAllLink = screen.getByRole('link');
    expect(viewAllLink).toHaveAttribute('href', '/projects');
  });
});
