import { render, screen } from '@testing-library/react';
import { Stats } from './Stats';

describe('Stats', () => {
  it('should render stats values and translation keys', () => {
    render(<Stats />);

    expect(screen.getByText('1200+')).toBeInTheDocument();
    expect(screen.getByText('50+')).toBeInTheDocument();
    expect(screen.getByText('3000+')).toBeInTheDocument();

    expect(screen.getByText('stats.drones')).toBeInTheDocument();
    expect(screen.getByText('stats.missions')).toBeInTheDocument();
    expect(screen.getByText('stats.donations')).toBeInTheDocument();
  });
});
