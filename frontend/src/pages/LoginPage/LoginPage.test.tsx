import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import LoginPage from './LoginPage';

describe('LoginPage Component', () => {
  it('renders the login form correctly', () => {
    const { getByLabelText, getByRole } = render(
      <MemoryRouter> {/* wrap component in MemoryRouter */}
        <LoginPage />
      </MemoryRouter>
    );
    
    expect(getByLabelText(/username/i)).toBeInTheDocument();
    expect(getByLabelText(/password/i)).toBeInTheDocument();
    expect(getByRole('button', { name: /sign up/i })).toBeInTheDocument(); // update button name
  });

  it('allows user to type in username and password fields', () => {
    const { getByLabelText } = render(
      <MemoryRouter> {/* wrap component in MemoryRouter */}
        <LoginPage />
      </MemoryRouter>
    );
    
    const usernameInput = getByLabelText(/username/i);
    const passwordInput = getByLabelText(/password/i);

    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(passwordInput, { target: { value: 'testpass' } });

    expect(usernameInput).toHaveValue('testuser');
    expect(passwordInput).toHaveValue('testpass');
  });

  it('handles form submission', () => {
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    const { getByLabelText, getByRole } = render(
      <MemoryRouter> {/* wrap component in MemoryRouter */}
        <LoginPage />
      </MemoryRouter>
    );
    
    fireEvent.change(getByLabelText(/username/i), { target: { value: 'testuser' } });
    fireEvent.change(getByLabelText(/password/i), { target: { value: 'testpass' } });

    fireEvent.click(getByRole('button', { name: /sign up/i })); //update button name

    expect(consoleSpy).toHaveBeenCalledWith('Username:', 'testuser');
    expect(consoleSpy).toHaveBeenCalledWith('Password:', 'testpass');

    consoleSpy.mockRestore();
  });
});
