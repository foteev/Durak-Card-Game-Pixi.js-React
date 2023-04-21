import '@testing-library/jest-dom';
import React from 'react'
// import { OurComponent } from '../OurComponent';
import { render, screen /*, waitFor, fireEvent, act*/ } from '@testing-library/react';
import { App } from '../App'

describe('Main Window', () => {
  it('start game should be visible', () => {
    render(<App />);
    const button = screen.getByText('Start game');
    expect(button).toBeVisible();

  })
})