import React, { useState, useEffect } from 'react';
import { BookOpen, Award, CheckCircle2 } from 'lucide-react';
import { topicsData } from './data/questionsData';
import Dashboard from './components/Dashboard';
import QuestionDrawer from './components/QuestionDrawer';
import { enrichQuestion } from './data/questionGenerator';

export default function App() {
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  
  // 1. Load completion status list from LocalStorage
  const [completedList, setCompletedList] = useState(() => {
    try {
      const stored = localStorage.getItem('dsabuddy_completed');
      return stored ? JSON.parse(stored) : {};
    } catch {
      return {};
    }
  });

  // 2. LoadStarred/Bookmarked question list from LocalStorage
  const [starredList, setStarredList] = useState(() => {
    try {
      const stored = localStorage.getItem('dsabuddy_starred');
      return stored ? JSON.parse(stored) : {};
    } catch {
      return {};
    }
  });

  // Persist values to LocalStorage whenever changes happen
  useEffect(() => {
    localStorage.setItem('dsabuddy_completed', JSON.stringify(completedList));
  }, [completedList]);

  useEffect(() => {
    localStorage.setItem('dsabuddy_starred', JSON.stringify(starredList));
  }, [starredList]);

  // Handle toggles
  const handleToggleComplete = (questionId) => {
    setCompletedList((prev) => ({
      ...prev,
      [questionId]: !prev[questionId]
    }));
  };

  const handleToggleStar = (questionId) => {
    setStarredList((prev) => ({
      ...prev,
      [questionId]: !prev[questionId]
    }));
  };

  // Find corresponding topic ID and enrich the selected question
  const getEnrichedQuestion = () => {
    if (!selectedQuestion) return null;
    const topic = topicsData.find((t) => t.questions.some((item) => item.id === selectedQuestion.id));
    const topicId = topic ? topic.id : '';
    return enrichQuestion(selectedQuestion, topicId);
  };

  // Calculate total counts across all topics
  const totalQuestions = topicsData.reduce((acc, t) => acc + t.questions.length, 0);
  const totalCompleted = Object.values(completedList).filter(Boolean).length;

  return (
    <div className="app-container">
      {/* Premium Header */}
      <header>
        <div className="logo">
          <BookOpen className="logo-icon" size={24} />
          <span>DSA Buddy</span>
        </div>
        
        <div className="stats-badge">
          <Award size={16} className="text-emerald" style={{ color: 'var(--primary-light)' }} />
          <span>Solved: </span>
          <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--primary-light)' }}>
            {totalCompleted}/{totalQuestions}
          </span>
        </div>
      </header>

      {/* Main Container */}
      <main className="main-content">
        {/* Hero Banner */}
        <section className="hero-section">
          <h1>Master Data Structures &amp; Algorithms</h1>
          <p>
            Your ultimate interview companion. Structured C++ solutions (Brute, Better, Optimal) 
            with Hinglish pseudocode notes and live step-by-step dry run simulations.
          </p>
        </section>

        {/* Dashboard Panels */}
        <Dashboard 
          topics={topicsData}
          completedList={completedList}
          starredList={starredList}
          onToggleComplete={handleToggleComplete}
          onToggleStar={handleToggleStar}
          onSelectQuestion={setSelectedQuestion}
        />

        {/* Visualizer Drawer Modal */}
        {selectedQuestion && (
          <QuestionDrawer 
            question={getEnrichedQuestion()}
            onClose={() => setSelectedQuestion(null)}
          />
        )}
      </main>
    </div>
  );
}
