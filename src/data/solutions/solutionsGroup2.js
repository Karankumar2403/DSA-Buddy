// Group 2 Solutions: Prefix Sum, Merge Intervals, LinkedList Reversal, Stack

export const solutionsGroup2 = {
  // === PREFIX SUM ===
  "find-pivot-index": {
    brute: {
      code: `#include <vector>\nusing namespace std;\n\nint pivotIndexBrute(vector<int>& nums) {\n    int n = nums.size();\n    for(int i=0; i<n; i++) {\n        int leftSum = 0, rightSum = 0;\n        for(int j=0; j<i; j++) leftSum += nums[j];\n        for(int j=i+1; j<n; j++) rightSum += nums[j];\n        if(leftSum == rightSum) return i;\n    }\n    return -1;\n}`,
      complexity: "Time: O(N^2), Space: O(1)"
    },
    optimal: {
      code: `#include <vector>\n#include <numeric>\nusing namespace std;\n\nint pivotIndex(vector<int>& nums) {\n    int totalSum = 0, leftSum = 0;\n    for (int x : nums) totalSum += x;\n    for (int i = 0; i < nums.size(); i++) {\n        if (leftSum == totalSum - leftSum - nums[i]) return i;\n        leftSum += nums[i];\n    }\n    return -1;\n}`,
      complexity: "Time: O(N), Space: O(1)"
    },
    hinglish: {
      explanation: "### Intuition\nTotal sum precompute sum track indexes. Iterate index values: if running `leftSum` equals `totalSum - leftSum - nums[i]`, we found pivot position.",
      pseudocode: "total = sum(nums), leftSum = 0\n    for i = 0 to n-1:\n        if leftSum == total - leftSum - nums[i]: return i\n        leftSum += nums[i]\n    return -1"
    }
  },
  "subarray-sums-divisible-k": {
    brute: {
      code: `#include <vector>\nusing namespace std;\n\nint subarraysDivByKBrute(vector<int>& nums, int k) {\n    int count = 0, n = nums.size();\n    for(int i=0; i<n; i++) {\n        int sum = 0;\n        for(int j=i; j<n; j++) {\n            sum += nums[j];\n            if(sum % k == 0) count++;\n        }\n    }\n    return count;\n}`,
      complexity: "Time: O(N^2), Space: O(1)"
    },
    optimal: {
      code: `#include <vector>\n#include <unordered_map>\nusing namespace std;\n\nint subarraysDivByK(vector<int>& nums, int k) {\n    unordered_map<int, int> remainderFreq;\n    remainderFreq[0] = 1;\n    int runningSum = 0, count = 0;\n    for (int num : nums) {\n        runningSum += num;\n        int rem = ((runningSum % k) + k) % k; // Correct negative remainders\n        if (remainderFreq.count(rem)) {\n            count += remainderFreq[rem];\n        }\n        remainderFreq[rem]++;\n    }\n    return count;\n}`,
      complexity: "Time: O(N), Space: O(K)"
    },
    hinglish: {
      explanation: "### Intuition\nPrefix Sum modulo arithmetic rules. If `Prefix[R] % K == Prefix[L-1] % K`, subarray sum is divisible by K. Track mod values counts in a map.",
      pseudocode: "map[0] = 1, sum = 0, count = 0\n    for num in nums:\n        sum = (sum + num) % k\n        adjust negative mod to positive\n        count += map[sum]\n        map[sum]++"
    }
  },
  "contiguous-array": {
    brute: {
      code: `// Nested loop checking count of 0s and 1s`,
      complexity: "Time: O(N^2), Space: O(1)"
    },
    optimal: {
      code: `#include <vector>\n#include <unordered_map>\n#include <algorithm>\nusing namespace std;\n\nint findMaxLength(vector<int>& nums) {\n    unordered_map<int, int> sumIndexMap;\n    sumIndexMap[0] = -1;\n    int runningSum = 0, maxLen = 0;\n    for (int i = 0; i < nums.size(); i++) {\n        runningSum += (nums[i] == 1 ? 1 : -1);\n        if (sumIndexMap.count(runningSum)) {\n            maxLen = max(maxLen, i - sumIndexMap[runningSum]);\n        } else {\n            sumIndexMap[runningSum] = i;\n        }\n    }\n    return maxLen;\n}`,
      complexity: "Time: O(N), Space: O(N)"
    },
    hinglish: {
      explanation: "### Intuition\n0 ko `-1` aur 1 ko `+1` treat karenge. Ab problem 'largest subarray with sum 0' ban gayi. Running sum and map indexes check limits track updates.",
      pseudocode: "map[0] = -1, sum = 0, maxLen = 0\n    for i = 0 to n-1:\n        sum += (val == 1 ? 1 : -1)\n        if sum in map: maxLen = max(maxLen, i - map[sum])\n        else: map[sum] = i"
    }
  },
  "shortest-subarray-sum-at-least-k": {
    brute: {
      code: `// O(N^2) checking all subarray sums`,
      complexity: "Time: O(N^2), Space: O(1)"
    },
    optimal: {
      code: `#include <vector>\n#include <deque>\n#include <algorithm>\n#include <climits>\nusing namespace std;\n\nint shortestSubarray(vector<int>& nums, int k) {\n    int n = nums.size();\n    vector<long long> prefix(n + 1, 0);\n    for (int i = 0; i < n; i++) prefix[i + 1] = prefix[i] + nums[i];\n    deque<int> dq;\n    int minLen = INT_MAX;\n    for (int i = 0; i <= n; i++) {\n        while (!dq.empty() && prefix[i] - prefix[dq.front()] >= k) {\n            minLen = min(minLen, i - dq.front());\n            dq.pop_front();\n        }\n        while (!dq.empty() && prefix[i] <= prefix[dq.back()]) {\n            dq.pop_back();\n        }\n        dq.push_back(i);\n    }\n    return minLen == INT_MAX ? -1 : minLen;\n}`,
      complexity: "Time: O(N), Space: O(N)"
    },
    hinglish: {
      explanation: "### Intuition\nDeque properties track monotonic prefix values sum. Sliding window dynamic shrink using front popping matching criteria sum >= k.",
      pseudocode: "compute prefix sum\n    for i = 0 to n:\n        pop dq front if prefix[i] - prefix[front] >= k, update minLen\n        pop dq back if prefix[i] <= prefix[back] (maintain monotonic increasing queue)\n        push i"
    }
  },
  "count-range-sum": {
    brute: {
      code: `// Nested scans for range sums O(N^2)`,
      complexity: "Time: O(N^2), Space: O(1)"
    },
    optimal: {
      code: `#include <vector>\nusing namespace std;\n\nint mergeSort(vector<long long>& sums, int start, int end, int lower, int upper) {\n    if (end - start <= 1) return 0;\n    int mid = start + (end - start) / 2;\n    int count = mergeSort(sums, start, mid, lower, upper) + mergeSort(sums, mid, end, lower, upper);\n    int j = mid, k = mid, t = mid;\n    vector<long long> cache(end - start);\n    int r = 0;\n    for (int i = start, p = 0; i < mid; i++, p++) {\n        while (j < end && sums[j] - sums[i] < lower) j++;\n        while (k < end && sums[k] - sums[i] <= upper) k++;\n        while (t < end && sums[t] < sums[i]) cache[p++] = sums[t++];\n        cache[p] = sums[i];\n        count += k - j;\n    }\n    for (int i = 0; i < p; i++) sums[start + i] = cache[i];\n    return count;\n}\nint countRangeSum(vector<int>& nums, int lower, int upper) {\n    int n = nums.size();\n    vector<long long> sums(n + 1, 0);\n    for (int i = 0; i < n; i++) sums[i + 1] = sums[i] + nums[i];\n    return mergeSort(sums, 0, n + 1, lower, upper);\n}`,
      complexity: "Time: O(N log N), Space: O(N)"
    },
    hinglish: {
      explanation: "### Intuition\nMerge sort tree segments checks. Prefix sums range checks matching bounds differences using sorted sub-ranges split merge passes.",
      pseudocode: "Build prefix sum array.\n    Run customized merge sort tree to count pairs satisfying range constraints."
    }
  },

  // === MERGE INTERVALS ===
  "insert-interval": {
    brute: {
      code: `#include <vector>\n#include <algorithm>\nusing namespace std;\n\nvector<vector<int>> insertIntervalBrute(vector<vector<int>>& intervals, vector<int>& newInterval) {\n    intervals.push_back(newInterval);\n    sort(intervals.begin(), intervals.end());\n    // Standard merge logic...\n    return intervals;\n}`,
      complexity: "Time: O(N log N), Space: O(1)"
    },
    optimal: {
      code: `#include <vector>\n#include <algorithm>\nusing namespace std;\n\nvector<vector<int>> insert(vector<vector<int>>& intervals, vector<int>& newInterval) {\n    vector<vector<int>> result;\n    int i = 0, n = intervals.size();\n    while (i < n && intervals[i][1] < newInterval[0]) {\n        result.push_back(intervals[i++]);\n    }\n    while (i < n && intervals[i][0] <= newInterval[1]) {\n        newInterval[0] = min(newInterval[0], intervals[i][0]);\n        newInterval[1] = max(newInterval[1], intervals[i][1]);\n        i++;\n    }\n    result.push_back(newInterval);\n    while (i < n) result.push_back(intervals[i++]);\n    return result;\n}`,
      complexity: "Time: O(N), Space: O(1)"
    },
    hinglish: {
      explanation: "### Intuition\nNon-overlapping parts left side push direct. Merge intersections overlapping bounds: newInterval stretch min start, max end. Append rest right side.",
      pseudocode: "while intervals[i].end < newInterval.start: add to res\n    while intervals[i].start <= newInterval.end: merge(newInterval, intervals[i])\n    add newInterval\n    add remaining intervals"
    }
  },
  "intervals-intersection": {
    brute: {
      code: `// O(N*M) checks pairs overlaps`,
      complexity: "Time: O(N*M), Space: O(1)"
    },
    optimal: {
      code: `#include <vector>\n#include <algorithm>\nusing namespace std;\n\nvector<vector<int>> intervalIntersection(vector<vector<int>>& firstList, vector<vector<int>>& secondList) {\n    vector<vector<int>> result;\n    int i = 0, j = 0;\n    while (i < firstList.size() && j < secondList.size()) {\n        int start = max(firstList[i][0], secondList[j][0]);\n        int end = min(firstList[i][1], secondList[j][1]);\n        if (start <= end) {\n            result.push_back({start, end});\n        }\n        if (firstList[i][1] < secondList[j][1]) i++;\n        else j++;\n    }\n    return result;\n}`,
      complexity: "Time: O(N + M), Space: O(1)"
    },
    hinglish: {
      explanation: "### Intuition\nTwo pointers checking overlapping conditions. Intersection bounds coordinates: `start = max(s1, s2)`, `end = min(e1, e2)`. Move pointers which interval ends first.",
      pseudocode: "while i < len1 and j < len2:\n        start = max(s1[i].start, s2[j].start)\n        end = min(s1[i].end, s2[j].end)\n        if start <= end: add {start, end}\n        increment pointer that has smaller end coordinate"
    }
  },
  "overlapping-intervals": {
    brute: {
      code: `// Sort and check merges`,
      complexity: "Time: O(N log N), Space: O(1)"
    },
    optimal: {
      code: `// Same as merge-intervals-med optimal implementation`,
      complexity: "Time: O(N log N), Space: O(1)"
    },
    hinglish: {
      explanation: "### Intuition\nSort intervals by start coordinate, check contiguous segments overlaps and stretch boundaries.",
      pseudocode: "See merge-intervals-med"
    }
  },
  "minimum-meeting-rooms": {
    brute: {
      code: `// Check overlap counting manually`,
      complexity: "Time: O(N^2), Space: O(1)"
    },
    optimal: {
      code: `#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint minMeetingRooms(vector<vector<int>>& intervals) {\n    vector<int> starts, ends;\n    for(const auto& i : intervals) {\n        starts.push_back(i[0]);\n        ends.push_back(i[1]);\n    }\n    sort(starts.begin(), starts.end());\n    sort(ends.begin(), ends.end());\n    int rooms = 0, active = 0;\n    int i = 0, j = 0;\n    while(i < starts.size()) {\n        if(starts[i] < ends[j]) {\n            active++;\n            rooms = max(rooms, active);\n            i++;\n        } else {\n            active--;\n            j++;\n        }\n    }\n    return rooms;\n}`,
      complexity: "Time: O(N log N), Space: O(N)"
    },
    hinglish: {
      explanation: "### Intuition\nMeeting starts and ends sorted separately. Pointers iterate start times: if a new meeting starts before the earliest ending meeting, we need a room. Otherwise, a room frees up.",
      pseudocode: "starts = sorted(start times), ends = sorted(end times)\n    while starts pointer < n:\n        if starts[i] < ends[j]: roomCount++; i++\n        else: roomCount--; j++\n        maxRooms = max(maxRooms, roomCount)"
    }
  },
  "maximum-cpu-load": {
    brute: {
      code: `// O(N^2) nested overlaps load tracking`,
      complexity: "Time: O(N^2), Space: O(1)"
    },
    optimal: {
      code: `#include <vector>\n#include <algorithm>\n#include <queue>\nusing namespace std;\n\nstruct Job {\n    int start, end, cpuLoad;\n};\n\nint findMaxCPULoad(vector<Job>& jobs) {\n    sort(jobs.begin(), jobs.end(), [](const Job& a, const Job& b) { return a.start < b.start; });\n    int maxLoad = 0, currentLoad = 0;\n    // Min heap tracking ending times\n    auto comp = [](const Job& a, const Job& b) { return a.end > b.end; };\n    priority_queue<Job, vector<Job>, decltype(comp)> minHeap(comp);\n    for(const auto& job : jobs) {\n        while(!minHeap.empty() && minHeap.top().end <= job.start) {\n            currentLoad -= minHeap.top().cpuLoad;\n            minHeap.pop();\n        }\n        minHeap.push(job);\n        currentLoad += job.cpuLoad;\n        maxLoad = max(maxLoad, currentLoad);\n    }\n    return maxLoad;\n}`,
      complexity: "Time: O(N log N), Space: O(N)"
    },
    hinglish: {
      explanation: "### Intuition\nSort jobs by start time. Use a min-heap to keep track of ending times. Clean completed jobs from the heap and subtract their CPU load, then insert current job and track max load.",
      pseudocode: "Sort jobs.\n    Min heap tracks ending times.\n    Clean heap if job.start >= heap.top.end, subtract load.\n    Add current job load, record max load."
    }
  },
  "employee-free-time": {
    brute: {
      code: `// Flatten intervals, sort, find gap segments`,
      complexity: "Time: O(N log N), Space: O(N)"
    },
    optimal: {
      code: `#include <vector>\n#include <algorithm>\n#include <queue>\nusing namespace std;\n\nstruct Interval {\n    int start, end;\n};\n\nvector<Interval> employeeFreeTime(vector<vector<Interval>>& schedule) {\n    vector<Interval> result;\n    // Flatten and sort all intervals\n    vector<Interval> intervals;\n    for(const auto& emp : schedule) {\n        for(const auto& interval : emp) {\n            intervals.push_back(interval);\n        }\n    }\n    sort(intervals.begin(), intervals.end(), [](const Interval& a, const Interval& b) {\n        return a.start < b.start;\n    });\n    int tempEnd = intervals[0].end;\n    for(size_t i = 1; i < intervals.size(); i++) {\n        if(intervals[i].start > tempEnd) {\n            result.push_back({tempEnd, intervals[i].start});\n        }\n        tempEnd = max(tempEnd, intervals[i].end);\n    }\n    return result;\n}`,
      complexity: "Time: O(N log N), Space: O(N)"
    },
    hinglish: {
      explanation: "### Intuition\nCombine all employee schedules into one sorted interval list. Iterate and find the gaps between intervals (where the start of the next interval is greater than the end of the previous tracked interval).",
      pseudocode: "Flatten schedules, sort intervals by start.\n    Track tempEnd = intervals[0].end.\n    If intervals[i].start > tempEnd: add gap {tempEnd, intervals[i].start}\n    Update tempEnd = max(tempEnd, intervals[i].end)"
    }
  },

  // === LINKED LIST REVERSAL ===
  "reverse-sublist": {
    brute: {
      code: `// Convert to vector, swap values, rebuild list`,
      complexity: "Time: O(N), Space: O(N)"
    },
    optimal: {
      code: `#include <iostream>\nusing namespace std;\n\nstruct ListNode {\n    int val;\n    ListNode *next;\n    ListNode(int x) : val(x), next(NULL) {}\n};\n\nListNode* reverseBetween(ListNode* head, int left, int right) {\n    if (!head || left == right) return head;\n    ListNode dummy(0);\n    dummy.next = head;\n    ListNode* prev = &dummy;\n    for (int i = 0; i < left - 1; i++) prev = prev->next;\n    ListNode* curr = prev->next;\n    for (int i = 0; i < right - left; i++) {\n        ListNode* nextNode = curr->next;\n        curr->next = nextNode->next;\n        nextNode->next = prev->next;\n        prev->next = nextNode;\n    }\n    return dummy.next;\n}`,
      complexity: "Time: O(N), Space: O(1)"
    },
    hinglish: {
      explanation: "### Intuition\nReach sublist starting position, use 3-pointer sequence links flipping inside subsegment boundaries without breaking connections with left/right static segments.",
      pseudocode: "Navigate to index (left-1).\n    For i = 0 to (right-left): perform subsegment reversal loop shifting references."
    }
  },
  "reverse-list-pairs": {
    brute: {
      code: `// Swap node values pairwise`,
      complexity: "Time: O(N), Space: O(1)"
    },
    optimal: {
      code: `#include <iostream>\nusing namespace std;\n\nstruct ListNode {\n    int val;\n    ListNode *next;\n    ListNode(int x) : val(x), next(NULL) {}\n};\n\nListNode* swapPairs(ListNode* head) {\n    if(!head || !head->next) return head;\n    ListNode dummy(0);\n    dummy.next = head;\n    ListNode* prev = &dummy;\n    while(prev->next && prev->next->next) {\n        ListNode* first = prev->next;\n        ListNode* second = first->next;\n        // Swap links\n        first->next = second->next;\n        second->next = first;\n        prev->next = second;\n        // Move forward\n        prev = first;\n    }\n    return dummy.next;\n}`,
      complexity: "Time: O(N), Space: O(1)"
    },
    hinglish: {
      explanation: "### Intuition\nPairwise node references adjustment: modify pointers so that second node links to first, and preceding node links to second. Repeat pairwise.",
      pseudocode: "Use dummy node.\n    While pair exists: swap pointers links locally, shift parent pointer forward."
    }
  },
  "reverse-every-k-sublist": {
    brute: {
      code: `// Push K chunks to vector, reverse, reconnect`,
      complexity: "Time: O(N), Space: O(N)"
    },
    optimal: {
      code: `#include <iostream>\nusing namespace std;\n\nstruct ListNode {\n    int val;\n    ListNode *next;\n    ListNode(int x) : val(x), next(NULL) {}\n};\n\nListNode* reverseKGroup(ListNode* head, int k) {\n    if (!head || k == 1) return head;\n    ListNode dummy(0);\n    dummy.next = head;\n    ListNode *prev = &dummy, *curr = &dummy, *next = &dummy;\n    int count = 0;\n    while (curr->next) { curr = curr->next; count++; }\n    while (count >= k) {\n        curr = prev->next;\n        next = curr->next;\n        for (int i = 1; i < k; i++) {\n            curr->next = next->next;\n            next->next = prev->next;\n            prev->next = next;\n            next = curr->next;\n        }\n        prev = curr;\n        count -= k;\n    }\n    return dummy.next;\n}`,
      complexity: "Time: O(N), Space: O(1)"
    },
    hinglish: {
      explanation: "### Intuition\nFirst count total nodes. Reverse each K-chunk segment in-place, reducing count by K. Reconnect preceding node to the reversed sub-header node.",
      pseudocode: "count = size(list)\n    while count >= k:\n        reverse k nodes locally\n        reconnect boundaries\n        shift prev and subtract count by k"
    }
  },
  "reverse-nodes-even-groups": {
    brute: {
      code: `// Vector conversion, swap even chunk nodes, rebuild`,
      complexity: "Time: O(N), Space: O(N)"
    },
    optimal: {
      code: `#include <iostream>\n#include <vector>\nusing namespace std;\n\nstruct ListNode {\n    int val;\n    ListNode *next;\n    ListNode(int x) : val(x), next(NULL) {}\n};\n\nListNode* reverseEvenLengthGroups(ListNode* head) {\n    ListNode* prev = head;\n    int groupLen = 2;\n    while(prev->next) {\n        ListNode* curr = prev->next;\n        int count = 0;\n        ListNode* temp = curr;\n        while(temp && count < groupLen) {\n            temp = temp->next;\n            count++;\n        }\n        if(count % 2 == 0) {\n            ListNode* node = curr;\n            ListNode* reversePrev = temp;\n            for(int i=0; i<count; i++) {\n                ListNode* next = node->next;\n                node->next = reversePrev;\n                reversePrev = node;\n                node = next;\n            }\n            prev->next = reversePrev;\n            prev = curr;\n        } else {\n            for(int i=0; i<count; i++) prev = prev->next;\n        }\n        groupLen++;\n    }\n    return head;\n}`,
      complexity: "Time: O(N), Space: O(1)"
    },
    hinglish: {
      explanation: "### Intuition\nGroup size starts at 1 and increases by 1 each step. Check if the actual remaining node count in the active group is even; if so, perform standard link reversal.",
      pseudocode: "groupSize = 1\n    While nodes left:\n        count remaining nodes up to groupSize\n        if count is even: reverse sublist\n        else: skip nodes\n        groupSize++"
    }
  },
  "rotate-linkedlist-med": {
    brute: {
      code: `// Shift nodes k times one-by-one`,
      complexity: "Time: O(N*K), Space: O(1)"
    },
    optimal: {
      code: `#include <iostream>\nusing namespace std;\n\nstruct ListNode {\n    int val;\n    ListNode *next;\n    ListNode(int x) : val(x), next(NULL) {}\n};\n\nListNode* rotateRight(ListNode* head, int k) {\n    if(!head || !head->next || k == 0) return head;\n    ListNode* tail = head;\n    int len = 1;\n    while(tail->next) { tail = tail->next; len++; }\n    tail->next = head; // Make circular\n    k = k % len;\n    int steps = len - k;\n    for(int i=0; i<steps; i++) tail = tail->next;\n    ListNode* newHead = tail->next;\n    tail->next = NULL; // Break loop\n    return newHead;\n}`,
      complexity: "Time: O(N), Space: O(1)"
    },
    hinglish: {
      explanation: "### Intuition\nFirst connect tail back to head to make circular list. Rotate `length - (k % length)` steps along list nodes, store new head pointer, and break cycle link.",
      pseudocode: "find length and tail node\n    connect tail.next = head\n    steps = length - (k % length)\n    move tail pointer steps times\n    newHead = tail.next\n    tail.next = null\n    return newHead"
    }
  },

  // === STACK ===
  "remove-adjacent-duplicates": {
    brute: {
      code: `// Iterate string, erase adjacent duplicates if found`,
      complexity: "Time: O(N^2), Space: O(1)"
    },
    optimal: {
      code: `#include <string>\n#include <stack>\n#include <algorithm>\nusing namespace std;\n\nstring removeDuplicates(string s) {\n    string res = \"\";\n    for(char c : s) {\n        if(!res.empty() && res.back() == c) {\n            res.pop_back(); // String behaves as stack\n        } else {\n            res.push_back(c);\n        }\n    }\n    return res;\n}`,
      complexity: "Time: O(N), Space: O(N)"
    },
    hinglish: {
      explanation: "### Intuition\nUse string as stack. If current character equals top of stack, pop it. Otherwise push it.",
      pseudocode: "for c in s:\n        if stack.top == c: stack.pop()\n        else: stack.push(c)"
    }
  },
  "reverse-string-stack": {
    brute: {
      code: `// Swap endpoints`,
      complexity: "Time: O(N), Space: O(1)"
    },
    optimal: {
      code: `#include <string>\n#include <stack>\nusing namespace std;\n\nstring reverseString(string s) {\n    stack<char> st;\n    for(char c : s) st.push(c);\n    string res = \"\";\n    while(!st.empty()) { res += st.top(); st.pop(); }\n    return res;\n}`,
      complexity: "Time: O(N), Space: O(N)"
    },
    hinglish: {
      explanation: "### Intuition\nPush all characters of string into a LIFO stack, pop them one by one to form reversed string.",
      pseudocode: "stack all chars; pop all chars to result string"
    }
  },
  "next-greater-element": {
    brute: {
      code: `#include <vector>\nusing namespace std;\n\nvector<int> nextGreaterElementBrute(vector<int>& nums) {\n    int n = nums.size();\n    vector<int> res(n, -1);\n    for(int i=0; i<n; i++) {\n        for(int j=i+1; j<n; j++) {\n            if(nums[j] > nums[i]) {\n                res[i] = nums[j];\n                break;\n            }\n        }\n    }\n    return res;\n}`,
      complexity: "Time: O(N^2), Space: O(1)"
    },
    optimal: {
      code: `#include <vector>\n#include <stack>\nusing namespace std;\n\nvector<int> nextGreaterElements(vector<int>& nums) {\n    int n = nums.size();\n    vector<int> res(n, -1);\n    stack<int> st; // Monotonic decreasing index stack\n    for (int i = 0; i < n; i++) {\n        while (!st.empty() && nums[st.top()] < nums[i]) {\n            res[st.top()] = nums[i];\n            st.pop();\n        }\n        st.push(i);\n    }\n    return res;\n}`,
      complexity: "Time: O(N), Space: O(N)"
    },
    hinglish: {
      explanation: "### Intuition\nMonotonic stack maintain coordinates index. Pop stack indices while current element > stack top element, updating result array.",
      pseudocode: "for i = 0 to n-1:\n        while stack not empty and nums[stack.top] < nums[i]:\n            res[stack.pop()] = nums[i]\n        stack.push(i)"
    }
  },
  "daily-temperatures": {
    brute: {
      code: `// Nested scans O(N^2)`,
      complexity: "Time: O(N^2), Space: O(1)"
    },
    optimal: {
      code: `#include <vector>\n#include <stack>\nusing namespace std;\n\nvector<int> dailyTemperatures(vector<int>& temperatures) {\n    int n = temperatures.size();\n    vector<int> res(n, 0);\n    stack<int> st;\n    for(int i=0; i<n; i++) {\n        while(!st.empty() && temperatures[st.top()] < temperatures[i]) {\n            res[st.top()] = i - st.top();\n            st.pop();\n        }\n        st.push(i);\n    }\n    return res;\n}`,
      complexity: "Time: O(N), Space: O(N)"
    },
    hinglish: {
      explanation: "### Intuition\nMonotonic stack. When current temperature is warmer than stack top index element, pop index and calculate daily distance `i - top`.",
      pseudocode: "Monotonic decreasing stack for indices. Pop and set res[top] = i - top when warmer temp found."
    }
  },
  "remove-nodes-ll": {
    brute: {
      code: `// Copy to vector, clean, rebuild list`,
      complexity: "Time: O(N), Space: O(N)"
    },
    optimal: {
      code: `#include <iostream>\n#include <stack>\nusing namespace std;\n\nstruct ListNode {\n    int val;\n    ListNode *next;\n    ListNode(int x) : val(x), next(NULL) {}\n};\n\nListNode* removeNodes(ListNode* head) {\n    stack<ListNode*> st;\n    ListNode* curr = head;\n    while(curr) {\n        while(!st.empty() && st.top()->val < curr->val) st.pop();\n        st.push(curr);\n        curr = curr->next;\n    }\n    ListNode* nxt = NULL;\n    while(!st.empty()) {\n        curr = st.top();\n        st.pop();\n        curr->next = nxt;\n        nxt = curr;\n    }\n    return nxt;\n}`,
      complexity: "Time: O(N), Space: O(N)"
    },
    hinglish: {
      explanation: "### Intuition\nPush nodes to stack while maintaining decreasing values order. Pop all smaller elements. Reconnect stack nodes to form result list.",
      pseudocode: "traverse list: pop stack while top.val < current.val; push current\n    reconnect stack elements in reverse order"
    }
  },
  "remove-adjacent-duplicates-ii": {
    brute: {
      code: `// Iterate and find sequences of size k`,
      complexity: "Time: O(N^2), Space: O(1)"
    },
    optimal: {
      code: `#include <string>\n#include <vector>\nusing namespace std;\n\nstring removeDuplicates(string s, int k) {\n    vector<pair<char, int>> st; // Char and consecutive frequency stack\n    for (char c : s) {\n        if (!st.empty() && st.back().first == c) {\n            st.back().second++;\n        } else {\n            st.push_back({c, 1});\n        }\n        if (st.back().second == k) st.pop_back();\n    }\n    string res = \"\";\n    for (const auto& p : st) {\n        res.append(p.second, p.first);\n    }\n    return res;\n}`,
      complexity: "Time: O(N), Space: O(N)"
    },
    hinglish: {
      explanation: "### Intuition\nUse a stack of pairs: `{character, occurrence_count}`. If top character occurrence reaches k, pop it from stack.",
      pseudocode: "for c in s:\n        if stack.top.char == c: stack.top.count++\n        else: push {c, 1}\n        if stack.top.count == k: stack.pop()\n    reconstruct string from stack values"
    }
  },
  "simplify-path": {
    brute: {
      code: `// String splits and validations`,
      complexity: "Time: O(N), Space: O(N)"
    },
    optimal: {
      code: `#include <string>\n#include <vector>\n#include <sstream>\nusing namespace std;\n\nstring simplifyPath(string path) {\n    vector<string> stack;\n    stringstream ss(path);\n    string temp;\n    while(getline(ss, temp, '/')) {\n        if(temp == \"\" || temp == \".\") continue;\n        if(temp == \"..\") {\n            if(!stack.empty()) stack.pop_back();\n        } else {\n            stack.push_back(temp);\n        }\n    }\n    string res = \"\";\n    for(const string& s : stack) res += \"/\" + s;\n    return res.empty() ? \"/\" : res;\n}`,
      complexity: "Time: O(N), Space: O(N)"
    },
    hinglish: {
      explanation: "### Intuition\nSplit string by slash `/`. Process parts: if `.` or empty, skip. If `..`, pop stack (directory up). Else push directory name.",
      pseudocode: "dirs = split(path, '/')\n    for d in dirs:\n        if d == '..': stack.pop()\n        else if d != '.' and d != '': stack.push(d)\n    return '/' + join(stack, '/')"
    }
  },
  "remove-k-digits": {
    brute: {
      code: `// Backtracking search O(2^N) combinations`,
      complexity: "Time: O(2^N), Space: O(N)"
    },
    optimal: {
      code: `#include <string>\n#include <vector>\nusing namespace std;\n\nstring removeKDigits(string num, int k) {\n    if(num.length() == k) return \"0\";\n    string res = \"\";\n    for(char d : num) {\n        while(k > 0 && !res.empty() && res.back() > d) {\n            res.pop_back();\n            k--;\n        }\n        res.push_back(d);\n    }\n    while(k > 0) { res.pop_back(); k--; } // remove remaining\n    // strip leading zeros\n    int i = 0;\n    while(i < res.length() && res[i] == '0') i++;\n    res = res.substr(i);\n    return res.empty() ? \"0\" : res;\n}`,
      complexity: "Time: O(N), Space: O(N)"
    },
    hinglish: {
      explanation: "### Intuition\nMonotonic increasing stack representation digits. If current digit is smaller than stack top, pop stack top and reduce K to form smallest number.",
      pseudocode: "for d in num:\n        while k > 0 and stack.top > d: stack.pop(); k--\n        stack.push(d)\n    pop remaining if k > 0\n    remove leading zeros"
    }
  }
};
