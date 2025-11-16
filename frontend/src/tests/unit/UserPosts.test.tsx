import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '../test-utils';
import UserPosts from '../../pages/UserPosts';

// Mock the API service
vi.mock('../../services/api', () => ({
  api: {
    getUser: vi.fn(),
    getUserPosts: vi.fn(),
    deletePost: vi.fn(),
  },
}));

// Mock react-router-dom
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useParams: () => ({ userId: '1' }),
  };
});

// Mock the AddPostDialog
vi.mock('../../components/AddPostDialog', () => ({
  default: ({ open }: { open: boolean }) => open ? <div>Add Post Dialog</div> : null,
}));

import { api } from '../../services/api';

const mockGetUser = api.getUser as vi.MockedFunction<typeof api.getUser>;
const mockGetUserPosts = api.getUserPosts as vi.MockedFunction<typeof api.getUserPosts>;
const mockDeletePost = api.deletePost as vi.MockedFunction<typeof api.deletePost>;

describe('UserPosts Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('displays 404 when user is not found', async () => {
    mockGetUser.mockRejectedValue(new Error('User not found'));
    mockGetUserPosts.mockResolvedValue([]);

    render(<UserPosts />);

    await waitFor(() => {
      expect(screen.getByText('User Not Found')).toBeInTheDocument();
    });

    expect(screen.getByText('Back to Users')).toBeInTheDocument();
  });
});
