import UserItem from '../types/UserItem';
import ListUserComponent from '../components/ListUserComponent';
import { useState, useEffect } from 'react';
import '../styles/user.scss';

export default function User() {
  const [users, setUsers] = useState<UserItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const api_url = import.meta.env.VITE_API_URL;

  const [user, setUser] = useState<UserItem>({
    idUser: 0, email: '', password: '', points: 0,
    firstName: '', lastName: '', address: '', city: '',
    province: '', country: '', isAdministrator: false,
    isArchived: false, orders: []
  });

  const [errors, setErrors] = useState({ email: '', password: '', phone: '', postalCode: '' });

  const getUsers = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(api_url + "/api/User/GetAllUser", {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 'authorization': `Bearer ${localStorage.getItem('bearerToken')}` },
      });
      if (!response.ok) throw new Error(`Erreur HTTP: ${response.status} ${response.statusText}`);
      const users: UserItem[] = await response.json();
      setUsers(users);
    } catch (error) {
      console.error("Erreur lors de la récupération des utilisateurs :", error);
      setUsers([]);
    } finally { setIsLoading(false); }
  };

  useEffect(() => { getUsers(); }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setUser((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : name === 'points' ? parseInt(value) || 0 : value,
    }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleValidation = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const newErrors = { ...errors };
    if (name === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      newErrors.email = emailRegex.test(value) ? '' : 'Veuillez entrer un email valide (ex: user@domain.com).';
    }
    if (name === 'password') {
      const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
      newErrors.password = passwordRegex.test(value) ? '' : 'Le mot de passe doit contenir au moins 8 caractères, incluant une lettre et un chiffre.';
    }
    setErrors(newErrors);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    if (form.checkValidity() && !errors.email && !errors.password) {
      try {
        const response = await fetch(api_url + "/api/User/CreateUser", {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'authorization': `Bearer ${localStorage.getItem('bearerToken')}` },
          body: JSON.stringify(user),
        });
        if (!response.ok) throw new Error(`Erreur lors de l'ajout: ${response.status} ${response.statusText}`);
        await response.json();
        form.reset();
        setUser({ idUser: 0, email: '', password: '', points: 0, firstName: '', lastName: '', address: '', city: '', province: '', country: '', isAdministrator: false, isArchived: false, orders: [] });
        setErrors({ email: '', password: '', phone: '', postalCode: '' });
        setIsSubmitted(true);
        setTimeout(() => setIsSubmitted(false), 2000);
        await getUsers();
      } catch (error) {
        console.error('Erreur lors de la soumission:', error);
        alert(`Erreur: ${error}`);
      }
    } else { form.reportValidity(); }
  };

  return (
    <div className="user-page">

      {/* HEADER */}
      <header className="user-header">
        <div className="user-header__inner">
          <span className="user-header__badge">Panneau d'administration</span>
          <h1 className="user-header__title">Utilisateurs</h1>
          <div className="user-header__rule" />
          <p className="user-header__subtitle">
            Bienvenue dans la section d'administration. Ajoutez un nouvel utilisateur pour gérer les accès.
          </p>
        </div>
      </header>

      {/* LISTE DES UTILISATEURS */}
      <section className="user-list-section">
        <div className="user-list-section__inner">
          <p className="section-eyebrow">Répertoire</p>
          <h2 className="section-title">Liste des utilisateurs</h2>
          <div className="gold-rule" />
          {isLoading ? (
            <div className="user-loading">
              <svg className="user-loading__spinner" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" fill="none" opacity="0.2" />
                <path fill="currentColor" d="M4 12a8 8 0 018-8v8z" opacity="0.85" />
              </svg>
              <span>Chargement des utilisateurs...</span>
            </div>
          ) : users.length > 0 ? (
            <div className="user-list">
              <ListUserComponent users={users} refreshUsers={getUsers} />
            </div>
          ) : (
            <p className="user-empty">Les informations des utilisateurs n'ont pas pu être obtenues.</p>
          )}
        </div>
      </section>

      {/* FORMULAIRE — fond beige, 2 colonnes */}
      <section className="user-form-section">
        <div className="user-form-section__inner">

          <div className="user-form-header">
            <p className="section-eyebrow section-eyebrow--gold">Nouvel utilisateur</p>
            <h2 className="user-form-title">Ajouter un utilisateur</h2>
            <div className="gold-rule" />
          </div>

          <form className="user-form" onSubmit={handleSubmit} noValidate autoComplete="off">

            {/* COLONNE GAUCHE */}
            <div className="user-form__col">
              <div className="form-field">
                <label htmlFor="lastName" className="form-field__label">Nom de famille</label>
                <input type="text" id="lastName" name="lastName" value={user.lastName}
                  onChange={handleChange} placeholder="Ex: Doe"
                  className="form-field__input" required />
              </div>
              <div className="form-field">
                <label htmlFor="firstName" className="form-field__label">Prénom</label>
                <input type="text" id="firstName" name="firstName" value={user.firstName}
                  onChange={handleChange} placeholder="Ex: John"
                  className="form-field__input" required />
              </div>
              <div className="form-field">
                <label htmlFor="email" className="form-field__label">Email</label>
                <input type="email" id="email" name="email" value={user.email}
                  onChange={(e) => { handleChange(e); handleValidation(e); }}
                  placeholder="Ex: john.doe@example.com"
                  pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
                  onInvalid={(e) => (e.target as HTMLInputElement).setCustomValidity('Veuillez entrer un email valide.')}
                  onInput={(e) => (e.target as HTMLInputElement).setCustomValidity('')}
                  autoComplete="off"
                  className={`form-field__input ${errors.email ? 'form-field__input--error' : ''}`}
                  required />
                {errors.email && <p className="form-field__error">{errors.email}</p>}
              </div>
              <div className="form-field">
                <label htmlFor="password" className="form-field__label">Mot de passe</label>
                <input type="password" id="password" name="password" value={user.password}
                  onChange={(e) => { handleChange(e); handleValidation(e); }}
                  placeholder="Ex: MotdePasse123"
                  pattern="(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}"
                  onInvalid={(e) => (e.target as HTMLInputElement).setCustomValidity('Au moins 8 caractères, une lettre et un chiffre.')}
                  onInput={(e) => (e.target as HTMLInputElement).setCustomValidity('')}
                  autoComplete="new-password"
                  className={`form-field__input ${errors.password ? 'form-field__input--error' : ''}`}
                  required />
                {errors.password && <p className="form-field__error">{errors.password}</p>}
              </div>
              <div className="form-field">
                <label htmlFor="points" className="form-field__label">Points</label>
                <input type="number" id="points" name="points" value={user.points}
                  onChange={handleChange} placeholder="Ex: 150" min="0"
                  className="form-field__input" required />
              </div>
            </div>

            {/* COLONNE DROITE */}
            <div className="user-form__col">
              <div className="form-field">
                <label htmlFor="address" className="form-field__label">Adresse</label>
                <input type="text" id="address" name="address" value={user.address}
                  onChange={handleChange} placeholder="Ex: 123 Rue des Pompiers"
                  className="form-field__input" required />
              </div>
              <div className="form-field">
                <label htmlFor="city" className="form-field__label">Ville</label>
                <input type="text" id="city" name="city" value={user.city}
                  onChange={handleChange} placeholder="Ex: Rivière-du-Loup"
                  className="form-field__input" required />
              </div>
              <div className="form-field">
                <label htmlFor="province" className="form-field__label">Province</label>
                <input type="text" id="province" name="province" value={user.province}
                  onChange={handleChange} placeholder="Ex: Québec"
                  className="form-field__input" />
              </div>
              <div className="form-field">
                <label htmlFor="country" className="form-field__label">Pays</label>
                <input type="text" id="country" name="country" value={user.country}
                  onChange={handleChange} placeholder="Ex: Canada"
                  className="form-field__input" required />
              </div>

              {/* Checkbox admin */}
              <div className="form-field">
                <label className="form-field__label">Rôle</label>
                <label className="form-checkbox">
                  <input type="checkbox" id="isAdministrator" name="isAdministrator"
                    checked={user.isAdministrator} onChange={handleChange}
                    className="form-checkbox__input" />
                  <span className="form-checkbox__box" />
                  <span className="form-checkbox__label">Donner les droits administrateur</span>
                </label>
              </div>
            </div>

            {/* BOUTON PLEINE LARGEUR */}
            <div className="user-form__footer">
              <button type="submit" disabled={isSubmitted}
                className={`user-submit-btn ${isSubmitted ? 'user-submit-btn--success' : ''}`}>
                {isSubmitted ? (
                  <>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M2 8l4 4 8-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Utilisateur ajouté !
                  </>
                ) : (
                  <>
                    Ajouter l'utilisateur
                    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                      <path d="M1 6.5h11M6.5 1l5.5 5.5-5.5 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </>
                )}
              </button>
            </div>

          </form>
        </div>
      </section>

    </div>
  );
}
