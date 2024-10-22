import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import RegisterPage from './RegisterPage';
import { useRegister } from '../../services/authServices';

vi.mock('../../services/authService');

describe('RegisterPage Component', () => {
  it('renders the registration form correctly', () => {
    const { getByLabelText, getByRole } = render(
      <MemoryRouter>
        <RegisterPage />
      </MemoryRouter>
    );

    expect(getByLabelText(/username/i)).toBeInTheDocument();
    expect(getByLabelText(/password/i)).toBeInTheDocument();
    expect(getByLabelText(/confirm password/i)).toBeInTheDocument();
    expect(getByRole('button', { name: /sign up/i })).toBeInTheDocument();
  });

  it('allows user to type in username, password, and confirm password fields', () => {
    const { getByLabelText } = render(
      <MemoryRouter>
        <RegisterPage />
      </MemoryRouter>
    );

    const usernameInput = getByLabelText(/username/i);
    const passwordInput = getByLabelText(/password/i);
    const confirmPasswordInput = getByLabelText(/confirm password/i);

    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(passwordInput, { target: { value: 'testpass' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'testpass' } });

    expect(usernameInput).toHaveValue('testuser');
    expect(passwordInput).toHaveValue('testpass');
    expect(confirmPasswordInput).toHaveValue('testpass');
  });

  it('shows error when passwords do not match', () => {
    const { getByLabelText, getByRole, getByText } = render(
      <MemoryRouter>
        <RegisterPage />
      </MemoryRouter>
    );

    fireEvent.change(getByLabelText(/password/i), { target: { value: 'password1' } });
    fireEvent.change(getByLabelText(/confirm password/i), { target: { value: 'password2' } });

    fireEvent.click(getByRole('button', { name: /sign up/i }));

    expect(getByText(/passwords do not match/i)).toBeInTheDocument();
  });

  it('calls register function when passwords match and form is submitted', async () => {
    const mockRegister = vi.fn();
    useRegister.mockReturnValue({ register: mockRegister });

    const { getByLabelText, getByRole } = render(
      <MemoryRouter>
        <RegisterPage />
      </MemoryRouter>
    );

    fireEvent.change(getByLabelText(/username/i), { target: { value: 'testuser' } });
    fireEvent.change(getByLabelText(/password/i), { target: { value: 'testpass' } });
    fireEvent.change(getByLabelText(/confirm password/i), { target: { value: 'testpass' } });

    fireEvent.click(getByRole('button', { name: /sign up/i }));

    await waitFor(() => {
      expect(mockRegister).toHaveBeenCalledWith('testuser', 'testpass');
    });
  });
});
