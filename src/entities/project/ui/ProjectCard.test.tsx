import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ProjectCard } from './ProjectCard';
import { renderWithProviders } from '@/test/test-utils.tsx.tsx';

const mockNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('ProjectCard', () => {
  const defaultProps = {
    id: 'project-1',
    title: 'Test Project',
    description: 'Test project description',
    imageTitle: 'drone.webp',
    progress: 75,
  };

  it('should render project title', () => {
    renderWithProviders(<ProjectCard {...defaultProps} />, {
      withRouter: false,
    });
    expect(screen.getByText('Test Project')).toBeInTheDocument();
  });

  it('should render project description', () => {
    renderWithProviders(<ProjectCard {...defaultProps} />, {
      withRouter: false,
    });
    expect(screen.getByText('Test project description')).toBeInTheDocument();
  });

  it('should render project image with correct src', () => {
    renderWithProviders(<ProjectCard {...defaultProps} />, {
      withRouter: false,
    });
    const image = screen.getByAltText('Test Project') as HTMLImageElement;
    expect(image).toBeInTheDocument();
    expect(image.src).toContain('/images/drone.webp');
  });

  it('should render progress bar', () => {
    renderWithProviders(<ProjectCard {...defaultProps} />, {
      withRouter: false,
    });
    const progressElement = screen.getByTestId('progressbar');
    expect(progressElement).toBeInTheDocument();
  });

  it('should render details button', () => {
    renderWithProviders(<ProjectCard {...defaultProps} />, {
      withRouter: false,
    });
    expect(screen.getByText('projectCart.detailsButton')).toBeInTheDocument();
  });

  it('should navigate to project details on button click', async () => {
    const user = userEvent.setup();
    renderWithProviders(<ProjectCard {...defaultProps} />, {
      withRouter: false,
    });

    const button = screen.getByText('projectCart.detailsButton');
    await user.click(button);

    expect(mockNavigate).toHaveBeenCalledWith('/projects/project-1');
  });

  it('should render with different progress values', () => {
    const { rerender } = renderWithProviders(
      <ProjectCard {...defaultProps} progress={50} />,
      { withRouter: false },
    );

    let progressElement = screen.getByTestId('progressbar');
    expect(progressElement).toBeInTheDocument();

    rerender(<ProjectCard {...defaultProps} progress={100} />);
    progressElement = screen.getByTestId('progressbar');
    expect(progressElement).toBeInTheDocument();
  });

  it('should have lazy loading on image', () => {
    renderWithProviders(<ProjectCard {...defaultProps} />, {
      withRouter: false,
    });

    const image = screen.getByAltText('Test Project');

    expect(image).toHaveAttribute('loading', 'lazy');
  });

  it('should have async decoding on image', () => {
    renderWithProviders(<ProjectCard {...defaultProps} />, {
      withRouter: false,
    });

    const image = screen.getByAltText('Test Project');

    expect(image).toHaveAttribute('decoding', 'async');
  });
});
