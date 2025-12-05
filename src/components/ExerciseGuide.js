import React, { useState } from 'react';
import './ExerciseGuide.css';

const ExerciseGuide = ({ exercise, profile, language }) => {
  const [currentStep, setCurrentStep] = useState(0);

  // Instructions personnalisées selon le profil
  const getPersonalizedInstructions = () => {
    const baseInstructions = {
      fr: {
        1: [
          'Position de départ : Debout, pieds largeur des épaules',
          'Gardez le dos droit et le regard vers l\'avant',
          'Inspirez en descendant comme pour vous asseoir',
          'Descendez jusqu\'à ce que vos cuisses soient parallèles au sol',
          'Expirez en remontant en contractant les fessiers',
          'Répétez 10 à 15 fois'
        ],
        2: [
          'Placez-vous face à un mur, à environ un bras de distance',
          'Mains à hauteur des épaules, largeur des épaules',
          'Pliez les coudes pour rapprocher votre poitrine du mur',
          'Gardez le corps aligné de la tête aux pieds',
          'Poussez pour revenir à la position de départ',
          'Répétez 8 à 12 fois'
        ],
        3: [
          'Position à quatre pattes, mains sous les épaules, genoux sous les hanches',
          'Inspirez : creusez le dos, tête vers le haut (posture "vache")',
          'Expirez : arrondissez le dos, tête vers le bas (posture "chat")',
          'Effectuez des mouvements lents et contrôlés',
          'Synchronisez votre respiration avec le mouvement',
          'Répétez 10 cycles'
        ],
        4: [
          'Asseyez-vous droit sur votre chaise',
          'Inclinez doucement la tête vers l\'épaule droite',
          'Maintenez 15 secondes sans forcer',
          'Répétez de l\'autre côté',
          'Roulez doucement les épaules vers l\'arrière',
          'Répétez chaque mouvement 3 fois'
        ]
      },
      en: {
        1: [
          'Starting position: Stand with feet shoulder-width apart',
          'Keep your back straight and look forward',
          'Inhale as you lower yourself as if sitting down',
          'Lower until your thighs are parallel to the ground',
          'Exhale as you rise up, contracting your glutes',
          'Repeat 10 to 15 times'
        ],
        2: [
          'Stand facing a wall, about an arm\'s length away',
          'Hands at shoulder height, shoulder-width apart',
          'Bend elbows to bring your chest toward the wall',
          'Keep your body aligned from head to toes',
          'Push to return to starting position',
          'Repeat 8 to 12 times'
        ],
        3: [
          'On all fours, hands under shoulders, knees under hips',
          'Inhale: arch your back, look up ("cow" pose)',
          'Exhale: round your back, look down ("cat" pose)',
          'Perform slow, controlled movements',
          'Synchronize your breathing with the movement',
          'Repeat 10 cycles'
        ],
        4: [
          'Sit upright on your chair',
          'Gently tilt your head toward your right shoulder',
          'Hold for 15 seconds without forcing',
          'Repeat on the other side',
          'Gently roll your shoulders backward',
          'Repeat each movement 3 times'
        ]
      }
    };

    let instructions = [...baseInstructions[language][exercise.id]];

    // Personnalisation selon le niveau
    if (profile.experience === 'débutant' || profile.experience === 'beginner') {
      instructions.push(
        language === 'fr' 
          ? '💡 CONSEIL DÉBUTANT : Commencez avec seulement 5 répétitions'
          : '💡 BEGINNER TIP : Start with only 5 repetitions'
      );
    }

    if (profile.experience === 'avancé' || profile.experience === 'advanced') {
      instructions.push(
        language === 'fr'
          ? '🔥 DÉFI AVANCÉ : Maintenez la position basse pendant 3 secondes'
          : '🔥 ADVANCED CHALLENGE : Hold the low position for 3 seconds'
      );
    }

    // Personnalisation selon les points douloureux
    if (profile.painPoints.includes('dos') || profile.painPoints.includes('back')) {
      instructions.push(
        language === 'fr'
          ? '⚠️ ATTENTION DOS : Gardez vos abdos engagés pour protéger votre colonne'
          : '⚠️ BACK ALERT : Keep your core engaged to protect your spine'
      );
    }

    if (profile.painPoints.includes('genoux') || profile.painPoints.includes('knees')) {
      instructions.push(
        language === 'fr'
          ? '🦵 PROTECTION GENOUX : Ne dépassez pas 90° de flexion'
          : '🦵 KNEE PROTECTION : Don\'t bend beyond 90 degrees'
      );
    }

    // Personnalisation selon le temps assis
    if (profile.dailySitting === '> 10h' || profile.dailySitting === '8-10h') {
      instructions.push(
        language === 'fr'
          ? '💺 BUREAU : Faites cet exercice toutes les 2 heures de travail'
          : '💺 DESK : Do this exercise every 2 hours of work'
      );
    }

    return instructions;
  };

  const instructions = getPersonalizedInstructions();

  const tips = {
    fr: [
      'Respirez profondément pendant l\'exercice',
      'Ne forcez jamais une position douloureuse',
      'Maintenez un rythme lent et contrôlé',
      'Écoutez votre corps et adaptez l\'intensité',
      'Hydratez-vous avant et après l\'exercice'
    ],
    en: [
      'Breathe deeply during the exercise',
      'Never force a painful position',
      'Maintain a slow, controlled rhythm',
      'Listen to your body and adapt intensity',
      'Hydrate before and after exercise'
    ]
  };

  return (
    <div className="exercise-guide">
      <div className="guide-header">
        <h2>{exercise.name[language]}</h2>
        <div className="exercise-metadata">
          <div className="metadata-item">
            <span className="label">{language === 'fr' ? 'Difficulté :' : 'Difficulty:'}</span>
            <span className="value">{exercise.difficulty[language]}</span>
          </div>
          <div className="metadata-item">
            <span className="label">{language === 'fr' ? 'Durée :' : 'Duration:'}</span>
            <span className="value">⏱️ {exercise.duration} min</span>
          </div>
          <div className="metadata-item">
            <span className="label">{language === 'fr' ? 'Catégorie :' : 'Category:'}</span>
            <span className="value">{exercise.category}</span>
          </div>
        </div>
      </div>

      <div className="guide-content">
        <div className="instructions-section">
          <h3>📝 {language === 'fr' ? 'Instructions détaillées' : 'Detailed instructions'}</h3>
          
          <div className="step-navigation">
            <button 
              className="step-btn prev"
              onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
              disabled={currentStep === 0}
            >
              ←
            </button>
            
            <div className="step-display">
              <span className="current-step">{currentStep + 1}</span>
              <span className="total-steps">/{instructions.length}</span>
            </div>
            
            <button 
              className="step-btn next"
              onClick={() => setCurrentStep(Math.min(instructions.length - 1, currentStep + 1))}
              disabled={currentStep === instructions.length - 1}
            >
              →
            </button>
          </div>

          <div className="instruction-card">
            <div className="step-number">
              Étape {currentStep + 1}
            </div>
            <p className="instruction-text">
              {instructions[currentStep]}
              {currentStep >= 6 && (
                <span className="personalized-badge">
                  {language === 'fr' ? '✨ Personnalisé' : '✨ Personalized'}
                </span>
              )}
            </p>
            
            {exercise.id === 1 && currentStep === 2 && (
              <div className="angle-indicator">
                <div className="angle-display">90°</div>
                <span>{language === 'fr' ? 'Angle genoux recommandé' : 'Recommended knee angle'}</span>
              </div>
            )}
            
            {exercise.id === 2 && currentStep === 2 && (
              <div className="alignment-check">
                <div className="alignment-line"></div>
                <span>{language === 'fr' ? 'Corps aligné' : 'Body aligned'}</span>
              </div>
            )}
          </div>

          <div className="all-instructions">
            <h4>{language === 'fr' ? 'Toutes les étapes :' : 'All steps:'}</h4>
            <ul>
              {instructions.map((instruction, index) => (
                <li 
                  key={index}
                  className={index === currentStep ? 'active' : ''}
                  onClick={() => setCurrentStep(index)}
                >
                  <span className="step-marker">{index + 1}</span>
                  {instruction}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="side-panel">
          <div className="benefits-card">
            <h3>✅ {language === 'fr' ? 'Bénéfices spécifiques' : 'Specific benefits'}</h3>
            <ul>
              {exercise.benefits[language].map((benefit, index) => (
                <li key={index}>{benefit}</li>
              ))}
            </ul>
          </div>

          <div className="tips-card">
            <h3>💡 {language === 'fr' ? 'Conseils généraux' : 'General tips'}</h3>
            <ul>
              {tips[language].map((tip, index) => (
                <li key={index}>{tip}</li>
              ))}
            </ul>
          </div>

          <div className="video-card">
            <h3>🎬 {language === 'fr' ? 'Démonstration vidéo' : 'Video demonstration'}</h3>
            <div className="video-container">
              <iframe
                src={exercise.videoUrl}
                title={`${exercise.name[language]} demonstration`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <p className="video-note">
              {language === 'fr'
                ? 'Regardez cette vidéo pour une démonstration complète'
                : 'Watch this video for a complete demonstration'}
            </p>
          </div>
        </div>
      </div>

      <div className="guide-footer">
        <div className="warning-box">
          <h4>⚠️ {language === 'fr' ? 'Important :' : 'Important:'}</h4>
          <p>
            {language === 'fr'
              ? 'Consultez un professionnel de santé avant de commencer un nouveau programme d\'exercice, surtout si vous avez des problèmes de santé préexistants.'
              : 'Consult a healthcare professional before starting a new exercise program, especially if you have pre-existing health conditions.'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ExerciseGuide;