import { allSolutions } from './solutions';
import { generateLiveSteps } from './liveStepGenerator';

const TOPIC_SIMULATOR_DEFAULTS = {
  'two-pointers': {
    inputType: "two-pointers-sum",
    defaultInput: { arr: [2, 7, 11, 15], target: 9 }
  },
  'fast-slow-pointers': {
    inputType: "linkedlist-cycle",
    defaultInput: { arr: [3, 2, 0, -4], pos: 1 }
  },
  'sliding-window': {
    inputType: "sliding-window-max",
    defaultInput: { arr: [1, 3, -1, -3, 5, 3, 6, 7], k: 3 }
  },
  'kadane-pattern': {
    inputType: "kadane",
    defaultInput: { arr: [-2, 1, -3, 4, -1, 2, 1, -5, 4] }
  },
  'prefix-sum': {
    inputType: "prefix-sum-k",
    defaultInput: { arr: [1, 1, 1], target: 2 }
  },
  'merge-intervals': {
    inputType: "intervals",
    defaultInput: { intervals: [[1, 3], [2, 6], [8, 10], [15, 18]] }
  },
  'inplace-reversal-linkedlist': {
    inputType: "linked-list-reversal",
    defaultInput: { arr: [1, 2, 3, 4, 5] }
  },
  'stack-pattern': {
    inputType: "stack",
    defaultInput: { s: "{[()]}" }
  },
  'hash-maps': {
    inputType: "hash-map-uniq",
    defaultInput: { s: "leetcode" }
  },
  'binary-search': {
    inputType: "binary-search",
    defaultInput: { arr: [1, 3, 5, 7, 9, 11, 13, 15], target: 7 }
  },
  'heap-pattern': {
    inputType: "heap",
    defaultInput: { arr: [3, 2, 1, 5, 6, 4], k: 2 }
  },
  'recursion-backtracking': {
    inputType: "recursion-fib",
    defaultInput: { n: 5 }
  },
  'tree-pattern': {
    inputType: "tree-traversal",
    defaultInput: { tree: [1, "null", 2] }
  },
  'graphs': {
    inputType: "graph",
    defaultInput: { v: 4, edges: [[0, 1], [0, 2]] }
  },
  'dynamic-programming': {
    inputType: "climb-stairs",
    defaultInput: { n: 5 }
  }
};

/**
 * Dynamic content generator for DSA Buddy questions.
 * Programmatically generates C++ solutions, Hinglish explanations,
 * dynamic dry run simulation steps, and a structured Interview Prep guide
 * (with Clarification Questions, Interview Scripts, and What/Where/How/When matrices).
 */

