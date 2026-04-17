import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Container } from './Container';

describe('Container', () => {
  it('should render children', () => {
    render(
      <Container>
        <div>Container content</div>
      </Container>,
    );
    expect(screen.getByText('Container content')).toBeInTheDocument();
  });

  it('should apply custom className', () => {
    const { container } = render(
      <Container className="custom-container">
        <div>Content</div>
      </Container>,
    );
    const containerElement = container.firstChild as HTMLElement;
    expect(containerElement.className).toContain('custom-container');
  });

  it('should render multiple children', () => {
    render(
      <Container>
        <h1>Header</h1>
        <p>Paragraph</p>
        <footer>Footer</footer>
      </Container>,
    );
    expect(screen.getByText('Header')).toBeInTheDocument();
    expect(screen.getByText('Paragraph')).toBeInTheDocument();
    expect(screen.getByText('Footer')).toBeInTheDocument();
  });

  it('should render as a div element', () => {
    const { container } = render(<Container>Content</Container>);
    expect(container.firstChild?.nodeName).toBe('DIV');
  });

  it('should accept maxWidth prop', () => {
    const { container } = render(
      <Container maxWidth="md">
        <div>Content</div>
      </Container>,
    );
    expect(container.firstChild).toBeInTheDocument();
  });
});
