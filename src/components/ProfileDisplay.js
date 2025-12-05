import React from 'react';
import './ProfileDisplay.css';

const ProfileDisplay = ({ profile, onExerciseSelect, language }) => {
  
  const getExperienceLabel = (exp) => {
    const labels = {
      fr: {
        'débutant': 'Débutant',
        'intermédiaire': 'Intermédiaire',
        'avancé': 'Avancé'
      },
      en: {
        'beginner': 'Beginner',
        'intermediate': 'Intermediate',
        'advanced': 'Advanced'
      }
    };
    return labels[language][exp] || exp;
  };

  const getFrequencyLabel = (freq) => {
    const labels = {
      fr: {
        'jamais': 'Jamais',
        'rarement': 'Rarement',
        'occasionnel': 'Occasionnel',
        'régulier': 'Régulier',
        'quotidien': 'Quotidien'
      },
      en: {
        'never': 'Never',
        'rarely': 'Rarely',
        'occasional': 'Occasional',
        'regular': 'Regular',
        'daily': 'Daily'
      }
    };
    return labels[language][freq] || freq;
  };

  const getJobLabel = (job) => {
    const labels = {
      fr: {
        'développeur': 'Développeur/IT',
        'bureau': 'Bureau sédentaire',
        'manuel': 'Travail manuel',
        'étudiant': 'Étudiant',
        'autre': 'Autre'
      },
      en: {
        'developer': 'Developer/IT',
        'office': 'Sedentary office',
        'manual': 'Manual labor',
        'student': 'Student',
        'other': 'Other'
      }
    };
    return labels[language][job] || job;
  };

  return (
    <div className="profile-display">
      <div className="profile-header">
        <h2>
          {language === 'fr' ? '📊 Votre Profil Personnalisé' : '📊 Your Personalized Profile'}
        </h2>
        <div className="posture-score">
          <div className="score-circle">
            <span className="score-value">{profile.postureScore}%</span>
            <span className="score-label">
              {language === 'fr' ? 'Score Postural' : 'Posture Score'}
            </span>
          </div>
          <div className="score-description">
            {profile.postureScore >= 80 && (
              language === 'fr' 
                ? '🎉 Excellente base pour progresser !'
                : '🎉 Excellent foundation to progress!'
            )}
            {profile.postureScore >= 60 && profile.postureScore < 80 && (
              language === 'fr'
                ? '👍 Bon potentiel avec des ajustements'
                : '👍 Good potential with adjustments'
            )}
            {profile.postureScore < 60 && (
              language === 'fr'
                ? '💡 Des améliorations sont possibles avec nos exercices'
                : '💡 Improvements are possible with our exercises'
            )}
          </div>
        </div>
      </div>

      <div className="profile-details">
        <div className="details-grid">
          <div className="detail-card">
            <h3>👤 {language === 'fr' ? 'Informations générales' : 'General Information'}</h3>
            <div className="detail-item">
              <span className="label">{language === 'fr' ? 'Niveau :' : 'Level:'}</span>
              <span className="value">{getExperienceLabel(profile.experience)}</span>
            </div>
            <div className="detail-item">
              <span className="label">{language === 'fr' ? 'Fréquence :' : 'Frequency:'}</span>
              <span className="value">{getFrequencyLabel(profile.frequency)}</span>
            </div>
            <div className="detail-item">
              <span className="label">{language === 'fr' ? 'Métier :' : 'Job:'}</span>
              <span className="value">{getJobLabel(profile.jobType)}</span>
            </div>
          </div>

          <div className="detail-card">
            <h3>🎯 {language === 'fr' ? 'Objectifs & Sensibilités' : 'Goals & Sensitivities'}</h3>
            <div className="detail-item">
              <span className="label">{language === 'fr' ? 'Objectifs :' : 'Goals:'}</span>
              <div className="tags">
                {profile.goals.map((goal, index) => (
                  <span key={index} className="tag">{goal}</span>
                ))}
              </div>
            </div>
            <div className="detail-item">
              <span className="label">{language === 'fr' ? 'Points sensibles :' : 'Sensitive points:'}</span>
              <div className="tags">
                {profile.painPoints.map((point, index) => (
                  <span key={index} className="tag warning">{point}</span>
                ))}
              </div>
            </div>
          </div>

          <div className="detail-card">
            <h3>💼 {language === 'fr' ? 'Mode de vie' : 'Lifestyle'}</h3>
            <div className="detail-item">
              <span className="label">{language === 'fr' ? 'Temps assis :' : 'Sitting time:'}</span>
              <span className="value">{profile.dailySitting}</span>
            </div>
            <div className="detail-item">
              <span className="label">{language === 'fr' ? 'Sports :' : 'Sports:'}</span>
              <div className="tags">
                {profile.sports.map((sport, index) => (
                  <span key={index} className="tag sport">{sport}</span>
                ))}
              </div>
            </div>
            <div className="detail-item">
              <span className="label">{language === 'fr' ? 'Équipement :' : 'Equipment:'}</span>
              <div className="tags">
                {profile.equipment.map((eq, index) => (
                  <span key={index} className="tag equipment">{eq}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="recommendations">
        <h2>
          {language === 'fr' 
            ? '🏋️‍♂️ Exercices Recommandés pour Vous' 
            : '🏋️‍♂️ Recommended Exercises for You'}
        </h2>
        <p className="recommendations-subtitle">
          {language === 'fr'
            ? 'Basés sur votre profil, voici les exercices les plus adaptés :'
            : 'Based on your profile, here are the most suitable exercises:'}
        </p>

        <div className="exercises-grid">
          {profile.recommendedExercises && profile.recommendedExercises.map(exercise => (
            <div key={exercise.id} className="exercise-card">
              <div className="exercise-header">
                <h3>{exercise.name[language]}</h3>
                <div className="exercise-meta">
                  <span className="difficulty">{exercise.difficulty[language]}</span>
                  <span className="duration">⏱️ {exercise.duration} min</span>
                </div>
              </div>
              
              <div className="exercise-body">
                <div className="muscles-targeted">
                  <h4>{language === 'fr' ? 'Muscles ciblés :' : 'Targeted muscles:'}</h4>
                  <div className="muscles-tags">
                    {exercise.muscles[language].map((muscle, idx) => (
                      <span key={idx} className="muscle-tag">{muscle}</span>
                    ))}
                  </div>
                </div>
                
                <div className="benefits">
                  <h4>{language === 'fr' ? 'Bénéfices :' : 'Benefits:'}</h4>
                  <ul>
                    {exercise.benefits[language].slice(0, 2).map((benefit, idx) => (
                      <li key={idx}>✓ {benefit}</li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <button 
                className="select-exercise-btn"
                onClick={() => onExerciseSelect(exercise)}
              >
                {language === 'fr' ? 'Voir les instructions détaillées' : 'See detailed instructions'}
              </button>
            </div>
          ))}
        </div>

        <div className="cta-section">
          <h3>{language === 'fr' ? '🎁 Besoin d\'équipement ?' : '🎁 Need equipment?'}</h3>
          <p>
            {language === 'fr'
              ? 'Découvrez notre sélection de produits Decathlon pour optimiser votre pratique'
              : 'Discover our selection of Decathlon products to optimize your practice'}
          </p>
          <button 
            className="products-btn"
            onClick={() => window.scrollTo(0, 0)}
          >
            {language === 'fr' ? 'Voir les produits recommandés' : 'See recommended products'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileDisplay;