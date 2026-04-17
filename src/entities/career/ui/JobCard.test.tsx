import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import { JobCard } from './JobCard';
import { renderWithProviders } from '@/test/test-utils.tsx.tsx';
import { ROUTES } from '@/shared/constants/routes';

describe('JobCard', () => {
  const defaultProps = {
    title: 'Software Engineer',
    description: 'Full-time position for experienced developer',
  };

  it('should render job title', () => {
    renderWithProviders(<JobCard {...defaultProps} />);
    expect(screen.getByText('Software Engineer')).toBeInTheDocument();
  });

  it('should render job description', () => {
    renderWithProviders(<JobCard {...defaultProps} />);
    expect(
      screen.getByText('Full-time position for experienced developer'),
    ).toBeInTheDocument();
  });

  it('should render apply button', () => {
    renderWithProviders(<JobCard {...defaultProps} />);
    expect(screen.getByText('careers.applyTitle')).toBeInTheDocument();
  });

  it('should have link to contact page', () => {
    renderWithProviders(<JobCard {...defaultProps} />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', ROUTES.CONTACT);
  });

  it('should pass job title in link state', () => {
    const { container } = renderWithProviders(<JobCard {...defaultProps} />);
    const link = container.querySelector('a');
    expect(link).toBeInTheDocument();
  });

  it('should render with different job titles', () => {
    const { rerender } = renderWithProviders(<JobCard {...defaultProps} />);
    expect(screen.getByText('Software Engineer')).toBeInTheDocument();

    rerender(
      <JobCard
        title="Product Manager"
        description="Lead product development"
      />,
    );
    expect(screen.getByText('Product Manager')).toBeInTheDocument();
  });

  it('should have tabIndex -1 on link', () => {
    renderWithProviders(<JobCard {...defaultProps} />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('tabIndex', '-1');
  });
});
