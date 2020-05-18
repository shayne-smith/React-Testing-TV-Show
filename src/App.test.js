import React from 'react';
import { render, waitFor, queryByTestId } from '@testing-library/react';
import { fetchShow as mockFetchShow } from './api/fetchShow';
import App from './App';

import { showData } from './data/showData';

// outside of the tests - mock "fetchShow"
jest.mock('./api/fetchShow');
console.log('mockFetchShow is: ', mockFetchShow);

test('renders without errors', () => {
    mockFetchShow.mockResolvedValueOnce();
    // console.log(mockFetchShow.mockResolvedValueOnce(showData))
    render(<App />);
});

// async/await
test('renders data after API is called', async () => {
    mockFetchShow.mockResolvedValueOnce(showData);
    console.log('fake showData is: ', showData);

    const { getByText, queryByText, queryAllByTestId, queryByTestId } = render(<App />);

    // console.log('queryAllByTestId results: ', queryAllByTestId(/episodes/i));

    // await waitFor(() => expect(queryAllByTestId(/episodes/i)).toHaveLength(26));

    const showName = getByText(/Stranger Things/i);
    console.log(showName);
    console.log('showName is: ', queryByTestId(/showName/i));
    console.log('showName is: ', queryByText(/Stranger Things/i));

    await waitFor(() => expect(queryAllByTestId(/showName/)).toHaveLength(1));
    expect(mockFetchShow).toHaveBeenCalledTimes(1);

});

