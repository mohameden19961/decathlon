import React from 'react';
import './DecathlonProducts.css';

const DecathlonProducts = ({ profile, selectedExercise, language }) => {
  
  // Données des produits Decathlon
  const productsData = {
    // Produits généraux pour tous les profils
    general: [
      {
        id: 1,
        name: language === 'fr' ? 'Tapis de yoga antidérapant' : 'Non-slip yoga mat',
        price: '24,99€',
        category: language === 'fr' ? 'Yoga & Pilates' : 'Yoga & Pilates',
        image: 'https://contents.mediadecathlon.com/p1698717/36e7043489874d1aa9703d3f6b6374e9/p1698717.jpg',
        link: 'https://www.decathlon.fr/p/tapis-de-yoga-6mm/_/R-p-301662',
        description: language === 'fr' 
          ? 'Tapis 6mm pour un confort optimal lors des exercices au sol' 
          : '6mm mat for optimal comfort during floor exercises',
        tags: ['beginner', 'all']
      },
      {
        id: 2,
        name: language === 'fr' ? 'Set de bandes élastiques 5 niveaux' : '5-level resistance bands set',
        price: '19,99€',
        category: language === 'fr' ? 'Renforcement musculaire' : 'Muscle strengthening',
        image: 'https://contents.mediadecathlon.com/p1847070/ce7b81c1dcf34935a6d6b203bc63b1a3/p1847070.jpg',
        link: 'https://www.decathlon.fr/p/bande-elastique-de-resistance/_/R-p-301549',
        description: language === 'fr'
          ? '5 niveaux de résistance pour progresser à votre rythme' 
          : '5 resistance levels to progress at your own pace',
        tags: ['beginner', 'intermediate', 'advanced']
      },
      {
        id: 3,
        name: language === 'fr' ? 'Rouleau de massage en mousse' : 'Foam massage roller',
        price: '14,99€',
        category: language === 'fr' ? 'Récupération' : 'Recovery',
        image: 'https://contents.mediadecathlon.com/p1665153/60d04835ba6144948c2701b7b2f87c89/p1665153.jpg',
        link: 'https://www.decathlon.fr/p/rouleau-de-massage-mousse/_/R-p-302189',
        description: language === 'fr'
          ? 'Auto-massage pour détendre les muscles après l\'effort' 
          : 'Self-massage to relax muscles after exercise',
        tags: ['all']
      }
    ],
    // Produits spécifiques pour les problèmes de dos
    backPain: [
      {
        id: 4,
        name: language === 'fr' ? 'Coussin lombaire ergonomique' : 'Ergonomic lumbar cushion',
        price: '29,99€',
        category: language === 'fr' ? 'Posture bureau' : 'Office posture',
        image: 'https://contents.mediadecathlon.com/p1791495/fdf3832a5ab144d28e9aa1ef0561b7c6/p1791495.jpg',
        link: 'https://www.decathlon.fr/p/coussin-lombaire-ergonomique/_/R-p-302894',
        description: language === 'fr'
          ? 'Soutien lombaire pour une posture assise correcte' 
          : 'Lumbar support for correct sitting posture',
        tags: ['office', 'all']
      },
      {
        id: 5,
        name: language === 'fr' ? 'Balle de massage double densité' : 'Dual-density massage ball',
        price: '9,99€',
        category: language === 'fr' ? 'Myofascial' : 'Myofascial',
        image: 'https://contents.mediadecathlon.com/p1402215/e8f33c2bc2d34e378f6c3dccdd804c76/p1402215.jpg',
        link: 'https://www.decathlon.fr/p/balle-de-massage/_/R-p-140221',
        description: language === 'fr'
          ? 'Cible les points de tension profonds' 
          : 'Targets deep tension points',
        tags: ['all']
      }
    ],
    // Produits pour les débutants
    beginner: [
      {
        id: 6,
        name: language === 'fr' ? 'Kit débutant fitness à domicile' : 'Home fitness beginner kit',
        price: '49,99€',
        category: language === 'fr' ? 'Kit complet' : 'Complete kit',
        image: 'https://contents.mediadecathlon.com/p2186546/e7dbb18cd19548a7895e10149022ca6a/p2186546.jpg',
        link: 'https://www.decathlon.fr/p/kit-fitness-domicile-debutant/_/R-p-315688',
        description: language === 'fr'
          ? 'Tout le nécessaire pour commencer le fitness à la maison' 
          : 'Everything needed to start home fitness',
        tags: ['beginner']
      }
    ],
    // Produits pour travail de bureau
    office: [
      {
        id: 7,
        name: language === 'fr' ? 'Bureau assis-debout réglable' : 'Adjustable sit-stand desk',
        price: '249,99€',
        category: language === 'fr' ? 'Ergonomie bureau' : 'Office ergonomics',
        image: 'https://contents.mediadecathlon.com/p2047369/fa65f0e4ae994bc9a508b92e12ab8a80/p2047369.jpg',
        link: 'https://www.decathlon.fr/p/bureau-assis-debout-reglable/_/R-p-306389',
        description: language === 'fr'
          ? 'Alterner entre position assise et debout pour une meilleure posture' 
          : 'Alternate between sitting and standing for better posture',
        tags: ['office', 'all']
      },
      {
        id: 8,
        name: language === 'fr' ? 'Tabouret assis-genoux' : 'Kneeling stool',
        price: '79,99€',
        category: language === 'fr' ? 'Posture active' : 'Active posture',
        image: 'https://contents.mediadecathlon.com/p1915512/9a2d4cf0084343758a4a52e7b6f1f2e3/p1915512.jpg',
        link: 'https://www.decathlon.fr/p/tabouret-assis-genoux/_/R-p-305267',
        description: language === 'fr'
          ? 'Favorise une posture assise active et engage le tronc' 
          : 'Promotes active sitting posture and engages core',
        tags: ['office', 'intermediate', 'advanced']
      }
    ]
  };

  // Filtrer les produits selon le profil
  const getFilteredProducts = () => {
    let products = [...productsData.general];
    
    // Ajouter produits pour problèmes de dos
    if (profile.painPoints.includes('dos') || profile.painPoints.includes('back')) {
      products = [...products, ...productsData.backPain];
    }
    
    // Ajouter produits pour débutants
    if (profile.experience === 'débutant' || profile.experience === 'beginner') {
      products = [...products, ...productsData.beginner];
    }
    
    // Ajouter produits pour travail de bureau
    if (profile.jobType === 'développeur' || profile.jobType === 'developer' || 
        profile.jobType === 'bureau' || profile.jobType === 'office') {
      products = [...products, ...productsData.office];
    }
    
    // Supprimer les doublons
    const uniqueProducts = products.filter((product, index, self) =>
      index === self.findIndex(p => p.id === product.id)
    );
    
    return uniqueProducts;
  };

  const filteredProducts = getFilteredProducts();

  // Produits spécifiques à l'exercice sélectionné
  const exerciseSpecificProducts = selectedExercise ? {
    1: [ // Squat
      {
        id: 101,
        name: language === 'fr' ? 'Chaussures de fitness stables' : 'Stable fitness shoes',
        price: '59,99€',
        category: language === 'fr' ? 'Chaussures' : 'Shoes',
        image: 'https://contents.mediadecathlon.com/p1915488/09fbd2eb37854149a50b6723e02e6143/p1915488.jpg',
        link: 'https://www.decathlon.fr/p/chaussures-de-fitness-fitness-gym-500/_/R-p-305265',
        description: language === 'fr'
          ? 'Stabilité optimale pour les exercices de squat' 
          : 'Optimal stability for squat exercises'
      }
    ],
    2: [ // Pompes
      {
        id: 102,
        name: language === 'fr' ? 'Poignées de pompes réglables' : 'Adjustable push-up handles',
        price: '24,99€',
        category: language === 'fr' ? 'Musculation' : 'Bodybuilding',
        image: 'https://contents.mediadecathlon.com/p1994081/0b1baad41c744c74b2a3915d5391f69f/p1994081.jpg',
        link: 'https://www.decathlon.fr/p/poignees-pompes/_/R-p-304081',
        description: language === 'fr'
          ? 'Réduit la tension sur les poignets lors des pompes' 
          : 'Reduces wrist tension during push-ups'
      }
    ],
    3: [ // Yoga
      {
        id: 103,
        name: language === 'fr' ? 'Blocs de yoga en liège' : 'Cork yoga blocks',
        price: '19,99€',
        category: language === 'fr' ? 'Accessoires yoga' : 'Yoga accessories',
        image: 'https://contents.mediadecathlon.com/p1541509/0eef0d5853534b9982be1695e8e2306e/p1541509.jpg',
        link: 'https://www.decathlon.fr/p/blocs-de-yoga-en-liege-2-blocs/_/R-p-301656',
        description: language === 'fr'
          ? 'Aide à maintenir les postures de yoga correctement' 
          : 'Helps maintain yoga postures correctly'
      }
    ],
    4: [ // Étirements
      {
        id: 104,
        name: language === 'fr' ? 'Sangle d\'étirement 2,5m' : '2.5m Stretching strap',
        price: '12,99€',
        category: language === 'fr' ? 'Étirement' : 'Stretching',
        image: 'https://contents.mediadecathlon.com/p1525305/0f3e511e04b740dd8c7d24746c9791b6/p1525305.jpg',
        link: 'https://www.decathlon.fr/p/sangle-de-yoga-25m/_/R-p-301658',
        description: language === 'fr'
          ? 'Aide à atteindre une amplitude d\'étirement optimale' 
          : 'Helps achieve optimal stretching range'
      }
    ]
  }[selectedExercise.id] : [];

  const allProducts = [...filteredProducts, ...exerciseSpecificProducts];

  return (
    <div className="decathlon-products">
      <div className="products-header">
        <h2>🛒 Decathlon - Équipement recommandé</h2>
        <p className="products-subtitle">
          {language === 'fr'
            ? 'Sélection de produits adaptés à votre profil et à vos exercices'
            : 'Selection of products adapted to your profile and exercises'}
        </p>
        
        <div className="profile-match">
          <div className="match-badge">
            <span className="match-percentage">100%</span>
            <span className="match-label">
              {language === 'fr' ? 'Adapté à votre profil' : 'Adapted to your profile'}
            </span>
          </div>
          <p className="match-description">
            {language === 'fr'
              ? 'Ces produits sont sélectionnés selon vos réponses au questionnaire'
              : 'These products are selected based on your questionnaire answers'}
          </p>
        </div>
      </div>

      {selectedExercise && (
        <div className="exercise-specific">
          <h3>
            🎯 {language === 'fr' 
              ? `Produits spécifiques pour : ${selectedExercise.name[language]}`
              : `Specific products for: ${selectedExercise.name[language]}`}
          </h3>
          <div className="specific-products-grid">
            {exerciseSpecificProducts.map(product => (
              <ProductCard key={product.id} product={product} language={language} />
            ))}
          </div>
        </div>
      )}

      <div className="all-products">
        <h3>
          {language === 'fr' 
            ? '🏆 Sélection complète pour votre pratique'
            : '🏆 Complete selection for your practice'}
        </h3>
        
        <div className="products-grid">
          {allProducts.map(product => (
            <ProductCard key={product.id} product={product} language={language} />
          ))}
        </div>
      </div>

      <div className="products-footer">
        <div className="benefits-card">
          <h4>✅ {language === 'fr' ? 'Pourquoi choisir Decathlon ?' : 'Why choose Decathlon?'}</h4>
          <ul>
            <li>{language === 'fr' ? 'Garantie 2 ans sur tous les produits' : '2-year warranty on all products'}</li>
            <li>{language === 'fr' ? 'Conseils d\'experts sportifs en magasin' : 'Expert sports advice in-store'}</li>
            <li>{language === 'fr' ? 'Rapport qualité-priex excellent' : 'Excellent price-quality ratio'}</li>
            <li>{language === 'fr' ? 'Retour gratuit sous 365 jours' : 'Free return within 365 days'}</li>
          </ul>
        </div>
        
        <div className="cta-card">
          <h4>🚀 {language === 'fr' ? 'Prêt à vous équiper ?' : 'Ready to equip yourself?'}</h4>
          <p>
            {language === 'fr'
              ? 'Rendez-vous sur Decathlon.fr pour découvrir toute notre gamme'
              : 'Visit Decathlon.fr to discover our full range'}
          </p>
          <a 
            href="https://www.decathlon.fr"
            target="_blank"
            rel="noopener noreferrer"
            className="decathlon-link"
          >
            {language === 'fr' ? 'Visiter Decathlon.fr' : 'Visit Decathlon.fr'}
          </a>
        </div>
      </div>
    </div>
  );
};

