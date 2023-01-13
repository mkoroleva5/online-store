import { render, screen } from '@testing-library/react';
import { Footer } from './Footer';

describe('Footer tests', () => {
  beforeEach(() => {
    render(<Footer />);
  });
  it('loads and displays github links', () => {
    expect(screen.getByRole('link', { name: /mooncitizenx/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /mkoroleva5/i })).toBeInTheDocument();
  });
  it('loads and displays rs school link', () => {
    expect(screen.getByRole('link', { name: /rolling scopes school/i })).toBeInTheDocument();
  });
});
