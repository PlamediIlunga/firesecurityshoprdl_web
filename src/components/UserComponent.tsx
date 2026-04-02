import UserItem from "../types/UserItem";
import '../styles/UserComponent.scss';

export default function UserProfileComponent({ user }: { user: UserItem }) {
  return (
    <div className="user-profile">
      <div className="user-profile__grid">

        {/* Adresse */}
        <div className="user-profile__block">
          <div className="user-profile__block-icon">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 1118 0z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="user-profile__block-content">
            <span className="user-profile__block-label">Adresse</span>
            <span className="user-profile__block-value">
              {user.address}, {user.city}, {user.country}
            </span>
          </div>
        </div>

        {/* Email */}
        <div className="user-profile__block">
          <div className="user-profile__block-icon">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              <polyline points="22,6 12,13 2,6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="user-profile__block-content">
            <span className="user-profile__block-label">Courriel</span>
            <span className="user-profile__block-value">{user.email}</span>
          </div>
        </div>

        {/* Téléphone */}
        {user.city && (
          <div className="user-profile__block">
            <div className="user-profile__block-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.01 1.18 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="user-profile__block-content">
              <span className="user-profile__block-label">Ville</span>
              <span className="user-profile__block-value">{user.city}</span>
            </div>
          </div>
        )}

        {/* Points — pleine largeur */}
        <div className="user-profile__block user-profile__block--points">
          <div className="user-profile__block-icon user-profile__block-icon--gold">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"
                stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="user-profile__block-content">
            <span className="user-profile__block-label">Solde de points</span>
            <span className="user-profile__block-value user-profile__block-value--points">
              {user.points} <em>pts</em>
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}