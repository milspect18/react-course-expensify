import authReducer from '../../reducers/auth';

test('should handle the login action', () => {
    const result = authReducer({}, { type: 'LOGIN', uid: '12345' });

    expect(result).toEqual({ uid: '12345' })
});

test('should handle the logout action', () => {
    const result = authReducer({ uid: '12345' }, { type: 'LOGOUT' });

    expect(result).toEqual({});
});