export function enrichQuestion(q, topicId) {
  // Check if we have a custom solution in our database
  const customSol = allSolutions[q.id];
  const enriched = { ...q };

  if (customSol) {
    if (customSol.brute) enriched.brute = customSol.brute;
    if (customSol.better) enriched.better = customSol.better;
    if (customSol.optimal) enriched.optimal = customSol.optimal;
    if (customSol.hinglish) enriched.hinglish = customSol.hinglish;
  }

  // Define structured interview info templates depending on category
  let interviewGuide = null;

  switch (topicId) {
    case 'two-pointers':
      interviewGuide = {
        clarifications: [
          "Is the array guaranteed to be sorted? (If not, sorting takes O(N log N))",
          "Can there be duplicate elements? Do we need to return unique pairs?",
          "Are negative numbers possible, and can overflow occur with targets?"
        ],
        script: [
          "Propose Brute Force first: 'Sir, pehle main nesting loop lagakar saare check pairs generate karunga. Iski time complexity O(N^2) hogi.'",
          "Identify bottlenecks: 'Brute force me sorted property use nahi ho rahi hai aur unnecessary elements search ho rahe hain.'",
          "Propose Optimal: 'Kyuki data sorted hai, main do pointers use karunga (left=0 aur right=n-1). Sum chota hoga toh left pointer badhayenge, sum bada hoga toh right pointer ghataenge in O(N).'"
        ],
        wh_guide: {
          what: "Two pointers ko list ke opposing boundaries (start/end) par initialize karke centre ki taraf inward shift karna.",
          where: "Sorted arrays/strings me pairs find karne ke liye, or segments validation (e.g. palindrome).",
          how: "left = 0, right = n-1. Loop while(left < right). check sum = arr[left]+arr[right]. shift pointers inward.",
          when: "Condition check matching: targets sum > current -> left++; sum < current -> right--."
        }
      };
      break;

    case 'fast-slow-pointers':
      interviewGuide = {
        clarifications: [
          "Is list cycle guaranteed to fit in memory bounds?",
          "Should we return boolean cycle existence or the exact loop entry node?",
          "Can the list head pointer be null? (Handling corner cases)"
        ],
        script: [
          "Propose Brute: 'Pehle main visited nodes ko Set me track karunga. Agar repeat address dikhe toh cycle detect ho jayegi in O(N) space.'",
          "Optimize space: 'Set ka O(N) space memory block use karta hai. Isko O(1) space me solve karne ke liye hum Fast & Slow pointers model run karenge.'",
          "Optimal: 'Slow pointer 1-step move karega aur Fast 2-steps. Cycle boundary limits me fast pointer slow pointer ko circular catch kar lega.'"
        ],
        wh_guide: {
          what: "Do pointers run karna different relative speed rates (1x vs 2x) pe cycle boundaries validate karne ke liye.",
          where: "Linked List systems circular validations, arrays cyclic coordinates, midpoints identification.",
          how: "slow = head, fast = head. Loop while(fast && fast->next): slow=slow.next, fast=fast.next.next.",
          when: "Pointers match slow == fast -> cycle found. fast == null -> no cycle."
        }
      };
      break;

    case 'sliding-window':
      interviewGuide = {
        clarifications: [
          "Is window size fixed (K) or dynamically resizing based on criteria?",
          "Do elements contain negative integers? (Prefix Sum might be better than sliding window if negatives exist)",
          "What is the character set constraint (ASCII/lowercase alphabets)?"
        ],
        script: [
          "Propose Brute: 'Sir, main har starting index ke liye window size K ya matching constraint ki subarrays process karunga in O(N*K).'",
          "Identify overlaps: 'Consecutive windows common indices share karti hain, isliye recalculations avoid karne ke liye Sliding Window apply karenge.'",
          "Propose Optimal: 'Main pointers start/end expand karunga. Har step par next elements add, and trailing elements remove. Runtime drops to O(N).'"
        ],
        wh_guide: {
          what: "Dynamic ya fixed length window boundary maintaining ranges index values to solve subset contiguous constraints.",
          where: "Contiguous sub-segments parameters validation (longest, shortest matching strings or sub-arrays).",
          how: "left = 0, right = 0. Iterate right index values to add elements, shrink left pointer if constraints breached.",
          when: "Shrink when window condition violates constraints. Record maximum/minimum optimal index value ranges."
        }
      };
      break;

    case 'kadane-pattern':
      interviewGuide = {
        clarifications: [
          "What if all numbers in the array are negative? (Should we return maximum single element or 0?)",
          "Are empty subarrays allowed, or must we select at least one element?"
        ],
        script: [
          "Propose Brute: 'Pehele loops nested sequence lagakar all possible contiguous segments check validation karenge in O(N^2).'",
          "Optimal DP transition: 'Sir, har position par maximum ending sum check logic apply karke linear compute execute ho sakta hai.'",
          "Optimal: 'Agar dynamic sum (< 0) ho jaye toh use aage continue karne ka use nahi. Sum ko 0 reset kar denge to O(N) time and O(1) space.'"
        ],
        wh_guide: {
          what: "Running element sequence sum local updates track validation index to filter global optimal sum segments.",
          where: "Sub-array sum ranges, contiguous optimization patterns (e.g. maximum, minimum contiguous products).",
          how: "curr_sum = 0, max_sum = nums[0]. Loop num: curr_sum += num, max_sum = max(max_sum, curr), if curr < 0: curr = 0.",
          when: "Reset running sum to 0 when current sum drops below zero."
        }
      };
      break;

    case 'prefix-sum':
      interviewGuide = {
        clarifications: [
          "Are there multiple queries to run on the array? (If yes, precomputation pays off)",
          "Do array updates happen between query lookups? (If updates exist, Segment Trees / Fenwick Trees are better)"
        ],
        script: [
          "Propose Brute: 'For every query left-to-right, scan range elements iteratively in O(N) per query.'",
          "Optimal Precomputation: 'If queries are multiple, we precompute cumulative sums in O(N) time.'",
          "Formula query: 'Range query sum L to R is Prefix[R] - Prefix[L-1], returning results instantly in O(1) time complexity.'"
        ],
        wh_guide: {
          what: "Pre-calculating cumulative running index values array sum to resolve range index checks in O(1) complexity.",
          where: "Multiple range queries systems, matching subarrays target count checks (Prefix Sum + HashMap).",
          how: "prefix[i] = prefix[i-1] + arr[i]. queryRange(L, R) -> prefix[R] - prefix[L-1].",
          when: "Whenever frequent static subsegment ranges query checks are executed."
        }
      };
      break;

    case 'merge-intervals':
      interviewGuide = {
        clarifications: [
          "Are intervals pre-sorted? (Sorting is mandatory for linear checking)",
          "Does [1, 2] and [2, 3] overlap? (Is boundary matching overlap? Yes, usually)"
        ],
        script: [
          "Propose sorting first: 'Sir, pehle intervals ko start coordinates par sort karenge in O(N log N) time.'",
          "Optimal check: 'Sorted array list me contiguous intervals overlap conditions validate karenge.'",
          "Update merge bounds: 'Agar overlap targets overlap matching (curr.start <= last.end), merge index limits by stretching last.end = max(last.end, curr.end).'"
        ],
        wh_guide: {
          what: "Range boundaries sort sequence analysis to merge or align overlaps configurations.",
          where: "Meeting scheduling, resource allocations, overlapping intervals range validations.",
          how: "sort(intervals). merged = [intervals[0]]. Loop i=1: if curr.start <= last.end: merge; else: push.",
          when: "Coordinate points validations over coordinate values."
        }
      };
      break;

    case 'inplace-reversal-linkedlist':
      interviewGuide = {
        clarifications: [
          "Is the list singly linked or doubly linked? (Singly needs 3 pointers, doubly is simpler)",
          "Must reversal happen in-place without extra list memory?"
        ],
        script: [
          "Propose Brute: 'Stack use karke addresses store karenge, and data values pop karke modify karenge.'",
          "Pivot to O(1) space: 'Sir, isme data modifications copy elements consume memory values. in-place link flip karenge.'",
          "Optimal: '3 pointers (prev, curr, nextNode) maintain karke loop run links reverse loop transitions karenge.'"
        ],
        wh_guide: {
          what: "Adjust pointer reference memory address variables to invert linear nodes order directly.",
          where: "Linked list reversal, subsegment flip checks, linear list manipulation controls.",
          how: "nextNode = curr.next; curr.next = prev; prev = curr; curr = nextNode.",
          when: "Iterate until curr reaches null reference boundary."
        }
      };
      break;

    case 'stack-pattern':
      interviewGuide = {
        clarifications: [
          "Can elements in matching parentheses contain other string characters? (Ignore them or throw error?)",
          "Are custom operations like undo/redo stacked sequentially?"
        ],
        script: [
          "Propose LIFO: 'Sir, matching operations and bracket syntax LIFO (Last In First Out) pattern represent karte hain.'",
          "Push condition: 'Opening brackets stack me push karenge, closing character check validation pop match check targets logic.'"
        ],
        wh_guide: {
          what: "Using Last-in-First-out memory stack configurations to track active nested structures.",
          where: "Parentheses validation, undo/redo states, expression evaluations, monotonic structures.",
          how: "stack<char> st. Loop char: if open push, else pop and compare.",
          when: "Whenever active values processing sequence reverses ordering on matches."
        }
      };
      break;

    case 'hash-maps':
      enriched.optimal = enriched.optimal || {
        code: `// C++ Optimal Hash Map logic
#include <unordered_map>
using namespace std;

// Example function skeleton
int solveHashMap() {
    unordered_map<int, int> mp;
    // O(1) lookup map setup
    return 0;
}`,
        complexity: "Time: O(N), Space: O(N)"
      };
      interviewGuide = {
        clarifications: [
          "What is the character set constraint (ASCII vs UTF-8)?",
          "Can we use a simple fixed-size array instead of a heavy Hash Map if keys are small?"
        ],
        script: [
          "Propose Brute: 'Nested sequence loops traverse logic O(N^2) time.'",
          "Optimal Map transition: 'Sir, hum frequency or occurrence array values lookups optimize map structure use karenge.'"
        ],
        wh_guide: {
          what: "Store elements mapped keys references in custom hash slots for O(1) average retrieval checks.",
          where: "Frequency counting, distinct occurrences checks, fast lookups targets matching.",
          how: "unordered_map<key, val> mp. mp[key]++. check count logic.",
          when: "Frequency checks or lookups must execute in constant time."
        }
      };
      break;

    case 'binary-search':
      interviewGuide = {
        clarifications: [
          "Is the search space sorted? (Crucial precondition for binary search)",
          "Does array contain duplicate values? (Affects bounds mid selections)"
        ],
        script: [
          "Propose Brute: 'Iterative scan target checking in linear search O(N) runtime.'",
          "Pivot to logarithmic: 'Array sorted search scope partition properties satisfy karta hai, low/high binary search range split parameters resolve karenge in O(log N).'"
        ],
        wh_guide: {
          what: "Divide-and-conquer strategy splitting search spaces half levels iteratively on mid point checks.",
          where: "Sorted values collections, binary answers estimation search scopes.",
          how: "low = 0, high = n-1. mid = low + (high-low)/2. adjust low/high bounds based on target comparison.",
          when: "Search space values display monotonic properties (e.g. increase or decrease continuously)."
        }
      };
      break;

    case 'heap-pattern':
      interviewGuide = {
        clarifications: [
          "Do values stream dynamically in real-time, or is it a static array? (Heaps are best for streaming)",
          "What is K parameter size bounds?"
        ],
        script: [
          "Propose Sorting Brute: 'Sir, static sorting logic checks run O(N log N) time.'",
          "Optimal Heap: 'Main min-heap of size K maintain karunga, extra elements pop. K elements top values remain optimal in O(N log K) time.'"
        ],
        wh_guide: {
          what: "Binary tree structures min/max heap configurations to trace maximum/minimum elements instantly.",
          where: "Kth largest/smallest elements, merging K lists, real-time priority queues.",
          how: "priority_queue<int> pq. Push items. maintain max size limit by popping top extrema.",
          when: "Extrema parameters trace queries occur frequently on dynamic sets."
        }
      };
      break;

    case 'recursion-backtracking':
      interviewGuide = {
        clarifications: [
          "What are recursion stack depth constraints? (Avoid stack overflow)",
          "Do we need to return all possible combinations or just the count?"
        ],
        script: [
          "Propose DFS Choices: 'Sir, combinations check elements traverse branches explore recursively option selection path trace karenge.'",
          "Explain Backtrack state reversion: 'Branch search over hone par recursion values status variables restore (backtrack) key steps resolve karenge.'"
        ],
        wh_guide: {
          what: "Recursion decision trees choice path search sequences with state reversion checks.",
          where: "Subsets generation, permutations list, grid path tracking validations.",
          how: "recursiveSolve(state). loop choices: applyChoice(), recursiveSolve(newState), revertChoice().",
          when: "State combinations parameters need all possible paths analysis."
        }
      };
      break;

    case 'tree-pattern':
      interviewGuide = {
        clarifications: [
          "Is the binary tree height-balanced? (Ensures O(log N) recursive depth)",
          "Can tree nodes contain cycle references? (If yes, it's a graph DFS, not tree traversal)"
        ],
        script: [
          "Propose Recursion: 'Tree nodes left/right child sequences recursion stack trace in O(N).'",
          "Iterative Stack backup: 'Recursion limits avoid stack frame, manual stack variables run structure.'"
        ],
        wh_guide: {
          what: "Tree root nodes child traversals validations (DFS/BFS depth breadth checks).",
          where: "Hierarchical datasets, parsing trees validation logic.",
          how: "traversal(root): if(!root) return; traversal(root->left); visit(root); traversal(root->right);",
          when: "Operations require evaluating parent node values relative to children nodes."
        }
      };
      break;

    case 'graphs':
      interviewGuide = {
        clarifications: [
          "Is graph directed or undirected? Weighted or unweighted?",
          "Are cycle nodes present? (Visited arrays are mandatory if cycles exist)"
        ],
        script: [
          "Propose Visited trackers: 'Graph cycle conditions loops avoid index visited tracking array setup.'",
          "DFS vs BFS proposal: 'Sir, paths sequence deep levels validation DFS recursion, or layer node layers BFS queue run execute target validation.'"
        ],
        wh_guide: {
          what: "Graph nodes traversal arrays validations mapping edges connections networks.",
          where: "Cycle detection, topological sort order, short paths Dijkstra network delays.",
          how: "queue/stack structures. visited boolean array. adjacent list references iteration check.",
          when: "Vertices maps and nodes path search evaluations are requested."
        }
      };
      break;

    case 'dynamic-programming':
      interviewGuide = {
        clarifications: [
          "Do subproblems overlap? (Precondition for DP caching)",
          "Can we optimize O(N) space tabulation array to O(1) variables space?"
        ],
        script: [
          "Propose Brute Recursion first: 'Sir, simple recursion stack trees O(2^N) exponential time.'",
          "Propose Memoization (Top-down): 'Subproblem results array vector DP storage store. complexity drops to O(N).'",
          "Space Optimization: 'Tabulation bottom-up index checks values update only. variables values space optimized to O(1).'"
        ],
        wh_guide: {
          what: "Storing calculated overlapping subproblem values in memo arrays to optimize recursion runtimes.",
          where: "Optimization queries over nested choices, path combinations, knapsack matrix problems.",
          how: "dp[i] = dp[i-1] + dp[i-2]. Bottom-up loop to build optimal states.",
          when: "Recursive decisions show repeating overlapping tree segments."
        }
      };
      break;

    default:
      break;
  }

  // Fallback structures if question doesn't have customized code
  if (!enriched.optimal) {
    enriched.optimal = {
      code: `// C++ Optimal Solution for: ${q.title}
#include <iostream>
using namespace std;

void solve() {
    // Problem specific C++ optimal implementation
    cout << "Optimal logic executed" << endl;
}
`,
      complexity: "Time: O(N), Space: O(1)"
    };
  }

  if (!enriched.brute) {
    enriched.brute = {
      code: `// C++ Brute Force Solution for: ${q.title}
#include <iostream>
using namespace std;

void solveBrute() {
    // Basic search/checks
}
`,
      complexity: "Time: O(N^2), Space: O(1)"
    };
  }

  if (!enriched.hinglish) {
    enriched.hinglish = {
      explanation: `### Intuition (Pehle Soch) - ${q.title}
Is problem ko solve karne ke liye:
- **Brute Force**: Base loops combinations scan. Time: O(N^2) or exponential.
- **Optimal**: Specific pattern properties leverage karke linear checks apply targets.`,
      pseudocode: `function solve(arr):
    // step by step actions
    return result`
    };
  }

  // Inject the structured interview guide into the question
  enriched.interviewGuide = interviewGuide || {
    clarifications: [
      "What are the data input bounds? (Constraints size helps picking time complexity limits)",
      "Can we modify the input array in-place or should we keep it read-only?",
      "Are duplicate values possible, and how should we handle them?"
    ],
    script: [
      `Propose Brute: 'Sir, pehle main basic checking looping structure code run karunga.'`,
      `Optimal pivot: 'Sir, redundant check calculations remove memory targets check logic use.'`,
      `Code Optimal: 'Sir, optimal complexity O(N) or O(log N) constraints bounds limit execution code write.'`
    ],
    wh_guide: {
      what: "Core algorithmic strategy step to solve problem logic checks.",
      where: "Data sequence specifications matching pattern constraints.",
      how: "Code step blocks initialization, condition check loop, values increment update, output return.",
      when: "Algorithm termination criteria loop boundary limits satisfied."
    }
  };

  // Ensure default simulation steps are present for visualizer
  if (!enriched.simulator) {
    const defaults = TOPIC_SIMULATOR_DEFAULTS[topicId] || {
      inputType: "two-pointers-sum",
      defaultInput: { arr: [1, 2, 3, 4], target: 5 }
    };
    enriched.simulator = { ...defaults };
  }

  if (enriched.simulator && !enriched.simulator.steps) {
    try {
      enriched.simulator.steps = generateLiveSteps(enriched.simulator.inputType, enriched.simulator.defaultInput);
    } catch (e) {
      enriched.simulator.steps = [
        { line: 1, vars: { msg: "Visual trace setup" }, explanation: "Simulation setup initial states." }
      ];
    }
  }

  // Inject Step-by-Step Playbook and Complete Code
  enriched.interviewPlaybook = generateInterviewPlaybook(enriched, topicId);
  enriched.vscodeCompleteCode = generateCompleteVSCodeCode(enriched, topicId);

  return enriched;
}

