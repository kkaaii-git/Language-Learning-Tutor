// Get React hooks and components from global React object
const { useState, useEffect, useRef } = React;

// Simple icon components (replacing lucide-react)
const Send = () => React.createElement('svg', { width: 20, height: 20, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2 }, 
  React.createElement('path', { d: 'M22 2L11 13' }),
  React.createElement('path', { d: 'M22 2L15 22L11 13L2 9L22 2Z' })
);

const BookOpen = () => React.createElement('svg', { width: 20, height: 20, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2 }, 
  React.createElement('path', { d: 'M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z' }),
  React.createElement('path', { d: 'M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z' })
);

const Target = () => React.createElement('svg', { width: 20, height: 20, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2 }, 
  React.createElement('circle', { cx: 12, cy: 12, r: 10 }),
  React.createElement('circle', { cx: 12, cy: 12, r: 6 }),
  React.createElement('circle', { cx: 12, cy: 12, r: 2 })
);

const TrendingUp = () => React.createElement('svg', { width: 20, height: 20, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2 }, 
  React.createElement('polyline', { points: '23 6 13.5 15.5 8.5 10.5 1 18' }),
  React.createElement('polyline', { points: '17 6 23 6 23 12' })
);

const MessageSquare = () => React.createElement('svg', { width: 20, height: 20, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2 }, 
  React.createElement('path', { d: 'M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z' })
);

const CheckCircle = () => React.createElement('svg', { width: 16, height: 16, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2 }, 
  React.createElement('path', { d: 'M22 11.08V12a10 10 0 1 1-5.93-9.14' }),
  React.createElement('polyline', { points: '22 4 12 14.01 9 11.01' })
);

const BarChart3 = () => React.createElement('svg', { width: 20, height: 20, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2 }, 
  React.createElement('path', { d: 'M3 3v18h18' }),
  React.createElement('path', { d: 'M18 17V9' }),
  React.createElement('path', { d: 'M13 17V5' }),
  React.createElement('path', { d: 'M8 17v-3' })
);

const Languages = () => React.createElement('svg', { width: 12, height: 12, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2 }, 
  React.createElement('path', { d: 'M5 8l6 6' }),
  React.createElement('path', { d: 'M4 14l6-6 2-3' }),
  React.createElement('path', { d: 'M2 5h12' }),
  React.createElement('path', { d: 'M7 2h1' }),
  React.createElement('path', { d: 'M22 22l-5-10-5 10' }),
  React.createElement('path', { d: 'M14 18h6' })
);

// Translations
const TRANSLATIONS = {
  "en-US": {
    "languageTutorTitle": "Language Tutor",
    "lessonMode": "Lesson Mode",
    "chatMode": "Chat Mode",
    "readyToPractice": "Ready to practice",
    "startConversationHelp": "Start a conversation and I'll help you learn with personalized feedback!",
    "englishTranslation": "English translation",
    "tutorThinking": "Tutor is thinking...",
    "typeMessagePlaceholder": "Type your message in",
    "progressOverview": "Progress Overview",
    "messages": "Messages:",
    "vocabulary": "Vocabulary:",
    "words": "words",
    "accuracy": "Accuracy:",
    "learningGoals": "Learning Goals",
    "addGoal": "+ Add",
    "progress": "Progress",
    "feedback": "Feedback",
    "greatJob": "Great job!",
    "smallCorrections": "Small corrections:",
    "tryThis": "Try this:",
    "learningStats": "Learning Stats",
    "vocabularyGrowth": "Vocabulary Growth",
    "grammarAccuracy": "Grammar Accuracy",
    "enterLearningGoal": "Enter your learning goal:",
    "keepPracticing": "Let's keep practicing!"
  }
};

const locale = 'en-US';
const t = (key) => TRANSLATIONS[locale]?.[key] || key;

