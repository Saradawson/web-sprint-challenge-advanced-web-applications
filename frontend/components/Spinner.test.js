import App from './App';
import React from 'react';
import Spinner from './Spinner';
import { render, screen, fireEvent } from '@testing-library/react'; 
import '@testing-library/jest-dom/extend-expect';

// Import the Spinner component into this file and test
// that it renders what it should for the different props it can take.
test('sanity', () => {
  expect(true).toBe(true);
})

test('renders spinner without errors', () => {
  render(<Spinner />);
})

test('spinner renders when on', () => {
  render(<Spinner on={true}/>);
  const spinner = screen.getByText(/please wait.../i)
  expect(spinner).toBeInTheDocument();

})

test('spinner not visable when off', () => {
  render(<Spinner on={false}/>);
  const spinner = screen.queryByText(/please wait.../i);
  expect(spinner).toBe(null);
})
