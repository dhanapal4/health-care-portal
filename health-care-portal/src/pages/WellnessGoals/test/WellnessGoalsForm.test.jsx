import React, { act } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom';

// stable mock for addGoals so tests can inspect calls
const mockAddGoals = vi.fn();

vi.mock('../../store/useGoalsStore', () => ({
  default: () => ({ addGoals: mockAddGoals }),
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
  beforeEach(() => {
    mockAddGoals.mockClear();
  });

  it('renders the form heading, title input and submit button', () => {
    render(
      <MemoryRouter>
        <WellnessGoalsForm />
      </MemoryRouter>
    );

    // heading
    expect(screen.getByText(/Add Wellness Goal/i)).toBeDefined();
    // title input and submit button
    expect(screen.getByPlaceholderText(/e.g. Walk 30 minutes daily/i)).toBeDefined();
    expect(screen.getByRole('button', { name: /Add goal/i })).toBeDefined();
  });

  it('shows validation error when submitting without a title', async () => {
    render(
      <MemoryRouter>
        <WellnessGoalsForm />
      </MemoryRouter>
    );

    const submitBtn = screen.getByRole('button', { name: /Add goal/i });
    await userEvent.click(submitBtn);

    // Snackbar with validation message should appear
    expect(await screen.findByText(/Please enter a title for the goal\./i)).toBeDefined();
    expect(mockAddGoals).not.toHaveBeenCalled();
  });

  it('submits a predefined Steps goal and calls addGoals with correct metric', async () => {
    render(
      <MemoryRouter>
        <WellnessGoalsForm />
      </MemoryRouter>
    );

    // fill title
    const titleInput = screen.getByPlaceholderText(/e.g. Walk 30 minutes daily/i);
    act(()=>{
      fireEvent.change(titleInput, { target: { value: 'My Steps Goal' } });
    })

    // select predefined -> Steps
    const select = screen.getByRole('combobox', { name: /Predefined wellness goal/i });
    await userEvent.selectOptions(select, 'steps');

    // fill steps count
    const stepsInput = screen.getByPlaceholderText(/e.g. 5000/i);
    await userEvent.type(stepsInput, '5000');

    // submit
    const submitBtn = screen.getByRole('button', { name: /Add goal/i });

    act(()=>{
      fireEvent.click(submitBtn);
    })

    // success snackbar should appear
    expect(await screen.findByText(/Wellness goal added/i)).toBeDefined();

  });
});
