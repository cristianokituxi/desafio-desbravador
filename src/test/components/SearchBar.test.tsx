import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SearchBar } from '../../components/SearchBar/SearchBar';

describe('SearchBar', () => {
  it('renders input and button', () => {
    render(<SearchBar onSearch={vi.fn()} isLoading={false} />);

    expect(screen.getByPlaceholderText('Digite um usuário do GitHub...')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /buscar/i })).toBeInTheDocument();
  });

  it('calls onSearch with trimmed username on submit', async () => {
    const onSearch = vi.fn();
    render(<SearchBar onSearch={onSearch} isLoading={false} />);

    const input = screen.getByPlaceholderText('Digite um usuário do GitHub...');
    await userEvent.type(input, '  octocat  ');

    const button = screen.getByRole('button', { name: /buscar/i });
    await userEvent.click(button);

    expect(onSearch).toHaveBeenCalledWith('octocat');
  });

  it('does not call onSearch with empty input', async () => {
    const onSearch = vi.fn();
    render(<SearchBar onSearch={onSearch} isLoading={false} />);

    const button = screen.getByRole('button', { name: /buscar/i });
    await userEvent.click(button);

    expect(onSearch).not.toHaveBeenCalled();
  });

  it('disables input and button while loading', () => {
    render(<SearchBar onSearch={vi.fn()} isLoading={true} />);

    const input = screen.getByPlaceholderText('Digite um usuário do GitHub...');
    const button = screen.getByRole('button', { name: /buscando/i });

    expect(input).toBeDisabled();
    expect(button).toBeDisabled();
  });

  it('uses initialValue prop', () => {
    render(<SearchBar onSearch={vi.fn()} isLoading={false} initialValue="torvalds" />);

    const input = screen.getByPlaceholderText('Digite um usuário do GitHub...');
    expect(input).toHaveValue('torvalds');
  });

  it('calls onInputChange on typing', async () => {
    const onInputChange = vi.fn();
    render(<SearchBar onSearch={vi.fn()} onInputChange={onInputChange} isLoading={false} />);

    const input = screen.getByPlaceholderText('Digite um usuário do GitHub...');
    await userEvent.type(input, 'octo');

    expect(onInputChange).toHaveBeenCalledTimes(4);
    expect(onInputChange).toHaveBeenLastCalledWith('octo');
  });

  it('disables button when input is only whitespace', async () => {
    render(<SearchBar onSearch={vi.fn()} isLoading={false} />);

    const input = screen.getByPlaceholderText('Digite um usuário do GitHub...');
    await userEvent.type(input, '   ');

    const button = screen.getByRole('button', { name: /buscar/i });
    expect(button).toBeDisabled();
  });
});
