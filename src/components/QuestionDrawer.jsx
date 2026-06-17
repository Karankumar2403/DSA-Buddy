import React, { useState, useEffect, useRef } from 'react';
import { X, Copy, Check, ExternalLink } from 'lucide-react';
import Visualizer from './Visualizer';
import { generateLiveSteps } from '../data/liveStepGenerator';

// Dictionary of pseudocodes for synchronized step highlights
const PSEUDOCODE_MAP = {
  "pair-with-target-sum": [
    "// C++ equivalent representation",
    "int left = 0;",
    "int right = numbers.size() - 1;",
    "while (left < right) {",
    "    int current_sum = numbers[left] + numbers[right];",
    "    if (current_sum == target) {",
    "        return {left + 1, right + 1};",
    "    } else if (current_sum < target) {",
    "        left++; // Shift left pointer forward",
    "    } else {",
    "        right--; // Shift right pointer backward",
    "    }",
    "}"
  ],
  "rearrange-0-and-1": [
    "// C++ equivalent representation",
    "int left = 0, right = arr.size() - 1;",
    "while (left < right) {",
    "    if (arr[left] == 0) {",
    "        left++;",
    "    } else if (arr[right] == 1) {",
    "        right--;",
    "    } else {",
    "        swap(arr[left], arr[right]);",
    "        left++; right--;",
    "    }",
    "}"
  ],
  "remove-duplicates-easy": [
    "// C++ equivalent representation",
    "if (nums.empty()) return 0;",
    "int i = 0;",
    "for (int j = 1; j < nums.size(); j++) {",
    "    if (nums[j] != nums[i]) {",
    "        i++;",
    "        nums[i] = nums[j];",
    "    }",
    "}",
    "return i + 1;"
  ],
  "linkedlist-cycle": [
    "// Floyd's Cycle Detection",
    "if (head == nullptr) return false;",
    "ListNode *slow = head;",
    "ListNode *fast = head;",
    "while (fast != nullptr && fast->next != nullptr) {",
    "    slow = slow->next;",
    "    fast = fast->next->next;",
    "    if (slow == fast) {",
    "        return true;",
    "    }",
    "}",
    "return false;"
  ],
  "max-sum-subarray-of-size-k": [
    "// Sliding Window Maximum Sum",
    "long current_sum = 0;",
    "for (int i = 0; i < K; i++) current_sum += Arr[i];",
    "long max_sum = current_sum;",
    "for (int i = K; i < N; i++) {",
    "    current_sum += Arr[i] - Arr[i - K];",
    "    max_sum = max(max_sum, current_sum);",
    "}",
    "return max_sum;"
  ],
  "maximum-subarray-sum": [
    "// Kadane's Algorithm",
    "int max_sum = nums[0];",
    "int current_sum = 0;",
    "for (int num : nums) {",
    "    current_sum += num;",
    "    max_sum = max(max_sum, current_sum);",
    "    if (current_sum < 0) {",
    "        current_sum = 0;",
    "    }",
    "}",
    "return max_sum;"
  ],
  "subarray-sum-equals-k": [
    "// Prefix Sum with Map",
    "unordered_map<int, int> mp; mp[0] = 1;",
    "int sum = 0, count = 0;",
    "for (int num : nums) {",
    "    sum += num;",
    "    if (mp.count(sum - k)) {",
    "        count += mp[sum - k];",
    "    }",
    "    mp[sum]++;",
    "}",
    "return count;"
  ],
  "merge-intervals-med": [
    "// Merge Intervals sorting",
    "if (intervals.empty()) return {};",
    "sort(intervals.begin(), intervals.end());",
    "vector<vector<int>> merged = {intervals[0]};",
    "for (int i = 1; i < intervals.size(); i++) {",
    "    auto& last = merged.back();",
    "    if (intervals[i][0] <= last[1]) {",
    "        last[1] = max(last[1], intervals[i][1]);",
    "    } else {",
    "        merged.push_back(intervals[i]);",
    "    }",
    "}",
    "return merged;"
  ],
  "reverse-linkedlist-easy": [
    "// Iterative 3 Pointers",
    "ListNode* prev = nullptr;",
    "ListNode* curr = head;",
    "while (curr != nullptr) {",
    "    ListNode* nextNode = curr->next;",
    "    curr->next = prev;",
    "    prev = curr;",
    "    curr = nextNode;",
    "}",
    "return prev;"
  ],
  "balanced-parentheses": [
    "// Valid Parentheses Stack",
    "stack<char> st;",
    "for (char c : s) {",
    "    if (c == '(' || c == '[' || c == '{') {",
    "        st.push(c);",
    "    } else {",
    "        if (st.empty()) return false;",
    "        char top = st.top();",
    "        if (matches(c, top)) st.pop();",
    "        else return false;",
    "    }",
    "}",
    "return st.empty();"
  ],
  "binary-search-basic": [
    "// Binary Search Range",
    "int low = 0, high = nums.size() - 1;",
    "while (low <= high) {",
    "    int mid = low + (high - low) / 2;",
    "    if (nums[mid] == target) return mid;",
    "    else if (nums[mid] < target) low = mid + 1;",
    "    else high = mid - 1;",
    "}",
    "return -1;"
  ],
  "kth-largest-element": [
    "// Min Heap size K",
    "priority_queue<int, vector<int>, greater<int>> min_heap;",
    "for (int num : nums) {",
    "    min_heap.push(num);",
    "    if (min_heap.size() > k) {",
    "        min_heap.pop();",
    "    }",
    "}",
    "return min_heap.top();"
  ],
  "fibonacci": [
    "// Dynamic Programming Fibonacci",
    "if (n <= 1) return n;",
    "int a = 0, b = 1;",
    "for (int i = 2; i <= n; i++) {",
    "    int temp = a + b;",
    "    a = b; b = temp;",
    "}",
    "return b;"
  ],
  "binary-tree-inorder": [
    "// Recursive Inorder helper",
    "void helper(TreeNode* root, vector<int>& res) {",
    "    if (root == nullptr) return;",
    "    helper(root->left, res);",
    "    res.push_back(root->val);",
    "    helper(root->right, res);",
    "}"
  ],
  "graph-dfs": [
    "// DFS helper calls",
    "vector<bool> visited(V, false);",
    "vector<int> ans;",
    "dfs(0, adj, visited, ans);",
    "return ans;",
    "",
    "void dfs(int node, vector<int> adj[], vector<bool>& visited, vector<int>& ans) {",
    "    visited[node] = true;",
    "    ans.push_back(node);",
    "    for (int neighbor : adj[node]) {",
    "        if (!visited[neighbor]) dfs(neighbor, adj, visited, ans);",
    "    }",
    "}"
  ],
  "climbing-stairs": [
    "// Climbing Stairs DP",
    "if (n <= 1) return 1;",
    "int prev2 = 1, prev1 = 1;",
    "for (int i = 2; i <= n; i++) {",
    "    int curr = prev1 + prev2;",
    "    prev2 = prev1; prev1 = curr;",
    "}",
    "return prev1;"
  ]
};

