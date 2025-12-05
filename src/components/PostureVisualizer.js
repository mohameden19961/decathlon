import React, { useState, useEffect } from 'react';
import './PostureVisualizer.css';

const PostureVisualizer = ({ exercise, language }) => {
  const [viewMode, setViewMode] = useState('correct'); // 'correct' or 'incorrect'
  const [angle, setAngle] = useState(0);
  const [animationPlaying, setAnimationPlaying] = useState(false);

  // Données de visualisation par exercice
  const visualizationData = {
    1: { // Squat
      correct: {
        title: language === 'fr' ? 'Posture correcte du squat' : 'Correct squat posture',
        points: [
          language === 'fr' ? 'Genoux alignés avec les orteils' : 'Knees aligned with toes',
          language === 'fr' ? 'Dos droit et naturel' : 'Straight natural back',
          language === 'fr' ? 'Poids réparti sur les talons' : 'Weight on heels',
          language === 'fr' ? 'Profondeur : cuisses parallèles au sol' : 'Depth: thighs parallel to ground'
        ],
        angles: [
          { label: language === 'fr' ? 'Flexion genoux' : 'Knee flexion', value: 90 },
          { label: language === 'fr' ? 'Inclinaison buste' : 'Torso lean', value: 45 },
          { label: language === 'fr' ? 'Alignement cheville-genou-hanche' : 'Ankle-knee-hip alignment', value: 180 }
        ]
      },
      incorrect: {
        title: language === 'fr' ? 'Erreurs courantes' : 'Common mistakes',
        points: [
          language === 'fr' ? 'Genoux qui rentrent vers l\'intérieur' : 'Knees caving inward',
          language === 'fr' ? 'Dos trop arrondi (bascule du bassin)' : 'Overly rounded back',
          language === 'fr' ? 'Trop penché en avant' : 'Leaning too far forward',
          language === 'fr' ? 'Profondeur insuffisante ou excessive' : 'Insufficient or excessive depth'
        ]
      }
    },
    2: { // Pompes murales
      correct: {
        title: language === 'fr' ? 'Posture correcte des pompes muraux' : 'Correct wall push-up posture',
        points: [
          language === 'fr' ? 'Corps aligné de la tête aux pieds' : 'Body aligned head to toes',
          language === 'fr' ? 'Coudes à 45° du corps' : 'Elbows at 45° from body',
          language === 'fr' ? 'Omoplates rapprochées en phase haute' : 'Shoulder blades together at top',
          language === 'fr' ? 'Respiration synchronisée' : 'Synchronized breathing'
        ],
        angles: [
          { label: language === 'fr' ? 'Angle coudes' : 'Elbow angle', value: 90 },
          { label: language === 'fr' ? 'Inclinaison corps' : 'Body inclination', value: 60 },
          { label: language === 'fr' ? 'Distance pieds-mur' : 'Feet-wall distance', value: '1 bras' }
        ]
      },
      incorrect: {
        title: language === 'fr' ? 'Erreurs courantes' : 'Common mistakes',
        points: [
          language === 'fr' ? 'Coudes trop écartés' : 'Elbows too wide',
          language === 'fr' ? 'Tête qui tombe vers l\'avant' : 'Head falling forward',
          language === 'fr' ? 'Cambrure excessive du dos' : 'Excessive back arch',
          language === 'fr' ? 'Respiration bloquée' : 'Holding breath'
        ]
      }
    },
    3: { // Chat-Vache
      correct: {
        title: language === 'fr' ? 'Posture correcte Chat-Vache' : 'Correct Cat-Cow posture',
        points: [
          language === 'fr' ? 'Mouvements lents et fluides' : 'Slow fluid movements',
          language === 'fr' ? 'Respiration synchronisée avec le mouvement' : 'Breath synchronized with movement',
          language === 'fr' ? 'Mains sous les épaules, genoux sous les hanches' : 'Hands under shoulders, knees under hips',
          language === 'fr' ? 'Amplitude confortable et contrôlée' : 'Comfortable controlled range'
        ],
        angles: [
          { label: language === 'fr' ? 'Flexion colonne (Chat)' : 'Spine flexion (Cat)', value: 'Arqué' },
          { label: language === 'fr' ? 'Extension colonne (Vache)' : 'Spine extension (Cow)', value: 'Creux' },
          { label: language === 'fr' ? 'Amplitude mouvement' : 'Movement range', value: 'Complet' }
        ]
      },
      incorrect: {
        title: language === 'fr' ? 'Erreurs courantes' : 'Common mistakes',
        points: [
          language === 'fr' ? 'Mouvements rapides et saccadés' : 'Fast jerky movements',
          language === 'fr' ? 'Respiration non synchronisée' : 'Unsynchronized breathing',
          language === 'fr' ? 'Forçage de l\'amplitude' : 'Forcing the range',
          language === 'fr' ? 'Épaules remontées vers les oreilles' : 'Shoulders shrugged toward ears'
        ]
      }
    },
    4: { // Étirement trapèzes
      correct: {
        title: language === 'fr' ? 'Posture correcte d\'étirement' : 'Correct stretching posture',
        points: [
          language === 'fr' ? 'Étirement doux sans forcer' : 'Gentle stretch without forcing',
          language === 'fr' ? 'Respiration régulière et profonde' : 'Regular deep breathing',
          language === 'fr' ? 'Maintien de la position 15-30 secondes' : 'Hold position 15-30 seconds',
          language === 'fr' ? 'Posture assise droite' : 'Upright sitting posture'
        ],
        angles: [
          { label: language === 'fr' ? 'Inclinaison tête' : 'Head tilt', value: 45 },
          { label: language === 'fr' ? 'Rotation épaules' : 'Shoulder rotation', value: 180 },
          { label: language === 'fr' ? 'Maintien position' : 'Position hold', value: '15-30s' }
        ]
      },
      incorrect: {
        title: language === 'fr' ? 'Erreurs courantes' : 'Common mistakes',
        points: [
          language === 'fr' ? 'Étirement trop intense (douleur)' : 'Too intense stretch (pain)',
          language === 'fr' ? 'Retenir la respiration' : 'Holding breath',
          language === 'fr' ? 'Épaules remontées' : 'Shoulders shrugged',
          language === 'fr' ? 'Dos arrondi' : 'Rounded back'
        ]
      }
    }
  };

  const data = visualizationData[exercise.id];
  const currentView = viewMode === 'correct' ? data.correct : data.incorrect;

  // Animation pour les angles
  useEffect(() => {
    if (animationPlaying) {
      const interval = setInterval(() => {
        setAngle(prev => (prev + 5) % 360);
        console.log(angle);
      }, 50);
      return () => clearInterval(interval);
    }
  }, [animationPlaying, angle]);

  const renderVisualization = () => {
    switch (exercise.id) {
      case 1: // Squat
        return (
          <div className="squat-visualization">
            <div className="body-outline">
              <div className="head"></div>
              <div className="spine">
                <div className="spine-line"></div>
                <div className={`spine-curve ${viewMode}`}></div>
              </div>
              <div className="legs">
                <div className="leg left">
                  <div className="thigh"></div>
                  <div className="shin">
                    <div className={`knee-angle ${viewMode}`} style={{ transform: `rotate(${viewMode === 'correct' ? 90 : 70}deg)` }}></div>
                  </div>
                </div>
                <div className="leg right">
                  <div className="thigh"></div>
                  <div className="shin">
                    <div className={`knee-angle ${viewMode}`} style={{ transform: `rotate(${viewMode === 'correct' ? 90 : 110}deg)` }}></div>
                  </div>
                </div>
              </div>
              <div className="feet">
                <div className="foot left"></div>
                <div className="foot right"></div>
              </div>
            </div>
            
            <div className="alignment-lines">
              <div className="vertical-line"></div>
              <div className="knee-markers">
                <div className="knee-marker left" style={{ left: viewMode === 'correct' ? '45%' : '40%' }}></div>
                <div className="knee-marker right" style={{ left: viewMode === 'correct' ? '55%' : '60%' }}></div>
              </div>
              <div className="foot-markers">
                <div className="foot-marker left"></div>
                <div className="foot-marker right"></div>
              </div>
            </div>
          </div>
        );
      
      case 2: // Pompes murales
        return (
          <div className="pushup-visualization">
            <div className="wall"></div>
            <div className="body-outline pushup">
              <div className="head"></div>
              <div className="spine-line"></div>
              <div className={`body-angle ${viewMode}`} style={{ transform: `rotate(${viewMode === 'correct' ? 60 : 45}deg)` }}></div>
              <div className="arms">
                <div className="arm left">
                  <div className="upper-arm"></div>
                  <div className="forearm">
                    <div className="elbow-angle" style={{ transform: `rotate(${viewMode === 'correct' ? 90 : 120}deg)` }}></div>
                  </div>
                </div>
                <div className="arm right">
                  <div className="upper-arm"></div>
                  <div className="forearm">
                    <div className="elbow-angle" style={{ transform: `rotate(${viewMode === 'correct' ? 90 : 60}deg)` }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 3: // Chat-Vache
        return (
          <div className="catcow-visualization">
            <div className="body-outline catcow">
              <div className="spine-curve-container">
                <div className={`spine-curve ${viewMode === 'correct' ? 'correct' : 'incorrect'} ${animationPlaying ? 'animating' : ''}`}></div>
                <div className="head"></div>
                <div className="limbs">
                  <div className="limb front-left"></div>
                  <div className="limb front-right"></div>
                  <div className="limb back-left"></div>
                  <div className="limb back-right"></div>
                </div>
              </div>
            </div>
            
            <button 
              className="animation-toggle"
              onClick={() => setAnimationPlaying(!animationPlaying)}
            >
              {animationPlaying ? '⏸️' : '▶️'} {language === 'fr' ? 'Animation' : 'Animation'}
            </button>
          </div>
        );
      
      case 4: // Étirement
        return (
          <div className="stretch-visualization">
            <div className="chair"></div>
            <div className="body-outline seated">
              <div className="head" style={{ transform: `rotate(${viewMode === 'correct' ? 45 : 60}deg)` }}></div>
              <div className="neck-line"></div>
              <div className="shoulders">
                <div className="shoulder left"></div>
                <div className="shoulder right"></div>
              </div>
              <div className="spine-line seated"></div>
            </div>
            
            <div className="stretch-indicator">
              <div className={`tension-line ${viewMode}`}></div>
              <span className="tension-label">
                {viewMode === 'correct' 
                  ? language === 'fr' ? 'Tension douce' : 'Gentle tension'
                  : language === 'fr' ? 'Tension excessive' : 'Excessive tension'}
              </span>
            </div>
          </div>
        );
      
      default:
        return <div>{language === 'fr' ? 'Visualisation non disponible' : 'Visualization not available'}</div>;
    }
  };

  return (
    <div className="posture-visualizer">
      <div className="visualizer-header">
        <h2>🎨 {language === 'fr' ? 'Visualiseur de Posture' : 'Posture Visualizer'}</h2>
        <div className="view-toggle">
          <button 
            className={`toggle-btn ${viewMode === 'correct' ? 'active' : ''}`}
            onClick={() => setViewMode('correct')}
          >
            ✅ {language === 'fr' ? 'Posture Correcte' : 'Correct Posture'}
          </button>
          <button 
            className={`toggle-btn ${viewMode === 'incorrect' ? 'active' : ''}`}
            onClick={() => setViewMode('incorrect')}
          >
            ❌ {language === 'fr' ? 'Erreurs à Éviter' : 'Mistakes to Avoid'}
          </button>
        </div>
      </div>

      <div className="visualization-container">
        <div className="visualization-area">
          {renderVisualization()}
        </div>

        <div className="visualization-info">
          <div className="info-card">
            <h3>{currentView.title}</h3>
            <ul className="posture-points">
              {currentView.points.map((point, index) => (
                <li key={index}>
                  {viewMode === 'correct' ? '✓' : '✗'} {point}
                </li>
              ))}
            </ul>
          </div>

          {viewMode === 'correct' && data.correct.angles && (
            <div className="angles-card">
              <h3>📐 {language === 'fr' ? 'Angles recommandés' : 'Recommended angles'}</h3>
              <div className="angles-grid">
                {data.correct.angles.map((angleData, index) => (
                  <div key={index} className="angle-item">
                    <div className="angle-value">{angleData.value}</div>
                    <div className="angle-label">{angleData.label}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="tips-card">
            <h3>💡 {language === 'fr' ? 'Comment vérifier' : 'How to check'}</h3>
            <ul>
              {exercise.id === 1 && (
                language === 'fr' ? [
                  'Filmez-vous de profil pour vérifier l\'alignement',
                  'Placez un miroir sur le côté',
                  'Demandez à quelqu\'un de vous observer'
                ] : [
                  'Film yourself from the side to check alignment',
                  'Place a mirror to the side',
                  'Ask someone to observe you'
                ]
              )}
              {exercise.id === 2 && (
                language === 'fr' ? [
                  'Vérifiez que vos omoplates se rapprochent en haut',
                  'Assurez-vous que votre tête reste dans l\'alignement',
                  'Contrôlez la distance coudes-corps'
                ] : [
                  'Check that your shoulder blades come together at the top',
                  'Make sure your head stays aligned',
                  'Control elbow-body distance'
                ]
              )}
              {exercise.id === 3 && (
                language === 'fr' ? [
                  'Sentez chaque vertèbre bouger séparément',
                  'Écoutez votre respiration',
                  'Ne forcez pas l\'amplitude'
                ] : [
                  'Feel each vertebra move separately',
                  'Listen to your breathing',
                  'Don\'t force the range'
                ]
              )}
              {exercise.id === 4 && (
                language === 'fr' ? [
                  'L\'étirement doit être agréable, pas douloureux',
                  'Vous devez pouvoir respirer normalement',
                  'La sensation doit diminuer après 15 secondes'
                ] : [
                  'The stretch should be pleasant, not painful',
                  'You should be able to breathe normally',
                  'The sensation should decrease after 15 seconds'
                ]
              )}
            </ul>
          </div>
        </div>
      </div>

      <div className="comparison-section">
        <h3>🔄 {language === 'fr' ? 'Comparaison visuelle' : 'Visual comparison'}</h3>
        <div className="comparison-grid">
          <div className="comparison-item correct">
            <h4>✅ {language === 'fr' ? 'À FAIRE' : 'TO DO'}</h4>
            <div className="comparison-visual mini">
              {exercise.id === 1 && (
                <div className="mini-squat correct"></div>
              )}
              {exercise.id === 2 && (
                <div className="mini-pushup correct"></div>
              )}
              {exercise.id === 3 && (
                <div className="mini-catcow correct"></div>
              )}
              {exercise.id === 4 && (
                <div className="mini-stretch correct"></div>
              )}
            </div>
            <ul>
              {data.correct.points.slice(0, 2).map((point, idx) => (
                <li key={idx}>✓ {point}</li>
              ))}
            </ul>
          </div>
          
          <div className="comparison-item incorrect">
            <h4>❌ {language === 'fr' ? 'À ÉVITER' : 'TO AVOID'}</h4>
            <div className="comparison-visual mini">
              {exercise.id === 1 && (
                <div className="mini-squat incorrect"></div>
              )}
              {exercise.id === 2 && (
                <div className="mini-pushup incorrect"></div>
              )}
              {exercise.id === 3 && (
                <div className="mini-catcow incorrect"></div>
              )}
              {exercise.id === 4 && (
                <div className="mini-stretch incorrect"></div>
              )}
            </div>
            <ul>
              {data.incorrect.points.slice(0, 2).map((point, idx) => (
                <li key={idx}>✗ {point}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostureVisualizer;