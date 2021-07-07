import React from 'react';
import { render, waitFor } from '@testing-library/react';
import { fetchShow as mockFetchShow } from '../api/fetchShow';
import Episodes from './Episodes';

import { showData } from '../data/showData';

test('renders Episodes without errors', () => {
    render(<Episodes episodes={showData.data._embedded.episodes} />);
});

test('renders episodes when episodes data is passed down', () => {

    const { getByText, queryByText, rerender } = render(
        <Episodes episodes={showData.data._embedded.episodes} />
    );

    showData.data._embedded.episodes.forEach(episode => {
        expect(getByText(episode.name)).toBeInTheDocument();
    })
});