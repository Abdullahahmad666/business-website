import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import App from './App.jsx';

// App renders <Routes> directly, so it must be wrapped in a router.
const renderAt = (path) =>
  render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>
  );

test('renders the home route without crashing', () => {
  renderAt('/');
  expect(screen.getAllByRole('link').length).toBeGreaterThan(0);
});

test('renders the contact route with a message field', () => {
  const { container } = renderAt('/contact');
  expect(container.querySelector('textarea[name="message"]')).toBeInTheDocument();
});

test('resolves a :category param on the subcategory route', () => {
  renderAt('/categories/cars');
  expect(screen.getByText('USED CARS')).toBeInTheDocument();
});
