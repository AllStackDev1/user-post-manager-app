import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '../test-utils';
import userEvent from '@testing-library/user-event';
import Users from '../../pages/Users';

// Mock the API service
vi.mock('../../services/api', () => ({
  api: {
    getUsers: vi.fn(),
  },
}));

// Mock react-router-dom
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

import { api } from '../../services/api';

const mockGetUsers = api.getUsers as vi.MockedFunction<typeof api.getUsers>;

describe('Users Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockGetUsers.mockClear();
  });

  const mockUserData = {
    data: [
      {
        id: '1',
        name: 'John Doe',
        username: 'johndoe',
        email: 'john@example.com',
        phone: '123-456-7890',
        address: {
          street: '123 Main St',
          city: 'Anytown',
          state: 'CA',
          zipcode: '12345',
        },
      },
    ],
    total: 1,
    pageNumber: 1,
    pageSize: 4,
    totalPages: 1,
  };

  it('displays loading state correctly', async () => {
    mockGetUsers.mockImplementation(() => new Promise(() => {})); // Never resolves

   const { container } = render(<Users />);
    await waitFor(() => {
      const loader = document.querySelector('.animate-bounce');
      expect(loader).toBeInTheDocument();
    });

    // Query all elements with the class
    const elements = container.querySelectorAll('.animate-bounce');
    expect(elements.length).toBeGreaterThan(0);
  });

  it('displays error state correctly', async () => {
    mockGetUsers.mockRejectedValue(new Error('Failed to fetch users'));

    render(<Users />);

    await waitFor(() => {
      expect(screen.getByText('Error Loading Users')).toBeInTheDocument();
    });

    expect(screen.getByText('Retry')).toBeInTheDocument();
  });

  it('displays data state correctly', async () => {
    mockGetUsers.mockResolvedValue(mockUserData);

    render(<Users />);

    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });

    // Check address formatting
    expect(screen.getByText('123 Main St, Anytown, 12345')).toBeInTheDocument();

    // Check email
    expect(screen.getByText('john@example.com')).toBeInTheDocument();

    // Check table headers
    expect(screen.getByText('Full name')).toBeInTheDocument();
    expect(screen.getByText('Email address')).toBeInTheDocument();
    expect(screen.getByText('Address')).toBeInTheDocument();
  });

  it('navigates to user posts page when clicking on a user row', async () => {
    mockGetUsers.mockResolvedValue(mockUserData);
    const user = userEvent.setup();

    render(<Users />);

    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });

    const userRow = screen.getByText('John Doe').closest('tr');
    expect(userRow).toBeInTheDocument();

    await user.click(userRow!);

    expect(mockNavigate).toHaveBeenCalledWith('/users/1/posts');
  });

  it('calls retry when retry button is clicked', async () => {
    mockGetUsers.mockRejectedValueOnce(new Error('Network error'));

    render(<Users />);

    await waitFor(() => {
      expect(screen.getByText('Retry')).toBeInTheDocument();
    });

    const retryButton = screen.getByText('Retry');
    await userEvent.click(retryButton);

    // Should make another API call
    expect(mockGetUsers).toHaveBeenCalledTimes(1);
  });
});
