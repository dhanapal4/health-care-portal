import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';

// mock Zustand store hook used by the component
vi.mock('../../store/useGoalsStore', () => ({
  default: () => ({ addGoals: vi.fn() }),
}));

// mock useNavigate from react-router-dom to avoid real navigation
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => vi.fn(),
  };
});

import WellnessGoalsForm from '../WellnessGoalsForm';

describe('WellnessGoalsForm', () => {
  it('renders the form heading, title input and submit button', () => {
    render(
      <MemoryRouter>
        <WellnessGoalsForm />
      </MemoryRouter>
    );

    // heading
    expect(screen.getByText(/Add Wellness Goal/i)).toBeDefined();

  });
});
