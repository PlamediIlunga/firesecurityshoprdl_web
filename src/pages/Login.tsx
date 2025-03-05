import '../styles/Login.scss'
import { useState, useEffect } from 'react';
import UserModel from '../modeles/usersModel';
import { useNavigate } from 'react-router-dom';

export default function Login() {
   
    const [usernameInput, setUsername] = useState('');
    const [passwordInput, setPassword] = useState('');
    const navigate = useNavigate();
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

    const login = async (email:string,password:string) => {
        try {
            const response = await fetch(api_url + "api/Auth/login", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            });
    
            if (!response.ok) {
                throw new Error(`Erreur de connexion: ${response.status} ${response.statusText}`);
            }
    
            // Récupérer les données de la réponse avec le token
            const data = await response.json();
            
            // Récupération du bearer token
            const bearerToken = data.token ;
            
            if (!bearerToken) {
                throw new Error("Token non trouvé dans la réponse");
            }
            
            // Stockage du token dans le localStorage pour une utilisation ultérieure
            localStorage.setItem('bearerToken', bearerToken);
            
            console.log("Connexion réussie");
            navigate('/Home');
            return bearerToken;
        
        } catch (error) {
            console.error("Erreur lors de la connexion:", error);
            throw error; // Propager l'erreur pour la gérer à un niveau supérieur si nécessaire
        }
    };

    const handlelogin = async () => {
        login(usernameInput,passwordInput);
    };

    return (
        <div className="login-container">
            <div>
                {users.map(user => (
                    <div key={user.idUser}>
                        {user.username} - {user.email}
                    </div>
                ))}</div>
            <div className="login-box">
                <h1>Connexion</h1>
                <input type="text" placeholder="Nom d'utilisateur" value={usernameInput} 
                 onChange={(e) => setUsername(e.target.value)}
                 required />
                <input type="password" placeholder="Mot de passe" value={passwordInput}
                onChange={(e) => setPassword(e.target.value)}
                required />
                <button onClick={handlelogin}>Se connecter</button>
                <p>Mot de passe oublié ? <a href="#">Cliquez ici</a></p>
            </div>
        </div>
    );
}