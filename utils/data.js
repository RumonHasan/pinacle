import bcrypt from 'bcryptjs';
export const taskData = {
    tasks:[
        {
            title: 'Shit',
            details: 'Get Shit done',
            completed: false,
         
        },
        {
            title: 'Do your homework',
            details: 'Get Shit done',
            completed: false,
            
        },
        {
            title: 'Do Project',
            details: 'Get Shit done',
            completed: false,
        },
        {
            title: 'Homie whats up',
            details: 'Get Shit done Homie',
            completed: true,
        }
    ],

    dummyUsers:[
        {
            name: 'Rumon',
            email: 'test@gmail.com',
            password: bcrypt.hashSync('123456')
        },
        {
            name: 'King',
            email: 'test123@gmail.com',
            password: bcrypt.hashSync('123456')
        },
        {
            name: 'Something',
            email: 'test1223@gmail.com',
            password: bcrypt.hashSync('123456')
        },
    ]
}