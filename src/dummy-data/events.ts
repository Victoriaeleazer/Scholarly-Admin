import {Event} from '../interfaces/Event'
import { User } from '../interfaces/User'

export function eventsDummyData(): Event[]{

    const members:User[] = [
        {id:'1', email:'taiwoteninlanimi@gmail.com', firstName:'Teninlanimi', lastName:'Taiwo', phoneNumber:'+2349068345482', role:'admin', color:'green', profile:'https://res.cloudinary.com/dq18zmq0f/image/upload/v1732807848/file.jpg'},
        {id:'2', email:'teninlanimitaiwo@gmail.com', firstName:'Fola', lastName:'Taiwo', phoneNumber:'+2349068345482', role:'student', color:'green', profile:'https://imgcdn.stablediffusionweb.com/2024/5/8/579453e2-3fa3-4d2c-a059-ccc3096780f3.jpg'},
        {id:'3', email:'teninlanimi@gmail.com', firstName:'Bola', lastName:'Taiwo', phoneNumber:'+2349068345482', role:'student', color:'green', profile:'https://cdn2.stylecraze.com/wp-content/uploads/2020/09/Beautiful-Women-In-The-World.jpg'},
        {id:'4', email:'teni@gmail.com', firstName:'Bamidele', lastName:'Taiwo', phoneNumber:'+2349068345482', role:'student', color:'violet', profile:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOeZjZWEr4oFmJhILQQgTy7-WUX9BmRrAAFw&s'},
        {id:'5', email:'tai@gmail.com', firstName:'Teni', lastName:'Taiwo', phoneNumber:'+2349068345482', role:'student', color:'purple', profile: undefined},
        {id:'6', email:'avffg@gmail.com', firstName:'David', lastName:'Taiwo', phoneNumber:'+2349068345482', role:'student', color:'blue', profile:'https://res.cloudinary.com/dq18zmq0f/image/upload/v1732807848/file.jpg'},
    ]
    
    return [
        {
            id: '1', eventTitle: 'Hello Guys', eventDescription: 'Bla Bla Bla Bla Bla Bla', audience: members, designatedTime: '2024-11-12T10:11:00', createdTime: "2024-11-07T10:00:00", eventPhoto: 'https://theraise.eu/wp-content/uploads/2023/07/Two-entrepreneurs-competing-in-a-business-competition.png.webp',
            title: undefined
        },
        {
            id: '2', eventTitle: 'Bla bla bla', eventDescription: 'Bla Bla Bla Bla Bla Bla', audience: members, createdTime: '2024-11-07T10:00:00', designatedTime: '2024-11-12T10:11:00', eventPhoto: 'https://martech.org/wp-content/uploads/2016/09/competition-business-bidding-race-ss-1920.jpg',
            title: undefined
        },
        {
            id: '3', eventTitle: 'The D Day is Here!', eventDescription: 'Bla Bla Bla Bla Bla Bla', audience: members, designatedTime: '2024-11-12T10:11:00', createdTime: '2024-11-07T10:00:00', eventPhoto: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRksGkqU70vJ5y5s2c57Y7gGmCiiv_83lH2nA&s',
            title: undefined
        },
        {
            id: '4', eventTitle: 'Hello Everyone', eventDescription: 'Bla Bla Bla Bla Bla Bla', audience: members, designatedTime: '2024-11-12T10:11:00', createdTime: '2024-11-07T10:00:00', eventPhoto: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsHjVniQAGOQuVLDwyadpsPRW2NLc5Y0PeUA&s',
            title: undefined
        },
        {
            id: '5', eventTitle: 'Lets Go', eventDescription: 'Bla Bla Bla Bla Bla Bla', audience: members, designatedTime: '2024-11-12T10:11:00', createdTime: '2024-11-07T10:00:00',
            title: undefined
        },
    ]
}