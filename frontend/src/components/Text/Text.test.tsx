import React from 'react'
import { render } from '@testing-library/react';
import Text from './Text';

describe('Text Component', () => {
  it('renders text content', () => {
    const { getByText } = render(<Text>Sample Text</Text>);
    expect(getByText('Sample Text')).toBeInTheDocument();
  });

  it('applies the correct className', () => {
    const { container } = render(<Text className="testClass">Sample Text</Text>);
    expect(container.firstChild).toHaveClass('testClass');
  });
});
