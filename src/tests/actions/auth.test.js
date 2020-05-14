import { login, logout } from '../../actions/auth';

test('should create login action object', () => {
    const action = login('8675309');

    expect(action).toEqual({
        type: 'LOGIN',
        uid: '8675309'
    });
});

test('should create logout action object', () => {
    const action = logout();

    expect(action).toEqual({
        type: 'LOGOUT'
    });
});
