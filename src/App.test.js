import React from 'react';
import {fireEvent, render, screen, waitFor} from "@testing-library/react";
import App from './App';

import { fetchShow as mockFetchShow } from './api/fetchShow';
jest.mock('./api/fetchShow')

const data = {
	data: {
		name: "Show 1",
		summary: "Summary 1",
		image: { original: "original_image", medium: "medium_image", },
		_embedded: {
			episodes: [
				{
					id: 1,
					url: "url1",
					name: "Episode 1",
					season: 1,
					number: 1,
					summary: "Ep_Summary_1",
					runtime: 1,
					image: { medium: "ep1_med_image", }
				},
				{
					id: 2,
					url: "url2",
					name: "Episode 2",
					season: 1,
					number: 2,
					summary: "Ep_Summary_2",
					runtime: 2,
					image: { medium: "ep2_med_image", }
				}
			],
		}
	},
}

test("App renders with no errors", () => {
  mockFetchShow.mockResolvedValueOnce(data);
  render(<App />);
});

test("fetches data and renders to the screen", async () => {
  mockFetchShow.mockResolvedValueOnce(data);
  render(<App />);

  const season1 = screen.queryAllByRole("option").getByText("Season 1")
  fireEvent.click(dropdown);

  await waitFor(() => {
    const episodes = screen.getAllByTestId("episode");
    expect(episodes).toHaveLength(2);
  });

});