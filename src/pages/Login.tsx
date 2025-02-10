import '../styles/Login.scss'
export default function Login() {
    return (
        <div className="login-container">
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