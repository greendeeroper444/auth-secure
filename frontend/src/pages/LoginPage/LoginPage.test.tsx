import React from 'react'
import { render, fireEvent } from '@testing-library/react';
import LoginPage from './LoginPage';

describe('LoginPage Component', () => {
  it('renders the login form correctly', () => {
    const { getByLabelText, getByRole } = render(<LoginPage />);
    
    expect(getByLabelText(/username/i)).toBeInTheDocument();
    expect(getByLabelText(/password/i)).toBeInTheDocument();
    expect(getByRole('button', { name: /login/i })).toBeInTheDocument(); //target the button using role
  });

  it('allows user to type in username and password fields', () => {
    const { getByLabelText } = render(<LoginPage />);
    
    const usernameInput = getByLabelText(/username/i);
    const passwordInput = getByLabelText(/password/i);

    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(passwordInput, { target: { value: 'testpass' } });

    expect(usernameInput.value).toBe('testuser');
    expect(passwordInput.value).toBe('testpass');
  });

  it('handles form submission', () => {
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    const { getByLabelText, getByRole } = render(<LoginPage />);
    
    fireEvent.change(getByLabelText(/username/i), { target: { value: 'testuser' } });
    fireEvent.change(getByLabelText(/password/i), { target: { value: 'testpass' } });

    fireEvent.click(getByRole('button', { name: /login/i })); //click the button using role

    expect(consoleSpy).toHaveBeenCalledWith('Username:', 'testuser');
    expect(consoleSpy).toHaveBeenCalledWith('Password:', 'testpass');

    consoleSpy.mockRestore(); //restore original console.log
  });
})
