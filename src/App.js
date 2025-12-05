import React, { useState, useEffect } from 'react';
import './App.css';
import Questionnaire from './components/Questionnaire';
import ProfileDisplay from './components/ProfileDisplay';
import ExerciseGuide from './components/ExerciseGuide';
import DecathlonProducts from './components/DecathlonProducts';
import PostureVisualizer from './components/PostureVisualizer';

const App = () => {
  // États principaux
  const [currentStep, setCurrentStep] = useState('questionnaire'); // questionnaire, profile, exercises, products
  const [userProfile, setUserProfile] = useState(null);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [language, setLanguage] = useState('fr');
  const [darkMode, setDarkMode] = useState(false);

  // Données du profil utilisateur
  const [profileData, setProfileData] = useState({
    experience: '',
    sports: [],
    goals: [],
    painPoints: [],
    dailySitting: '',
    equipment: [],
    frequency: '',
    age: '',
    jobType: ''
  });

  // Exercices disponibles
  const exercises = [
    {
      id: 1,
      name: { fr: 'Squat de base', en: 'Basic Squat' },
      category: 'strength',
      difficulty: { fr: 'Débutant', en: 'Beginner' },
      duration: 5,
      muscles: { fr: ['Cuisses', 'Fessiers', 'Dos'], en: ['Thighs', 'Glutes', 'Back'] },
      videoUrl: 'https://www.youtube.com/embed/aclHkVaku9U',
      benefits: {
        fr: [
          'Renforce les jambes et les fessiers',
          'Améliore la stabilité',
          'Prévient les douleurs lombaires',
          'Améliore la posture assise'
        ],
        en: [
          'Strengthens legs and glutes',
          'Improves stability',
          'Prevents lower back pain',
          'Improves sitting posture'
        ]
      }
    },
    {
      id: 2,
      name: { fr: 'Pompes muraux', en: 'Wall Push-ups' },
      category: 'strength',
      difficulty: { fr: 'Débutant', en: 'Beginner' },
      duration: 4,
      muscles: { fr: ['Poitrine', 'Épaules', 'Bras'], en: ['Chest', 'Shoulders', 'Arms'] },
      videoUrl: 'https://www.youtube.com/embed/4dF1DOWzf20',
      benefits: {
        fr: [
          'Renforce le haut du corps',
          'Corrige la posture voûtée',
          'Protège les épaules',
          'Améliore la mobilité thoracique'
        ],
        en: [
          'Strengthens upper body',
          'Corrects hunched posture',
          'Protects shoulders',
          'Improves thoracic mobility'
        ]
      }
    },
    {
      id: 3,
      name: { fr: 'Posture du Chat-Vache', en: 'Cat-Cow Pose' },
      category: 'flexibility',
      difficulty: { fr: 'Tous niveaux', en: 'All levels' },
      duration: 3,
      muscles: { fr: ['Dos', 'Abdomen', 'Colonne vertébrale'], en: ['Back', 'Core', 'Spine'] },
      videoUrl: 'https://www.youtube.com/embed/kqnua4rHVVA',
      benefits: {
        fr: [
          'Améliore la mobilité vertébrale',
          'Soulage les tensions du dos',
          'Améliore la respiration',
          'Détend les muscles'
        ],
        en: [
          'Improves spinal mobility',
          'Relieves back tension',
          'Improves breathing',
          'Relaxes muscles'
        ]
      }
    },
    {
      id: 4,
      name: { fr: 'Étirement des trapèzes', en: 'Trapezius Stretch' },
      category: 'stretching',
      difficulty: { fr: 'Débutant', en: 'Beginner' },
      duration: 2,
      muscles: { fr: ['Nuque', 'Épaules', 'Trapèzes'], en: ['Neck', 'Shoulders', 'Trapezius'] },
      videoUrl: 'https://www.youtube.com/embed/2NOsE-VPpkE',
      benefits: {
        fr: [
          'Soulage les tensions cervicales',
          'Réduit les maux de tête',
          'Améliore la circulation',
          'Détend les épaules'
        ],
        en: [
          'Relieves neck tension',
          'Reduces headaches',
          'Improves circulation',
          'Relaxes shoulders'
        ]
      }
    }
  ];

  // Traductions
  const translations = {
    fr: {
      appTitle: '🏆 Devenez le CTO de Votre Santé Posturale',
      appSubtitle: 'Développement logiciel × Santé sportive = Performance optimale',
      questionnaire: 'Questionnaire',
      profile: 'Profil',
      exercises: 'Exercices',
      products: 'Équipement',
      back: 'Retour',
      next: 'Suivant',
      finish: 'Terminer',
      startOver: 'Recommencer',
      langFr: '🇫🇷 FR',
      langEn: '🇬🇧 EN',
      lightMode: '☀️',
      darkMode: '🌙',
      decathlonStats: {
        title: 'Decathlon Digital en chiffres',
        itTeam: '2000+',
        itTeamDesc: 'Experts IT',
        countries: '40+',
        countriesDesc: 'Pays',
        employees: '100K+',
        employeesDesc: 'Collaborateurs',
        domains: '6',
        domainsDesc: "Domaines d'activité"
      },
      footer: {
        title: 'DECATHLON DIGITAL',
        subtitle: 'Créateur de plateformes sportives',
        challenge: '🏆 Défi : Devenez le CTO de votre santé posturale',
        copyright: `© ${new Date().getFullYear()} Decathlon Digital - Faire du sport la meilleure expérience`,
        recruit: 'Rejoignez-nous :',
        recruitLink: 'https://recrutement.decathlon.fr/metier/digital-tech/'
      }
    },
    en: {
      appTitle: '🏆 Become the CTO of Your Postural Health',
      appSubtitle: 'Software Development × Sports Health = Optimal Performance',
      questionnaire: 'Questionnaire',
      profile: 'Profile',
      exercises: 'Exercises',
      products: 'Equipment',
      back: 'Back',
      next: 'Next',
      finish: 'Finish',
      startOver: 'Start Over',
      langFr: '🇫🇷 FR',
      langEn: '🇬🇧 EN',
      lightMode: '☀️',
      darkMode: '🌙',
      decathlonStats: {
        title: 'Decathlon Digital in numbers',
        itTeam: '2000+',
        itTeamDesc: 'IT Experts',
        countries: '40+',
        countriesDesc: 'Countries',
        employees: '100K+',
        employeesDesc: 'Employees',
        domains: '6',
        domainsDesc: 'Business domains'
      },
      footer: {
        title: 'DECATHLON DIGITAL',
        subtitle: 'Creator of sports platforms',
        challenge: '🏆 Challenge: Become the CTO of your postural health',
        copyright: `© ${new Date().getFullYear()} Decathlon Digital - Make sport the best experience`,
        recruit: 'Join us:',
        recruitLink: 'https://recrutement.decathlon.fr/metier/digital-tech/'
      }
    }
  };

  const t = translations[language];

  // Gestionnaire de complétion du questionnaire
  const handleQuestionnaireComplete = (data) => {
    setProfileData(data);
    
    // Calcul du score postural
    let postureScore = 100;
    
    // Ajustements selon les réponses
    if (data.dailySitting === '> 10h') postureScore -= 30;
    else if (data.dailySitting === '8-10h') postureScore -= 20;
    else if (data.dailySitting === '6-8h') postureScore -= 10;
    
    if (data.frequency === 'jamais' || data.frequency === 'never') postureScore -= 20;
    else if (data.frequency === 'rarement' || data.frequency === 'rarely') postureScore -= 10;
    
    postureScore = Math.max(30, Math.min(100, postureScore));
    
    setUserProfile({
      ...data,
      postureScore,
      recommendedExercises: getRecommendedExercises(data),
      createdAt: new Date().toISOString()
    });
    
    setCurrentStep('profile');
  };

  // Obtenir les exercices recommandés selon le profil
  const getRecommendedExercises = (profile) => {
    let recommendations = [...exercises];
    
    // Filtrage selon l'expérience
    if (profile.experience === 'débutant' || profile.experience === 'beginner') {
      recommendations = recommendations.filter(ex => 
        ex.difficulty[language] === 'Débutant' || ex.difficulty[language] === 'Beginner'
      );
    }
    
    // Filtrage selon les points douloureux
    if (profile.painPoints.includes('dos') || profile.painPoints.includes('back')) {
      recommendations = recommendations.filter(ex => 
        ex.muscles[language].includes('Dos') || ex.muscles[language].includes('Back')
      );
    }
    
    if (profile.painPoints.includes('nuque') || profile.painPoints.includes('neck')) {
      recommendations.push(exercises.find(ex => ex.id === 4));
    }
    
    // Supprimer les doublons
    recommendations = recommendations.filter((ex, index, self) =>
      index === self.findIndex(e => e.id === ex.id)
    );
    
    return recommendations.slice(0, 3); // Limiter à 3 exercices
  };

  // Gestionnaire de sélection d'exercice
  const handleExerciseSelect = (exercise) => {
    setSelectedExercise(exercise);
    setCurrentStep('exercises');
  };

  // Redémarrer le processus
  const handleStartOver = () => {
    setUserProfile(null);
    setSelectedExercise(null);
    setCurrentStep('questionnaire');
    setProfileData({
      experience: '',
      sports: [],
      goals: [],
      painPoints: [],
      dailySitting: '',
      equipment: [],
      frequency: '',
      age: '',
      jobType: ''
    });
  };

  // Effet pour le dark mode
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
      document.body.classList.remove('light-mode');
    } else {
      document.body.classList.remove('dark-mode');
      document.body.classList.add('light-mode');
    }
  }, [darkMode]);

  return (
    <div className={`app-container ${darkMode ? 'dark' : 'light'}`}>
      {/* En-tête */}
      <header className="app-header">
        <div className="header-content">
          <div className="header-left">
            <h1>{t.appTitle}</h1>
            <p className="subtitle">{t.appSubtitle}</p>
          </div>
          
          <div className="header-right">
            <div className="language-switcher">
              <button 
                className={`lang-btn ${language === 'fr' ? 'active' : ''}`}
                onClick={() => setLanguage('fr')}
              >
                {t.langFr}
              </button>
              <button 
                className={`lang-btn ${language === 'en' ? 'active' : ''}`}
                onClick={() => setLanguage('en')}
              >
                {t.langEn}
              </button>
            </div>
            
            <button 
              className="theme-toggle"
              onClick={() => setDarkMode(!darkMode)}
              title={darkMode ? t.lightMode : t.darkMode}
            >
              {darkMode ? t.lightMode : t.darkMode}
            </button>
            
            <button 
              className="start-over-btn"
              onClick={handleStartOver}
              title={t.startOver}
            >
              🔄
            </button>
          </div>
        </div>
        
        {/* Navigation par étapes */}
        <div className="step-navigation">
          <button 
            className={`step-btn ${currentStep === 'questionnaire' ? 'active' : ''}`}
            onClick={() => setCurrentStep('questionnaire')}
          >
            1. {t.questionnaire}
          </button>
          <button 
            className={`step-btn ${currentStep === 'profile' ? 'active' : ''}`}
            onClick={() => userProfile && setCurrentStep('profile')}
            disabled={!userProfile}
          >
            2. {t.profile}
          </button>
          <button 
            className={`step-btn ${currentStep === 'exercises' ? 'active' : ''}`}
            onClick={() => userProfile && setCurrentStep('exercises')}
            disabled={!userProfile}
          >
            3. {t.exercises}
          </button>
          <button 
            className={`step-btn ${currentStep === 'products' ? 'active' : ''}`}
            onClick={() => userProfile && setCurrentStep('products')}
            disabled={!userProfile}
          >
            4. {t.products}
          </button>
        </div>
      </header>

      {/* Section principale */}
      <main className="main-content">
        {/* Statistiques Decathlon */}
        <div className="decathlon-stats">
          <h3>{t.decathlonStats.title}</h3>
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-value">{t.decathlonStats.itTeam}</div>
              <div className="stat-label">{t.decathlonStats.itTeamDesc}</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">{t.decathlonStats.countries}</div>
              <div className="stat-label">{t.decathlonStats.countriesDesc}</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">{t.decathlonStats.employees}</div>
              <div className="stat-label">{t.decathlonStats.employeesDesc}</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">{t.decathlonStats.domains}</div>
              <div className="stat-label">{t.decathlonStats.domainsDesc}</div>
            </div>
          </div>
        </div>

        {/* Contenu dynamique selon l'étape */}
        <div className="content-area">
          {currentStep === 'questionnaire' && (
            <Questionnaire 
              onComplete={handleQuestionnaireComplete}
              language={language}
              initialData={profileData}
            />
          )}
          
          {currentStep === 'profile' && userProfile && (
            <ProfileDisplay 
              profile={userProfile}
              onExerciseSelect={handleExerciseSelect}
              language={language}
            />
          )}
          
          {currentStep === 'exercises' && selectedExercise && (
            <div className="exercise-container">
              <button 
                className="back-btn"
                onClick={() => setCurrentStep('profile')}
              >
                ← {t.back}
              </button>
              
              <ExerciseGuide 
                exercise={selectedExercise}
                profile={userProfile}
                language={language}
              />
              
              <PostureVisualizer 
                exercise={selectedExercise}
                language={language}
              />
            </div>
          )}
          
          {currentStep === 'products' && userProfile && (
            <div className="products-container">
              <button 
                className="back-btn"
                onClick={() => setCurrentStep('profile')}
              >
                ← {t.back}
              </button>
              
              <DecathlonProducts 
                profile={userProfile}
                selectedExercise={selectedExercise}
                language={language}
              />
            </div>
          )}
        </div>
      </main>

      {/* Pied de page */}
      <footer className="app-footer">
        <div className="footer-content">
          <div className="footer-left">
            <h3>{t.footer.title}</h3>
            <p>{t.footer.subtitle}</p>
            <p className="challenge">{t.footer.challenge}</p>
          </div>
          
          <div className="footer-center">
            <h4>Technologies utilisées</h4>
            <div className="tech-tags">
              <span>Java</span>
              <span>JavaScript</span>
              <span>Spring</span>
              <span>React</span>
              <span>Microservices</span>
              <span>Git</span>
              <span>PostgreSQL</span>
            </div>
          </div>
          
          <div className="footer-right">
            <h4>{t.footer.recruit}</h4>
            <a 
              href={t.footer.recruitLink}
              target="_blank"
              rel="noopener noreferrer"
              className="recruit-link"
            >
              decathlon.fr/digital-tech
            </a>
            <p className="copyright">{t.footer.copyright}</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;