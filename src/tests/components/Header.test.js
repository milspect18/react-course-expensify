import { shallow } from 'enzyme';
import React from 'react';
import { Header } from '../../components/Header';


test('Should render Header correctly', () => {
    const wrapper = shallow(<Header logout={() => { }} />);

    expect(wrapper).toMatchSnapshot();
});


test('should call logout on button click', () => {
    const logoutSpy = jest.fn()
    const wrapper = shallow(<Header logout={logoutSpy} />);

    wrapper.find('button').simulate('click');

    expect(logoutSpy).toBeCalled();
});

