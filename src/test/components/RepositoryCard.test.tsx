import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { RepositoryCard } from '../../components/RepositoryCard/RepositoryCard';
import type { GitHubRepository } from '../../types';

const mockRepo: GitHubRepository = {
  id: 1,
  name: 'hello-world',
  description: 'My first repository',
  language: 'TypeScript',
  stargazers_count: 42,
  forks_count: 7,
  updated_at: '2024-03-15T10:30:00Z',
  html_url: 'https://github.com/octocat/hello-world',
  owner: { login: 'octocat' },
};

function renderWithRouter(ui: React.ReactElement) {
  return render(<MemoryRouter>{ui}</MemoryRouter>);
}

describe('RepositoryCard', () => {
  it('renders repository name', () => {
    renderWithRouter(<RepositoryCard repository={mockRepo} index={0} />);
    expect(screen.getByText('hello-world')).toBeInTheDocument();
  });

  it('renders description', () => {
    renderWithRouter(<RepositoryCard repository={mockRepo} index={0} />);
    expect(screen.getByText('My first repository')).toBeInTheDocument();
  });

  it('renders language badge', () => {
    renderWithRouter(<RepositoryCard repository={mockRepo} index={0} />);
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
  });

  it('renders stars and forks count', () => {
    renderWithRouter(<RepositoryCard repository={mockRepo} index={0} />);
    expect(screen.getByText(/42/)).toBeInTheDocument();
    expect(screen.getByText(/7/)).toBeInTheDocument();
  });

  it('renders formatted date', () => {
    renderWithRouter(<RepositoryCard repository={mockRepo} index={0} />);
    expect(screen.getByText(/15\/03\/2024/)).toBeInTheDocument();
  });

  it('renders link to repository details', () => {
    renderWithRouter(<RepositoryCard repository={mockRepo} index={0} />);

    const link = screen.getByRole('link', { name: /ver detalhes/i });
    expect(link).toHaveAttribute('href', '/repository/octocat/hello-world');
  });

  it('renders without optional fields', () => {
    const minimalRepo: GitHubRepository = {
      id: 2,
      name: 'minimal',
      description: null,
      language: null,
      stargazers_count: 0,
      forks_count: 0,
      updated_at: '2024-01-01T00:00:00Z',
      html_url: '',
      owner: { login: 'user' },
    };

    renderWithRouter(<RepositoryCard repository={minimalRepo} index={0} />);
    expect(screen.getByText('minimal')).toBeInTheDocument();
  });
});
