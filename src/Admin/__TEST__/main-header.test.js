import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import {MainHeader} from '../MainHeader';

describe('MainHeader Component', () => {
  test('should render content correctly', () => {
    render(
      <MainHeader>
        <button data-testid="helloBtn">Hello</button>
        <span>Hello2</span>
      </MainHeader>
    );
    expect(screen.getByTestId('helloBtn')).toBeInTheDocument();
    expect(screen.getByText('Hello2')).toBeInTheDocument();
  });
});