function cleanScriptText(text) {
  if (!text) return "";
  const parts = text.split(':');
  if (parts.length > 1 && (
    parts[0].toLowerCase().includes("propose") || 
    parts[0].toLowerCase().includes("identify") || 
    parts[0].toLowerCase().includes("optimize") || 
    parts[0].toLowerCase().includes("pivot") || 
    parts[0].toLowerCase().includes("formula") || 
    parts[0].toLowerCase().includes("update") || 
    parts[0].toLowerCase().includes("code")
  )) {
    return parts.slice(1).join(':').trim().replace(/^['"]|['"]$/g, '');
  }
  return text.trim().replace(/^['"]|['"]$/g, '');
}

function generateInterviewPlaybook(q, topicId) {
  const steps = [];
  const script = q.interviewGuide?.script || [];

  // Step 1: Clarification & Bounds
  let clarifications = q.interviewGuide?.clarifications || [
    "What are the data input bounds?",
    "Can we modify the input array in-place or should we keep it read-only?",
    "Are duplicate values possible, and how should we handle them?"
  ];
  steps.push({
    title: "Step 1: Clarifications & Bounds",
    dialogue: "Sir, starting me main problem constraints aur requirements clarify karna chahunga: input values bounds kya hain, kya array blank/null ho sakta hai, aur positive/negative values ka handling constraints. Isse solution space clear hoga.",
    wh_matrix: {
      what: "Clarify inputs scope, constraints, and edge boundary situations.",
      where: "Input parameters types, value boundaries limits.",
      how: "Proactively propose clarification questions before describing solutions.",
      when: "Immediately after reading the question, before proposing any approach."
    },
    technicalDetails: {
      type: "clarifications",
      items: clarifications
    }
  });

  // Step 2: Propose Brute Force
  const bruteComplexity = q.brute?.complexity || "Time: O(N^2), Space: O(1)";
  const bruteCode = q.brute?.code || "// Basic Brute Force solution";
  const bruteDialogue = cleanScriptText(script[0]) || "Sir, brute force approach me main nesting loop lagakar check parameters validate karunga. Har candidate value configuration check runtime limits verify sequence complete karenge.";
  steps.push({
    title: "Step 2: Propose Brute Force",
    dialogue: bruteDialogue,
    wh_matrix: {
      what: "Produce a basic, simple, correct solution to guarantee accuracy first.",
      where: "Checking all combinations / possibilities iteratively.",
      how: "Write nesting elements check or simple recursive traversals.",
      when: "Immediately after clarifications to establish a baseline performance level."
    },
    technicalDetails: {
      type: "approach",
      name: "Brute Force",
      complexity: bruteComplexity,
      code: bruteCode,
      dryRun: `Input combinations traverse check sequentially.\nComplexity: ${bruteComplexity}`
    }
  });

  // Step 3: Propose Better Approach (Only if q.better exists)
  if (q.better) {
    const betterComplexity = q.better.complexity || "Time: O(N), Space: O(N)";
    const betterCode = q.better.code || "// Better solution";
    const betterDialogue = cleanScriptText(script[1]) || "Sir, runtime nested loop checks optimize karne ke liye hum pre-sorting or dynamic hash map frequencies checks register kar sakte hain. Isse searches constants constraints limits check standard values range compute ho jayegi.";
    steps.push({
      title: "Step 3: Propose Better Approach",
      dialogue: betterDialogue,
      wh_matrix: {
        what: "Reduce search time by trading off memory space or preprocessing.",
        where: "Bottleneck search points, frequency counting arrays.",
        how: "Sort inputs (O(N log N)) or feed visited elements into a Hash Map (O(N) space).",
        when: "When brute force is O(N^2) and intermediate optimization speeds it up."
      },
      technicalDetails: {
        type: "approach",
        name: "Better Approach",
        complexity: betterComplexity,
        code: betterCode,
        dryRun: `Store already parsed items inside hash mapping or sort array to perform faster binary search lookup.\nComplexity: ${betterComplexity}`
      }
    });
  }

  // Step 4: Propose Optimal Approach
  const optimalComplexity = q.optimal?.complexity || "Time: O(N), Space: O(1)";
  const optimalCode = q.optimal?.code || "// Optimal solution";
  // If q.better exists, optimal dialogue is the 3rd script item, else 2nd
  const optimalDialogue = cleanScriptText(q.better ? script[2] : script[1]) || "Sir, absolute optimal performance ke liye hum index properties aur boundary pointer limits check sliding actions apply karenge, jisse time and auxiliary space complete optimize scope me run ho sake.";
  const wh = q.interviewGuide?.wh_guide || {
    what: "Algorithmic logic optimized sequence checking.",
    where: "Main loops parameters adjustments variables.",
    how: "Adjust index boundaries or stack states directly.",
    when: "Pruning search space or updating state boundaries satisfies loop ending limits."
  };
  steps.push({
    title: `Step ${q.better ? '4' : '3'}: Propose Optimal Approach`,
    dialogue: optimalDialogue,
    wh_matrix: {
      what: wh.what,
      where: wh.where,
      how: wh.how,
      when: wh.when
    },
    technicalDetails: {
      type: "approach",
      name: "Optimal Approach",
      complexity: optimalComplexity,
      code: optimalCode,
      dryRun: q.hinglish?.explanation || "Leverage input sequences bounds properties to execute in minimal steps."
    }
  });

  // Step 5: Code & Validate Walkthrough (Dry Run)
  steps.push({
    title: `Step ${q.better ? '5' : '4'}: Validate & Dry Run Code`,
    dialogue: "Sir, ab code complete hone par main ek sample test input variables ke sath variable state table draw karke step-by-step trace dry run validation dikhaunga.",
    wh_matrix: {
      what: "Check variables states values trace output coordinates line by line.",
      where: "Loop pointers adjustments, index counters, final returns.",
      how: "Draw a trace table showing variables (left, right, stack, etc.) updates.",
      when: "Right after completing code lines writing, before presenting solution conclusion."
    },
    technicalDetails: {
      type: "dryrun",
      dryRunTable: q.simulator?.steps?.map((s, i) => ({
        step: i + 1,
        line: s.line,
        vars: JSON.stringify(s.vars).replace(/[{}]/g, '').replace(/"/g, '').replace(/:/g, '='),
        explanation: s.explanation
      })) || [
        { step: 1, line: 1, vars: "Initialize variables", explanation: "Set boundaries inputs tracker." }
      ]
    }
  });

  return steps;
}

function extractFunctionInfo(code) {
  if (!code) return null;
  const cleanCode = code.replace(/\/\/.*$/gm, '').replace(/\/\*[\s\S]*?\*\//g, '');
  // Match standard function declaration: returnType name(params) {
  const regex = /([\w<>\s:&]+)\s+(\w+)\s*\(([^)]*)\)\s*\{/g;
  let match;
  while ((match = regex.exec(cleanCode)) !== null) {
    const returnType = match[1].trim();
    const name = match[2].trim();
    const paramsStr = match[3].trim();
    if (['if', 'while', 'for', 'switch', 'catch'].includes(name)) continue;
    
    const params = paramsStr.split(',').map(p => {
      const trimmed = p.trim();
      if (!trimmed) return null;
      const parts = trimmed.split(/\s+/);
      if (parts.length < 2) return null;
      const type = parts.slice(0, -1).join(' ').trim();
      const paramName = parts[parts.length - 1].replace(/[&*]/g, '').trim();
      return { type, name: paramName };
    }).filter(Boolean);
    
    return { returnType, name, params };
  }
  return null;
}

function generateCompleteVSCodeCode(q, topicId) {
  const code = q.optimal?.code || "";
  const info = extractFunctionInfo(code);
  
  let includes = `// Complete compilable C++ code ready to run in VSCode\n#include <iostream>\n#include <vector>\n#include <string>\n#include <unordered_map>\n#include <unordered_set>\n#include <stack>\n#include <queue>\n#include <algorithm>\n\nusing namespace std;\n\n`;
  
  let structs = "";
  if (code.includes("ListNode") || code.includes("ListNode*")) {
    structs += `// Linked List node structure\nstruct ListNode {\n    int val;\n    ListNode* next;\n    ListNode(int x) : val(x), next(nullptr) {}\n};\n\n`;
  }
  if (code.includes("TreeNode") || code.includes("TreeNode*")) {
    structs += `// Binary Tree node structure\nstruct TreeNode {\n    int val;\n    TreeNode* left;\n    TreeNode* right;\n    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}\n};\n\n`;
  }
  
  let mainFunc = "";
  
  if (info) {
    const { returnType, name, params } = info;
    
    mainFunc += `int main() {\n`;
    mainFunc += `    cout << "--- DSA Buddy: VSCode Local Runner ---" << endl;\n`;
    mainFunc += `    cout << "Testing: ${q.title}\\n" << endl;\n\n`;
    
    const callArgs = [];
    const defaultInput = q.simulator?.defaultInput || {};
    
    params.forEach((param, idx) => {
      const pType = param.type.replace(/&/g, '').trim();
      const pName = param.name;
      
      mainFunc += `    // Parameter ${idx + 1}: ${pName}\n`;
      if (pType.includes("vector<vector<int>>")) {
        const val = defaultInput.intervals ? JSON.stringify(defaultInput.intervals).replace(/\[/g, '{').replace(/\]/g, '}') : `{{1, 3}, {2, 6}, {8, 10}}`;
        mainFunc += `    vector<vector<int>> ${pName} = ${val};\n`;
      } else if (pType.includes("vector<int>")) {
        const val = defaultInput.arr ? JSON.stringify(defaultInput.arr).replace(/\[/g, '{').replace(/\]/g, '}') : `{2, 7, 11, 15}`;
        mainFunc += `    vector<int> ${pName} = ${val};\n`;
      } else if (pType === "string") {
        const val = defaultInput.s ? `"${defaultInput.s}"` : `"()[]{}"`;
        mainFunc += `    string ${pName} = ${val};\n`;
      } else if (pType === "int") {
        let val = 5;
        if (defaultInput.target !== undefined) val = defaultInput.target;
        else if (defaultInput.k !== undefined) val = defaultInput.k;
        mainFunc += `    int ${pName} = ${val};\n`;
      } else if (pType === "ListNode*" || pType === "ListNode") {
        mainFunc += `    ListNode* ${pName} = new ListNode(1);\n`;
        mainFunc += `    ${pName}->next = new ListNode(2);\n`;
        mainFunc += `    ${pName}->next->next = new ListNode(3);\n`;
        mainFunc += `    ${pName}->next->next->next = new ListNode(4);\n`;
      } else if (pType === "TreeNode*" || pType === "TreeNode") {
        mainFunc += `    TreeNode* ${pName} = new TreeNode(1);\n`;
        mainFunc += `    ${pName}->left = new TreeNode(2);\n`;
        mainFunc += `    ${pName}->right = new TreeNode(3);\n`;
      } else {
        mainFunc += `    ${pType} ${pName};\n`;
      }
      callArgs.push(pName);
    });
    
    mainFunc += `\n    cout << "Calling solution function..." << endl;\n`;
    
    if (returnType === "void") {
      mainFunc += `    ${name}(${callArgs.join(", ")});\n`;
      mainFunc += `    cout << "Execution completed (void return)." << endl;\n`;
      params.forEach(p => {
        if (p.type.includes("vector")) {
          mainFunc += `    cout << "Mutated ${p.name}: ";\n`;
          mainFunc += `    for(int val : ${p.name}) cout << val << " ";\n`;
          mainFunc += `    cout << endl;\n`;
        }
      });
    } else {
      mainFunc += `    auto result = ${name}(${callArgs.join(", ")});\n\n`;
      mainFunc += `    // Print results\n`;
      if (returnType.includes("vector<vector<int>>")) {
        mainFunc += `    cout << "Result: [" << endl;\n`;
        mainFunc += `    for(const auto& row : result) {\n`;
        mainFunc += `        cout << "  [";\n`;
        mainFunc += `        for(size_t i=0; i<row.size(); i++) cout << row[i] << (i==row.size()-1 ? "" : ", ");\n`;
        mainFunc += `        cout << "]" << endl;\n`;
        mainFunc += `    }\n`;
        mainFunc += `    cout << "]" << endl;\n`;
      } else if (returnType.includes("vector<int>")) {
        mainFunc += `    cout << "Result: [";\n`;
        mainFunc += `    for(size_t i=0; i<result.size(); i++) cout << result[i] << (i==result.size()-1 ? "" : ", ");\n`;
        mainFunc += `    cout << "]" << endl;\n`;
      } else if (returnType === "bool") {
        mainFunc += `    cout << "Result: " << (result ? "true" : "false") << endl;\n`;
      } else if (returnType === "ListNode*") {
        mainFunc += `    cout << "Result List: ";\n`;
        mainFunc += `    ListNode* temp = result;\n`;
        mainFunc += `    while(temp) {\n`;
        mainFunc += `        cout << temp->val << " -> ";\n`;
        mainFunc += `        temp = temp->next;\n`;
        mainFunc += `    }\n`;
        mainFunc += `    cout << "nullptr" << endl;\n`;
        // Clean memory
      } else {
        mainFunc += `    cout << "Result: " << result << endl;\n`;
      }
    }
    
    mainFunc += `    return 0;\n`;
    mainFunc += `}\n`;
  } else {
    // Fallback main
    mainFunc += `int main() {\n`;
    mainFunc += `    cout << "--- DSA Buddy: VSCode Local Runner ---" << endl;\n`;
    mainFunc += `    cout << "Sample compile check passed." << endl;\n`;
    mainFunc += `    return 0;\n`;
    mainFunc += `}\n`;
  }
  
  let cleanOptimal = code;
  if (code.includes("#include")) {
    cleanOptimal = code
      .replace(/#include\s*<[^>]+>/g, '')
      .replace(/using\s+namespace\s+std\s*;/g, '')
      .trim();
  }
  
  return includes + structs + cleanOptimal + "\n\n" + mainFunc;
}