export default function QuestionDrawer({ question, onClose }) {
  const [activeTab, setActiveTab] = useState('problem'); // problem, solution, hinglish, simulation
  const [approach, setApproach] = useState('optimal'); // brute, better, optimal
  const [copied, setCopied] = useState(false);
  const [codeFormat, setCodeFormat] = useState('leetcode'); // leetcode, vscode
  const [playbookStep, setPlaybookStep] = useState(0);
  
  // Custom interactive simulation states
  const [simulatingQuestion, setSimulatingQuestion] = useState(question);
  const [inputArr, setInputArr] = useState('');
  const [inputTarget, setInputTarget] = useState('');
  const [inputK, setInputK] = useState('');
  const [inputN, setInputN] = useState('');
  const [inputPos, setInputPos] = useState('');
  const [inputS, setInputS] = useState('');
  const [inputIntervals, setInputIntervals] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // Simulator states
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const playTimer = useRef(null);

  // Sync state when question prop changes
  useEffect(() => {
    setSimulatingQuestion(question);
    setCodeFormat('leetcode');
    setPlaybookStep(0);
    if (question.simulator) {
      const def = question.simulator.defaultInput || {};
      if (def.arr) setInputArr(def.arr.join(', '));
      if (def.target !== undefined) setInputTarget(String(def.target));
      if (def.k !== undefined) setInputK(String(def.k));
      if (def.n !== undefined) setInputN(String(def.n));
      if (def.pos !== undefined) setInputPos(String(def.pos));
      if (def.s !== undefined) setInputS(def.s);
      if (def.intervals !== undefined) setInputIntervals(JSON.stringify(def.intervals));
      if (def.list !== undefined) setInputArr(def.list.join(', '));
      if (def.nodes !== undefined) setInputArr(def.nodes.join(', '));
    }
    setErrorMsg('');
    setCurrentStep(0);
    setIsPlaying(false);
  }, [question]);

  // Reset simulator state when tab changes
  useEffect(() => {
    setCurrentStep(0);
    setIsPlaying(false);
    if (playTimer.current) {
      clearInterval(playTimer.current);
    }
  }, [activeTab]);

  // Handle auto-playing of simulation steps
  useEffect(() => {
    if (isPlaying) {
      playTimer.current = setInterval(() => {
        setCurrentStep((prev) => {
          const stepsLength = simulatingQuestion.simulator?.steps?.length || 0;
          if (prev >= stepsLength - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, 1500);
    } else {
      if (playTimer.current) {
        clearInterval(playTimer.current);
      }
    }
    return () => {
      if (playTimer.current) clearInterval(playTimer.current);
    };
  }, [isPlaying, simulatingQuestion]);

  const handleNext = () => {
    const stepsLength = simulatingQuestion.simulator?.steps?.length || 0;
    if (currentStep < stepsLength - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setIsPlaying(false);
  };

  const handleTogglePlay = () => {
    setIsPlaying((prev) => !prev);
  };

  // Copy code utility
  const handleCopy = (code) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Get code string and complexity depending on approach selected
  const getApproachDetails = () => {
    if (approach === 'brute' && question.brute) return question.brute;
    if (approach === 'better' && question.better) return question.better;
    return question.optimal || { code: "// Optimal solution code coming soon!", complexity: "Time: TBD, Space: TBD" };
  };

  // Helper inputs flags based on inputType
  const inputType = question.simulator?.inputType || '';
  const hasArrField = ['two-pointers-sum', 'two-pointers-segregate', 'remove-duplicates', 'sliding-window-max', 'kadane', 'prefix-sum-k', 'linked-list-reversal', 'heap', 'binary-search', 'linkedlist-cycle'].includes(inputType);
  const hasTargetField = ['two-pointers-sum', 'binary-search', 'prefix-sum-k'].includes(inputType);
  const hasKField = ['sliding-window-max', 'heap'].includes(inputType);
  const hasNField = ['recursion-fib', 'climb-stairs'].includes(inputType);
  const hasPosField = ['linkedlist-cycle'].includes(inputType);
  const hasSField = ['stack'].includes(inputType);
  const hasIntervalsField = ['intervals'].includes(inputType);

  const handleRunSimulation = () => {
    setErrorMsg('');
    const parsedInputs = {};
    
    try {
      if (hasArrField) {
        let fieldVal = inputArr;
        if (!fieldVal.trim()) throw new Error('Input list cannot be empty.');
        parsedInputs.arr = fieldVal.split(',').map(s => {
          const val = s.trim();
          if (isNaN(val) || val === '') throw new Error('Array elements must be valid numbers.');
          return Number(val);
        });
      }

      if (hasTargetField) {
        if (!inputTarget.trim() || isNaN(inputTarget)) throw new Error('Target must be a valid number.');
        parsedInputs.target = Number(inputTarget);
      }

      if (hasKField) {
        if (!inputK.trim() || isNaN(inputK)) throw new Error('K size must be a valid number.');
        parsedInputs.k = Number(inputK);
        if (parsedInputs.arr && parsedInputs.arr.length < parsedInputs.k) {
          throw new Error('K size cannot be larger than the array length.');
        }
      }

      if (hasNField) {
        if (!inputN.trim() || isNaN(inputN)) throw new Error('N must be a valid number.');
        parsedInputs.n = Number(inputN);
        if (parsedInputs.n < 0 || parsedInputs.n > 15) {
          throw new Error('Please enter N between 0 and 15 for safety.');
        }
      }

      if (hasPosField) {
        if (!inputPos.trim() || isNaN(inputPos)) throw new Error('Cycle pos must be a valid number.');
        parsedInputs.pos = Number(inputPos);
        const listLength = parsedInputs.arr ? parsedInputs.arr.length : 4;
        if (parsedInputs.pos >= listLength) {
          throw new Error('Cycle position cannot be larger than the node length.');
        }
        parsedInputs.nodes = parsedInputs.arr || [3, 2, 0, -4];
      }

      if (hasSField) {
        if (!inputS.trim()) throw new Error('String input cannot be empty.');
        parsedInputs.s = inputS.trim();
      }

      if (hasIntervalsField) {
        try {
          const parsed = JSON.parse(inputIntervals);
          if (!Array.isArray(parsed) || !parsed.every(item => Array.isArray(item) && item.length === 2)) {
            throw new Error();
          }
          parsedInputs.intervals = parsed;
        } catch {
          throw new Error('Intervals must be a valid JSON array of pairs, e.g. [[1,3],[2,4]]');
        }
      }

      const liveSteps = generateLiveSteps(inputType, parsedInputs);
      setSimulatingQuestion({
        ...question,
        simulator: {
          ...question.simulator,
          steps: liveSteps
        }
      });
      setCurrentStep(0);
      setIsPlaying(false);
    } catch (err) {
      setErrorMsg(err.message || 'Invalid inputs. Check format.');
    }
  };

  const codeDetails = getApproachDetails();
  const pseudocodeLines = PSEUDOCODE_MAP[question.id] || [];

  // Determine which pseudocode line to highlight (if any)
  const currentStepData = simulatingQuestion.simulator?.steps?.[currentStep];
  const activeLine = currentStepData?.line !== undefined ? currentStepData.line : -1;

  return (
    <>
      <div className="drawer-backdrop" onClick={onClose} />
      <div className="drawer">
        
        {/* Drawer Header */}
        <div className="drawer-header">
          <div className="drawer-title-area">
            <h2 className="drawer-title">{question.title}</h2>
            <span className={`difficulty-tag ${question.difficulty.toLowerCase()}`}>
              {question.difficulty}
            </span>
          </div>
          <button className="drawer-close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="drawer-tabs">
          <button 
            className={`drawer-tab ${activeTab === 'problem' ? 'active' : ''}`}
            onClick={() => setActiveTab('problem')}
          >
            Problem Description
          </button>
          <button 
            className={`drawer-tab ${activeTab === 'solution' ? 'active' : ''}`}
            onClick={() => setActiveTab('solution')}
          >
            C++ Solution
          </button>
          <button 
            className={`drawer-tab ${activeTab === 'hinglish' ? 'active' : ''}`}
            onClick={() => setActiveTab('hinglish')}
          >
            Interview Guide
          </button>
          <button 
            className={`drawer-tab ${activeTab === 'simulation' ? 'active' : ''}`}
            onClick={() => setActiveTab('simulation')}
          >
            Dry Run Simulator
          </button>
        </div>

        {/* Drawer Content */}
        <div className="drawer-body">
          {activeTab === 'problem' && (
            <div className="problem-info-tab">
              <div className="problem-description">
                <p>
                  Here is the problem metadata and external references for <b>{question.title}</b>.
                </p>
                <p>
                  To solve this problem, you need to implement a solution in C++ that passes the 
                  defined test cases on online judges (LeetCode / GeeksForGeeks). We recommend writing 
                  your solution using the optimal approach outlined in the other tabs.
                </p>
                <h4 style={{ color: 'var(--foreground)', marginTop: '1rem', marginBottom: '0.5rem', fontWeight: 700 }}>
                  Practice Platform Links:
                </h4>
                <div className="problem-links">
                  {question.leetcode && (
                    <a 
                      href={question.leetcode} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="problem-link-btn"
                    >
                      Solve on LeetCode <ExternalLink size={14} />
                    </a>
                  )}
                  {question.gfg && (
                    <a 
                      href={question.gfg} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="problem-link-btn"
                    >
                      Solve on GeeksForGeeks <ExternalLink size={14} />
                    </a>
                  )}
                  {!question.leetcode && !question.gfg && (
                    <span className="text-muted" style={{ fontSize: '0.875rem' }}>No external links provided in the sheet.</span>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'solution' && (
            <div className="code-tab-container">
              <div className="code-header-bar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center' }}>
                  <div className="approach-selector">
                    {question.brute && (
                      <button 
                        className={`approach-btn ${approach === 'brute' ? 'active' : ''}`}
                        onClick={() => { setApproach('brute'); setCodeFormat('leetcode'); }}
                      >
                        Brute Force
                      </button>
                    )}
                    {question.better && (
                      <button 
                        className={`approach-btn ${approach === 'better' ? 'active' : ''}`}
                        onClick={() => { setApproach('better'); setCodeFormat('leetcode'); }}
                      >
                        Better Approach
                      </button>
                    )}
                    <button 
                      className={`approach-btn ${approach === 'optimal' ? 'active' : ''}`}
                      onClick={() => setApproach('optimal')}
                    >
                      Optimal Solution
                    </button>
                  </div>

                  <div className="format-selector" style={{ display: 'flex', backgroundColor: 'rgba(0,0,0,0.3)', border: '1px solid var(--border)', padding: '2px', borderRadius: '8px' }}>
                    <button 
                      className={`approach-btn ${codeFormat === 'leetcode' ? 'active' : ''}`}
                      onClick={() => setCodeFormat('leetcode')}
                      style={{ fontSize: '0.75rem', padding: '0.3rem 0.75rem' }}
                    >
                      LeetCode Function
                    </button>
                    <button 
                      className={`approach-btn ${codeFormat === 'vscode' ? 'active' : ''}`}
                      onClick={() => { setCodeFormat('vscode'); setApproach('optimal'); }}
                      style={{ fontSize: '0.75rem', padding: '0.3rem 0.75rem' }}
                    >
                      Complete VSCode File 💻
                    </button>
                  </div>
                </div>

                {codeFormat === 'leetcode' && (
                  <div className="complexity-info">
                    {codeDetails.complexity}
                  </div>
                )}
              </div>

              <div className="code-editor-box">
                {codeFormat === 'vscode' && (
                  <div style={{ padding: '0.75rem 1.25rem', backgroundColor: 'rgba(16, 185, 129, 0.05)', borderBottom: '1px solid var(--border)', fontSize: '0.8rem', color: 'var(--primary-light)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    💻 <span>This code contains <b>#include</b> headers, custom node structs, and a <b>main()</b> function. It is ready to copy and run in VSCode!</span>
                  </div>
                )}
                <button 
                  className="code-copy-btn" 
                  onClick={() => handleCopy(codeFormat === 'vscode' ? question.vscodeCompleteCode : codeDetails.code)}
                  title="Copy Code"
                >
                  {copied ? <Check size={16} style={{ color: 'var(--primary-light)' }} /> : <Copy size={16} />}
                </button>
                <pre className="code-block">
                  <code>{codeFormat === 'vscode' ? question.vscodeCompleteCode : codeDetails.code}</code>
                </pre>
              </div>
            </div>
          )}

          {activeTab === 'hinglish' && (
            <div className="hinglish-container" style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
              
              {/* Stepper Wizard Header */}
              {question.interviewPlaybook && question.interviewPlaybook.length > 0 && (
                <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.02)', border: '1px solid var(--border)', borderRadius: '12px', padding: '1.25rem' }}>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--primary-light)', textTransform: 'uppercase', marginBottom: '1.25rem', letterSpacing: '0.05em', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    🗺️ Step-by-Step Interview Execution Playbook
                  </div>
                  
                  <div className="playbook-stepper" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
                    {question.interviewPlaybook.map((step, idx) => (
                      <React.Fragment key={idx}>
                        <button
                          onClick={() => setPlaybookStep(idx)}
                          style={{
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '0.4rem',
                            flex: 1,
                            minWidth: '100px',
                            opacity: playbookStep === idx ? 1 : 0.5,
                            transition: 'opacity var(--transition-fast)'
                          }}
                        >
                          <div style={{
                            width: '26px',
                            height: '26px',
                            borderRadius: '50%',
                            backgroundColor: playbookStep === idx ? 'var(--primary)' : 'rgba(255,255,255,0.08)',
                            border: `2px solid ${playbookStep === idx ? 'var(--primary-light)' : 'var(--border)'}`,
                            color: '#fff',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '0.8rem',
                            fontWeight: 700,
                            boxShadow: playbookStep === idx ? '0 0 8px var(--primary-glow)' : 'none',
                            transition: 'all var(--transition-fast)'
                          }}>
                            {idx + 1}
                          </div>
                          <span style={{
                            fontSize: '0.7rem',
                            fontWeight: playbookStep === idx ? 700 : 500,
                            color: playbookStep === idx ? 'var(--primary-light)' : 'var(--muted)',
                            textAlign: 'center',
                            whiteSpace: 'nowrap'
                          }}>
                            {step.title.split(': ')[1] || step.title}
                          </span>
                        </button>
                        {idx < question.interviewPlaybook.length - 1 && (
                          <div style={{
                            flex: '1 0 12px',
                            height: '2px',
                            backgroundColor: idx < playbookStep ? 'var(--primary)' : 'var(--border)',
                            marginTop: '-1rem',
                            minWidth: '12px'
                          }} />
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              )}

              {/* Active Step Panel */}
              {question.interviewPlaybook && question.interviewPlaybook[playbookStep] && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  
                  {/* 1. What to say in Hinglish/English */}
                  <div className="glass-panel" style={{ borderLeft: '4px solid var(--primary-light)', padding: '1.25rem' }}>
                    <h3 style={{ fontSize: '0.95rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem', color: 'var(--primary-light)' }}>
                      🗣️ What to Say (Dialog Script)
                    </h3>
                    <div style={{ 
                      backgroundColor: 'rgba(0, 0, 0, 0.25)', 
                      padding: '1rem', 
                      borderRadius: '8px', 
                      fontStyle: 'italic', 
                      lineHeight: '1.6', 
                      color: '#e4e4e7',
                      fontSize: '0.875rem',
                      border: '1px solid rgba(255,255,255,0.03)'
                    }}>
                      "{question.interviewPlaybook[playbookStep].dialogue}"
                    </div>
                  </div>

                  {/* 2. What, Where, How, When Matrix */}
                  <div className="glass-panel" style={{ padding: '1.25rem' }}>
                    <h3 style={{ fontSize: '0.95rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', color: '#fff' }}>
                      🧩 Step W-H Matrix
                    </h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                      <div style={{ backgroundColor: 'rgba(16, 185, 129, 0.02)', padding: '0.875rem', borderRadius: '8px', border: '1px solid var(--border)' }}>
                        <span style={{ fontWeight: 800, color: 'var(--primary-light)', fontSize: '0.75rem', textTransform: 'uppercase', display: 'block', marginBottom: '0.25rem' }}>WHAT is the goal?</span>
                        <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.8)', lineHeight: '1.4' }}>{question.interviewPlaybook[playbookStep].wh_matrix.what}</p>
                      </div>
                      <div style={{ backgroundColor: 'rgba(59, 130, 246, 0.02)', padding: '0.875rem', borderRadius: '8px', border: '1px solid var(--border)' }}>
                        <span style={{ fontWeight: 800, color: '#3b82f6', fontSize: '0.75rem', textTransform: 'uppercase', display: 'block', marginBottom: '0.25rem' }}>WHERE to focus?</span>
                        <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.8)', lineHeight: '1.4' }}>{question.interviewPlaybook[playbookStep].wh_matrix.where}</p>
                      </div>
                      <div style={{ backgroundColor: 'rgba(245, 158, 11, 0.02)', padding: '0.875rem', borderRadius: '8px', border: '1px solid var(--border)' }}>
                        <span style={{ fontWeight: 800, color: '#f59e0b', fontSize: '0.75rem', textTransform: 'uppercase', display: 'block', marginBottom: '0.25rem' }}>HOW to execute?</span>
                        <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.8)', lineHeight: '1.4' }}>{question.interviewPlaybook[playbookStep].wh_matrix.how}</p>
                      </div>
                      <div style={{ backgroundColor: 'rgba(239, 68, 68, 0.02)', padding: '0.875rem', borderRadius: '8px', border: '1px solid var(--border)' }}>
                        <span style={{ fontWeight: 800, color: '#ef4444', fontSize: '0.75rem', textTransform: 'uppercase', display: 'block', marginBottom: '0.25rem' }}>WHEN to transition?</span>
                        <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.8)', lineHeight: '1.4' }}>{question.interviewPlaybook[playbookStep].wh_matrix.when}</p>
                      </div>
                    </div>
                  </div>

                  {/* 3. Tech Details Panel */}
                  {question.interviewPlaybook[playbookStep].technicalDetails?.type === 'clarifications' && (
                    <div className="glass-panel" style={{ borderLeft: '4px solid #3b82f6', padding: '1.25rem' }}>
                      <h3 style={{ fontSize: '0.95rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem', color: '#fff' }}>
                        ❓ Suggested Clarification Questions to Ask
                      </h3>
                      <ul style={{ listStyleType: 'disc', marginLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        {question.interviewPlaybook[playbookStep].technicalDetails.items.map((item, idx) => (
                          <li key={idx} style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.85)' }}>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {question.interviewPlaybook[playbookStep].technicalDetails?.type === 'approach' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                        <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#fff' }}>
                          🚀 Approach: <span style={{ color: 'var(--primary-light)' }}>{question.interviewPlaybook[playbookStep].technicalDetails.name}</span>
                        </div>
                        <div className="complexity-info">
                          {question.interviewPlaybook[playbookStep].technicalDetails.complexity}
                        </div>
                      </div>
                      
                      <div className="code-editor-box" style={{ position: 'relative' }}>
                        <button 
                          className="code-copy-btn" 
                          onClick={() => handleCopy(question.interviewPlaybook[playbookStep].technicalDetails.code)}
                          title="Copy Code"
                          style={{ position: 'absolute', top: '0.75rem', right: '0.75rem' }}
                        >
                          {copied ? <Check size={16} style={{ color: 'var(--primary-light)' }} /> : <Copy size={16} />}
                        </button>
                        <pre className="code-block" style={{ maxHeight: '250px', overflowY: 'auto', margin: 0 }}>
                          <code>{question.interviewPlaybook[playbookStep].technicalDetails.code}</code>
                        </pre>
                      </div>
                      
                      <div className="glass-panel" style={{ padding: '1.25rem' }}>
                        <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Intuition (Hinglish)</div>
                        <div style={{ fontSize: '0.875rem', lineHeight: '1.6', color: 'rgba(255,255,255,0.85)', whiteSpace: 'pre-wrap' }}>
                          {question.interviewPlaybook[playbookStep].technicalDetails.dryRun}
                        </div>
                      </div>
                    </div>
                  )}

                  {question.interviewPlaybook[playbookStep].technicalDetails?.type === 'dryrun' && (
                    <div className="glass-panel" style={{ padding: '1.25rem', overflowX: 'auto' }}>
                      <h3 style={{ fontSize: '0.95rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', color: '#fff' }}>
                        📋 Trace Table (Whiteboard simulation)
                      </h3>
                      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem' }}>
                        <thead>
                          <tr style={{ borderBottom: '2px solid var(--border)', textAlign: 'left' }}>
                            <th style={{ padding: '0.6rem 0.4rem', color: 'var(--primary-light)', fontWeight: 700 }}>Step</th>
                            <th style={{ padding: '0.6rem 0.4rem', color: 'var(--primary-light)', fontWeight: 700 }}>Line</th>
                            <th style={{ padding: '0.6rem 0.4rem', color: 'var(--primary-light)', fontWeight: 700 }}>Variables</th>
                            <th style={{ padding: '0.6rem 0.4rem', color: 'var(--primary-light)', fontWeight: 700 }}>Explanation</th>
                          </tr>
                        </thead>
                        <tbody>
                          {question.interviewPlaybook[playbookStep].technicalDetails.dryRunTable.map((row, idx) => (
                            <tr key={idx} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', backgroundColor: idx % 2 === 0 ? 'rgba(255,255,255,0.01)' : 'transparent' }}>
                              <td style={{ padding: '0.6rem 0.4rem', fontWeight: 600, color: '#fff' }}>#{row.step}</td>
                              <td style={{ padding: '0.6rem 0.4rem', fontFamily: 'var(--font-mono)', color: 'var(--muted)' }}>L{row.line}</td>
                              <td style={{ padding: '0.6rem 0.4rem', fontFamily: 'var(--font-mono)', color: '#cbd5e1' }}>{row.vars}</td>
                              <td style={{ padding: '0.6rem 0.4rem', color: 'rgba(255,255,255,0.85)' }}>{row.explanation}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}

              {/* General intuition section (collapsed detail) */}
              <div className="glass-panel" style={{ padding: '1.25rem', marginTop: '1rem' }}>
                <details>
                  <summary style={{ cursor: 'pointer', fontWeight: 700, fontSize: '0.9rem', color: 'var(--muted)' }}>
                     View Quick Overall Summary (Hinglish Intuition)
                  </summary>
                  <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div style={{ whiteSpace: 'pre-wrap', fontSize: '0.875rem', lineHeight: '1.6', color: 'rgba(255,255,255,0.8)' }}>
                      {question.hinglish?.explanation}
                    </div>
                    {question.hinglish?.pseudocode && (
                      <div className="pseudocode-panel">
                        <div className="pseudocode-title">Optimal Pseudocode</div>
                        <pre className="pseudocode-lines">{question.hinglish.pseudocode}</pre>
                      </div>
                    )}
                  </div>
                </details>
              </div>

            </div>
          )}

          {activeTab === 'simulation' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '100%' }}>
              
              {/* Dynamic live simulation input form */}
              {question.simulator && (
                <div className="glass-panel" style={{ padding: '1.25rem', border: '1px solid var(--border)', borderRadius: '12px' }}>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--primary-light)', textTransform: 'uppercase', marginBottom: '0.75rem', letterSpacing: '0.05em' }}>
                    ⚙️ Live Dynamic Dry Run (Try Your Own Inputs)
                  </div>
                  
                  <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'flex-end' }}>
                    {hasArrField && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', flex: 1, minWidth: '200px' }}>
                        <label style={{ fontSize: '0.725rem', color: 'var(--muted)', fontWeight: 600 }}>
                          {inputType === 'linkedlist-cycle' ? 'Node Values (comma-separated):' : 'Array (comma-separated):'}
                        </label>
                        <input 
                          type="text" 
                          value={inputArr} 
                          onChange={(e) => setInputArr(e.target.value)} 
                          className="search-input" 
                          style={{ height: '36px', paddingLeft: '10px' }} 
                        />
                      </div>
                    )}

                    {hasTargetField && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', width: '90px' }}>
                        <label style={{ fontSize: '0.725rem', color: 'var(--muted)', fontWeight: 600 }}>Target:</label>
                        <input 
                          type="text" 
                          value={inputTarget} 
                          onChange={(e) => setInputTarget(e.target.value)} 
                          className="search-input" 
                          style={{ height: '36px', paddingLeft: '10px' }} 
                        />
                      </div>
                    )}

                    {hasKField && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', width: '90px' }}>
                        <label style={{ fontSize: '0.725rem', color: 'var(--muted)', fontWeight: 600 }}>K Size:</label>
                        <input 
                          type="text" 
                          value={inputK} 
                          onChange={(e) => setInputK(e.target.value)} 
                          className="search-input" 
                          style={{ height: '36px', paddingLeft: '10px' }} 
                        />
                      </div>
                    )}

                    {hasNField && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', width: '90px' }}>
                        <label style={{ fontSize: '0.725rem', color: 'var(--muted)', fontWeight: 600 }}>Number N:</label>
                        <input 
                          type="text" 
                          value={inputN} 
                          onChange={(e) => setInputN(e.target.value)} 
                          className="search-input" 
                          style={{ height: '36px', paddingLeft: '10px' }} 
                        />
                      </div>
                    )}

                    {hasPosField && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', width: '100px' }}>
                        <label style={{ fontSize: '0.725rem', color: 'var(--muted)', fontWeight: 600 }}>Cycle Pos Index:</label>
                        <input 
                          type="text" 
                          value={inputPos} 
                          onChange={(e) => setInputPos(e.target.value)} 
                          className="search-input" 
                          style={{ height: '36px', paddingLeft: '10px' }} 
                        />
                      </div>
                    )}

                    {hasSField && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', flex: 1, minWidth: '150px' }}>
                        <label style={{ fontSize: '0.725rem', color: 'var(--muted)', fontWeight: 600 }}>Parentheses String:</label>
                        <input 
                          type="text" 
                          value={inputS} 
                          onChange={(e) => setInputS(e.target.value)} 
                          className="search-input" 
                          style={{ height: '36px', paddingLeft: '10px' }} 
                        />
                      </div>
                    )}

                    {hasIntervalsField && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', flex: 1, minWidth: '220px' }}>
                        <label style={{ fontSize: '0.725rem', color: 'var(--muted)', fontWeight: 600 }}>Intervals JSON list:</label>
                        <input 
                          type="text" 
                          value={inputIntervals} 
                          onChange={(e) => setInputIntervals(e.target.value)} 
                          className="search-input" 
                          style={{ height: '36px', paddingLeft: '10px' }} 
                        />
                      </div>
                    )}

                    <button 
                      onClick={handleRunSimulation} 
                      className="solve-btn" 
                      style={{ height: '36px', background: 'var(--primary)', borderColor: 'var(--primary)', color: '#fff', fontWeight: 700 }}
                    >
                      Run Simulator
                    </button>
                  </div>

                  {errorMsg && (
                    <div style={{ color: 'var(--hard)', fontSize: '0.75rem', marginTop: '0.5rem', fontWeight: 600 }}>
                      ⚠️ {errorMsg}
                    </div>
                  )}
                </div>
              )}

              <div className="simulator-layout">
                {/* Left Column: Visualizer Board & controls */}
                <Visualizer 
                  question={simulatingQuestion}
                  currentStep={currentStep}
                  onNext={handleNext}
                  onPrev={handlePrev}
                  onReset={handleReset}
                  isPlaying={isPlaying}
                  onTogglePlay={handleTogglePlay}
                />

                {/* Right Column: Pseudocode lines highlighted in sync */}
                {simulatingQuestion.simulator && pseudocodeLines.length > 0 && (
                  <div className="simulation-pseudocode-view">
                    <span className="pseudocode-title">Trace Line Highlighter</span>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                      {pseudocodeLines.map((line, idx) => {
                        const isActive = idx + 1 === activeLine;
                        return (
                          <div 
                            key={idx} 
                            className={`simulator-code-line ${isActive ? 'active' : ''}`}
                          >
                            {line}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

      </div>
    </>
  );
}
