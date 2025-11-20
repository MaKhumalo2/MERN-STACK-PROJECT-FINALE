import { render, screen } from '@testing-library/react';
import Button from './Button';

test('renders button with text', (Button) => {
    render(<Button text='Click me' />);
    const buttonElement = screen.getByText(/Click me/i);
    expect(buttonElement).toBeInTheDocument();
});
