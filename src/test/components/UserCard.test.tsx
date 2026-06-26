import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { UserCard } from '../../components/UserCard/UserCard';
import { ToastProvider } from '../../context/ToastContext';
import type { GitHubUser } from '../../types';

const mockUser: GitHubUser = {
  login: 'octocat',
  id: 1,
  avatar_url: 'https://avatars.githubusercontent.com/u/1',
  html_url: 'https://github.com/octocat',
  name: 'The Octocat',
  bio: 'GitHub mascot',
  company: 'GitHub',
  location: 'San Francisco',
  followers: 1000,
  following: 10,
  public_repos: 8,
};

function renderWithToast(ui: React.ReactElement) {
  return render(<ToastProvider>{ui}</ToastProvider>);
}

describe('UserCard', () => {
  it('renders user name and login', () => {
    renderWithToast(<UserCard user={mockUser} />);

    expect(screen.getByText('The Octocat')).toBeInTheDocument();
    expect(screen.getByText('@octocat')).toBeInTheDocument();
  });

  it('renders bio', () => {
    renderWithToast(<UserCard user={mockUser} />);
    expect(screen.getByText('GitHub mascot')).toBeInTheDocument();
  });

  it('renders company and location', () => {
    renderWithToast(<UserCard user={mockUser} />);
    expect(screen.getByText(/San Francisco/)).toBeInTheDocument();
    // Company "GitHub" is present, but also appears in bio and profile link
    const metaItems = screen.getAllByText(/GitHub/);
    const companyElement = metaItems.find(
      (el) => el.tagName === 'SPAN' && el.textContent?.includes('🏢'),
    );
    expect(companyElement).toBeInTheDocument();
  });

  it('renders stats (followers, following, repos)', () => {
    renderWithToast(<UserCard user={mockUser} />);
    expect(screen.getByText('1.0k')).toBeInTheDocument(); // followers
    expect(screen.getByText('10')).toBeInTheDocument(); // following
    expect(screen.getByText('8')).toBeInTheDocument(); // public_repos
  });

  it('renders link to GitHub profile', () => {
    renderWithToast(<UserCard user={mockUser} />);

    const link = screen.getByRole('link', { name: /ver no github/i });
    expect(link).toHaveAttribute('href', 'https://github.com/octocat');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('renders without optional fields', () => {
    const minimalUser: GitHubUser = {
      login: 'minimal',
      id: 2,
      avatar_url: '',
      html_url: '',
      name: null,
      bio: null,
      company: null,
      location: null,
      followers: 0,
      following: 0,
      public_repos: 0,
    };

    renderWithToast(<UserCard user={minimalUser} />);
    expect(screen.getByText('@minimal')).toBeInTheDocument();
  });
});