// Main component
const LanguageTutor = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('spanish');
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [userProfile, setUserProfile] = useState({
    proficiencyLevel: 'Beginner',
    totalMessages: 0,
    vocabularyCount: new Set(),
    grammarAccuracy: 0,
    sessionCount: 0
  });
  const [learningGoals, setLearningGoals] = useState([
    { id: 1, text: 'Master basic greetings', completed: false, progress: 20 },
    { id: 2, text: 'Learn present tense verbs', completed: false, progress: 10 },
    { id: 3, text: 'Expand food vocabulary', completed: false, progress: 0 }
  ]);
  const [feedback, setFeedback] = useState(null);
  const [showLessonMode, setShowLessonMode] = useState(false);
  const [translatedMessages, setTranslatedMessages] = useState(new Set());
  const [progressStats, setProgressStats] = useState({
    vocabularyGrowth: [20, 35, 50, 65, 78],
    grammarAccuracy: [60, 65, 70, 75, 80],
    conversationLength: [5, 8, 12, 15, 18]
  });
  const messagesEndRef = useRef(null);

  const languages = {
    spanish: { name: 'Spanish (Español)', flag: '🇪🇸' },
    french: { name: 'French (Français)', flag: '🇫🇷' },
    german: { name: 'German (Deutsch)', flag: '🇩🇪' },
    japanese: { name: 'Japanese (日本語)', flag: '🇯🇵' },
    italian: { name: 'Italian (Italiano)', flag: '🇮🇹' },
    portuguese: { name: 'Portuguese (Português)', flag: '🇵🇹' },
    chinese: { name: 'Chinese (中文)', flag: '🇨🇳' },
    korean: { name: 'Korean (한국어)', flag: '🇰🇷' }
  };

  // Language response templates
  const getLanguageResponses = (language, level, isLessonMode) => {
    const responses = {
      spanish: {
        beginner: {
          lesson: [
            "¡Hola! Vamos a practicar los saludos. ¿Cómo te llamas?",
            "Muy bien! Ahora practicemos los números. ¿Puedes contar del uno al cinco?",
            "Excelente! Los verbos son importantes. ¿Sabes conjugar 'ser' y 'estar'?",
            "¡Perfecto! Hablemos de la familia. ¿Tienes hermanos?",
            "¡Genial! Los colores son útiles. ¿Cuál es tu color favorito?"
          ],
          chat: [
            "¡Hola! ¿Cómo estás hoy?",
            "¡Muy bien! Me gusta hablar contigo. ¿Qué te gusta hacer?",
            "¡Interesante! ¿De dónde eres?",
            "¡Qué bueno! ¿Tienes mascotas?",
            "¡Excelente! Estás mejorando mucho tu español."
          ]
        },
        intermediate: {
          lesson: [
            "Perfecto! Practiquemos el pretérito. ¿Qué hiciste ayer?",
            "¡Muy bien! El subjuntivo es difícil. Espero que tengas un buen día.",
            "Excelente progreso! ¿Podrías usar el condicional en una frase?",
            "¡Genial! Los pronombres son importantes. ¿Me lo puedes explicar?",
            "¡Fantástico! Tu nivel está mejorando constantemente."
          ],
          chat: [
            "¡Qué tal! ¿Cómo ha sido tu semana?",
            "Me parece interesante lo que dices. ¿Podrías contarme más?",
            "Tienes razón en eso. ¿Qué opinas sobre...?",
            "¡Excelente punto de vista! ¿Has viajado alguna vez?",
            "Tu español suena muy natural. ¡Sigue así!"
          ]
        }
      },
      french: {
        beginner: {
          lesson: [
            "Bonjour! Commençons par les salutations. Comment vous appelez-vous?",
            "Très bien! Pratiquons les nombres. Pouvez-vous compter de un à cinq?",
            "Excellent! Les verbes être et avoir sont essentiels. Les connaissez-vous?",
            "Parfait! Parlons de la famille. Avez-vous des frères et sœurs?",
            "Magnifique! Les couleurs sont utiles. Quelle est votre couleur préférée?"
          ],
          chat: [
            "Bonjour! Comment allez-vous aujourd'hui?",
            "Très bien! J'aime parler avec vous. Qu'aimez-vous faire?",
            "Intéressant! D'où venez-vous?",
            "C'est bien! Avez-vous des animaux domestiques?",
            "Excellent! Votre français s'améliore beaucoup."
          ]
        }
      },
      german: {
        beginner: {
          lesson: [
            "Hallo! Lassen Sie uns mit Begrüßungen beginnen. Wie heißen Sie?",
            "Sehr gut! Üben wir die Zahlen. Können Sie von eins bis fünf zählen?",
            "Ausgezeichnet! Die Fälle sind wichtig. Kennen Sie Nominativ und Akkusativ?",
            "Perfekt! Sprechen wir über die Familie. Haben Sie Geschwister?",
            "Wunderbar! Farben sind nützlich. Was ist Ihre Lieblingsfarbe?"
          ],
          chat: [
            "Hallo! Wie geht es Ihnen heute?",
            "Sehr gut! Ich spreche gerne mit Ihnen. Was machen Sie gerne?",
            "Interessant! Woher kommen Sie?",
            "Das ist schön! Haben Sie Haustiere?",
            "Ausgezeichnet! Ihr Deutsch wird viel besser."
          ]
        }
      }
    };

    const langResponses = responses[language] || responses.spanish;
    const levelResponses = langResponses[level] || langResponses.beginner;
    const modeResponses = levelResponses[isLessonMode ? 'lesson' : 'chat'] || levelResponses.chat;
    
    return modeResponses;
  };

  // Enhanced feedback generation
  const generateFeedback = (userMessage, language, level) => {
    const accuracy = Math.floor(75 + Math.random() * 20); // 75-95%
    
    const feedbackTemplates = {
      positive: [
        "Great use of vocabulary!",
        "Your sentence structure is improving!",
        "Nice job with grammar!",
        "I can see your confidence growing!",
        "Excellent pronunciation awareness!"
      ],
      corrections: [
        "Try using the correct article (el/la, le/la, der/die/das)",
        "Remember verb conjugation for this person",
        "Consider the word order in this context",
        "Check the gender agreement",
        "Mind the accent marks"
      ],
      suggestions: [
        "Try adding more descriptive adjectives",
        "Practice using connecting words like 'pero', 'mais', 'aber'",
        "Experiment with different tenses",
        "Use more complex sentence structures",
        "Try expressing the same idea differently"
      ]
    };

    return {
      positive: [feedbackTemplates.positive[Math.floor(Math.random() * feedbackTemplates.positive.length)]],
      corrections: accuracy < 85 ? [feedbackTemplates.corrections[Math.floor(Math.random() * feedbackTemplates.corrections.length)]] : [],
      suggestions: [feedbackTemplates.suggestions[Math.floor(Math.random() * feedbackTemplates.suggestions.length)]]
    };
  };

  // English translations for responses
  const getEnglishTranslation = (response, language) => {
    const translations = {
      "¡Hola! ¿Cómo estás hoy?": "Hello! How are you today?",
      "¡Muy bien! Me gusta hablar contigo. ¿Qué te gusta hacer?": "Very good! I like talking with you. What do you like to do?",
      "¡Interesante! ¿De dónde eres?": "Interesting! Where are you from?",
      "¡Qué bueno! ¿Tienes mascotas?": "How nice! Do you have pets?",
      "¡Excelente! Estás mejorando mucho tu español.": "Excellent! You're improving your Spanish a lot.",
      "Bonjour! Comment allez-vous aujourd'hui?": "Hello! How are you today?",
      "Très bien! J'aime parler avec vous. Qu'aimez-vous faire?": "Very good! I like talking with you. What do you like to do?",
      "Hallo! Wie geht es Ihnen heute?": "Hello! How are you today?",
      "Sehr gut! Ich spreche gerne mit Ihnen. Was machen Sie gerne?": "Very good! I like talking with you. What do you like to do?"
    };
    
    return translations[response] || "I'm here to help you practice! Keep going!";
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const getProficiencyColor = (level) => {
    const colors = {
      'Beginner': 'text-green-600 bg-green-100',
      'Intermediate': 'text-yellow-600 bg-yellow-100',
      'Advanced': 'text-red-600 bg-red-100',
      'Native': 'text-purple-600 bg-purple-100'
    };
    return colors[level] || colors.Beginner;
  };

  const analyzeProficiencyLevel = (messageHistory) => {
    if (messageHistory.length < 3) return 'Beginner';
    if (messageHistory.length < 10) return 'Beginner';
    if (messageHistory.length < 20) return 'Intermediate';
    return 'Advanced';
  };

  const sendMessage = () => {
    if (!currentMessage.trim() || isLoading) return;

    const userMessage = {
      id: Date.now(),
      text: currentMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const savedMessage = currentMessage;
    setCurrentMessage('');
    setIsLoading(true);

    // Simulate processing delay
    setTimeout(() => {
      const detectedLevel = analyzeProficiencyLevel([...messages, userMessage]);
      const responses = getLanguageResponses(selectedLanguage, detectedLevel.toLowerCase(), showLessonMode);
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      const englishTranslation = getEnglishTranslation(randomResponse, selectedLanguage);
      const generatedFeedback = generateFeedback(savedMessage, selectedLanguage, detectedLevel);

      const tutorMessage = {
        id: Date.now() + 1,
        text: randomResponse,
        englishTranslation: englishTranslation,
        sender: 'tutor',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, tutorMessage]);
      setFeedback(generatedFeedback);

      // Extract vocabulary from user message
      const words = savedMessage.toLowerCase().split(' ').filter(word => word.length > 2);
      const accuracy = Math.floor(75 + Math.random() * 20);

      // Update user profile
      setUserProfile(prev => ({
        ...prev,
        totalMessages: prev.totalMessages + 1,
        proficiencyLevel: detectedLevel,
        grammarAccuracy: accuracy,
        vocabularyCount: new Set([...prev.vocabularyCount, ...words])
      }));

      // Update progress stats every few messages
      if ((userProfile.totalMessages + 1) % 3 === 0) {
        setProgressStats(prev => ({
          vocabularyGrowth: [...prev.vocabularyGrowth.slice(-4), prev.vocabularyGrowth[prev.vocabularyGrowth.length - 1] + Math.floor(Math.random() * 5) + 1],
          grammarAccuracy: [...prev.grammarAccuracy.slice(-4), accuracy],
          conversationLength: [...prev.conversationLength.slice(-4), messages.length + 2]
        }));
      }

      setIsLoading(false);
    }, 1000 + Math.random() * 1000); // 1-2 second delay
  };

  const handleLanguageChange = (newLang) => {
    setSelectedLanguage(newLang);
    setMessages([]);
    setFeedback(null);
    setTranslatedMessages(new Set());
  };

  const toggleGoalCompletion = (goalId) => {
    setLearningGoals(prev => 
      prev.map(goal => 
        goal.id === goalId 
          ? { ...goal, completed: !goal.completed, progress: goal.completed ? goal.progress : 100 }
          : goal
      )
    );
  };

  const toggleMessageTranslation = (messageId) => {
    setTranslatedMessages(prev => {
      const newSet = new Set(prev);
      if (newSet.has(messageId)) {
        newSet.delete(messageId);
      } else {
        newSet.add(messageId);
      }
      return newSet;
    });
  };

  const addCustomGoal = () => {
    const goalText = prompt(t('enterLearningGoal'));
    if (goalText?.trim()) {
      const newGoal = {
        id: Date.now(),
        text: goalText.trim(),
        completed: false,
        progress: 0
      };
      setLearningGoals(prev => [...prev, newGoal]);
    }
  };

  return React.createElement('div', { className: "flex h-screen bg-gray-50" },
    // Main Chat Area
    React.createElement('div', { className: "flex-1 flex flex-col" },
      // Header
      React.createElement('div', { className: "bg-white border-b border-gray-200 p-4" },
        React.createElement('div', { className: "flex items-center justify-between" },
          React.createElement('div', { className: "flex items-center space-x-4" },
            React.createElement('div', { className: "flex items-center space-x-2" },
              React.createElement(BookOpen, { className: "h-6 w-6 text-blue-600" }),
              React.createElement('h1', { className: "text-xl font-bold text-gray-800" }, t('languageTutorTitle'))
            ),
            React.createElement('select', {
              value: selectedLanguage,
              onChange: (e) => handleLanguageChange(e.target.value),
              className: "px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            },
              Object.entries(languages).map(([code, lang]) => 
                React.createElement('option', { key: code, value: code }, `${lang.flag} ${lang.name}`)
              )
            ),
            React.createElement('div', {
              className: `px-3 py-1 rounded-full text-sm font-medium ${getProficiencyColor(userProfile.proficiencyLevel)}`
            }, userProfile.proficiencyLevel)
          ),
          React.createElement('div', { className: "flex items-center space-x-2" },
            React.createElement('button', {
              onClick: () => setShowLessonMode(!showLessonMode),
              className: `px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                showLessonMode 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`
            }, showLessonMode ? t('lessonMode') : t('chatMode'))
          )
        )
      ),
      
      // Messages
      React.createElement('div', { className: "flex-1 overflow-y-auto p-4 space-y-4" },
        messages.length === 0 && React.createElement('div', { className: "text-center py-8" },
          React.createElement('div', { className: "text-4xl mb-4" }, languages[selectedLanguage].flag),
          React.createElement('h2', { className: "text-xl font-semibold text-gray-700 mb-2" },
            `${t('readyToPractice')} ${languages[selectedLanguage].name}?`
          ),
          React.createElement('p', { className: "text-gray-500" }, t('startConversationHelp'))
        ),
        
        messages.map((message) =>
          React.createElement('div', {
            key: message.id,
            className: `flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`
          },
            React.createElement('div', {
              className: `max-w-xs lg:max-w-md px-4 py-2 rounded-lg relative group ${
                message.sender === 'user' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-white border border-gray-200 text-gray-800 hover:bg-gray-50 transition-colors cursor-pointer'
              }`,
              onClick: message.sender === 'tutor' ? () => toggleMessageTranslation(message.id) : undefined
            },
              message.sender === 'tutor' && React.createElement('div', {
                className: "absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity"
              }, React.createElement(Languages, { className: "h-3 w-3 text-gray-400" })),
              
              React.createElement('p', { className: "pr-4" },
                message.sender === 'tutor' && translatedMessages.has(message.id) 
                  ? message.englishTranslation || message.text
                  : message.text
              ),
              
              message.sender === 'tutor' && translatedMessages.has(message.id) && 
                React.createElement('p', { className: "text-xs mt-1 text-gray-500 italic" }, t('englishTranslation')),
              
              React.createElement('p', {
                className: `text-xs mt-1 ${message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'}`
              }, message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }))
            )
          )
        ),
        
        isLoading && React.createElement('div', { className: "flex justify-start" },
          React.createElement('div', { className: "bg-white border border-gray-200 rounded-lg px-4 py-2" },
            React.createElement('div', { className: "flex items-center space-x-2" },
              React.createElement('div', { className: "flex space-x-1" },
                React.createElement('div', { className: "w-2 h-2 bg-gray-400 rounded-full animate-bounce" }),
                React.createElement('div', { className: "w-2 h-2 bg-gray-400 rounded-full animate-bounce", style: { animationDelay: '0.1s' } }),
                React.createElement('div', { className: "w-2 h-2 bg-gray-400 rounded-full animate-bounce", style: { animationDelay: '0.2s' } })
              ),
              React.createElement('span', { className: "text-sm text-gray-500" }, t('tutorThinking'))
            )
          )
        ),
        React.createElement('div', { ref: messagesEndRef })
      ),
      
      // Input Area
      React.createElement('div', { className: "bg-white border-t border-gray-200 p-4" },
        React.createElement('div', { className: "flex space-x-2" },
          React.createElement('input', {
            type: "text",
            value: currentMessage,
            onChange: (e) => setCurrentMessage(e.target.value),
            onKeyPress: (e) => e.key === 'Enter' && sendMessage(),
            placeholder: `${t('typeMessagePlaceholder')} ${languages[selectedLanguage].name}...`,
            className: "flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
            disabled: isLoading
          }),
          React.createElement('button', {
            onClick: sendMessage,
            disabled: isLoading || !currentMessage.trim(),
            className: "px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          }, React.createElement(Send, { className: "h-5 w-5" }))
        )
      )
    ),
    
    // Sidebar (shortened for brevity - includes all the same sections)
    React.createElement('div', { className: "w-80 bg-white border-l border-gray-200 flex flex-col" },
      // Progress Overview
      React.createElement('div', { className: "p-4 border-b border-gray-200" },
        React.createElement('h3', { className: "font-semibold text-gray-800 mb-3 flex items-center" },
          React.createElement(TrendingUp, { className: "h-5 w-5 mr-2" }),
          t('progressOverview')
        ),
        React.createElement('div', { className: "space-y-2" },
          React.createElement('div', { className: "flex justify-between text-sm" },
            React.createElement('span', null, t('messages')),
            React.createElement('span', { className: "font-medium" }, userProfile.totalMessages)
          ),
          React.createElement('div', { className: "flex justify-between text-sm" },
            React.createElement('span', null, t('vocabulary')),
            React.createElement('span', { className: "font-medium" }, `${userProfile.vocabularyCount.size} ${t('words')}`)
          ),
          React.createElement('div', { className: "flex justify-between text-sm" },
            React.createElement('span', null, t('accuracy')),
            React.createElement('span', { className: "font-medium" }, `${userProfile.grammarAccuracy}%`)
          )
        )
      ),
      
      // Learning Goals
      React.createElement('div', { className: "p-4 border-b border-gray-200" },
        React.createElement('div', { className: "flex items-center justify-between mb-3" },
          React.createElement('h3', { className: "font-semibold text-gray-800 flex items-center" },
            React.createElement(Target, { className: "h-5 w-5 mr-2" }),
            t('learningGoals')
          ),
          React.createElement('button', {
            onClick: addCustomGoal,
            className: "text-blue-600 hover:text-blue-700 text-sm font-medium"
          }, t('addGoal'))
        ),
        React.createElement('div', { className: "space-y-2" },
          learningGoals.map((goal) =>
            React.createElement('div', { key: goal.id, className: "p-2 bg-gray-50 rounded-md" },
              React.createElement('div', { className: "flex items-start justify-between" },
                React.createElement('div', { className: "flex-1" },
                  React.createElement('p', {
                    className: `text-sm ${goal.completed ? 'line-through text-gray-500' : 'text-gray-700'}`
                  }, goal.text),
                  React.createElement('div', { className: "mt-1" },
                    React.createElement('div', { className: "flex items-center justify-between text-xs text-gray-500 mb-1" },
                      React.createElement('span', null, t('progress')),
                      React.createElement('span', null, `${goal.progress}%`)
                    ),
                    React.createElement('div', { className: "w-full bg-gray-200 rounded-full h-2" },
                      React.createElement('div', {
                        className: "bg-blue-600 h-2 rounded-full transition-all duration-300",
                        style: { width: `${goal.progress}%` }
                      })
                    )
                  )
                ),
                React.createElement('button', {
                  onClick: () => toggleGoalCompletion(goal.id),
                  className: "ml-2 mt-1"
                },
                  goal.completed 
                    ? React.createElement(CheckCircle, { className: "h-4 w-4 text-green-600" })
                    : React.createElement('div', { className: "h-4 w-4 border-2 border-gray-300 rounded-full" })
                )
              )
            )
          )
        )
      ),
      
      // Real-time Feedback
      feedback && React.createElement('div', { className: "p-4 border-b border-gray-200" },
        React.createElement('h3', { className: "font-semibold text-gray-800 mb-3 flex items-center" },
          React.createElement(MessageSquare, { className: "h-5 w-5 mr-2" }),
          t('feedback')
        ),
        feedback.positive.length > 0 && React.createElement('div', { className: "mb-2" },
          React.createElement('p', { className: "text-xs font-medium text-green-600 mb-1" }, t('greatJob')),
          feedback.positive.map((item, idx) =>
            React.createElement('p', {
              key: idx,
              className: "text-sm text-green-700 bg-green-50 p-2 rounded"
            }, item)
          )
        ),
        feedback.corrections.length > 0 && React.createElement('div', { className: "mb-2" },
          React.createElement('p', { className: "text-xs font-medium text-orange-600 mb-1" }, t('smallCorrections')),
          feedback.corrections.map((item, idx) =>
            React.createElement('p', {
              key: idx,
              className: "text-sm text-orange-700 bg-orange-50 p-2 rounded"
            }, item)
          )
        ),
        feedback.suggestions.length > 0 && React.createElement('div', null,
          React.createElement('p', { className: "text-xs font-medium text-blue-600 mb-1" }, t('tryThis')),
          feedback.suggestions.map((item, idx) =>
            React.createElement('p', {
              key: idx,
              className: "text-sm text-blue-700 bg-blue-50 p-2 rounded"
            }, item)
          )
        )
      ),
      
      // Quick Stats
      React.createElement('div', { className: "flex-1 p-4" },
        React.createElement('h3', { className: "font-semibold text-gray-800 mb-3 flex items-center" },
          React.createElement(BarChart3, { className: "h-5 w-5 mr-2" }),
          t('learningStats')
        ),
        React.createElement('div', { className: "space-y-3" },
          React.createElement('div', null,
            React.createElement('p', { className: "text-sm text-gray-600 mb-1" }, t('vocabularyGrowth')),
            React.createElement('div', { className: "flex items-end space-x-1 h-8" },
              progressStats.vocabularyGrowth.slice(-5).map((value, idx) =>
                React.createElement('div', {
                  key: idx,
                  className: "bg-blue-600 rounded-t",
                  style: { height: `${(value / 100) * 100}%`, width: '20%' }
                })
              )
            )
          ),
          React.createElement('div', null,
            React.createElement('p', { className: "text-sm text-gray-600 mb-1" }, t('grammarAccuracy')),
            React.createElement('div', { className: "flex items-end space-x-1 h-8" },
              progressStats.grammarAccuracy.slice(-5).map((value, idx) =>
                React.createElement('div', {
                  key: idx,
                  className: "bg-green-600 rounded-t",
                  style: { height: `${value}%`, width: '20%' }
                })
              )
            )
          )
        )
      )
    )
  );
};

// Render the app to the DOM
ReactDOM.render(React.createElement(LanguageTutor), document.getElementById('root'));