import {useState} from 'react';
export default function PersonalInfo(){
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [title, setTitle] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');

    return (
        <form action="">
            <input type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
            <input type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
            <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
            <input type="text" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} />
            <input type="text" placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} />
            <input type="tel" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </form>
    )
}