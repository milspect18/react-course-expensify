import React from 'react';
import { shallow } from 'enzyme';
import LoadingPage from '../../components/LoadingPage';


test("should render loading page", () => {
    const render = shallow(<LoadingPage />);

    expect(render).toMatchSnapshot();
});