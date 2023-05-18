import { render, screen } from '@testing-library/react';
import Search from '../src/components/Search';
import '@testing-library/jest-dom';
import Provider from "../src/context/PersonContext";

 
describe('Home', () => {
  it('renders a search bar', () => {
   
    render(  <Provider>
        {<Search/>}
      </Provider>);
    
 
    const title = screen.getByTestId('name-filter');
 
    expect(title).toBeInTheDocument();
   
  });
});