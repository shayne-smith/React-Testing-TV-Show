import React from 'react';
import { render, waitFor, queryByTestId, waitForElementToBeRemoved, getByText, queryAllByText } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { fetchShow as mockFetchShow } from './api/fetchShow';
import App from './App';

import { showData } from './data/showData';
import { act } from 'react-dom/test-utils';

// outside of the tests - mock "fetchShow"
jest.mock('./api/fetchShow');
// console.log('mockFetchShow is: ', mockFetchShow);

test('renders without errors', () => {
    mockFetchShow.mockResolvedValueOnce();
    // console.log(mockFetchShow.mockResolvedValueOnce(showData))
    render(<App />);
});

// async/await
test('renders data after API is called', () => {
    mockFetchShow.mockResolvedValueOnce(showData);

    const { queryByText, queryByTestId } = render(<App />);

    waitForElementToBeRemoved(queryByText(/Fetching data.../i))
        .then(() => {
            expect(queryByTestId(/showName/i)).toBeInTheDocument();
        })

    expect(mockFetchShow).toHaveBeenCalledTimes(2);
});

test('renders all available seasons from data API', async () => {
    act(() => {
        mockFetchShow.mockResolvedValueOnce(showData);
    });

    const { getByText, queryByText, queryAllByText } = render(<App />);

    await waitForElementToBeRemoved(queryByText(/Fetching data.../i))
        .then(() => {
            const seasonSelection = getByText(/Select a season/i);
            userEvent.click(seasonSelection);
        })
        .catch(err => console.log(err))

    await waitFor(() => expect(queryAllByText(/season /i)).toHaveLength(4));
    expect(mockFetchShow).toHaveBeenCalledTimes(3);
});

