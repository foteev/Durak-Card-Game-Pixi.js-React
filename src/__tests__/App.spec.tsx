import '@testing-library/jest-dom';
import React from 'react'
import { render, screen } from '@testing-library/react';
import { App } from '../App'

describe('Main Window', () => {
  it('start game should be visible', () => {
    render(<App />);
    const button = screen.getByText('Start game');
    expect(button).toBeVisible();

  })
})