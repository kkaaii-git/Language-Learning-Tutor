import React, { useState, useEffect, useRef } from 'react';
import { Send, BookOpen, Target, TrendingUp, MessageSquare, Settings, CheckCircle, AlertCircle, Star, BarChart3, Languages } from 'lucide-react';

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
    "sorryTroubleResponding": "I'm sorry, I'm having trouble responding right now. Let's continue practicing!",
    "spanishContinue": "¡Sigamos practicando!",
    "frenchContinue": "Continuons à pratiquer!",
    "keepPracticing": "Let's keep practicing!"
  },
  /* LOCALE_PLACEHOLDER_START */
  "es-ES": {
    "languageTutorTitle": "Tutor de Idiomas",
    "lessonMode": "Modo Lección",
    "chatMode": "Modo Chat",
    "readyToPractice": "¿Listo para practicar",
    "startConversationHelp": "¡Inicia una conversación y te ayudaré a aprender con comentarios personalizados!",
    "englishTranslation": "Traducción al inglés",
    "tutorThinking": "El tutor está pensando...",
    "typeMessagePlaceholder": "Escribe tu mensaje en",
    "progressOverview": "Resumen de Progreso",
    "messages": "Mensajes:",
    "vocabulary": "Vocabulario:",
    "words": "palabras",
    "accuracy": "Precisión:",
    "learningGoals": "Objetivos de Aprendizaje",
    "addGoal": "+ Agregar",
    "progress": "Progreso",
    "feedback": "Comentarios",
    "greatJob": "¡Excelente trabajo!",
    "smallCorrections": "Pequeñas correcciones:",
    "tryThis": "Prueba esto:",
    "learningStats": "Estadísticas de Aprendizaje",
    "vocabularyGrowth": "Crecimiento del Vocabulario",
    "grammarAccuracy": "Precisión Gramatical",
    "enterLearningGoal": "Ingresa tu objetivo de aprendizaje:",
    "sorryTroubleResponding": "Lo siento, tengo problemas para responder ahora. ¡Sigamos practicando!",
    "spanishContinue": "¡Sigamos practicando!",
    "frenchContinue": "Continuons à pratiquer!",
    "keepPracticing": "¡Sigamos practicando!"
  }
  /* LOCALE_PLACEHOLDER_END */
};

