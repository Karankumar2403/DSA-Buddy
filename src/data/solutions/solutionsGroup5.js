// Group 5 Solutions: Fast & Slow, Binary Search, Heap, Recursion, DP

export const solutionsGroup5 = {
  // === FAST & SLOW ===
  "middle-of-linkedlist": {
    brute: {
      code: `#include <iostream>\nusing namespace std;\n\nstruct ListNode {\n    int val;\n    ListNode *next;\n    ListNode(int x) : val(x), next(NULL) {}\n};\n\nListNode* middleNodeBrute(ListNode* head) {\n    int count = 0;\n    ListNode* curr = head;\n    while(curr) { count++; curr = curr->next; }\n    curr = head;\n    for(int i = 0; i < count / 2; i++) curr = curr->next;\n    return curr;\n}`,
      complexity: "Time: O(N), Space: O(1) (2-pass)"
    },
    optimal: {
      code: `#include <iostream>\nusing namespace std;\n\nstruct ListNode {\n    int val;\n    ListNode *next;\n    ListNode(int x) : val(x), next(NULL) {}\n};\n\nListNode* middleNode(ListNode* head) {\n    ListNode *slow = head, *fast = head;\n    while (fast && fast->next) {\n        slow = slow->next;\n        fast = fast->next->next;\n    }\n    return slow;\n}`,
      complexity: "Time: O(N), Space: O(1) (1-pass)"
    },
    hinglish: {
      explanation: "### Intuition\nDo pointers slow aur fast head se start hote hain. Fast 2 steps chalta hai aur slow 1 step. Jab fast end tak pahunchega, slow exact middle node par hoga.",
      pseudocode: "slow = head, fast = head\n    while fast and fast.next:\n        slow = slow.next, fast = fast.next.next\n    return slow"
    }
  },

  // === BINARY SEARCH ===
  "h-index-2": {
    brute: {
      code: `#include <vector>\nusing namespace std;\n\nint hIndexBrute(vector<int>& citations) {\n    int n = citations.size();\n    for (int i = 0; i < n; i++) {\n        int h = n - i;\n        if (citations[i] >= h) return h;\n    }\n    return 0;\n}`,
      complexity: "Time: O(N), Space: O(1)"
    },
    optimal: {
      code: `#include <vector>\nusing namespace std;\n\nint hIndex(vector<int>& citations) {\n    int n = citations.size();\n    int low = 0, high = n - 1;\n    while (low <= high) {\n        int mid = low + (high - low) / 2;\n        if (citations[mid] == n - mid) return n - mid;\n        else if (citations[mid] < n - mid) low = mid + 1;\n        else high = mid - 1;\n    }\n    return n - low;\n}`,
      complexity: "Time: O(log N), Space: O(1)"
    },
    hinglish: {
      explanation: "### Intuition\nArray sorted hai. citations[mid] and remaining papers `n - mid` compare karein. Binary search se find target h-index bounds check.",
      pseudocode: "Binary search check citations[mid] vs (n - mid)."
    }
  },
  "max-candies-k-children": {
    brute: {
      code: `// Linear check count`,
      complexity: "Time: O(N * MaxCandy), Space: O(1)"
    },
    optimal: {
      code: `#include <vector>\n#include <numeric>\n#include <algorithm>\nusing namespace std;\n\nbool canDistribute(const vector<int>& candies, long long k, long long mid) {\n    long long count = 0;\n    for(int c : candies) {\n        count += c / mid;\n    }\n    return count >= k;\n}\nint maximumCandies(vector<int>& candies, long long k) {\n    long long sum = 0;\n    for(int c : candies) sum += c;\n    if(sum < k) return 0;\n    long long low = 1, high = *max_element(candies.begin(), candies.end()), ans = 0;\n    while(low <= high) {\n        long long mid = low + (high-low)/2;\n        if(canDistribute(candies, k, mid)) {\n            ans = mid;\n            low = mid + 1;\n        } else {\n            high = mid - 1;\n        }\n    }\n    return ans;\n}`,
      complexity: "Time: O(N log(MaxCandy)), Space: O(1)"
    },
    hinglish: {
      explanation: "### Intuition\nBinary search candy counts to maximize distribution. Range `[1, max(candies)]` greedily validated.",
      pseudocode: "low = 1, high = max(candies). Binary search to find max candies per child."
    }
  },

  // === HEAP PATTERN ===
  "find-k-closest-elements": {
    brute: {
      code: `#include <vector>\n#include <algorithm>\n#include <cmath>\nusing namespace std;\n\nvector<int> findClosestElementsBrute(vector<int>& arr, int k, int x) {\n    sort(arr.begin(), arr.end(), [x](int a, int b) {\n        if (abs(a - x) == abs(b - x)) return a < b;\n        return abs(a - x) < abs(b - x);\n    });\n    vector<int> res(arr.begin(), arr.begin() + k);\n    sort(res.begin(), res.end());\n    return res;\n}`,
      complexity: "Time: O(N log N), Space: O(K)"
    },
    optimal: {
      code: `#include <vector>\n#include <cmath>\nusing namespace std;\n\nvector<int> findClosestElements(vector<int>& arr, int k, int x) {\n    int low = 0, high = arr.size() - k;\n    while(low < high) {\n        int mid = low + (high-low)/2;\n        if(x - arr[mid] > arr[mid+k] - x) low = mid + 1;\n        else high = mid;\n    }\n    return vector<int>(arr.begin() + low, arr.begin() + low + k);\n}`,
      complexity: "Time: O(log(N-K) + K), Space: O(1)"
    },
    hinglish: {
      explanation: "### Intuition\nBinary search for range start point. If diff `x - arr[mid]` is larger than `arr[mid+k] - x`, shift range rightwards.",
      pseudocode: "Search start index using binary search range of size (N-K)."
    }
  },
  "kth-weakest-row-matrix": {
    brute: {
      code: `#include <vector>\n#include <algorithm>\nusing namespace std;\n\nvector<int> kWeakestRowsBrute(vector<vector<int>>& mat, int k) {\n    vector<pair<int, int>> rows;\n    for(int i=0; i<mat.size(); i++) {\n        int count = 0;\n        for(int x : mat[i]) if(x == 1) count++; else break;\n        rows.push_back({count, i});\n    }\n    sort(rows.begin(), rows.end());\n    vector<int> res;\n    for(int i=0; i<k; i++) res.push_back(rows[i].second);\n    return res;\n}`,
      complexity: "Time: O(R*C + R log R), Space: O(R)"
    },
    optimal: {
      code: `#include <vector>\n#include <queue>\n#include <algorithm>\nusing namespace std;\n\nvector<int> kWeakestRows(vector<vector<int>>& mat, int k) {\n    priority_queue<pair<int, int>> pq; // Max Heap\n    for(int i=0; i<mat.size(); i++) {\n        int count = 0;\n        for(int x : mat[i]) if(x == 1) count++; else break; // Binary search fits here too\n        pq.push({count, i});\n        if(pq.size() > k) pq.pop();\n    }\n    vector<int> res;\n    while(!pq.empty()) { res.push_back(pq.top().second); pq.pop(); }\n    reverse(res.begin(), res.end());\n    return res;\n}`,
      complexity: "Time: O(R * C + R log K), Space: O(K)"
    },
    hinglish: {
      explanation: "### Intuition\nCount soldiers (1s) in each row. Maintain Max Heap of size K containing `{soldier_count, row_index}`.",
      pseudocode: "Track weakest K elements in Max Heap."
    }
  },
  "kth-smallest-sorted-matrix-heap": {
    brute: {
      code: `// Flatten matrix, sort elements`,
      complexity: "Time: O(N^2 log(N^2)), Space: O(N^2)"
    },
    optimal: {
      code: `// Same as kth-smallest-sorted-matrix optimal or using Heap of size K`,
      complexity: "Time: O(K log N), Space: O(N)"
    },
    hinglish: {
      explanation: "### Intuition\nPush first column nodes into a Min Heap. Pop min and insert its next row neighbor, repeat K times.",
      pseudocode: "Min Heap of size rows. Push row neighbors after popping."
    }
  },
  "last-stone-weight": {
    brute: {
      code: `#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint lastStoneWeightBrute(vector<int>& stones) {\n    while(stones.size() > 1) {\n        sort(stones.begin(), stones.end());\n        int s1 = stones.back(); stones.pop_back();\n        int s2 = stones.back(); stones.pop_back();\n        if(s1 != s2) stones.push_back(s1 - s2);\n    }\n    return stones.empty() ? 0 : stones[0];\n}`,
      complexity: "Time: O(N^2 log N), Space: O(1)"
    },
    optimal: {
      code: `#include <vector>\n#include <queue>\nusing namespace std;\n\nint lastStoneWeight(vector<int>& stones) {\n    priority_queue<int> pq(stones.begin(), stones.end()); // Max Heap\n    while(pq.size() > 1) {\n        int s1 = pq.top(); pq.pop();\n        int s2 = pq.top(); pq.pop();\n        if(s1 != s2) pq.push(s1 - s2);\n    }\n    return pq.empty() ? 0 : pq.top();\n}`,
      complexity: "Time: O(N log N), Space: O(N)"
    },
    hinglish: {
      explanation: "### Intuition\nUse Max Heap. Continually pop the two largest stones. If they differ, push the difference back into heap.",
      pseudocode: "Build maxHeap. While size > 1: pop two, if unequal push difference."
    }
  },
  "cpu-task-scheduler": {
    brute: {
      code: `// Simulation tracking intervals`,
      complexity: "Time: O(TotalTime), Space: O(1)"
    },
    optimal: {
      code: `#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint leastInterval(vector<char>& tasks, int n) {\n    vector<int> count(26, 0);\n    for(char c : tasks) count[c - 'A']++;\n    sort(count.begin(), count.end());\n    int maxVal = count[25] - 1;\n    int idleSlots = maxVal * n;\n    for(int i = 24; i >= 0 && count[i] > 0; i--) {\n        idleSlots -= min(count[i], maxVal);\n    }\n    return idleSlots > 0 ? idleSlots + tasks.size() : tasks.size();\n}`,
      complexity: "Time: O(TasksSize), Space: O(1)"
    },
    hinglish: {
      explanation: "### Intuition\nFrequencies track max elements. Space idle slots around maximum occurrence elements, reducing idle spots with other frequencies.",
      pseudocode: "Calculate frequencies. Position max elements, decrease idle slots recursively."
    }
  },
  "reorganize-string": {
    brute: {
      code: `// Backtracking search permutations`,
      complexity: "Time: O(N!), Space: O(N)"
    },
    optimal: {
      code: `#include <string>\n#include <vector>\n#include <queue>\nusing namespace std;\n\nstring reorganizeString(string s) {\n    vector<int> count(26, 0);\n    for(char c : s) count[c - 'a']++;\n    priority_queue<pair<int, char>> pq; // Max Heap\n    for(int i=0; i<26; i++) {\n        if(count[i] > (s.length() + 1)/2) return \"\"; // Impossible\n        if(count[i] > 0) pq.push({count[i], i + 'a'});\n    }\n    string res = \"\";\n    pair<int, char> prev = {-1, '#'};\n    while(!pq.empty()) {\n        auto curr = pq.top(); pq.pop();\n        res += curr.second;\n        if(prev.first > 0) pq.push(prev);\n        curr.first--;\n        prev = curr;\n    }\n    return res;\n}`,
      complexity: "Time: O(N log A) where A is alphabet size, Space: O(A)"
    },
    hinglish: {
      explanation: "### Intuition\nReorganize character adjacents. Use Max Heap. Pop most frequent character, append it, and keep it on hold (prev) to avoid contiguous repeats.",
      pseudocode: "Build heap. Pop most frequent char, push previous on hold back into heap, hold current."
    }
  },
  "min-refueling-stops": {
    brute: {
      code: `// DP tracking stop options O(N^2)`,
      complexity: "Time: O(N^2), Space: O(N)"
    },
    optimal: {
      code: `#include <vector>\n#include <queue>\nusing namespace std;\n\nint minRefuelStops(int target, int startFuel, vector<vector<int>>& stations) {\n    priority_queue<int> pq; // Max Heap for fuel amounts\n    int curr = startFuel, stops = 0, i = 0, n = stations.size();\n    while(curr < target) {\n        while(i < n && stations[i][0] <= curr) {\n            pq.push(stations[i][1]);\n            i++;\n        }\n        if(pq.empty()) return -1; // Cannot reach next station\n        curr += pq.top();\n        pq.pop();\n        stops++;\n    }\n    return stops;\n}`,
      complexity: "Time: O(N log N), Space: O(N)"
    },
    hinglish: {
      explanation: "### Intuition\nGreedy fuel stops. Drive as far as fuel permits. Store reachable gas amounts in Max Heap. Refuel from highest gas station if tank goes empty.",
      pseudocode: "Heap tracks reachable fuel. Pop largest fuel if current distance < station.start or target."
    }
  },
  "ipo": {
    brute: {
      code: `// Linear scan projects matching capital`,
      complexity: "Time: O(K * N), Space: O(1)"
    },
    optimal: {
      code: `#include <vector>\n#include <queue>\n#include <algorithm>\nusing namespace std;\n\nint findMaximizedCapital(int k, int w, vector<int>& profits, vector<int>& capital) {\n    int n = profits.size();\n    vector<pair<int, int>> projects(n);\n    for(int i=0; i<n; i++) projects[i] = {capital[i], profits[i]};\n    sort(projects.begin(), projects.end());\n    priority_queue<int> maxProfitHeap;\n    int idx = 0;\n    for(int i=0; i<k; i++) {\n        while(idx < n && projects[idx].first <= w) {\n            maxProfitHeap.push(projects[idx].second);\n            idx++;\n        }\n        if(maxProfitHeap.empty()) break;\n        w += maxProfitHeap.top();\n        maxProfitHeap.pop();\n    }\n    return w;\n}`,
      complexity: "Time: O(N log N + K log N), Space: O(N)"
    },
    hinglish: {
      explanation: "### Intuition\nCapital sorting project lookup. Push all projects with `capital <= current_w` into Max Heap. Pop project with maximum profit and add to capital `w`.",
      pseudocode: "Sort projects by capital requirements.\n    Add all affordable projects profits to Max Heap.\n    Pop top profit and add to capital."
    }
  },
  "course-scheduler-3": {
    brute: {
      code: `// Backtracking search recursive options`,
      complexity: "Time: O(2^N), Space: O(N)"
    },
    optimal: {
      code: `#include <vector>\n#include <queue>\n#include <algorithm>\nusing namespace std;\n\nint scheduleCourse(vector<vector<int>>& courses) {\n    sort(courses.begin(), courses.end(), [](const vector<int>& a, const vector<int>& b) {\n        return a[1] < b[1]; // Sort by deadlines\n    });\n    priority_queue<int> pq; // Max Heap for durations\n    int time = 0;\n    for(const auto& c : courses) {\n        time += c[0];\n        pq.push(c[0]);\n        if(time > c[1]) {\n            time -= pq.top(); // Drop course with max duration\n            pq.pop();\n        }\n    }\n    return pq.size();\n}`,
      complexity: "Time: O(N log N), Space: O(N)"
    },
    hinglish: {
      explanation: "### Intuition\nSort courses by deadlines. Add to total time. If deadline violated, drop longest duration course from heap to maximize course capacity.",
      pseudocode: "Sort courses by deadline.\n    Add duration to running time, push to Max Heap.\n    If time > deadline: subtract and pop maximum duration course."
    }
  },
  "sliding-window-median": {
    brute: {
      code: `// Subarray slices, sort each window`,
      complexity: "Time: O(N * K log K), Space: O(K)"
    },
    optimal: {
      code: `#include <vector>\n#include <set>\nusing namespace std;\n\nvector<double> medianSlidingWindow(vector<int>& nums, int k) {\n    vector<double> medians;\n    multiset<int> window(nums.begin(), nums.begin() + k);\n    auto mid = next(window.begin(), (k - 1) / 2);\n    for (int i = k; ; i++) {\n        medians.push_back(((double)*mid + *next(mid, (k % 2 === 0))) / 2.0);\n        if (i == nums.size()) return medians;\n        window.insert(nums[i]);\n        if (nums[i] < *mid) mid--;\n        if (nums[i - k] <= *mid) mid++;\n        window.erase(window.lower_bound(nums[i - k]));\n    }\n}`,
      complexity: "Time: O(N log K), Space: O(K)"
    },
    hinglish: {
      explanation: "### Intuition\nMaintain a sorted multiset representing sliding window. Use pointers to track median iterator values dynamically.",
      pseudocode: "Maintain sorted multiset window. Insert/remove and balance iterator."
    }
  },

  // === RECURSION ===
  "palindrome-string-rec": {
    brute: {
      code: `// Iterate and check`,
      complexity: "Time: O(N), Space: O(1)"
    },
    optimal: {
      code: `#include <string>\nusing namespace std;\n\nbool isPalRec(const string& s, int l, int r) {\n    if (l >= r) return true;\n    if (s[l] != s[r]) return false;\n    return isPalRec(s, l + 1, r - 1);\n}`,
      complexity: "Time: O(N), Space: O(N)"
    },
    hinglish: {
      explanation: "### Intuition\nRecursive palindrome checker. Compare left and right boundaries recursively. Base cases: cross pointers (true) or mismatch (false).",
      pseudocode: "isPalRec(s, l, r): if l >= r return true; if s[l]!=s[r] return false; return isPalRec(s, l+1, r-1)"
    }
  },
  "check-array-sorted-rec": {
    brute: {
      code: `// Simple loop check`,
      complexity: "Time: O(N), Space: O(1)"
    },
    optimal: {
      code: `#include <vector>\nusing namespace std;\n\nbool isSortedRec(const vector<int>& arr, int n) {\n    if (n <= 1) return true;\n    return (arr[n - 1] >= arr[n - 2]) && isSortedRec(arr, n - 1);\n}`,
      complexity: "Time: O(N), Space: O(N)"
    },
    hinglish: {
      explanation: "### Intuition\nRecursive sorting validation. Confirm last element >= second last, then recursively validate subarray of size N-1.",
      pseudocode: "isSorted(arr, n): if n<=1 return true; return arr[n-1] >= arr[n-2] and isSorted(arr, n-1)"
    }
  },
  "sum-digits-rec": {
    brute: {
      code: `// Modulo loop sum`,
      complexity: "Time: O(log N), Space: O(1)"
    },
    optimal: {
      code: `int sumDigits(int n) {\n    if (n == 0) return 0;\n    return (n % 10) + sumDigits(n / 10);\n}`,
      complexity: "Time: O(log N), Space: O(log N)"
    },
    hinglish: {
      explanation: "### Intuition\nRecursive digits sum. Return last digit `n % 10` plus recursive sum of remaining prefix digits `n / 10`.",
      pseudocode: "sum(n): if n==0 return 0; return (n % 10) + sum(n / 10)"
    }
  },
  "remove-char-rec": {
    brute: {
      code: `// Iterate and filter`,
      complexity: "Time: O(N), Space: O(N)"
    },
    optimal: {
      code: `#include <string>\nusing namespace std;\n\nstring removeChar(string s, char x) {\n    if (s.empty()) return s;\n    string sub = removeChar(s.substr(1), x);\n    if (s[0] == x) return sub;\n    return s[0] + sub;\n}`,
      complexity: "Time: O(N^2), Space: O(N)"
    },
    hinglish: {
      explanation: "### Intuition\nRecursive character removal. Filter first character, recursively fetch processed suffix, concatenate and return.",
      pseudocode: "removeChar(s, x): if empty return s; sub = remove(s.sub(1), x); return s[0]==x ? sub : s[0]+sub"
    }
  },
  "palindrome-partitioning": {
    brute: {
      code: `// Partition all options, check palindrome validation`,
      complexity: "Time: O(N * 2^N), Space: O(N)"
    },
    optimal: {
      code: `#include <vector>\n#include <string>\nusing namespace std;\n\nbool isPalindromePart(const string& s, int l, int r) {\n    while(l < r) if(s[l++] != s[r--]) return false;\n    return true;\n}\nvoid solvePartition(const string& s, int start, vector<string>& curr, vector<vector<string>>& res) {\n    if(start == s.length()) {\n        res.push_back(curr);\n        return;\n    }\n    for(int i = start; i < s.length(); i++) {\n        if(isPalindromePart(s, start, i)) {\n            curr.push_back(s.substr(start, i - start + 1));\n            solvePartition(s, i + 1, curr, res);\n            curr.pop_back(); // Backtrack\n        }\n    }\n}\nvector<vector<string>> partition(string s) {\n    vector<vector<string>> res;\n    vector<string> curr;\n    solvePartition(s, 0, curr, res);\n    return res;\n}`,
      complexity: "Time: O(N * 2^N), Space: O(N)"
    },
    hinglish: {
      explanation: "### Intuition\nBacktracking substrings partition. Split string at index i; if substring is palindrome, recurse on remainder. Revert choice when finished.",
      pseudocode: "backtrack(start):\n    if start == len: add curr to res; return\n    for i = start to len-1:\n        if isPalindrome(s[start..i]):\n            curr.push(s[start..i])\n            backtrack(i+1)\n            curr.pop()"
    }
  },

  // === DP ===
  "fibonacci-dp": {
    brute: {
      code: `// Simple recursive O(2^N)`,
      complexity: "Time: O(2^N), Space: O(N)"
    },
    optimal: {
      code: `// Same as fibonacci recursion/DP optimal`,
      complexity: "Time: O(N), Space: O(1)"
    },
    hinglish: {
      explanation: "### Intuition\nFibonacci DP. Save subproblem solutions in variables to compute value linearly.",
      pseudocode: "a=0, b=1. loop: c=a+b, a=b, b=c"
    }
  },
  "tabulation-intro": {
    brute: {
      code: `// Recursive overlapping calls`,
      complexity: "Time: O(2^N), Space: O(N)"
    },
    optimal: {
      code: `#include <vector>\nusing namespace std;\n\nint computeTabulation(int n) {\n    if(n <= 1) return n;\n    vector<int> dp(n + 1);\n    dp[0] = 0; dp[1] = 1;\n    for(int i = 2; i <= n; i++) dp[i] = dp[i-1] + dp[i-2];\n    return dp[n];\n}`,
      complexity: "Time: O(N), Space: O(N)"
    },
    hinglish: {
      explanation: "### Intuition\nTabulation is bottom-up DP. Solve base subproblems first, then iteratively fill DP array sizes values.",
      pseudocode: "Initialize dp table. Fill dp[i] = dp[i-1] + dp[i-2] up to n."
    }
  },
  "knapsack-01-tabulation": {
    brute: {
      code: `// Recursion include/exclude`,
      complexity: "Time: O(2^N), Space: O(N)"
    },
    optimal: {
      code: `// Same as knapsack-01 1D/2D dp optimal`,
      complexity: "Time: O(N * Capacity), Space: O(Capacity)"
    },
    hinglish: {
      explanation: "### Intuition\nKnapsack 01 bottom-up tabulation, updating state vectors.",
      pseudocode: "See knapsack-01 optimal implementation."
    }
  }
};
