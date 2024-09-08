import { render, screen } from '@testing-library/react';
import App from './App';
import { act } from 'react';

test('App component should render', () => {
      render(<App/>)

   const text = screen.getByText(/Login/i);
   expect(text).toBeInTheDocument();
});
