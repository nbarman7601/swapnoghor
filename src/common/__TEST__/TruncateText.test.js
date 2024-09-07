import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // for extra matchers like toBeInTheDocument
import TruncateText from '../TruncateText';


describe('TruncateText Component', () => {
  test('renders the full text if it is less than or equal to 30 characters', () => {
    const text = 'This is a short text.';
    const { getByText } = render(<TruncateText text={text} />);
    
    expect(getByText(text)).toBeInTheDocument();
  });

  test('renders the truncated text with ellipsis if it exceeds 30 characters', () => {
    const text = 'This is a very long text that should be truncated.';
    const expectedText = 'This is a very long text that ...';
    const { getByText } = render(<TruncateText text={text} />);
    
    expect(getByText(expectedText)).toBeInTheDocument();
  });

  test('renders an empty span when the text is empty', () => {
    const text = '';
    const { container } = render(<TruncateText text={text} />);
    
    expect(container.firstChild).toBeEmptyDOMElement();
  });
});
