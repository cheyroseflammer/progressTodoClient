// import { screen, render } from '@testing-library/react';
// import ListItem from '../components/ListItem';

describe('ListItem', () => {
  it('renders todo from fetch data', async () => {
    const fakeTodo = {
      title: 'title',
      description: 'description',
    };
    jest
      .spyOn(global, 'fetch')
      .mockImplementation(() => Promise.resolve({ json: () => Promise.resolve(fakeTodo) }));
  });
});
