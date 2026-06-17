import React from 'react';
import { Play, Pause, SkipForward, SkipBack, RotateCcw } from 'lucide-react';

export default function Visualizer({ question, currentStep, onNext, onPrev, onReset, isPlaying, onTogglePlay }) {
  if (!question.simulator) {
    return (
      <div className="simulator-board">
        <p className="text-muted" style={{ fontSize: '0.9rem' }}>
          Simulation details for this question are coming soon! Try questions like 
          <b> "Pair with Target Sum"</b>, 
          <b> "Rearrange 0 and 1"</b>, 
          <b> "LinkedList Cycle"</b>, 
          <b> "Maximum Sum Subarray of Size K"</b>,
          <b> "Maximum subarray sum"</b>, 
          <b> "Subarray Sum Equals K"</b>,
          <b> "Merge Intervals"</b>, 
          <b> "Reverse a LinkedList"</b>, 
          <b> "Balanced Parentheses"</b>, 
          <b> "Binary search basic"</b>, 
          <b> "kth largest"</b>, 
          <b> "Fibonnaci"</b>, 
          <b> "Inorder Traversal"</b>, 
          <b> "Graph DFS"</b>, or 
          <b> "Climbing Stairs"</b> to view full live step-by-step simulations.
        </p>
      </div>
    );
  }

  const { steps, inputType } = question.simulator;
  const stepData = steps[currentStep] || steps[0];
  const { vars = {}, explanation = "" } = stepData;

  // Helper renderers for different visualizer styles
  const renderVisuals = () => {
    switch (inputType) {
      case 'two-pointers-sum': {
        const { arr = [], left = 0, right = 0, sum } = vars;
        return (
          <div className="array-container">
            {arr.map((val, idx) => {
              const isLeft = idx === left;
              const isRight = idx === right;
              let classNames = "array-box";
              if (isLeft) classNames += " left-pointer";
              if (isRight) classNames += " right-pointer";
              return (
                <div key={idx} className={classNames}>
                  <span className="array-index">{idx}</span>
                  {val}
                  {isLeft && <span className="pointer-label l">L</span>}
                  {isRight && <span className="pointer-label r">R</span>}
                </div>
              );
            })}
          </div>
        );
      }

      case 'two-pointers-segregate': {
        const { arr = [], left = 0, right = 0 } = vars;
        return (
          <div className="array-container">
            {arr.map((val, idx) => {
              const isLeft = idx === left;
              const isRight = idx === right;
              let classNames = "array-box";
              if (isLeft) classNames += " left-pointer";
              if (isRight) classNames += " right-pointer";
              return (
                <div key={idx} className={classNames}>
                  <span className="array-index">{idx}</span>
                  {val}
                  {isLeft && <span className="pointer-label l">L</span>}
                  {isRight && <span className="pointer-label r">R</span>}
                </div>
              );
            })}
          </div>
        );
      }

      case 'remove-duplicates': {
        const { arr = [], i = 0, j = 0 } = vars;
        return (
          <div className="array-container">
            {arr.map((val, idx) => {
              const isI = idx === i;
              const isJ = idx === j;
              let classNames = "array-box";
              if (isI) classNames += " left-pointer"; // blue
              if (isJ) classNames += " right-pointer"; // red
              return (
                <div key={idx} className={classNames}>
                  <span className="array-index">{idx}</span>
                  {val}
                  {isI && <span className="pointer-label l" style={{backgroundColor: '#3b82f6'}}>U (i)</span>}
                  {isJ && <span className="pointer-label r" style={{backgroundColor: '#ef4444'}}>S (j)</span>}
                </div>
              );
            })}
          </div>
        );
      }

      case 'linkedlist-cycle': {
        const { nodes = [], slow = 0, fast = 0, pos = 1, match = false } = vars;
        return (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem', width: '100%' }}>
            <div className="ll-node-chain" style={{ flexWrap: 'wrap', justifyContent: 'center' }}>
              {nodes.map((val, idx) => {
                const isSlow = idx === slow;
                const isFast = idx === fast;
                let classNames = "ll-node";
                if (isSlow) classNames += " slow-ptr";
                if (isFast) classNames += " fast-ptr";
                
                return (
                  <React.Fragment key={idx}>
                    <div className={classNames}>
                      {val}
                      {isSlow && <span className="pointer-label l" style={{ bottom: '-26px' }}>S</span>}
                      {isFast && <span className="pointer-label r" style={{ top: '-26px', bottom: 'auto' }}>F</span>}
                    </div>
                    {idx < nodes.length - 1 && <span className="ll-arrow">➔</span>}
                  </React.Fragment>
                );
              })}
            </div>
            {pos >= 0 && (
              <div style={{ fontSize: '0.8rem', color: '#ef4444', border: '1px dashed rgba(239,68,68,0.2)', padding: '0.4rem 0.8rem', borderRadius: '6px' }}>
                🔄 Circular Connection: Node {nodes.length - 1} points back to Node {pos} ({nodes[pos]})
              </div>
            )}
          </div>
        );
      }

      case 'sliding-window-max': {
        const { arr = [], k = 3, i = 0 } = vars;
        const windowStart = i >= k ? i - k + 1 : 0;
        const windowEnd = i;
        return (
          <div className="array-container">
            {arr.map((val, idx) => {
              const inWindow = idx >= windowStart && idx <= windowEnd;
              const isLead = idx === i;
              let style = {};
              if (inWindow) {
                style = { borderColor: 'var(--primary-light)', backgroundColor: 'var(--primary-glow)' };
              }
              return (
                <div key={idx} className="array-box" style={style}>
                  <span className="array-index">{idx}</span>
                  {val}
                  {isLead && <span className="pointer-label l" style={{ backgroundColor: 'var(--primary-light)' }}>i</span>}
                </div>
              );
            })}
          </div>
        );
      }

      case 'kadane': {
        const { arr = [], num, current_sum } = vars;
        return (
          <div className="array-container">
            {arr.map((val, idx) => {
              const isActive = val === num;
              let style = {};
              if (isActive) {
                style = { borderColor: 'var(--primary-light)', transform: 'scale(1.1)', boxShadow: '0 0 12px var(--primary-glow)' };
              }
              return (
                <div key={idx} className="array-box" style={style}>
                  <span className="array-index">{idx}</span>
                  {val}
                  {isActive && <span className="pointer-label l" style={{ backgroundColor: 'var(--primary-light)' }}>Num</span>}
                </div>
              );
            })}
          </div>
        );
      }

      case 'prefix-sum-k': {
        const { arr = [], num } = vars;
        return (
          <div className="array-container">
            {arr.map((val, idx) => {
              const isActive = val === num;
              let style = {};
              if (isActive) {
                style = { borderColor: 'var(--primary-light)', transform: 'scale(1.1)' };
              }
              return (
                <div key={idx} className="array-box" style={style}>
                  {val}
                  {isActive && <span className="pointer-label l" style={{ backgroundColor: 'var(--primary-light)' }}>Active</span>}
                </div>
              );
            })}
          </div>
        );
      }

      case 'intervals': {
        const { intervals = [], merged = [], i } = vars;
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '100%' }}>
            <div>
              <div style={{ fontSize: '0.8rem', color: 'var(--muted)', marginBottom: '0.5rem', fontWeight: 600 }}>Original Intervals:</div>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {intervals.map((item, idx) => {
                  const isCurrent = idx === i;
                  return (
                    <div key={idx} style={{ 
                      padding: '0.35rem 0.75rem', 
                      borderRadius: '6px', 
                      backgroundColor: isCurrent ? 'var(--primary-glow)' : 'var(--bg-card)',
                      border: isCurrent ? '1.5px solid var(--primary-light)' : '1px solid var(--border)',
                      fontSize: '0.85rem',
                      fontFamily: 'var(--font-mono)'
                    }}>
                      [{item[0]}, {item[1]}] {isCurrent && '◀'}
                    </div>
                  );
                })}
              </div>
            </div>
            <div>
              <div style={{ fontSize: '0.8rem', color: 'var(--primary-light)', marginBottom: '0.5rem', fontWeight: 600 }}>Merged Output Array:</div>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {merged.length === 0 ? (
                  <span className="text-muted" style={{ fontSize: '0.85rem' }}>Empty []</span>
                ) : (
                  merged.map((item, idx) => (
                    <div key={idx} style={{ 
                      padding: '0.35rem 0.75rem', 
                      borderRadius: '6px', 
                      backgroundColor: 'rgba(16,185,129,0.06)',
                      border: '1.5px solid var(--primary-light)',
                      fontSize: '0.85rem',
                      fontFamily: 'var(--font-mono)'
                    }}>
                      [{item[0]}, {item[1]}]
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        );
      }

      case 'linked-list-reversal': {
        const { list = [], prev, curr } = vars;
        return (
          <div className="ll-node-chain" style={{ flexWrap: 'wrap', justifyContent: 'center' }}>
            {list.map((item, idx) => {
              if (typeof item === 'string' && item.startsWith('->')) {
                // Return direction arrow
                return <span key={idx} className="ll-arrow" style={{color: 'var(--primary-light)'}}>{item.includes('null') ? '➔ null' : '➔'}</span>;
              }
              const isCurr = idx === curr || item === curr;
              const isPrev = item === prev || idx === prev;
              
              let style = {};
              if (isCurr) style = { borderColor: 'var(--primary-light)', boxShadow: '0 0 10px var(--primary-glow)' };
              if (isPrev) style = { borderColor: '#3b82f6', boxShadow: '0 0 10px rgba(59,130,246,0.2)' };
              
              return (
                <div key={idx} className="ll-node" style={style}>
                  {item}
                  {isCurr && <span className="pointer-label l" style={{ bottom: '-26px', backgroundColor: 'var(--primary-light)' }}>curr</span>}
                  {isPrev && <span className="pointer-label r" style={{ top: '-26px', bottom: 'auto', backgroundColor: '#3b82f6' }}>prev</span>}
                </div>
              );
            })}
          </div>
        );
      }

      case 'stack': {
        const { stack = [], s = "", i = 0 } = vars;
        return (
          <div style={{ display: 'flex', gap: '3rem', alignItems: 'center', justifyContent: 'center', width: '100%', flexWrap: 'wrap' }}>
            <div>
              <div style={{ fontSize: '0.8rem', color: 'var(--muted)', marginBottom: '0.5rem', fontWeight: 600 }}>String Traversal:</div>
              <div style={{ display: 'flex', gap: '2px', fontFamily: 'var(--font-mono)', fontSize: '1.25rem' }}>
                {s.split('').map((char, idx) => {
                  const isActive = idx === i - 1;
                  return (
                    <span key={idx} style={{ 
                      color: isActive ? 'var(--primary-light)' : (idx >= i ? 'var(--muted)' : 'var(--muted-dark)'),
                      borderBottom: isActive ? '2px solid var(--primary-light)' : 'none',
                      fontWeight: isActive ? 800 : 400,
                      padding: '0 2px'
                    }}>
                      {char}
                    </span>
                  );
                })}
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div className="stack-visual-container">
                {stack.map((item, idx) => (
                  <div key={idx} className="stack-item">
                    {item}
                  </div>
                ))}
              </div>
              <span style={{ fontSize: '0.75rem', color: 'var(--muted)', marginTop: '0.5rem', fontWeight: 600 }}>LIFO Stack</span>
            </div>
          </div>
        );
      }

      case 'binary-search': {
        const { arr = [], low = 0, high = 0, mid } = vars;
        return (
          <div className="array-container">
            {arr.map((val, idx) => {
              const isLow = idx === low;
              const isHigh = idx === high;
              const isMid = idx === mid;
              
              let style = {};
              if (isMid) {
                style = { borderColor: 'var(--primary-light)', transform: 'scale(1.08)', boxShadow: '0 0 10px var(--primary-glow)' };
              } else if (idx >= low && idx <= high) {
                style = { borderColor: 'var(--border)', backgroundColor: 'rgba(255,255,255,0.02)' };
              } else {
                style = { opacity: 0.25 };
              }
              
              return (
                <div key={idx} className="array-box" style={style}>
                  <span className="array-index">{idx}</span>
                  {val}
                  {isLow && <span className="pointer-label l" style={{ backgroundColor: '#3b82f6', bottom: '-26px' }}>L</span>}
                  {isHigh && <span className="pointer-label r" style={{ backgroundColor: '#ef4444', top: '-26px', bottom: 'auto' }}>H</span>}
                  {isMid && <span className="pointer-label" style={{ backgroundColor: 'var(--primary-light)', bottom: '-26px', left: '50%', transform: 'translateX(-50%)' }}>M</span>}
                </div>
              );
            })}
          </div>
        );
      }

      case 'heap': {
        const { heap = [], num, k } = vars;
        return (
          <div style={{ display: 'flex', gap: '3rem', alignItems: 'center', justifyContent: 'center', width: '100%', flexWrap: 'wrap' }}>
            {num !== null && (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--muted)', fontWeight: 600 }}>Incoming element:</span>
                <div className="array-box" style={{ borderColor: 'var(--primary-light)' }}>{num}</div>
              </div>
            )}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--muted)', marginBottom: '0.5rem', fontWeight: 600 }}>Priority Queue (Heap of size {k}):</span>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                {heap.length === 0 ? (
                  <span className="text-muted" style={{ fontSize: '0.85rem' }}>Empty []</span>
                ) : (
                  heap.map((item, idx) => (
                    <div key={idx} className="array-box" style={{ 
                      borderRadius: '50%', 
                      borderColor: idx === 0 ? 'var(--primary-light)' : 'var(--border)',
                      backgroundColor: idx === 0 ? 'var(--primary-glow)' : 'transparent'
                    }}>
                      {item}
                      {idx === 0 && <span style={{ position: 'absolute', bottom: '-20px', fontSize: '0.65rem', color: 'var(--primary-light)', fontWeight: 700 }}>MIN</span>}
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        );
      }

      case 'recursion-fib': {
        const { a = 0, b = 0, temp = 0, i, n } = vars;
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'center' }}>
            <div style={{ display: 'flex', gap: '1.5rem' }}>
              <div className="watch-card" style={{ alignItems: 'center', minWidth: '80px' }}>
                <span className="watch-name">prev2 (a)</span>
                <span className="watch-val">{a}</span>
              </div>
              <div style={{ fontSize: '1.5rem', display: 'flex', alignItems: 'center' }}>+</div>
              <div className="watch-card" style={{ alignItems: 'center', minWidth: '80px' }}>
                <span className="watch-name">prev1 (b)</span>
                <span className="watch-val">{b}</span>
              </div>
              <div style={{ fontSize: '1.5rem', display: 'flex', alignItems: 'center' }}>=</div>
              <div className="watch-card" style={{ alignItems: 'center', minWidth: '80px', borderColor: 'var(--primary-light)' }}>
                <span className="watch-name" style={{ color: 'var(--primary-light)' }}>curr (temp)</span>
                <span className="watch-val" style={{ color: 'var(--primary-light)' }}>{temp}</span>
              </div>
            </div>
            <div style={{ fontSize: '0.85rem', color: 'var(--muted)' }}>
              Step index: <b>{i || 2}</b> of target step: <b>{n}</b>
            </div>
          </div>
        );
      }

      case 'tree-traversal': {
        const { root, result = [], call = "" } = vars;
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'center', width: '100%' }}>
            {/* Simple static SVG representing a binary tree */}
            <svg width="240" height="120" style={{ overflow: 'visible' }}>
              {/* Lines */}
              <line x1="120" y1="20" x2="60" y2="70" stroke="var(--border)" strokeWidth="2" />
              <line x1="120" y1="20" x2="180" y2="70" stroke="var(--border)" strokeWidth="2" />
              <line x1="180" y1="70" x2="150" y2="120" stroke="var(--border)" strokeWidth="2" />
              
              {/* Node 1 */}
              <circle cx="120" cy="20" r="16" fill={root === 1 ? 'var(--primary-glow)' : 'var(--bg-card)'} stroke={root === 1 ? 'var(--primary-light)' : 'var(--border)'} strokeWidth="2" />
              <text x="120" y="24" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="bold">1</text>
              
              {/* Node Left - Null */}
              <circle cx="60" cy="70" r="12" fill="none" stroke="var(--border)" strokeDasharray="3" />
              <text x="60" y="73" textAnchor="middle" fill="var(--muted-dark)" fontSize="8">X</text>

              {/* Node 2 */}
              <circle cx="180" cy="70" r="16" fill={root === 2 ? 'var(--primary-glow)' : 'var(--bg-card)'} stroke={root === 2 ? 'var(--primary-light)' : 'var(--border)'} strokeWidth="2" />
              <text x="180" y="74" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="bold">2</text>

              {/* Node 3 */}
              <circle cx="150" cy="120" r="16" fill={root === 3 ? 'var(--primary-glow)' : 'var(--bg-card)'} stroke={root === 3 ? 'var(--primary-light)' : 'var(--border)'} strokeWidth="2" />
              <text x="150" y="124" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="bold">3</text>
              
              {/* Node 3-Right - Null */}
              <line x1="180" y1="70" x2="210" y2="120" stroke="var(--border)" strokeWidth="2" />
              <circle cx="210" cy="120" r="12" fill="none" stroke="var(--border)" strokeDasharray="3" />
              <text x="210" y="123" textAnchor="middle" fill="var(--muted-dark)" fontSize="8">X</text>
            </svg>
            <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', justifyContent: 'center' }}>
              <div style={{ fontSize: '0.85rem' }}>
                <span style={{ color: 'var(--muted)', fontWeight: 600 }}>Active Function Call:</span>
                <code style={{ marginLeft: '0.5rem', color: 'var(--primary-light)', padding: '0.2rem 0.5rem', backgroundColor: 'var(--primary-glow)', borderRadius: '4px', fontFamily: 'var(--font-mono)' }}>
                  {call || 'None'}
                </code>
              </div>
              <div style={{ fontSize: '0.85rem' }}>
                <span style={{ color: 'var(--muted)', fontWeight: 600 }}>Inorder Output Result:</span>
                <span style={{ marginLeft: '0.5rem', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
                  [{result.join(', ')}]
                </span>
              </div>
            </div>
          </div>
        );
      }

      case 'graph': {
        const { node, visited = {}, ans = [] } = vars;
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'center', width: '100%' }}>
            {/* Simple static SVG representing a graph of 5 nodes */}
            <svg width="280" height="130" style={{ overflow: 'visible' }}>
              {/* Edges */}
              <line x1="40" y1="65" x2="110" y2="25" stroke="var(--border)" strokeWidth="2" />
              <line x1="40" y1="65" x2="110" y2="105" stroke="var(--border)" strokeWidth="2" />
              <line x1="110" y1="25" x2="180" y2="25" stroke="var(--border)" strokeWidth="2" />
              <line x1="110" y1="25" x2="180" y2="65" stroke="var(--border)" strokeWidth="2" />
              <line x1="180" y1="65" x2="250" y2="65" stroke="var(--border)" strokeWidth="2" />

              {/* Node 0 */}
              <circle cx="110" cy="25" r="16" fill={node === 0 ? 'var(--primary-glow)' : (visited[0] ? 'rgba(59,130,246,0.1)' : 'var(--bg-card)')} stroke={node === 0 ? 'var(--primary-light)' : (visited[0] ? '#3b82f6' : 'var(--border)')} strokeWidth="2" />
              <text x="110" y="29" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="bold">0</text>

              {/* Node 1 */}
              <circle cx="40" cy="65" r="16" fill={node === 1 ? 'var(--primary-glow)' : (visited[1] ? 'rgba(59,130,246,0.1)' : 'var(--bg-card)')} stroke={node === 1 ? 'var(--primary-light)' : (visited[1] ? '#3b82f6' : 'var(--border)')} strokeWidth="2" />
              <text x="40" y="69" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="bold">1</text>

              {/* Node 2 */}
              <circle cx="180" cy="65" r="16" fill={node === 2 ? 'var(--primary-glow)' : (visited[2] ? 'rgba(59,130,246,0.1)' : 'var(--bg-card)')} stroke={node === 2 ? 'var(--primary-light)' : (visited[2] ? '#3b82f6' : 'var(--border)')} strokeWidth="2" />
              <text x="180" y="69" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="bold">2</text>

              {/* Node 3 */}
              <circle cx="110" cy="105" r="16" fill={node === 3 ? 'var(--primary-glow)' : (visited[3] ? 'rgba(59,130,246,0.1)' : 'var(--bg-card)')} stroke={node === 3 ? 'var(--primary-light)' : (visited[3] ? '#3b82f6' : 'var(--border)')} strokeWidth="2" />
              <text x="110" y="109" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="bold">3</text>

              {/* Node 4 */}
              <circle cx="250" cy="65" r="16" fill={node === 4 ? 'var(--primary-glow)' : (visited[4] ? 'rgba(59,130,246,0.1)' : 'var(--bg-card)')} stroke={node === 4 ? 'var(--primary-light)' : (visited[4] ? '#3b82f6' : 'var(--border)')} strokeWidth="2" />
              <text x="250" y="69" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="bold">4</text>
            </svg>
            <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', justifyContent: 'center' }}>
              <div style={{ fontSize: '0.85rem' }}>
                <span style={{ color: 'var(--muted)', fontWeight: 600 }}>Active Node DFS:</span>
                <code style={{ marginLeft: '0.5rem', color: 'var(--primary-light)', padding: '0.2rem 0.5rem', backgroundColor: 'var(--primary-glow)', borderRadius: '4px', fontFamily: 'var(--font-mono)' }}>
                  Node {node}
                </code>
              </div>
              <div style={{ fontSize: '0.85rem' }}>
                <span style={{ color: 'var(--muted)', fontWeight: 600 }}>Visited Order Output:</span>
                <span style={{ marginLeft: '0.5rem', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
                  [{ans.join(', ')}]
                </span>
              </div>
            </div>
          </div>
        );
      }

      case 'climb-stairs': {
        const { prev2 = 1, prev1 = 1, curr, i, n } = vars;
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '100%', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'flex-end', height: '110px', gap: '4px', position: 'relative' }}>
              {/* Render stairs */}
              {[0, 1, 2, 3, 4].map((stepIdx) => {
                const height = (stepIdx + 1) * 20;
                const isCurrentPosition = i === stepIdx;
                return (
                  <div key={stepIdx} style={{ 
                    width: '40px', 
                    height: `${height}px`, 
                    backgroundColor: isCurrentPosition ? 'var(--primary-glow)' : 'var(--bg-card)', 
                    border: isCurrentPosition ? '2px solid var(--primary-light)' : '1px solid var(--border)',
                    borderRadius: '4px 4px 0 0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative'
                  }}>
                    <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>{stepIdx}</span>
                    {isCurrentPosition && (
                      <span style={{ 
                        position: 'absolute', 
                        top: '-25px', 
                        fontSize: '1.25rem',
                        animation: 'bounce 0.6s infinite alternate'
                      }}>🏃</span>
                    )}
                  </div>
                );
              })}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', width: '100%' }}>
              <div className="watch-card" style={{ alignItems: 'center' }}>
                <span className="watch-name">prev2 (F[i-2])</span>
                <span className="watch-val">{prev2}</span>
              </div>
              <div className="watch-card" style={{ alignItems: 'center' }}>
                <span className="watch-name">prev1 (F[i-1])</span>
                <span className="watch-val">{prev1}</span>
              </div>
              <div className="watch-card" style={{ alignItems: 'center', borderColor: 'var(--primary-light)' }}>
                <span className="watch-name" style={{ color: 'var(--primary-light)' }}>curr (Ways)</span>
                <span className="watch-val" style={{ color: 'var(--primary-light)' }}>{curr !== undefined ? curr : prev1}</span>
              </div>
            </div>
          </div>
        );
      }

      default:
        return <p className="text-muted">Renderer not configured.</p>;
    }
  };

  // Extract variables list for the watcher panel
  const getWatchVars = () => {
    const skipKeys = ['arr', 'nodes', 'list', 'intervals', 'success', 'match'];
    return Object.entries(vars).filter(([key]) => !skipKeys.includes(key));
  };

  const watchVars = getWatchVars();

  return (
    <div className="simulator-container">
      {/* Top control bar */}
      <div className="simulator-controls">
        <div className="control-buttons">
          <button 
            className="control-btn" 
            onClick={onPrev} 
            disabled={currentStep === 0}
            title="Previous Step"
          >
            <SkipBack size={16} />
          </button>
          
          <button 
            className="control-btn play-btn" 
            onClick={onTogglePlay}
            title={isPlaying ? "Pause Simulation" : "Auto Play"}
          >
            {isPlaying ? <Pause size={16} /> : <Play size={16} />}
          </button>

          <button 
            className="control-btn" 
            onClick={onNext} 
            disabled={currentStep === steps.length - 1}
            title="Next Step"
          >
            <SkipForward size={16} />
          </button>

          <button 
            className="control-btn" 
            onClick={onReset}
            title="Reset Simulation"
          >
            <RotateCcw size={16} />
          </button>
        </div>

        <div className="step-counter">
          Step {currentStep + 1} of {steps.length}
        </div>
      </div>

      {/* Visual Canvas Board */}
      <div className="simulator-board">
        {renderVisuals()}
      </div>

      {/* Stepper details */}
      {explanation && (
        <div className="step-description-box">
          <b>💡 Step Logic:</b> {explanation}
        </div>
      )}

      {/* Variable Watcher panel */}
      {watchVars.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--muted)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Variable Watch Window
          </span>
          <div className="watch-panel">
            {watchVars.map(([key, val]) => (
              <div className="watch-card" key={key}>
                <span className="watch-name">{key}</span>
                <span className="watch-val">
                  {val === null || val === undefined ? 'null' : (typeof val === 'object' ? JSON.stringify(val) : String(val))}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
