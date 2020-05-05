import moment from 'moment';

export default [
    {
        id: 1,
        description: 'Gum',
        note: '',
        amount: 195,
        createdAt: 100
    },
    {
        id: 2,
        description: 'Rent',
        note: '',
        amount: 202000,
        createdAt: moment(0).subtract(4, 'days').valueOf()
    },
    {
        id: 3,
        description: 'Test',
        note: '',
        amount: 24567,
        createdAt: moment(0).add(4, 'months').valueOf()
    }
]