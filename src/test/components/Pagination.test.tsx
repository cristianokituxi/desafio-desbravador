import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Pagination } from '../../components/Pagination/Pagination';

describe('Pagination', () => {
  it('renders nothing when totalPages is 1 or less', () => {
    const { container } = render(
      <Pagination currentPage={1} totalPages={1} onPageChange={vi.fn()} />,
    );
    expect(container.firstChild).toBeNull();
  });

  it('renders page buttons', () => {
    render(<Pagination currentPage={1} totalPages={5} onPageChange={vi.fn()} />);

    expect(screen.getByRole('button', { name: 'Página anterior' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Próxima página' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Página 1' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Página 2' })).toBeInTheDocument();
  });

  it('marks current page as active', () => {
    render(<Pagination currentPage={3} totalPages={5} onPageChange={vi.fn()} />);

    const page3 = screen.getByRole('button', { name: 'Página 3' });
    expect(page3).toHaveAttribute('aria-current', 'page');
  });

  it('disables previous button on first page', () => {
    render(<Pagination currentPage={1} totalPages={5} onPageChange={vi.fn()} />);

    expect(screen.getByRole('button', { name: 'Página anterior' })).toBeDisabled();
  });

  it('disables next button on last page', () => {
    render(<Pagination currentPage={5} totalPages={5} onPageChange={vi.fn()} />);

    expect(screen.getByRole('button', { name: 'Próxima página' })).toBeDisabled();
  });

  it('calls onPageChange when clicking a page', async () => {
    const onPageChange = vi.fn();
    render(<Pagination currentPage={1} totalPages={5} onPageChange={onPageChange} />);

    await userEvent.click(screen.getByRole('button', { name: 'Página 3' }));
    expect(onPageChange).toHaveBeenCalledWith(3);
  });

  it('shows maximum 5 visible pages', () => {
    render(<Pagination currentPage={5} totalPages={10} onPageChange={vi.fn()} />);

    const pageButtons = screen
      .getAllByRole('button')
      .filter(
        (btn) =>
          btn.getAttribute('aria-label')?.startsWith('Página ') &&
          btn.getAttribute('aria-label') !== 'Página anterior' &&
          btn.getAttribute('aria-label') !== 'Próxima página',
      );

    expect(pageButtons.length).toBeLessThanOrEqual(5);
  });
});
