//import '../styles/Login.scss'
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
        <div className="min-h-screen bg-red-900 flex items-center justify-center p-6">
            <div className="hidden">
                {users.map(user => (
                    <div key={user.idUser}>
                        {user.username} - {user.email}
                    </div>
                ))}
            </div>
            <div className="bg-blue-900 rounded-lg border-4 border-yellow-400 p-8 w-full max-w-md shadow-xl">
                <h1 className="text-3xl font-bold text-yellow-400 mb-6 text-center">Connexion</h1>
                <div className="space-y-4">
                    <input 
                        type="text" 
                        placeholder="Nom d'utilisateur" 
                        value={usernameInput} 
                        onChange={(e) => setUsername(e.target.value)}
                        required 
                        className="w-full p-3 rounded border border-yellow-400 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    />
                    <input 
                        type="password" 
                        placeholder="Mot de passe" 
                        value={passwordInput}
                        onChange={(e) => setPassword(e.target.value)}
                        required 
                        className="w-full p-3 rounded border border-yellow-400 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    />
                    <button 
                        onClick={handlelogin}
                        className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded border-2 border-yellow-400 transition duration-300"
                    >
                        Se connecter
                    </button>
                    <p className="text-white text-center mt-4">
                        Mot de passe oublié ? <a href="#" className="text-yellow-400 hover:text-yellow-300 underline">Cliquez ici</a>
                    </p>
                </div>
            </div>
        </div>
    );
}