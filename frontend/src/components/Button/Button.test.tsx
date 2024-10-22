import React from 'react'
import { render, fireEvent } from '@testing-library/react';
import Button from './Button';

describe('Button Component', () => {
  it('renders the button with children', () => {
    const { getByText } = render(<Button>Click Me</Button>);
    expect(getByText('Click Me')).toBeInTheDocument();
  });

  it('executes onClick when clicked', () => {
    const handleClick = vi.fn();
    const { getByText } = render(<Button onClick={handleClick}>Click Me</Button>);
    
    fireEvent.click(getByText('Click Me'));
    expect(handleClick).toHaveBeenCalled();
  });

  it('renders the button with the correct type', () => {
    const { getByRole } = render(<Button type="submit">Submit</Button>);
    expect(getByRole('button')).toHaveAttribute('type', 'submit');
  });
});
