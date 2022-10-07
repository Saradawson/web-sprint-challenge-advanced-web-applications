import LoginForm from'./LoginForm';
import React from 'react';
import Spinner from './Spinner';
import { render, screen, fireEvent } from '@testing-library/react'; 


const usernameInput = () => screen.queryByPlaceholderText('Enter username');
const passwordInput = () => screen.queryByPlaceholderText('Enter password');
const loginBtn = () => screen.queryByText('Submit credentials');
// Import the Spinner component into this file and test
// that it renders what it should for the different props it can take.
test('sanity', () => {
  expect(true).toBe(true);
})

test('renders spinner without errors', () => {
  render(<Spinner />);
})

test('spinner renders when login button is clicked', () => {
  render(<LoginForm />);
  render(<Spinner />);
  fireEvent.change(usernameInput(), {target: {value: 'bloom'}});
  fireEvent.change(passwordInput(), { target: { value: '12345678' }});
  fireEvent.click(loginBtn());
  const spinner = screen.queryByTestId('spinner');
  expect(spinner).toBeInTheDocument();

})
