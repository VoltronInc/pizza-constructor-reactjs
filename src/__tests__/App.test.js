import React from 'react';
import { render, wait } from '@testing-library/react';
import App from '../App';

import 'whatwg-fetch';
import fetch from 'node-fetch';
import fetchMock from 'fetch-mock';
import mockAppData from '../mockData/mockAppData';

const endpoint = '../data/mock.json';

jest.useFakeTimers();

describe('App', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  it('should render content', async () => {
    fetchMock.mock(endpoint, mockAppData);
    const { getByTestId } = render(<App />);

    getByTestId('loadingSvg');

    await wait(() => {
      jest.runAllTimers();
      getByTestId('appRoutes');
    });
  });

  it('should render content with more than 6 categories', async () => {
    fetchMock.mock(endpoint, {
      ...mockAppData,
      categories: [
        ...mockAppData.categories,
        {
          key: 'test1',
          value: 'test1',
        },
        {
          key: 'test2',
          value: 'test2',
        },
        {
          key: 'test3',
          value: 'test3',
        },
        {
          key: 'test4',
          value: 'test4',
        },
        {
          key: 'test5',
          value: 'test5',
        },
      ],
    });
    const { getByTestId } = render(<App />);

    getByTestId('loadingSvg');

    await wait(() => {
      jest.runAllTimers();
      getByTestId('appRoutes');
    });
  });
});
