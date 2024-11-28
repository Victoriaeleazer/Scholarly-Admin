import {Event} from '../interfaces/Event'
import { Member } from '../interfaces/Member'

export function eventsDummyData(): Event[]{

    const members:Member[] = [
        {id:'1', email:'taiwoteninlanimi@gmail.com', firstName:'Teninlanimi', lastName:'Taiwo', phoneNumber:'+2349068345482', role:'admin', profile:'https://res.cloudinary.com/dq18zmq0f/image/upload/v1732807848/file.jpg'},
        {id:'2', email:'teninlanimitaiwo@gmail.com', firstName:'Fola', lastName:'Taiwo', phoneNumber:'+2349068345482', role:'student', profile:'https://imgcdn.stablediffusionweb.com/2024/5/8/579453e2-3fa3-4d2c-a059-ccc3096780f3.jpg'},
        {id:'3', email:'teninlanimi@gmail.com', firstName:'Bola', lastName:'Taiwo', phoneNumber:'+2349068345482', role:'student', profile:'https://cdn2.stylecraze.com/wp-content/uploads/2020/09/Beautiful-Women-In-The-World.jpg'},
        {id:'4', email:'teni@gmail.com', firstName:'Bamidele', lastName:'Taiwo', phoneNumber:'+2349068345482', role:'student', profile:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOeZjZWEr4oFmJhILQQgTy7-WUX9BmRrAAFw&s'},
        {id:'5', email:'tai@gmail.com', firstName:'Teni', lastName:'Taiwo', phoneNumber:'+2349068345482', role:'student', profile:'https://www.google.com/url?sa=i&url=https%3A%2F%2Fpixabay.com%2Fimages%2Fsearch%2Fmen%2F&psig=AOvVaw3tt5LhAhA799g-pEhib0Bj&ust=1732916963361000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCPiL0fmAgIoDFQAAAAAdAAAAABAJ'},
        {id:'6', email:'avffg@gmail.com', firstName:'David', lastName:'Taiwo', phoneNumber:'+2349068345482', role:'student', profile:'https://res.cloudinary.com/dq18zmq0f/image/upload/v1732807848/file.jpg'},
    ]
    
    return [
        {id:'1',eventTitle:'Hello Guys', eventDescription:'Bla Bla Bla Bla Bla Bla', audience:members, designatedTime: '2024-11-12T10:11:0.000Z',  createdTime:'2024-11-07T10:00:000Z', eventPhoto:'https://theraise.eu/wp-content/uploads/2023/07/Two-entrepreneurs-competing-in-a-business-competition.png.webp'},
        {id:'2',eventTitle:'Bla bla bla', eventDescription:'Bla Bla Bla Bla Bla Bla', audience:members, createdTime:'2024-11-07T10:00:0.000Z', designatedTime: '2024-11-12T10:11:0.000Z', eventPhoto:'https://martech.org/wp-content/uploads/2016/09/competition-business-bidding-race-ss-1920.jpg'},
        {id:'3',eventTitle:'The D Day is Here!', eventDescription:'Bla Bla Bla Bla Bla Bla', audience:members, designatedTime: '2024-11-12T10:11:0.000Z', createdTime:'2024-11-07T10:00:000Z', eventPhoto:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRksGkqU70vJ5y5s2c57Y7gGmCiiv_83lH2nA&s'},
        {id:'4',eventTitle:'Hello Everyone', eventDescription:'Bla Bla Bla Bla Bla Bla', audience:members, designatedTime: '2024-11-12T10:11:0.000Z', createdTime:'2024-11-07T10:00:000Z', eventPhoto:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsHjVniQAGOQuVLDwyadpsPRW2NLc5Y0PeUA&s'},
        {id:'5',eventTitle:'Lets Go', eventDescription:'Bla Bla Bla Bla Bla Bla', audience:members, designatedTime: '2024-11-12T10:11:0.000Z', createdTime:'2024-11-07T10:00:000Z'},
    ]
}