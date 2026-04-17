import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Card } from './Card';

describe('Card', () => {
  it('should render children', () => {
    render(
      <Card>
        <div>Card content</div>
      </Card>,
    );
    expect(screen.getByText('Card content')).toBeInTheDocument();
  });

  it('should render with default styling', () => {
    const { container } = render(
      <Card>
        <div>Content</div>
      </Card>,
    );
    const card = container.firstChild as HTMLElement;
    expect(card).toBeInTheDocument();
    expect(card.className).toBeTruthy();
  });

  it('should render multiple children', () => {
    render(
      <Card>
        <h1>Title</h1>
        <p>Description</p>
        <button>Action</button>
      </Card>,
    );
    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('Description')).toBeInTheDocument();
    expect(screen.getByText('Action')).toBeInTheDocument();
  });

  it('should render as a div element', () => {
    const { container } = render(<Card>Content</Card>);
    expect(container.firstChild?.nodeName).toBe('DIV');
  });
});