// Composant de carte produit
const ProductCard = ({ product, language }) => {
  return (
    <div className="product-card">
      <div className="product-image-container">
        <img 
          src={product.image} 
          alt={product.name}
          className="product-image"
          onError={(e) => {
            e.target.src = `https://via.placeholder.com/300x200/007bff/ffffff?text=${encodeURIComponent(product.name)}`;
          }}
        />
        <div className="product-category">{product.category}</div>
      </div>
      
      <div className="product-info">
        <h4 className="product-name">{product.name}</h4>
        <p className="product-description">{product.description}</p>
        
        <div className="product-tags">
          {product.tags && product.tags.map(tag => (
            <span key={tag} className={`product-tag ${tag}`}>
              {tag === 'beginner' && (language === 'fr' ? 'Débutant' : 'Beginner')}
              {tag === 'intermediate' && (language === 'fr' ? 'Intermédiaire' : 'Intermediate')}
              {tag === 'advanced' && (language === 'fr' ? 'Avancé' : 'Advanced')}
              {tag === 'all' && (language === 'fr' ? 'Tous niveaux' : 'All levels')}
              {tag === 'office' && (language === 'fr' ? 'Bureau' : 'Office')}
            </span>
          ))}
        </div>
        
        <div className="product-footer">
          <div className="product-price">{product.price}</div>
          <a 
            href={product.link}
            target="_blank"
            rel="noopener noreferrer"
            className="buy-btn"
          >
            {language === 'fr' ? 'Voir le produit' : 'View product'}
          </a>
        </div>
      </div>
      
      <div className="decathlon-brand">
        <span className="brand-logo">DECATHLON</span>
        <span className="brand-tag">
          {language === 'fr' ? 'Produit officiel' : 'Official product'}
        </span>
      </div>
    </div>
  );
};

export default DecathlonProducts;