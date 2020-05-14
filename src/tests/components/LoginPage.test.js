import React from 'react';
import { shallow } from 'enzyme';
import { LoginPage } from '../../components/LoginPage';

test('Should render the login page', () => {
    const wrapper = shallow(<LoginPage login={() => { }} />);

    expect(wrapper).toMatchSnapshot();
});

test('should call login on button click', () => {
    const loginSpy = jest.fn()
    const wrapper = shallow(<LoginPage login={loginSpy} />);

    wrapper.find('button').simulate('click');

    expect(loginSpy).toBeCalled();
});
