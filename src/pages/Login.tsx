import '../styles/Login.scss'
import { useState, useEffect } from 'react';
import UserModel from '../modeles/usersModel';

export default function Login() {
    const [users, setUsers] = useState<UserModel[]>([]);
    const api_url = "http://localhost:5007/";

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch(api_url + "api/User/GetAllUser");
                const data = await response.json();
                setUsers(data);
            }
            catch (error) {
                console.error(error);
            }
        }
        fetchUsers();
    }, []);

    return (
        <div className="login-container">
            <div>                {users.map(user => (
                <div key={user.idUser}>
                    {user.username} - {user.email}
                </div>
            ))}</div>
            <div className="login-box">
                <h1>Connexion</h1>
                <input type="text" placeholder="Nom d'utilisateur" required />
                <input type="password" placeholder="Mot de passe" required />
                <button>Se connecter</button>
                <p>Mot de passe oublié ? <a href="#">Cliquez ici</a></p>
            </div>
        </div>
    );
}