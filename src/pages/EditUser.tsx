import UserItem from '../types/UserItem';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/EditUser.scss';

export default function EditUser() {
  const [user, setUser] = useState<UserItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [errors, setErrors] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    province: '',
    country: '',
  });
  const { idUser } = useParams<{ idUser?: string }>();
  const api_url = import.meta.env.VITE_API_URL;
  const MAX_LENGTH = 200;

  useEffect(() => {
    const getUserById = async () => {
      if (idUser) {
        try {
          setIsLoading(true);
          setError(null);
          const token = localStorage.getItem('bearerToken');
          if (!token) throw new Error('Token d\'authentification manquant.');
          const response = await fetch(`${api_url}/api/User/GetUserById/${idUser}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              authorization: `Bearer ${token}`,
            },
          });
          if (!response.ok) throw new Error(`Erreur ${response.status} : Impossible de récupérer l'utilisateur.`);
          const userData: UserItem = await response.json();
          setUser(userData);
        } catch (err) {
          setError(err instanceof Error ? err.message : 'Une erreur inconnue est survenue.');
          setUser(null);
        } finally {
          setIsLoading(false);
        }
      }
    };
    getUserById();
  }, [idUser]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    if (type !== 'checkbox' && type !== 'number' && value.length > MAX_LENGTH) {
      setErrors((prev) => ({ ...prev, [name]: `Ce champ ne peut pas dépasser ${MAX_LENGTH} caractères.` }));
      return;
    }
    setUser((prev) => ({
      ...prev!,
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
    if (name === 'password' && value) {
      const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
      newErrors.password = passwordRegex.test(value) ? '' : 'Le mot de passe doit contenir au moins 8 caractères, incluant une lettre et un chiffre.';
    }
    if (name === 'firstName' && !value.trim()) newErrors.firstName = 'Le prénom est requis.';
    if (name === 'lastName' && !value.trim()) newErrors.lastName = 'Le nom de famille est requis.';
    if (name === 'address' && !value.trim()) newErrors.address = 'L\'adresse est requise.';
    if (name === 'city' && !value.trim()) newErrors.city = 'La ville est requise.';
    if (name === 'country' && !value.trim()) newErrors.country = 'Le pays est requis.';
    setErrors(newErrors);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitted(false);
    const form = e.target as HTMLFormElement;
    const formErrors = Object.values(errors).some((err) => err !== '');
    if (!formErrors && form.checkValidity() && user) {
      try {
        const token = localStorage.getItem('bearerToken');
        if (!token) throw new Error('Token d\'authentification manquant.');
        const response = await fetch(`${api_url}/api/User/UpdateUser`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json', authorization: `Bearer ${token}` },
          body: JSON.stringify(user),
        });
        if (!response.ok) throw new Error(`Erreur ${response.status} : Impossible de mettre à jour l'utilisateur.`);
        setIsSubmitted(true);
        setTimeout(() => setIsSubmitted(false), 2000);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Une erreur inconnue est survenue.');
      }
    } else {
      form.reportValidity();
      const inputs = form.querySelectorAll('input');
      inputs.forEach((input) => handleValidation({ target: input } as React.ChangeEvent<HTMLInputElement>));
    }
  };

  return (
    <div className="edit-user-page">

      {/* EN-TÊTE — fond sombre */}
      <header className="edit-user-header">
        <div className="edit-user-header__inner">
          <div className="edit-user-header__eyebrow">
            <span className="edit-user-header__eyebrow-dot">◆</span>
            PANNEAU D'ADMINISTRATION
          </div>
          <h1 className="edit-user-header__title">
            {user ? `${user.lastName} ${user.firstName}` : 'Modifier l\'utilisateur'}
          </h1>
          <div className="gold-rule gold-rule--center" />
          <p className="edit-user-header__subtitle">
            Modifiez les informations de l'utilisateur et enregistrez les changements.
          </p>
        </div>
      </header>

      {/* CONTENU */}
      <section className="edit-user-section">
        <div className="edit-user-section__inner">

          {/* Bandeau erreur globale */}
          {error && (
            <div className="eu-alert eu-alert--error">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M8 4.5v4M8 10.5v1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              {error}
            </div>
          )}

          {/* Bandeau succès */}
          {isSubmitted && (
            <div className="eu-alert eu-alert--success">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M2 8l4 4 8-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Utilisateur modifié avec succès !
            </div>
          )}

          {/* Chargement */}
          {isLoading ? (
            <div className="eu-loading">
              <svg className="eu-loading__spinner" viewBox="0 0 24 24">
                <circle className="eu-loading__track" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" fill="none" />
                <path className="eu-loading__arc" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
              </svg>
              <span>Chargement de l'utilisateur...</span>
            </div>
          ) : user ? (

            <form className="eu-form" onSubmit={handleSubmit}>

              {/* ── SECTION : Identifiants ── */}
              <div className="eu-form__section">
                <p className="eu-form__section-label">Identifiants</p>
                <div className="eu-form__grid">
                  <div className="form-field">
                    <label htmlFor="email" className="form-field__label">Adresse email</label>
                    <input
                      type="email" id="email" name="email"
                      value={user.email || ''}
                      onChange={(e) => { handleChange(e); handleValidation(e); }}
                      placeholder="Ex: marc.tremblay@serviceincendie-rdl.ca"
                      className={`form-field__input${errors.email ? ' form-field__input--error' : ''}`}
                      required
                    />
                    {errors.email && <p className="form-field__error">{errors.email}</p>}
                  </div>

                  <div className="form-field">
                    <label htmlFor="points" className="form-field__label">Points</label>
                    <input
                      type="number" id="points" name="points"
                      value={user.points || 0}
                      onChange={handleChange}
                      placeholder="Ex: 300"
                      min="0"
                      className="form-field__input"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* ── SECTION : Identité ── */}
              <div className="eu-form__section">
                <p className="eu-form__section-label">Identité</p>
                <div className="eu-form__grid">
                  <div className="form-field">
                    <label htmlFor="firstName" className="form-field__label">Prénom</label>
                    <input
                      type="text" id="firstName" name="firstName"
                      value={user.firstName || ''}
                      onChange={(e) => { handleChange(e); handleValidation(e); }}
                      placeholder="Ex: Marc"
                      className={`form-field__input${errors.firstName ? ' form-field__input--error' : ''}`}
                      required
                    />
                    {errors.firstName && <p className="form-field__error">{errors.firstName}</p>}
                  </div>

                  <div className="form-field">
                    <label htmlFor="lastName" className="form-field__label">Nom de famille</label>
                    <input
                      type="text" id="lastName" name="lastName"
                      value={user.lastName || ''}
                      onChange={(e) => { handleChange(e); handleValidation(e); }}
                      placeholder="Ex: Tremblay"
                      className={`form-field__input${errors.lastName ? ' form-field__input--error' : ''}`}
                      required
                    />
                    {errors.lastName && <p className="form-field__error">{errors.lastName}</p>}
                  </div>
                </div>
              </div>

              {/* ── SECTION : Adresse ── */}
              <div className="eu-form__section">
                <p className="eu-form__section-label">Adresse</p>
                <div className="eu-form__grid eu-form__grid--full">
                  <div className="form-field">
                    <label htmlFor="address" className="form-field__label">Adresse</label>
                    <input
                      type="text" id="address" name="address"
                      value={user.address || ''}
                      onChange={(e) => { handleChange(e); handleValidation(e); }}
                      placeholder="Ex: 45 Rue des Pompiers"
                      className={`form-field__input${errors.address ? ' form-field__input--error' : ''}`}
                      required
                    />
                    {errors.address && <p className="form-field__error">{errors.address}</p>}
                  </div>
                </div>

                <div className="eu-form__grid eu-form__grid--three">
                  <div className="form-field">
                    <label htmlFor="city" className="form-field__label">Ville</label>
                    <input
                      type="text" id="city" name="city"
                      value={user.city || ''}
                      onChange={(e) => { handleChange(e); handleValidation(e); }}
                      placeholder="Ex: Rivière-du-Loup"
                      className={`form-field__input${errors.city ? ' form-field__input--error' : ''}`}
                      required
                    />
                    {errors.city && <p className="form-field__error">{errors.city}</p>}
                  </div>

                  <div className="form-field">
                    <label htmlFor="province" className="form-field__label">Province</label>
                    <input
                      type="text" id="province" name="province"
                      value={user.province || ''}
                      onChange={(e) => { handleChange(e); handleValidation(e); }}
                      placeholder="Ex: Québec"
                      className={`form-field__input${errors.province ? ' form-field__input--error' : ''}`}
                    />
                    {errors.province && <p className="form-field__error">{errors.province}</p>}
                  </div>

                  <div className="form-field">
                    <label htmlFor="country" className="form-field__label">Pays</label>
                    <input
                      type="text" id="country" name="country"
                      value={user.country || ''}
                      onChange={(e) => { handleChange(e); handleValidation(e); }}
                      placeholder="Ex: Canada"
                      className={`form-field__input${errors.country ? ' form-field__input--error' : ''}`}
                      required
                    />
                    {errors.country && <p className="form-field__error">{errors.country}</p>}
                  </div>
                </div>
              </div>

              {/* ── SECTION : Rôle ── */}
              <div className="eu-form__section">
                <p className="eu-form__section-label">Rôle</p>
                <div className="eu-checkbox">
                  <input
                    type="checkbox"
                    id="isAdministrator"
                    name="isAdministrator"
                    checked={user.isAdministrator || false}
                    onChange={handleChange}
                    className="eu-checkbox__input"
                  />
                  <label htmlFor="isAdministrator" className="eu-checkbox__label">
                    <span className="eu-checkbox__box">
                      <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                        <path d="M1 4l3 3 5-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                    Accorder les droits d'administrateur
                  </label>
                </div>
              </div>

              {/* ── FOOTER bouton ── */}
              <div className="eu-form__footer">
                <button
                  type="submit"
                  disabled={isLoading || isSubmitted}
                  className={`eu-submit-btn${isSubmitted ? ' eu-submit-btn--success' : ''}`}
                >
                  {isSubmitted ? (
                    <>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M2 8l4 4 8-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      Utilisateur modifié !
                    </>
                  ) : (
                    <>
                      Enregistrer les modifications
                      <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                        <path d="M1 6.5h11M6.5 1l5.5 5.5-5.5 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </>
                  )}
                </button>
              </div>

            </form>

          ) : (
            <p className="eu-empty">Les informations de l'utilisateur n'ont pas pu être obtenues.</p>
          )}
        </div>
      </section>

    </div>
  );
}
