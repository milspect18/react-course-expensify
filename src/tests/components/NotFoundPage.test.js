import { shallow } from 'enzyme';
import React from 'react';
import NotFoundPage from '../../components/NotFoundPage';

test('Should render the not found (404) page', () => {
    const wrapper = shallow(<NotFoundPage />);

    expect(wrapper).toMatchSnapshot();
});
