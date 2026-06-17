import React, { useState } from 'react';
import { Search, ChevronDown, CheckCircle, Circle, Star, ExternalLink, Play } from 'lucide-react';
import ProgressBar from './ProgressBar';

// List of questions selected for the "Last Minute 100" list
const LAST_MINUTE_IDS = [
  "pair-with-target-sum",
  "rearrange-0-and-1",
  "remove-duplicates-easy",
  "linkedlist-cycle",
  "start-of-linkedlist-cycle",
  "middle-of-linkedlist",
  "max-sum-subarray-of-size-k",
  "smallest-subarray-sum",
  "no-repeat-substring",
  "minimum-window-substring",
  "maximum-subarray-sum",
  "maximum-product-subarray",
  "subarray-sum-equals-k",
  "find-pivot-index",
  "merge-intervals-med",
  "insert-interval",
  "minimum-meeting-rooms",
  "reverse-linkedlist-easy",
  "reverse-sublist",
  "balanced-parentheses",
  "next-greater-element",
  "daily-temperatures",
  "first-non-repeating-char",
  "binary-search-basic",
  "first-and-last-position",
  "find-peak-element",
  "search-rotated-sorted",
  "koko-eating-bananas",
  "book-allocation",
  "kth-largest-element",
  "top-k-frequent-elements",
  "find-median-data-stream",
  "fibonacci",
  "generate-parentheses",
  "permutations",
  "binary-tree-inorder",
  "binary-tree-level-order",
  "invert-tree",
  "lca-binary-tree",
  "max-depth-tree",
  "validate-bst",
  "path-sum-ii",
  "graph-dfs",
  "graph-bfs",
  "number-of-islands",
  "rotting-oranges",
  "dijkstra-alg",
  "climbing-stairs",
  "house-robber",
  "knapsack-01"
];

