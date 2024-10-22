import React from 'react'
import { render, fireEvent } from '@testing-library/react';
import Input from './Input';

describe('Input Component', () => {
  it('renders input with label', () => {
    const { getByLabelText } = render(
      <Input
        id='username'
        type='text'
        value=''
        onChange={() => {}}
        label='Username'
        required={true}
      />
    );
    
    expect(getByLabelText(/username/i)).toBeInTheDocument();
  });

  it('calls onChange function when input value changes', () => {
    const handleChange = vi.fn();
    const { getByLabelText } = render(
      <Input
        id='username'
        type='text'
        value=''
        onChange={handleChange}
        label='Username'
        required={true}
      />
    );
    
    fireEvent.change(getByLabelText(/username/i), { target: { value: 'testuser' } });
    expect(handleChange).toHaveBeenCalled();
  });
  
  it('renders password strength message when strength is provided', () => {
    const { getByText } = render(
      <Input
        id='password'
        type='password'
        value='strongPassword'
        onChange={() => {}}
        label='Password'
        required={true}
        strength='Strong'
        strengthClass='strongClass'
      />
    );
    
    expect(getByText(/strong/i)).toBeInTheDocument();
  });
});
