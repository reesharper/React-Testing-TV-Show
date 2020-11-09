import React from 'react';
import {fireEvent, render, screen, waitFor} from "@testing-library/react";
import App from './App';

test("App renders with no errors", () => {
  render(<App />);
});