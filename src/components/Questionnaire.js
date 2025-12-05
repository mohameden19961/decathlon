import React, { useState } from 'react';
import './Questionnaire.css';

const Questionnaire = ({ onComplete, language, initialData }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState(initialData);

  const questions = {
    fr: [
      {
        id: 1,
        question: "Quel est votre niveau d'expérience sportive ?",
        type: 'single',
        options: [
          { value: 'débutant', label: '🏃‍♂️ Débutant (je commence)' },
          { value: 'intermédiaire', label: '💪 Intermédiaire (je pratique occasionnellement)' },
          { value: 'avancé', label: '🏆 Avancé (je pratique régulièrement)' }
        ]
      },
      {
        id: 2,
        question: "Quels sports pratiquez-vous ?",
        type: 'multiple',
        options: [
          { value: 'course', label: '👟 Course à pied' },
          { value: 'musculation', label: '🏋️‍♂️ Musculation' },
          { value: 'yoga', label: '🧘‍♀️ Yoga/Pilates' },
          { value: 'cyclisme', label: '🚴‍♂️ Cyclisme' },
          { value: 'natation', label: '🏊‍♀️ Natation' },
          { value: 'sports_co', label: '🏀 Sports collectifs' }
        ]
      },
      {
        id: 3,
        question: "Quels sont vos objectifs principaux ?",
        type: 'multiple',
        options: [
          { value: 'posture', label: '🎯 Améliorer ma posture' },
          { value: 'prévention', label: '🛡️ Prévenir les blessures' },
          { value: 'soulagement', label: '💆‍♂️ Soulager les douleurs' },
          { value: 'renforcement', label: '💪 Renforcement musculaire' },
          { value: 'flexibilité', label: '🤸‍♀️ Améliorer la flexibilité' },
          { value: 'performance', label: '⚡ Améliorer la performance' }
        ]
      },
      {
        id: 4,
        question: "Quels sont vos points sensibles ?",
        type: 'multiple',
        options: [
          { value: 'nuque', label: '💆‍♂️ Nuque/Cou' },
          { value: 'épaules', label: '💪 Épaules' },
          { value: 'dos', label: '🦴 Dos (lombaires/dorsales)' },
          { value: 'poignets', label: '✋ Poignets' },
          { value: 'genoux', label: '🦵 Genoux' },
          { value: 'aucun', label: '✅ Aucun pour le moment' }
        ]
      },
      {
        id: 5,
        question: "Combien d'heures passez-vous assis par jour ?",
        type: 'single',
        options: [
          { value: '< 4h', label: '🪑 Moins de 4 heures' },
          { value: '4-6h', label: '💼 4 à 6 heures' },
          { value: '6-8h', label: '💻 6 à 8 heures' },
          { value: '8-10h', label: '🖥️ 8 à 10 heures' },
          { value: '> 10h', label: '⌨️ Plus de 10 heures' }
        ]
      },
      {
        id: 6,
        question: "Quel équipement avez-vous à disposition ?",
        type: 'multiple',
        options: [
          { value: 'tapis', label: '🧘‍♀️ Tapis de sol' },
          { value: 'bandes', label: '🔄 Bandes élastiques' },
          { value: 'chaise', label: '💺 Chaise de bureau' },
          { value: 'mur', label: '🧱 Mur libre' },
          { value: 'aucun', label: '🏠 Aucun équipement' }
        ]
      },
      {
        id: 7,
        question: "À quelle fréquence faites-vous du sport ?",
        type: 'single',
        options: [
          { value: 'jamais', label: '🚫 Jamais' },
          { value: 'rarement', label: '🗓️ Rarement (1x/semaine)' },
          { value: 'occasionnel', label: '📅 Occasionnellement (2-3x/semaine)' },
          { value: 'régulier', label: '🏃‍♂️ Régulièrement (4-5x/semaine)' },
          { value: 'quotidien', label: '🔥 Quotidiennement' }
        ]
      },
      {
        id: 8,
        question: "Quel est votre métier ?",
        type: 'single',
        options: [
          { value: 'développeur', label: '💻 Développeur/IT' },
          { value: 'bureau', label: '💼 Bureau sédentaire' },
          { value: 'manuel', label: '🔧 Travail manuel' },
          { value: 'étudiant', label: '🎓 Étudiant' },
          { value: 'autre', label: '🏢 Autre' }
        ]
      }
    ],
    en: [
      {
        id: 1,
        question: "What is your sports experience level?",
        type: 'single',
        options: [
          { value: 'beginner', label: '🏃‍♂️ Beginner (just starting)' },
          { value: 'intermediate', label: '💪 Intermediate (occasional practice)' },
          { value: 'advanced', label: '🏆 Advanced (regular practice)' }
        ]
      },
      {
        id: 2,
        question: "Which sports do you practice?",
        type: 'multiple',
        options: [
          { value: 'running', label: '👟 Running' },
          { value: 'weight', label: '🏋️‍♂️ Weight training' },
          { value: 'yoga', label: '🧘‍♀️ Yoga/Pilates' },
          { value: 'cycling', label: '🚴‍♂️ Cycling' },
          { value: 'swimming', label: '🏊‍♀️ Swimming' },
          { value: 'team', label: '🏀 Team sports' }
        ]
      },
      {
        id: 3,
        question: "What are your main goals?",
        type: 'multiple',
        options: [
          { value: 'posture', label: '🎯 Improve posture' },
          { value: 'prevention', label: '🛡️ Prevent injuries' },
          { value: 'relief', label: '💆‍♂️ Relieve pain' },
          { value: 'strength', label: '💪 Build strength' },
          { value: 'flexibility', label: '🤸‍♀️ Improve flexibility' },
          { value: 'performance', label: '⚡ Improve performance' }
        ]
      },
      {
        id: 4,
        question: "What are your sensitive points?",
        type: 'multiple',
        options: [
          { value: 'neck', label: '💆‍♂️ Neck' },
          { value: 'shoulders', label: '💪 Shoulders' },
          { value: 'back', label: '🦴 Back (lumbar/thoracic)' },
          { value: 'wrists', label: '✋ Wrists' },
          { value: 'knees', label: '🦵 Knees' },
          { value: 'none', label: '✅ None at the moment' }
        ]
      },
      {
        id: 5,
        question: "How many hours do you spend sitting per day?",
        type: 'single',
        options: [
          { value: '< 4h', label: '🪑 Less than 4 hours' },
          { value: '4-6h', label: '💼 4 to 6 hours' },
          { value: '6-8h', label: '💻 6 to 8 hours' },
          { value: '8-10h', label: '🖥️ 8 to 10 hours' },
          { value: '> 10h', label: '⌨️ More than 10 hours' }
        ]
      },
      {
        id: 6,
        question: "What equipment do you have available?",
        type: 'multiple',
        options: [
          { value: 'mat', label: '🧘‍♀️ Exercise mat' },
          { value: 'bands', label: '🔄 Resistance bands' },
          { value: 'chair', label: '💺 Office chair' },
          { value: 'wall', label: '🧱 Free wall' },
          { value: 'none', label: '🏠 No equipment' }
        ]
      },
      {
        id: 7,
        question: "How often do you exercise?",
        type: 'single',
        options: [
          { value: 'never', label: '🚫 Never' },
          { value: 'rarely', label: '🗓️ Rarely (1x/week)' },
          { value: 'occasional', label: '📅 Occasionally (2-3x/week)' },
          { value: 'regular', label: '🏃‍♂️ Regularly (4-5x/week)' },
          { value: 'daily', label: '🔥 Daily' }
        ]
      },
      {
        id: 8,
        question: "What is your job?",
        type: 'single',
        options: [
          { value: 'developer', label: '💻 Developer/IT' },
          { value: 'office', label: '💼 Sedentary office' },
          { value: 'manual', label: '🔧 Manual labor' },
          { value: 'student', label: '🎓 Student' },
          { value: 'other', label: '🏢 Other' }
        ]
      }
    ]
  };

  const currentQ = questions[language][currentQuestion];

  const handleOptionSelect = (option) => {
    if (currentQ.type === 'single') {
      setAnswers({
        ...answers,
        [getFieldName(currentQ.id)]: option.value
      });
      
      if (currentQuestion < questions[language].length - 1) {
        setTimeout(() => setCurrentQuestion(currentQuestion + 1), 300);
      } else {
        handleComplete();
      }
    } else {
      const currentValues = answers[getFieldName(currentQ.id)] || [];
      const newValues = currentValues.includes(option.value)
        ? currentValues.filter(v => v !== option.value)
        : [...currentValues, option.value];
      
      setAnswers({
        ...answers,
        [getFieldName(currentQ.id)]: newValues
      });
    }
  };

  const getFieldName = (questionId) => {
    const fields = ['experience', 'sports', 'goals', 'painPoints', 
                   'dailySitting', 'equipment', 'frequency', 'jobType'];
    return fields[questionId - 1];
  };

  const isOptionSelected = (option) => {
    const field = getFieldName(currentQ.id);
    const value = answers[field];
    
    if (currentQ.type === 'single') {
      return value === option.value;
    } else {
      return Array.isArray(value) && value.includes(option.value);
    }
  };

  const handleComplete = () => {
    onComplete(answers);
  };

  const progress = ((currentQuestion + 1) / questions[language].length) * 100;

  return (
    <div className="questionnaire">
      <div className="questionnaire-header">
        <h2>
          {language === 'fr' 
            ? `Étape ${currentQuestion + 1}/8 : Profil Sportif` 
            : `Step ${currentQuestion + 1}/8 : Sports Profile`}
        </h2>
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      <div className="question-card">
        <h3 className="question-text">{currentQ.question}</h3>
        
        <div className="options-grid">
          {currentQ.options.map((option, index) => (
            <button
              key={index}
              className={`option-btn ${isOptionSelected(option) ? 'selected' : ''}`}
              onClick={() => handleOptionSelect(option)}
            >
              <span className="option-emoji">{option.label.split(' ')[0]}</span>
              <span className="option-text">
                {option.label.split(' ').slice(1).join(' ')}
              </span>
              {isOptionSelected(option) && (
                <span className="checkmark">✓</span>
              )}
            </button>
          ))}
        </div>

        <div className="navigation">
          {currentQuestion > 0 && (
            <button 
              className="nav-btn prev"
              onClick={() => setCurrentQuestion(currentQuestion - 1)}
            >
              ← {language === 'fr' ? 'Précédent' : 'Previous'}
            </button>
          )}
          
          {currentQ.type === 'multiple' && currentQuestion < questions[language].length - 1 && (
            <button 
              className="nav-btn next"
              onClick={() => setCurrentQuestion(currentQuestion + 1)}
              disabled={!answers[getFieldName(currentQ.id)] || answers[getFieldName(currentQ.id)].length === 0}
            >
              {language === 'fr' ? 'Suivant' : 'Next'} →
            </button>
          )}
          
          {currentQuestion === questions[language].length - 1 && (
            <button 
              className="complete-btn"
              onClick={handleComplete}
              disabled={currentQ.type === 'multiple' && 
                       (!answers[getFieldName(currentQ.id)] || 
                        answers[getFieldName(currentQ.id)].length === 0)}
            >
              {language === 'fr' ? 'Terminer le profil' : 'Complete profile'}
            </button>
          )}
        </div>
      </div>

      <div className="questionnaire-footer">
        <p className="tip">
          {language === 'fr' 
            ? '💡 Vos réponses nous permettent de personnaliser vos exercices et recommandations.'
            : '💡 Your answers help us personalize your exercises and recommendations.'}
        </p>
      </div>
    </div>
  );
};

export default Questionnaire;