const appLocale = '{{APP_LOCALE}}';
const browserLocale = navigator.languages?.[0] || navigator.language || 'en-US';
const findMatchingLocale = (locale) => {
  if (TRANSLATIONS[locale]) return locale;
  const lang = locale.split('-')[0];
  const match = Object.keys(TRANSLATIONS).find(key => key.startsWith(lang + '-'));
  return match || 'en-US';
};
const locale = (appLocale !== '{{APP_LOCALE}}') ? findMatchingLocale(appLocale) : findMatchingLocale(browserLocale);
const t = (key) => TRANSLATIONS[locale]?.[key] || TRANSLATIONS['en-US'][key] || key;

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

  const generateLearningGoals = (level, language) => {
    const goalsByLevel = {
      Beginner: {
        spanish: [
          'Master basic greetings and introductions',
          'Learn present tense regular verbs',
          'Build food and drink vocabulary',
          'Practice numbers 1-100',
          'Use basic question words (qué, cómo, dónde)'
        ],
        french: [
          'Master basic greetings (bonjour, bonsoir)',
          'Learn present tense être and avoir',
          'Build family and home vocabulary',
          'Practice French pronunciation',
          'Use basic question words'
        ],
        german: [
          'Master basic greetings and politeness',
          'Learn German cases (Nominativ, Akkusativ)',
          'Build everyday vocabulary',
          'Practice German pronunciation',
          'Learn basic sentence structure'
        ]
      },
      Intermediate: {
        spanish: [
          'Master past tenses (preterite and imperfect)',
          'Learn subjunctive mood basics',
          'Expand professional vocabulary',
          'Practice complex sentence structures',
          'Understand cultural expressions'
        ]
      }
    };

    const goals = goalsByLevel[level]?.[language] || goalsByLevel.Beginner.spanish;
    return goals.slice(0, 3).map((text, index) => ({
      id: Date.now() + index,
      text,
      completed: false,
      progress: Math.floor(Math.random() * 30)
    }));
  };

  const analyzeProficiencyLevel = (messageHistory) => {
    if (messageHistory.length < 3) return 'Beginner';
    if (messageHistory.length < 10) return 'Beginner';
    if (messageHistory.length < 20) return 'Intermediate';
    return 'Advanced';
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
    const commonWords = userMessage.toLowerCase().split(' ').filter(word => word.length > 2);
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

  const sendMessage = async () => {
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
    const newGoals = generateLearningGoals(userProfile.proficiencyLevel, newLang);
    setLearningGoals(newGoals);
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

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <BookOpen className="h-6 w-6 text-blue-600" />
                <h1 className="text-xl font-bold text-gray-800">{t('languageTutorTitle')}</h1>
              </div>
              
              <select 
                value={selectedLanguage}
                onChange={(e) => handleLanguageChange(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {Object.entries(languages).map(([code, lang]) => (
                  <option key={code} value={code}>
                    {lang.flag} {lang.name}
                  </option>
                ))}
              </select>

              <div className={`px-3 py-1 rounded-full text-sm font-medium ${getProficiencyColor(userProfile.proficiencyLevel)}`}>
                {userProfile.proficiencyLevel}
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => setShowLessonMode(!showLessonMode)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  showLessonMode 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {showLessonMode ? t('lessonMode') : t('chatMode')}
              </button>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.length === 0 && (
            <div className="text-center py-8">
              <div className="text-4xl mb-4">{languages[selectedLanguage].flag}</div>
              <h2 className="text-xl font-semibold text-gray-700 mb-2">
                {t('readyToPractice')} {languages[selectedLanguage].name}?
              </h2>
              <p className="text-gray-500">
                {t('startConversationHelp')}
              </p>
            </div>
          )}

          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg relative group ${
                message.sender === 'user' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-white border border-gray-200 text-gray-800 hover:bg-gray-50 transition-colors'
              } ${message.sender === 'tutor' ? 'cursor-pointer' : ''}`}
              onClick={message.sender === 'tutor' ? () => toggleMessageTranslation(message.id) : undefined}
              >
                {message.sender === 'tutor' && (
                  <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Languages className="h-3 w-3 text-gray-400" />
                  </div>
                )}
                <p className="pr-4">
                  {message.sender === 'tutor' && translatedMessages.has(message.id) 
                    ? message.englishTranslation || message.text
                    : message.text
                  }
                </p>
                {message.sender === 'tutor' && translatedMessages.has(message.id) && (
                  <p className="text-xs mt-1 text-gray-500 italic">
                    {t('englishTranslation')}
                  </p>
                )}
                <p className={`text-xs mt-1 ${
                  message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
                }`}>
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white border border-gray-200 rounded-lg px-4 py-2">
                <div className="flex items-center space-x-2">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  </div>
                  <span className="text-sm text-gray-500">{t('tutorThinking')}</span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="bg-white border-t border-gray-200 p-4">
          <div className="flex space-x-2">
            <input
              type="text"
              value={currentMessage}
              onChange={(e) => setCurrentMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              placeholder={`${t('typeMessagePlaceholder')} ${languages[selectedLanguage].name}...`}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              disabled={isLoading}
            />
            <button
              onClick={sendMessage}
              disabled={isLoading || !currentMessage.trim()}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Send className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div className="w-80 bg-white border-l border-gray-200 flex flex-col">
        {/* Progress Overview */}
        <div className="p-4 border-b border-gray-200">
          <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
            <TrendingUp className="h-5 w-5 mr-2" />
            {t('progressOverview')}
          </h3>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>{t('messages')}</span>
              <span className="font-medium">{userProfile.totalMessages}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>{t('vocabulary')}</span>
              <span className="font-medium">{userProfile.vocabularyCount.size} {t('words')}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>{t('accuracy')}</span>
              <span className="font-medium">{userProfile.grammarAccuracy}%</span>
            </div>
          </div>
        </div>

        {/* Learning Goals */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-gray-800 flex items-center">
              <Target className="h-5 w-5 mr-2" />
              {t('learningGoals')}
            </h3>
            <button
              onClick={addCustomGoal}
              className="text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              {t('addGoal')}
            </button>
          </div>
          <div className="space-y-2">
            {learningGoals.map((goal) => (
              <div key={goal.id} className="p-2 bg-gray-50 rounded-md">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className={`text-sm ${goal.completed ? 'line-through text-gray-500' : 'text-gray-700'}`}>
                      {goal.text}
                    </p>
                    <div className="mt-1">
                      <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                        <span>{t('progress')}</span>
                        <span>{goal.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${goal.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => toggleGoalCompletion(goal.id)}
                    className="ml-2 mt-1"
                  >
                    {goal.completed ? (
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    ) : (
                      <div className="h-4 w-4 border-2 border-gray-300 rounded-full"></div>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Real-time Feedback */}
        {feedback && (
          <div className="p-4 border-b border-gray-200">
            <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
              <MessageSquare className="h-5 w-5 mr-2" />
              {t('feedback')}
            </h3>
            {feedback.positive.length > 0 && (
              <div className="mb-2">
                <p className="text-xs font-medium text-green-600 mb-1">{t('greatJob')}</p>
                {feedback.positive.map((item, idx) => (
                  <p key={idx} className="text-sm text-green-700 bg-green-50 p-2 rounded">
                    {item}
                  </p>
                ))}
              </div>
            )}
            {feedback.corrections.length > 0 && (
              <div className="mb-2">
                <p className="text-xs font-medium text-orange-600 mb-1">{t('smallCorrections')}</p>
                {feedback.corrections.map((item, idx) => (
                  <p key={idx} className="text-sm text-orange-700 bg-orange-50 p-2 rounded">
                    {item}
                  </p>
                ))}
              </div>
            )}
            {feedback.suggestions.length > 0 && (
              <div>
                <p className="text-xs font-medium text-blue-600 mb-1">{t('tryThis')}</p>
                {feedback.suggestions.map((item, idx) => (
                  <p key={idx} className="text-sm text-blue-700 bg-blue-50 p-2 rounded">
                    {item}
                  </p>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Quick Stats */}
        <div className="flex-1 p-4">
          <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
            <BarChart3 className="h-5 w-5 mr-2" />
            {t('learningStats')}
          </h3>
          <div className="space-y-3">
            <div>
              <p className="text-sm text-gray-600 mb-1">{t('vocabularyGrowth')}</p>
              <div className="flex items-end space-x-1 h-8">
                {progressStats.vocabularyGrowth.slice(-5).map((value, idx) => (
                  <div
                    key={idx}
                    className="bg-blue-600 rounded-t"
                    style={{ height: `${(value / 100) * 100}%`, width: '20%' }}
                  ></div>
                ))}
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">{t('grammarAccuracy')}</p>
              <div className="flex items-end space-x-1 h-8">
                {progressStats.grammarAccuracy.slice(-5).map((value, idx) => (
                  <div
                    key={idx}
                    className="bg-green-600 rounded-t"
                    style={{ height: `${value}%`, width: '20%' }}
                  ></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LanguageTutor;