export default function Dashboard({ 
  topics, 
  completedList, 
  starredList, 
  onToggleComplete, 
  onToggleStar, 
  onSelectQuestion 
}) {
  const [viewMode, setViewMode] = useState('patterns'); // patterns or lastMinute
  const [searchQuery, setSearchQuery] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  
  // Track open state for accordion topics
  const [openTopics, setOpenTopics] = useState({
    "two-pointers": true, // open the first pattern by default
  });

  const toggleTopic = (topicId) => {
    setOpenTopics((prev) => ({
      ...prev,
      [topicId]: !prev[topicId]
    }));
  };

  // Filter questions based on current settings
  const getFilteredQuestions = (questions) => {
    return questions.filter((q) => {
      // 1. Last Minute 100 filter
      if (viewMode === 'lastMinute' && !LAST_MINUTE_IDS.includes(q.id)) {
        return false;
      }
      
      // 2. Search search text filter
      if (searchQuery.trim() !== '') {
        const text = q.title.toLowerCase();
        if (!text.includes(searchQuery.toLowerCase())) {
          return false;
        }
      }

      // 3. Difficulty filter
      if (difficultyFilter !== 'all' && q.difficulty.toLowerCase() !== difficultyFilter) {
        return false;
      }

      // 4. Status filter
      if (statusFilter !== 'all') {
        const isCompleted = completedList[q.id] || false;
        const isStarred = starredList[q.id] || false;
        if (statusFilter === 'completed' && !isCompleted) return false;
        if (statusFilter === 'unsolved' && isCompleted) return false;
        if (statusFilter === 'starred' && !isStarred) return false;
      }

      return true;
    });
  };

  // Calculate stats for ProgressBar
  const getOverallStats = () => {
    let total = 0;
    let completed = 0;
    topics.forEach((t) => {
      t.questions.forEach((q) => {
        if (viewMode === 'lastMinute') {
          if (LAST_MINUTE_IDS.includes(q.id)) {
            total++;
            if (completedList[q.id]) completed++;
          }
        } else {
          total++;
          if (completedList[q.id]) completed++;
        }
      });
    });
    return { total, completed };
  };

  const { total, completed } = getOverallStats();

  return (
    <div className="animate-in fade-in duration-200">
      
      {/* ProgressBar overall view */}
      <div style={{ marginBottom: '2.5rem' }}>
        <ProgressBar total={total} completed={completed} />
      </div>

      {/* Tabs like Rising Brain: Pattern-Wise vs Last Minute 100 */}
      <div className="mode-toggle-container">
        <button 
          className={`mode-toggle-btn ${viewMode === 'patterns' ? 'active' : ''}`}
          onClick={() => setViewMode('patterns')}
        >
          Pattern-Wise DSA Sheet
        </button>
        <button 
          className={`mode-toggle-btn ${viewMode === 'lastMinute' ? 'active' : ''}`}
          onClick={() => setViewMode('lastMinute')}
        >
          🔥 Last Minute Top 50
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="filter-bar">
        <div className="search-input-container">
          <Search size={16} className="search-icon" />
          <input 
            type="text" 
            placeholder="Search problems by name..."
            className="search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <select 
          className="filter-select"
          value={difficultyFilter}
          onChange={(e) => setDifficultyFilter(e.target.value)}
        >
          <option value="all">All Difficulties</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>

        <select 
          className="filter-select"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">All Statuses</option>
          <option value="completed">Solved</option>
          <option value="unsolved">Unsolved</option>
          <option value="starred">Revision Bookmarked</option>
        </select>
      </div>

      {/* Collapsible Topic Categories */}
      <div className="topic-accordion">
        {topics.map((topic) => {
          const filteredQ = getFilteredQuestions(topic.questions);
          
          // If no questions match filters, don't show the category card
          if (filteredQ.length === 0) return null;

          const totalQ = filteredQ.length;
          const completedQ = filteredQ.filter(q => completedList[q.id]).length;
          const progressPercent = totalQ > 0 ? (completedQ / totalQ) * 100 : 0;
          const isOpen = openTopics[topic.id] || false;

          return (
            <div key={topic.id} className={`topic-card ${isOpen ? 'open' : ''}`}>
              
              {/* Collapsible Accordion Header */}
              <button 
                className="topic-header" 
                onClick={() => toggleTopic(topic.id)}
              >
                <div className="topic-title-area">
                  <ChevronDown className="topic-chevron" size={18} />
                  <div className="topic-info">
                    <span className="topic-title">{topic.title}</span>
                    <span className="topic-desc">{topic.description}</span>
                  </div>
                </div>

                <div className="topic-progress-area">
                  <span className="topic-stats">
                    {completedQ}/{totalQ} Solved
                  </span>
                  <div className="progress-line-container">
                    <div 
                      className="progress-line-fill" 
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </div>
              </button>

              {/* Collapsible Accordion Body */}
              {isOpen && (
                <div className="question-list-container">
                  {filteredQ.map((q) => {
                    const isCompleted = completedList[q.id] || false;
                    const isStarred = starredList[q.id] || false;

                    return (
                      <div 
                        key={q.id} 
                        className={`question-row ${isCompleted ? 'completed' : ''}`}
                      >
                        <div className="question-left">
                          {/* Checkbox button */}
                          <button 
                            className={`checkbox-btn ${isCompleted ? 'checked' : ''}`}
                            onClick={() => onToggleComplete(q.id)}
                            title={isCompleted ? "Mark as unsolved" : "Mark as solved"}
                          >
                            {isCompleted ? <CheckCircle size={18} /> : <Circle size={18} />}
                          </button>

                          {/* Revision Star button */}
                          <button 
                            className={`star-btn ${isStarred ? 'starred' : ''}`}
                            onClick={() => onToggleStar(q.id)}
                            title={isStarred ? "Remove Bookmark" : "Bookmark for Revision"}
                          >
                            <Star size={18} fill={isStarred ? "currentColor" : "none"} />
                          </button>

                          {/* Question Name */}
                          <span 
                            className="question-title-text"
                            onClick={() => onSelectQuestion(q)}
                          >
                            {q.title}
                          </span>
                        </div>

                        <div className="question-right">
                          {/* Difficulty Pill */}
                          <span className={`difficulty-tag ${q.difficulty.toLowerCase()}`}>
                            {q.difficulty}
                          </span>

                          {/* ExternalPractice Links */}
                          {q.leetcode && (
                            <a 
                              href={q.leetcode} 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              className="external-link"
                              title="Practice on LeetCode"
                            >
                              <ExternalLink size={15} />
                            </a>
                          )}
                          {q.gfg && (
                            <a 
                              href={q.gfg} 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              className="external-link"
                              title="Practice on GeeksForGeeks"
                            >
                              <ExternalLink size={15} />
                            </a>
                          )}

                          {/* Visualisation simulator Drawer button */}
                          <button 
                            className="solve-btn"
                            onClick={() => onSelectQuestion(q)}
                          >
                            <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                              <Play size={10} fill="currentColor" /> Code & Visualise
                            </span>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

            </div>
          );
        })}
      </div>

    </div>
  );
}
