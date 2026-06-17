// Group 1 Solutions: Two Pointers, Fast & Slow Pointers, Sliding Window, Kadane

export const solutionsGroup1 = {
  // === TWO POINTERS ===
  "squaring-a-sorted-array": {
    brute: {
      code: `#include <vector>\n#include <algorithm>\nusing namespace std;\n\nvector<int> makeSquaresBrute(vector<int>& arr) {\n    vector<int> squares(arr.size());\n    for (int i = 0; i < arr.size(); i++) {\n        squares[i] = arr[i] * arr[i];\n    }\n    sort(squares.begin(), squares.end());\n    return squares;\n}`,
      complexity: "Time: O(N log N), Space: O(1)"
    },
    optimal: {
      code: `#include <vector>\n#include <cmath>\nusing namespace std;\n\nvector<int> makeSquares(vector<int>& arr) {\n    int n = arr.size();\n    vector<int> squares(n);\n    int left = 0, right = n - 1;\n    int highestIdx = n - 1;\n    while (left <= right) {\n        int leftSquare = arr[left] * arr[left];\n        int rightSquare = arr[right] * arr[right];\n        if (leftSquare > rightSquare) {\n            squares[highestIdx--] = leftSquare;\n            left++;\n        } else {\n            squares[highestIdx--] = rightSquare;\n            right--;\n        }\n    }\n    return squares;\n}`,
      complexity: "Time: O(N), Space: O(N)"
    },
    hinglish: {
      explanation: "### Intuition\nArray sorted hai but negative numbers ke squares bade ho sakte hain. Hum start aur end pe pointers rakh kar squares compare karenge aur bade square ko peeche se insert karenge.",
      pseudocode: "function makeSquares(arr):\n    left = 0, right = n-1, idx = n-1\n    while left <= right:\n        if square(left) > square(right):\n            res[idx--] = square(left++)\n        else:\n            res[idx--] = square(right--)\n    return res"
    }
  },
  "triplet-sum-to-zero": {
    brute: {
      code: `#include <vector>\n#include <algorithm>\n#include <set>\nusing namespace std;\n\nvector<vector<int>> threeSumBrute(vector<int>& nums) {\n    int n = nums.size();\n    set<vector<int>> st;\n    for (int i = 0; i < n; i++) {\n        for (int j = i+1; j < n; j++) {\n            for (int k = j+1; k < n; k++) {\n                if (nums[i] + nums[j] + nums[k] == 0) {\n                    vector<int> temp = {nums[i], nums[j], nums[k]};\n                    sort(temp.begin(), temp.end());\n                    st.insert(temp);\n                }\n            }\n        }\n    }\n    return vector<vector<int>>(st.begin(), st.end());\n}`,
      complexity: "Time: O(N^3 log(triplets)), Space: O(N)"
    },
    optimal: {
      code: `#include <vector>\n#include <algorithm>\nusing namespace std;\n\nvector<vector<int>> threeSum(vector<int>& nums) {\n    int n = nums.size();\n    vector<vector<int>> result;\n    sort(nums.begin(), nums.end());\n    for (int i = 0; i < n - 2; i++) {\n        if (i > 0 && nums[i] == nums[i - 1]) continue; // Skip duplicates\n        int left = i + 1, right = n - 1;\n        while (left < right) {\n            int sum = nums[i] + nums[left] + nums[right];\n            if (sum == 0) {\n                result.push_back({nums[i], nums[left], nums[right]});\n                while (left < right && nums[left] == nums[left + 1]) left++;\n                while (left < right && nums[right] == nums[right - 1]) right--;\n                left++; right--;\n            } else if (sum < 0) left++;\n            else right--;\n        }\n    }\n    return result;\n}`,
      complexity: "Time: O(N^2), Space: O(1)"
    },
    hinglish: {
      explanation: "### Intuition\nArray sort karke, har element `i` ke liye, baaki array me do pointers chalayenge taaki sum `-nums[i]` mil jaye. Duplicates skip karna zaroori hai.",
      pseudocode: "function threeSum(nums):\n    sort(nums)\n    for i = 0 to n-3:\n        if duplicate: continue\n        left = i+1, right = n-1\n        while left < right:\n            sum = nums[i] + nums[left] + nums[right]\n            if sum == 0:\n                add_to_res; skip_duplicates; left++; right--\n            else if sum < 0: left++\n            else: right--"
    }
  },
  "triplet-sum-close-to-target": {
    brute: {
      code: `#include <vector>\n#include <cmath>\n#include <climits>\nusing namespace std;\n\nint threeSumClosestBrute(vector<int>& nums, int target) {\n    int n = nums.size();\n    int minDiff = INT_MAX;\n    int result = 0;\n    for (int i = 0; i < n; i++) {\n        for (int j = i+1; j < n; j++) {\n            for (int k = j+1; k < n; k++) {\n                int sum = nums[i] + nums[j] + nums[k];\n                if (abs(sum - target) < minDiff) {\n                    minDiff = abs(sum - target);\n                    result = sum;\n                }\n            }\n        }\n    }\n    return result;\n}`,
      complexity: "Time: O(N^3), Space: O(1)"
    },
    optimal: {
      code: `#include <vector>\n#include <algorithm>\n#include <cmath>\n#include <climits>\nusing namespace std;\n\nint threeSumClosest(vector<int>& nums, int target) {\n    sort(nums.begin(), nums.end());\n    int n = nums.size();\n    int closestSum = nums[0] + nums[1] + nums[2];\n    for (int i = 0; i < n - 2; i++) {\n        int left = i + 1, right = n - 1;\n        while (left < right) {\n            int currentSum = nums[i] + nums[left] + nums[right];\n            if (currentSum == target) return currentSum;\n            if (abs(currentSum - target) < abs(closestSum - target)) {\n                closestSum = currentSum;\n            }\n            if (currentSum < target) left++;\n            else right--;\n        }\n    }\n    return closestSum;\n}`,
      complexity: "Time: O(N^2), Space: O(1)"
    },
    hinglish: {
      explanation: "### Intuition\nArray sort karke 3sum jaisa logic lagayenge. Har step par difference check karenge target se aur closest sum ko save karte chalenge.",
      pseudocode: "function closest(nums, target):\n    sort(nums)\n    closest = nums[0]+nums[1]+nums[2]\n    for i = 0 to n-3:\n        left = i+1, right = n-1\n        while left < right:\n            sum = nums[i]+nums[left]+nums[right]\n            if sum == target: return sum\n            if abs(sum-target) < abs(closest-target): closest = sum\n            if sum < target: left++\n            else: right--\n    return closest"
    }
  },
  "triplets-with-smaller-sum": {
    brute: {
      code: `#include <vector>\nusing namespace std;\n\nint tripletCountBrute(vector<int>& nums, int target) {\n    int count = 0, n = nums.size();\n    for (int i = 0; i < n; i++) {\n        for (int j = i+1; j < n; j++) {\n            for (int k = j+1; k < n; k++) {\n                if (nums[i] + nums[j] + nums[k] < target) count++;\n            }\n        }\n    }\n    return count;\n}`,
      complexity: "Time: O(N^3), Space: O(1)"
    },
    optimal: {
      code: `#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint tripletCount(vector<int>& nums, int target) {\n    sort(nums.begin(), nums.end());\n    int count = 0, n = nums.size();\n    for (int i = 0; i < n - 2; i++) {\n        int left = i + 1, right = n - 1;\n        while (left < right) {\n            if (nums[i] + nums[left] + nums[right] < target) {\n                // Agar right wale ke sath sum chota hai, toh left se right tak sabhi elements chote honge\n                count += (right - left);\n                left++;\n            } else {\n                right--;\n            }\n        }\n    }\n    return count;\n}`,
      complexity: "Time: O(N^2), Space: O(1)"
    },
    hinglish: {
      explanation: "### Intuition\nArray sort karo. Agar `nums[i] + nums[left] + nums[right] < target` hai, toh iska matlab `left` pointer ke sath `right` tak ke saare pairs target se chote honge, kyunki array sorted hai. Hum `right - left` combinations ko direct add kar sakte hain.",
      pseudocode: "function countTriplets(nums, target):\n    sort(nums)\n    count = 0\n    for i = 0 to n-3:\n        left = i+1, right = n-1\n        while left < right:\n            if nums[i] + nums[left] + nums[right] < target:\n                count += (right - left)\n                left++\n            else: right--"
    }
  },
  "subarrays-with-product-less-than-a-target": {
    brute: {
      code: `#include <vector>\nusing namespace std;\n\nint numSubarrayProductLessThanKBrute(vector<int>& nums, int k) {\n    if (k <= 1) return 0;\n    int count = 0, n = nums.size();\n    for (int i = 0; i < n; i++) {\n        long long prod = 1;\n        for (int j = i; j < n; j++) {\n            prod *= nums[j];\n            if (prod < k) count++;\n            else break;\n        }\n    }\n    return count;\n}`,
      complexity: "Time: O(N^2), Space: O(1)"
    },
    optimal: {
      code: `#include <vector>\nusing namespace std;\n\nint numSubarrayProductLessThanK(vector<int>& nums, int k) {\n    if (k <= 1) return 0;\n    int count = 0, left = 0;\n    long long product = 1;\n    for (int right = 0; right < nums.size(); right++) {\n        product *= nums[right];\n        while (product >= k && left <= right) {\n            product /= nums[left++];\n        }\n        count += (right - left + 1); // Subarrays size count add\n    }\n    return count;\n}`,
      complexity: "Time: O(N), Space: O(1)"
    },
    hinglish: {
      explanation: "### Intuition\nSliding window lagakar array ke contiguous sub-segments ka product track karenge. Agar product dynamic target check `k` ko hit karta hai, toh `left` pointer aage badhakar product reduce karenge.",
      pseudocode: "function productLessK(nums, k):\n    left = 0, prod = 1, count = 0\n    for right = 0 to n-1:\n        prod *= nums[right]\n        while prod >= k:\n            prod /= nums[left++]\n        count += (right - left + 1)"
    }
  },
  "dutch-national-flag-problem": {
    brute: {
      code: `#include <vector>\n#include <algorithm>\nusing namespace std;\n\nvoid sortColorsBrute(vector<int>& nums) {\n    sort(nums.begin(), nums.end());\n}`,
      complexity: "Time: O(N log N), Space: O(1)"
    },
    optimal: {
      code: `#include <vector>\n#include <algorithm>\nusing namespace std;\n\nvoid sortColors(vector<int>& nums) {\n    int low = 0, mid = 0, high = nums.size() - 1;\n    while (mid <= high) {\n        if (nums[mid] == 0) {\n            swap(nums[low++], nums[mid++]);\n        } else if (nums[mid] == 1) {\n            mid++;\n        } else {\n            swap(nums[mid], nums[high--]);\n        }\n    }\n}`,
      complexity: "Time: O(N), Space: O(1)"
    },
    hinglish: {
      explanation: "### Intuition\nThree pointer (low, mid, high) use karenge. `0` ko extreme left array bounds `low` me swap karenge, `2` ko extreme right array bounds `high` me aur `1` ko middle coordinates index values me rehne denge.",
      pseudocode: "function sortColors(nums):\n    low = 0, mid = 0, high = n-1\n    while mid <= high:\n        if nums[mid] == 0: swap(low++, mid++)\n        else if nums[mid] == 1: mid++\n        else: swap(mid, high--)"
    }
  },
  "quadruple-sum-to-target": {
    brute: {
      code: `#include <vector>\n#include <algorithm>\n#include <set>\nusing namespace std;\n\nvector<vector<int>> fourSumBrute(vector<int>& nums, int target) {\n    int n = nums.size();\n    set<vector<int>> st;\n    for(int i=0; i<n; i++) {\n        for(int j=i+1; j<n; j++) {\n            for(int k=j+1; k<n; k++) {\n                for(int l=k+1; l<n; l++) {\n                    if((long long)nums[i]+nums[j]+nums[k]+nums[l] == target) {\n                        vector<int> temp = {nums[i], nums[j], nums[k], nums[l]};\n                        sort(temp.begin(), temp.end());\n                        st.insert(temp);\n                    }\n                }\n            }\n        }\n    }\n    return vector<vector<int>>(st.begin(), st.end());\n}`,
      complexity: "Time: O(N^4), Space: O(Number of quadruplets)"
    },
    optimal: {
      code: `#include <vector>\n#include <algorithm>\nusing namespace std;\n\nvector<vector<int>> fourSum(vector<int>& nums, int target) {\n    int n = nums.size();\n    vector<vector<int>> res;\n    if (n < 4) return res;\n    sort(nums.begin(), nums.end());\n    for (int i = 0; i < n - 3; i++) {\n        if (i > 0 && nums[i] == nums[i - 1]) continue;\n        for (int j = i + 1; j < n - 2; j++) {\n            if (j > i + 1 && nums[j] == nums[j - 1]) continue;\n            int left = j + 1, right = n - 1;\n            while (left < right) {\n                long long sum = (long long)nums[i] + nums[j] + nums[left] + nums[right];\n                if (sum == target) {\n                    res.push_back({nums[i], nums[j], nums[left], nums[right]});\n                    while (left < right && nums[left] == nums[left + 1]) left++;\n                    while (left < right && nums[right] == nums[right - 1]) right--;\n                    left++; right--;\n                } else if (sum < target) left++;\n                else right--;\n            }\n        }\n    }\n    return res;\n}`,
      complexity: "Time: O(N^3), Space: O(1)"
    },
    hinglish: {
      explanation: "### Intuition\nTriplet sum ko update karke do outer loops lagayenge, aur inner 2-sum pointer model implement karke remaining targets find karenge.",
      pseudocode: "function fourSum(nums, target):\n    sort(nums)\n    for i = 0 to n-4:\n        for j = i+1 to n-3:\n            left = j+1, right = n-1\n            while left < right:\n                sum = nums[i]+nums[j]+nums[left]+nums[right]\n                if sum == target: add; skip_duplicates; left++; right--\n                else if sum < target: left++\n                else: right--"
    }
  },
  "comparing-strings-containing-backspaces": {
    brute: {
      code: `#include <string>\n#include <stack>\nusing namespace std;\n\nstring build(string s) {\n    stack<char> st;\n    for(char c : s) {\n        if(c != '#') st.push(c);\n        else if(!st.empty()) st.pop();\n    }\n    string res = \"\";\n    while(!st.empty()) { res += st.top(); st.pop(); }\n    return res;\n}\nbool backspaceCompareBrute(string s, string t) {\n    return build(s) == build(t);\n}`,
      complexity: "Time: O(N + M), Space: O(N + M)"
    },
    optimal: {
      code: `#include <string>\nusing namespace std;\n\nbool backspaceCompare(string s, string t) {\n    int i = s.length() - 1, j = t.length() - 1;\n    int skipS = 0, skipT = 0;\n    while (i >= 0 || j >= 0) {\n        while (i >= 0) {\n            if (s[i] == '#') { skipS++; i--; }\n            else if (skipS > 0) { skipS--; i--; }\n            else break;\n        }\n        while (j >= 0) {\n            if (t[j] == '#') { skipT++; j--; }\n            else if (skipT > 0) { skipT--; j--; }\n            else break;\n        }\n        if (i >= 0 && j >= 0 && s[i] != t[j]) return false;\n        if ((i >= 0) != (j >= 0)) return false;\n        i--; j--;\n    }\n    return true;\n}`,
      complexity: "Time: O(N + M), Space: O(1)"
    },
    hinglish: {
      explanation: "### Intuition\nStrings ko backwards (end se) check karenge. `#` character milte hi skip counter badhayenge aur character drop karenge. Dono pointer positions constant checks check valid elements verify checks compile.",
      pseudocode: "function backspace(s, t):\n    i = s.len-1, j = t.len-1\n    while i >= 0 or j >= 0:\n        find_next_valid_char_for_both_strings_using_skip_counters\n        compare(s[i], t[j])\n        i--; j--"
    }
  },
  "minimum-window-sort": {
    brute: {
      code: `#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint findUnsortedSubarrayBrute(vector<int>& nums) {\n    vector<int> sorted_nums = nums;\n    sort(sorted_nums.begin(), sorted_nums.end());\n    int n = nums.size();\n    int start = n, end = 0;\n    for(int i=0; i<n; i++) {\n        if(nums[i] != sorted_nums[i]) {\n            start = min(start, i);\n            end = max(end, i);\n        }\n    }\n    return (end - start >= 0) ? (end - start + 1) : 0;\n}`,
      complexity: "Time: O(N log N), Space: O(N)"
    },
    optimal: {
      code: `#include <vector>\n#include <algorithm>\n#include <climits>\nusing namespace std;\n\nint findUnsortedSubarray(vector<int>& nums) {\n    int n = nums.size();\n    int low = 0, high = n - 1;\n    while (low < n - 1 && nums[low] <= nums[low + 1]) low++;\n    if (low == n - 1) return 0;\n    while (high > 0 && nums[high] >= nums[high - 1]) high--;\n    int subarrayMax = INT_MIN, subarrayMin = INT_MAX;\n    for (int k = low; k <= high; k++) {\n        subarrayMax = max(subarrayMax, nums[k]);\n        subarrayMin = min(subarrayMin, nums[k]);\n    }\n    while (low > 0 && nums[low - 1] > subarrayMin) low--;\n    while (high < n - 1 && nums[high + 1] < subarrayMax) high++;\n    return high - low + 1;\n}`,
      complexity: "Time: O(N), Space: O(1)"
    },
    hinglish: {
      explanation: "### Intuition\nArray me sorting out of bounds values locate karenge left se right. Us range ke elements ka local min aur max dhoondhenge, fir check karenge ki left or right limits extend karni hain ya nahi.",
      pseudocode: "function unsortedSub(nums):\n    find first drop index 'low'\n    find first rise index 'high' from back\n    find min/max elements in nums[low..high]\n    expand 'low' left if nums[low-1] > min\n    expand 'high' right if nums[high+1] < max\n    return high - low + 1"
    }
  },

  // === FAST & SLOW POINTERS ===
  "start-of-linkedlist-cycle": {
    brute: {
      code: `#include <unordered_set>\nusing namespace std;\n\nstruct ListNode {\n    int val;\n    ListNode *next;\n    ListNode(int x) : val(x), next(NULL) {}\n};\n\nListNode *detectCycleBrute(ListNode *head) {\n    unordered_set<ListNode*> visited;\n    while (head != NULL) {\n        if (visited.count(head)) return head;\n        visited.insert(head);\n        head = head->next;\n    }\n    return NULL;\n}`,
      complexity: "Time: O(N), Space: O(N)"
    },
    optimal: {
      code: `#include <iostream>\nusing namespace std;\n\nstruct ListNode {\n    int val;\n    ListNode *next;\n    ListNode(int x) : val(x), next(NULL) {}\n};\n\nListNode *detectCycle(ListNode *head) {\n    ListNode *slow = head, *fast = head;\n    while (fast != NULL && fast->next != NULL) {\n        slow = slow->next;\n        fast = fast->next->next;\n        if (slow == fast) { // Cycle detected\n            ListNode *entry = head;\n            while (slow != entry) {\n                slow = slow->next;\n                entry = entry->next;\n            }\n            return entry;\n        }\n    }\n    return NULL;\n}`,
      complexity: "Time: O(N), Space: O(1)"
    },
    hinglish: {
      explanation: "### Intuition\nFloyd's Cycle detection apply karenge. Jab `slow == fast` collision point coordinate mile, head pointer index values aur collision points pointers sequential parallel iterate checks entry node locate details resolve target.",
      pseudocode: "function cycleStart(head):\n    slow = head, fast = head\n    while fast and fast.next:\n        slow = slow.next, fast = fast.next.next\n        if slow == fast:\n            entry = head\n            while slow != entry:\n                slow = slow.next, entry = entry.next\n            return entry\n    return null"
    }
  },
  "happy-number": {
    brute: {
      code: `#include <unordered_set>\nusing namespace std;\n\nint getSum(int n) {\n    int sum = 0;\n    while(n > 0) {\n        int d = n % 10;\n        sum += d*d;\n        n /= 10;\n    }\n    return sum;\n}\nbool isHappyBrute(int n) {\n    unordered_set<int> seen;\n    while(n != 1 && !seen.count(n)) {\n        seen.insert(n);\n        n = getSum(n);\n    }\n    return n == 1;\n}`,
      complexity: "Time: O(log N), Space: O(log N)"
    },
    optimal: {
      code: `using namespace std;\n\nint getNext(int n) {\n    int totalSum = 0;\n    while (n > 0) {\n        int d = n % 10;\n        totalSum += d * d;\n        n /= 10;\n    }\n    return totalSum;\n}\n\nbool isHappy(int n) {\n    int slow = n;\n    int fast = getNext(n);\n    while (fast != 1 && slow != fast) {\n        slow = getNext(slow);\n        fast = getNext(getNext(fast));\n    }\n    return fast == 1;\n}`,
      complexity: "Time: O(log N), Space: O(1)"
    },
    hinglish: {
      explanation: "### Intuition\nSquares calculation dynamic loops loop validate sequences represent cycle boundaries. Slow and fast variables speed values match condition check cycle detection logic.",
      pseudocode: "function isHappy(n):\n    slow = n, fast = sumOfSquares(n)\n    while fast != 1 and slow != fast:\n        slow = sumOfSquares(slow)\n        fast = sumOfSquares(sumOfSquares(fast))\n    return fast == 1"
    }
  },
  "find-duplicate-number": {
    brute: {
      code: `#include <vector>\n#include <unordered_set>\nusing namespace std;\n\nint findDuplicateBrute(vector<int>& nums) {\n    unordered_set<int> seen;\n    for(int x : nums) {\n        if(seen.count(x)) return x;\n        seen.insert(x);\n    }\n    return -1;\n}`,
      complexity: "Time: O(N), Space: O(N)"
    },
    optimal: {
      code: `#include <vector>\nusing namespace std;\n\nint findDuplicate(vector<int>& nums) {\n    int slow = nums[0];\n    int fast = nums[0];\n    do {\n        slow = nums[slow];\n        fast = nums[nums[fast]];\n    } while (slow != fast);\n    fast = nums[0];\n    while (slow != fast) {\n        slow = nums[slow];\n        fast = nums[fast];\n    }\n    return slow;\n}`,
      complexity: "Time: O(N), Space: O(1)"
    },
    hinglish: {
      explanation: "### Intuition\nArray elements values ko pointer jump link index represent paths mapping values. Floyd's loop cycle start coordinates checks find intersection value matches.",
      pseudocode: "slow = nums[0], fast = nums[0]\n    do slow = nums[slow], fast = nums[nums[fast]] while slow != fast\n    fast = nums[0]\n    while slow != fast:\n        slow = nums[slow], fast = nums[fast]\n    return slow"
    }
  },
  "palindrome-linkedlist": {
    brute: {
      code: `#include <vector>\nusing namespace std;\n\nstruct ListNode {\n    int val;\n    ListNode *next;\n    ListNode(int x) : val(x), next(NULL) {}\n};\n\nbool isPalindromeBrute(ListNode* head) {\n    vector<int> vals;\n    while(head) { vals.push_back(head->val); head = head->next; }\n    int l = 0, r = vals.size() - 1;\n    while(l < r) {\n        if(vals[l++] != vals[r--]) return false;\n    }\n    return true;\n}`,
      complexity: "Time: O(N), Space: O(N)"
    },
    optimal: {
      code: `#include <iostream>\nusing namespace std;\n\nstruct ListNode {\n    int val;\n    ListNode *next;\n    ListNode(int x) : val(x), next(NULL) {}\n};\n\nListNode* reverseList(ListNode* head) {\n    ListNode* prev = NULL;\n    while (head) {\n        ListNode* nextNode = head->next;\n        head->next = prev;\n        prev = head;\n        head = nextNode;\n    }\n    return prev;\n}\n\nbool isPalindrome(ListNode* head) {\n    ListNode *slow = head, *fast = head;\n    while (fast && fast->next) {\n        slow = slow->next;\n        fast = fast->next->next;\n    }\n    ListNode* reversedHalf = reverseList(slow);\n    ListNode* curr = head;\n    while (reversedHalf) {\n        if (curr->val != reversedHalf->val) return false;\n        curr = curr->next;\n        reversedHalf = reversedHalf->next;\n    }\n    return true;\n}`,
      complexity: "Time: O(N), Space: O(1)"
    },
    hinglish: {
      explanation: "### Intuition\nFast-slow pointers mid node locate elements values. Mid list nodes sequence elements link path flip reverse list operations. compare standard items first half elements values.",
      pseudocode: "find_mid(slow, fast);\n    reversed = reverse(slow);\n    while reversed:\n        if head.val != reversed.val: return false\n        head = head.next; reversed = reversed.next\n    return true"
    }
  },
  "rearrange-linkedlist": {
    brute: {
      code: `#include <vector>\nusing namespace std;\n\nstruct ListNode {\n    int val;\n    ListNode *next;\n    ListNode(int x) : val(x), next(NULL) {}\n};\n\nvoid reorderListBrute(ListNode* head) {\n    if(!head) return;\n    vector<ListNode*> nodes;\n    while(head) { nodes.push_back(head); head = head->next; }\n    int i = 0, j = nodes.size() - 1;\n    while(i < j) {\n        nodes[i]->next = nodes[j];\n        i++;\n        if(i == j) break;\n        nodes[j]->next = nodes[i];\n        j--;\n    }\n    nodes[i]->next = NULL;\n}`,
      complexity: "Time: O(N), Space: O(N)"
    },
    optimal: {
      code: `#include <iostream>\nusing namespace std;\n\nstruct ListNode {\n    int val;\n    ListNode *next;\n    ListNode(int x) : val(x), next(NULL) {}\n};\n\nListNode* reverse(ListNode* head) {\n    ListNode* prev = NULL;\n    while(head) {\n        ListNode* next = head->next;\n        head->next = prev;\n        prev = head;\n        head = next;\n    }\n    return prev;\n}\n\nvoid reorderList(ListNode* head) {\n    if(!head || !head->next) return;\n    ListNode *slow = head, *fast = head;\n    while(fast && fast->next) {\n        slow = slow->next;\n        fast = fast->next->next;\n    }\n    ListNode* second = reverse(slow->next);\n    slow->next = NULL; // Split list\n    ListNode* first = head;\n    while(second) {\n        ListNode* t1 = first->next;\n        ListNode* t2 = second->next;\n        first->next = second;\n        second->next = t1;\n        first = t1;\n        second = t2;\n    }\n}`,
      complexity: "Time: O(N), Space: O(1)"
    },
    hinglish: {
      explanation: "### Intuition\nMid nodes search index coordinates lists bounds splits. Reverse list links checks half sub list nodes sequence. Pointers updates map merge elements sequence alternatives checks.",
      pseudocode: "mid = findMid(head);\n    reversedHead = reverse(mid.next);\n    mid.next = null;\n    mergeAlternate(head, reversedHead);"
    }
  },
  "cycle-in-circular-array": {
    brute: {
      code: `#include <vector>\n#include <unordered_set>\nusing namespace std;\n\nbool circularArrayLoopBrute(vector<int>& nums) {\n    int n = nums.size();\n    for(int i=0; i<n; i++) {\n        unordered_set<int> visited;\n        int curr = i;\n        bool isForward = nums[i] > 0;\n        while(true) {\n            if(visited.count(curr)) {\n                if(visited.size() > 1 && curr == i) return true;\n                break;\n            }\n            visited.insert(curr);\n            int next = ((curr + nums[curr]) % n + n) % n;\n            if((nums[next] > 0) != isForward || nums[next] % n == 0) break;\n            curr = next;\n        }\n    }\n    return false;\n}`,
      complexity: "Time: O(N^2), Space: O(N)"
    },
    optimal: {
      code: `#include <vector>\nusing namespace std;\n\nint getNextIndex(const vector<int>& nums, int index, bool isForward) {\n    bool direction = nums[index] >= 0;\n    if (direction != isForward) return -1;\n    int n = nums.size();\n    int nextIndex = ((index + nums[index]) % n + n) % n;\n    if (nextIndex == index) return -1; // Single element loop invalid\n    return nextIndex;\n}\n\nbool circularArrayLoop(vector<int>& nums) {\n    int n = nums.size();\n    for (int i = 0; i < n; i++) {\n        if (nums[i] == 0) continue;\n        int slow = i, fast = i;\n        bool isForward = nums[i] >= 0;\n        do {\n            slow = getNextIndex(nums, slow, isForward);\n            fast = getNextIndex(nums, fast, isForward);\n            if (fast != -1) {\n                fast = getNextIndex(nums, fast, isForward);\n            }\n        } while (slow != -1 && fast != -1 && slow != fast);\n        if (slow != -1 && slow == fast) return true;\n        // Mark visited path elements to 0\n        int curr = i;\n        while (getNextIndex(nums, curr, isForward) != -1) {\n            int next = getNextIndex(nums, curr, isForward);\n            nums[curr] = 0;\n            curr = next;\n        }\n    }\n    return false;\n}`,
      complexity: "Time: O(N), Space: O(1)"
    },
    hinglish: {
      explanation: "### Intuition\nFast and slow pointers cyclic validation circular jumping tracking. Direction shifts validation matching forward/backward sign properties checks index loops path loops detection.",
      pseudocode: "for each index: slow=i, fast=i\n    do: slow=next(slow), fast=next(next(fast))\n    while slow != -1 and fast != -1 and slow != fast\n    if slow == fast -> cycle"
    }
  },

  // === SLIDING WINDOW ===
  "smallest-subarray-sum": {
    brute: {
      code: `#include <vector>\n#include <algorithm>\n#include <climits>\nusing namespace std;\n\nint minSubArrayLenBrute(int target, vector<int>& nums) {\n    int n = nums.size();\n    int minLen = INT_MAX;\n    for(int i=0; i<n; i++) {\n        int sum = 0;\n        for(int j=i; j<n; j++) {\n            sum += nums[j];\n            if(sum >= target) {\n                minLen = min(minLen, j - i + 1);\n                break;\n            }\n        }\n    }\n    return minLen == INT_MAX ? 0 : minLen;\n}`,
      complexity: "Time: O(N^2), Space: O(1)"
    },
    optimal: {
      code: `#include <vector>\n#include <algorithm>\n#include <climits>\nusing namespace std;\n\nint minSubArrayLen(int target, vector<int>& nums) {\n    int n = nums.size();\n    int minLen = INT_MAX;\n    int left = 0, currentSum = 0;\n    for (int right = 0; right < n; right++) {\n        currentSum += nums[right];\n        while (currentSum >= target) {\n            minLen = min(minLen, right - left + 1);\n            currentSum -= nums[left++];\n        }\n    }\n    return minLen == INT_MAX ? 0 : minLen;\n}`,
      complexity: "Time: O(N), Space: O(1)"
    },
    hinglish: {
      explanation: "### Intuition\nContiguous subarray sum target check sliding bounds setup. Shrink left side bounds when running sum >= target, tracking minimal length dynamically.",
      pseudocode: "left = 0, sum = 0, minLen = infinity\n    for right = 0 to n-1:\n        sum += nums[right]\n        while sum >= target:\n            minLen = min(minLen, right-left+1)\n            sum -= nums[left++]"
    }
  },
  "longest-substring-k-distinct": {
    brute: {
      code: `#include <string>\n#include <unordered_set>\n#include <algorithm>\nusing namespace std;\n\nint longestKDistinctBrute(string s, int k) {\n    int maxLen = 0, n = s.length();\n    for(int i=0; i<n; i++) {\n        unordered_set<char> st;\n        for(int j=i; j<n; j++) {\n            st.insert(s[j]);\n            if(st.size() <= k) maxLen = max(maxLen, j - i + 1);\n            else break;\n        }\n    }\n    return maxLen;\n}`,
      complexity: "Time: O(N^2), Space: O(K)"
    },
    optimal: {
      code: `#include <string>\n#include <unordered_map>\n#include <algorithm>\nusing namespace std;\n\nint longestKDistinct(string s, int k) {\n    if (k == 0) return 0;\n    int left = 0, maxLen = 0;\n    unordered_map<char, int> charFreq;\n    for (int right = 0; right < s.length(); right++) {\n        charFreq[s[right]]++;\n        while (charFreq.size() > k) {\n            charFreq[s[left]]--;\n            if (charFreq[s[left]] == 0) {\n                charFreq.erase(s[left]);\n            }\n            left++;\n        }\n        maxLen = max(maxLen, right - left + 1);\n    }\n    return maxLen;\n}`,
      complexity: "Time: O(N), Space: O(K)"
    },
    hinglish: {
      explanation: "### Intuition\nSliding window dynamically sized track map frequencies of characters. Shrink left pointer elements check map counts values drop 0.",
      pseudocode: "left = 0, maxLen = 0\n    for right = 0 to len-1:\n        freq[s[right]]++\n        while freq.size > k:\n            freq[s[left]]--\n            if freq[s[left]] == 0: delete freq[s[left]]\n            left++\n        maxLen = max(maxLen, right-left+1)"
    }
  },
  "fruits-into-baskets": {
    brute: {
      code: `#include <vector>\n#include <unordered_set>\n#include <algorithm>\nusing namespace std;\n\nint totalFruitBrute(vector<int>& fruits) {\n    int maxFruits = 0, n = fruits.size();\n    for(int i=0; i<n; i++) {\n        unordered_set<int> st;\n        for(int j=i; j<n; j++) {\n            st.insert(fruits[j]);\n            if(st.size() <= 2) maxFruits = max(maxFruits, j - i + 1);\n            else break;\n        }\n    }\n    return maxFruits;\n}`,
      complexity: "Time: O(N^2), Space: O(1)"
    },
    optimal: {
      code: `#include <vector>\n#include <unordered_map>\n#include <algorithm>\nusing namespace std;\n\nint totalFruit(vector<int>& fruits) {\n    int left = 0, maxFruits = 0;\n    unordered_map<int, int> basket;\n    for (int right = 0; right < fruits.size(); right++) {\n        basket[fruits[right]]++;\n        while (basket.size() > 2) {\n            basket[fruits[left]]--;\n            if (basket[fruits[left]] == 0) {\n                basket.erase(fruits[left]);\n            }\n            left++;\n        }\n        maxFruits = max(maxFruits, right - left + 1);\n    }\n    return maxFruits;\n}`,
      complexity: "Time: O(N), Space: O(1)"
    },
    hinglish: {
      explanation: "### Intuition\nThis is identical to Longest Substring with K = 2 distinct elements. We maintain a window with at most 2 types of fruits.",
      pseudocode: "Exactly Longest Substring with K=2 distinct types of elements."
    }
  },
  "no-repeat-substring": {
    brute: {
      code: `#include <string>\n#include <unordered_set>\n#include <algorithm>\nusing namespace std;\n\nint lengthOfLongestSubstringBrute(string s) {\n    int maxLen = 0, n = s.length();\n    for(int i=0; i<n; i++) {\n        unordered_set<char> st;\n        for(int j=i; j<n; j++) {\n            if(st.count(s[j])) break;\n            st.insert(s[j]);\n            maxLen = max(maxLen, j - i + 1);\n        }\n    }\n    return maxLen;\n}`,
      complexity: "Time: O(N^2), Space: O(N)"
    },
    optimal: {
      code: `#include <string>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint lengthOfLongestSubstring(string s) {\n    vector<int> charIdx(128, -1);\n    int left = 0, maxLen = 0;\n    for (int right = 0; right < s.length(); right++) {\n        if (charIdx[s[right]] >= left) {\n            left = charIdx[s[right]] + 1; // Direct jump left pointer\n        }\n        charIdx[s[right]] = right;\n        maxLen = max(maxLen, right - left + 1);\n    }\n    return maxLen;\n}`,
      complexity: "Time: O(N), Space: O(Min(M, A)) where A is alphabet size"
    },
    hinglish: {
      explanation: "### Intuition\nRepeating element track vector coordinates indexes structure jump values. Character repeat lookup check position directly shift left boundary.",
      pseudocode: "left = 0, maxLen = 0\n    for right = 0 to len-1:\n        if s[right] in map: left = max(left, last_index + 1)\n        update last_index\n        maxLen = max(maxLen, right-left+1)"
    }
  },
  "longest-substring-same-letters": {
    brute: {
      code: `#include <string>\n#include <algorithm>\n#include <unordered_map>\nusing namespace std;\n\nint characterReplacementBrute(string s, int k) {\n    int maxLen = 0, n = s.length();\n    for(int i=0; i<n; i++) {\n        unordered_map<char, int> freq;\n        int maxFreq = 0;\n        for(int j=i; j<n; j++) {\n            freq[s[j]]++;\n            maxFreq = max(maxFreq, freq[s[j]]);\n            int replaceCount = (j - i + 1) - maxFreq;\n            if(replaceCount <= k) maxLen = max(maxLen, j - i + 1);\n            else break;\n        }\n    }\n    return maxLen;\n}`,
      complexity: "Time: O(N^2), Space: O(26)"
    },
    optimal: {
      code: `#include <string>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint characterReplacement(string s, int k) {\n    vector<int> count(26, 0);\n    int left = 0, maxFreq = 0, maxLen = 0;\n    for (int right = 0; right < s.length(); right++) {\n        count[s[right] - 'A']++;\n        maxFreq = max(maxFreq, count[s[right] - 'A']);\n        int replaceCount = (right - left + 1) - maxFreq;\n        if (replaceCount > k) {\n            count[s[left] - 'A']--;\n            left++;\n        }\n        maxLen = max(maxLen, right - left + 1);\n    }\n    return maxLen;\n}`,
      complexity: "Time: O(N), Space: O(26)"
    },
    hinglish: {
      explanation: "### Intuition\nWindow size minus max repeat character frequency tells us replacement modifications. If modifications > k, shrink window from left.",
      pseudocode: "left = 0, maxFreq = 0, maxLen = 0\n    for right = 0 to len-1:\n        freq[s[right]]++\n        maxFreq = max(maxFreq, freq[s[right]])\n        if (window_size - maxFreq) > k:\n            freq[s[left++]]--\n        maxLen = max(maxLen, right-left+1)"
    }
  },
  "longest-subarray-ones": {
    brute: {
      code: `#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint longestOnesBrute(vector<int>& nums, int k) {\n    int maxLen = 0, n = nums.size();\n    for(int i=0; i<n; i++) {\n        int zeroCount = 0;\n        for(int j=i; j<n; j++) {\n            if(nums[j] == 0) zeroCount++;\n            if(zeroCount <= k) maxLen = max(maxLen, j - i + 1);\n            else break;\n        }\n    }\n    return maxLen;\n}`,
      complexity: "Time: O(N^2), Space: O(1)"
    },
    optimal: {
      code: `#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint longestOnes(vector<int>& nums, int k) {\n    int left = 0, zeroCount = 0, maxLen = 0;\n    for (int right = 0; right < nums.size(); right++) {\n        if (nums[right] == 0) zeroCount++;\n        while (zeroCount > k) {\n            if (nums[left] == 0) zeroCount--;\n            left++;\n        }\n        maxLen = max(maxLen, right - left + 1);\n    }\n    return maxLen;\n}`,
      complexity: "Time: O(N), Space: O(1)"
    },
    hinglish: {
      explanation: "### Intuition\nWindow structure 0 elements count limit tracking. Zero count k limit cross window start index left pointer shrink.",
      pseudocode: "left = 0, zeroCount = 0, maxLen = 0\n    for right = 0 to n-1:\n        if val == 0: zeroCount++\n        while zeroCount > k:\n            if leftVal == 0: zeroCount--\n            left++\n        maxLen = max(maxLen, right-left+1)"
    }
  },
  "min-size-subarray-sum-dup": {
    brute: {
      code: `// Same as smallest-subarray-sum brute force`,
      complexity: "Time: O(N^2), Space: O(1)"
    },
    optimal: {
      code: `// Same as smallest-subarray-sum optimal implementation`,
      complexity: "Time: O(N), Space: O(1)"
    },
    hinglish: {
      explanation: "### Intuition\nExactly identical to Smallest Subarray Sum. Pointers slide to capture minimum indices bounds.",
      pseudocode: "Refer to smallest-subarray-sum algorithm."
    }
  },
  "minimum-window-substring": {
    brute: {
      code: `#include <string>\n#include <unordered_map>\n#include <climits>\nusing namespace std;\n\nbool containsAll(unordered_map<char, int>& window, unordered_map<char, int>& target) {\n    for(auto p : target) {\n        if(window[p.first] < p.second) return false;\n    }\n    return true;\n}\nstring minWindowBrute(string s, string t) {\n    int n = s.length(), minLen = INT_MAX, start = -1;\n    unordered_map<char, int> targetFreq;\n    for(char c : t) targetFreq[c]++;\n    for(int i=0; i<n; i++) {\n        unordered_map<char, int> windowFreq;\n        for(int j=i; j<n; j++) {\n            windowFreq[s[j]]++;\n            if(containsAll(windowFreq, targetFreq)) {\n                if(j - i + 1 < minLen) {\n                    minLen = j - i + 1;\n                    start = i;\n                }\n                break;\n            }\n        }\n    }\n    return start == -1 ? \"\" : s.substr(start, minLen);\n}`,
      complexity: "Time: O(N^2 * Alphabet), Space: O(Alphabet)"
    },
    optimal: {
      code: `#include <string>\n#include <vector>\n#include <climits>\nusing namespace std;\n\nstring minWindow(string s, string t) {\n    vector<int> map(128, 0);\n    for (char c : t) map[c]++;\n    int counter = t.size(), begin = 0, end = 0, d = INT_MAX, head = 0;\n    while (end < s.size()) {\n        if (map[s[end++]]-- > 0) counter--;\n        while (counter == 0) {\n            if (end - begin < d) d = end - (head = begin);\n            if (map[s[begin++]]++ == 0) counter++;\n        }\n    }\n    return d == INT_MAX ? \"\" : s.substr(head, d);\n}`,
      complexity: "Time: O(N + M), Space: O(1)"
    },
    hinglish: {
      explanation: "### Intuition\nTarget pattern characters search frequency map match checks. Count total target chars found, shrink window boundaries when complete match condition satisfies.",
      pseudocode: "build frequency map for T\n    while end < S.len:\n        decrement target count if matches\n        while target count is fully satisfied:\n            update min_length substring bounds\n            restore characters counts shifting begin pointers"
    }
  },
  "permutation-in-string": {
    brute: {
      code: `#include <string>\n#include <algorithm>\nusing namespace std;\n\nbool checkInclusionBrute(string s1, string s2) {\n    int n1 = s1.length(), n2 = s2.length();\n    if(n1 > n2) return false;\n    sort(s1.begin(), s1.end());\n    for(int i=0; i<=n2-n1; i++) {\n        string sub = s2.substr(i, n1);\n        sort(sub.begin(), sub.end());\n        if(s1 == sub) return true;\n    }\n    return false;\n}`,
      complexity: "Time: O((N2 - N1) * N1 log N1), Space: O(N1)"
    },
    optimal: {
      code: `#include <string>\n#include <vector>\nusing namespace std;\n\nbool checkInclusion(string s1, string s2) {\n    int len1 = s1.length(), len2 = s2.length();\n    if (len1 > len2) return false;\n    vector<int> count1(26, 0), count2(26, 0);\n    for (int i = 0; i < len1; i++) {\n        count1[s1[i] - 'a']++;\n        count2[s2[i] - 'a']++;\n    }\n    if (count1 == count2) return true;\n    for (int i = len1; i < len2; i++) {\n        count2[s2[i] - 'a']++;\n        count2[s2[i - len1] - 'a']--;\n        if (count1 == count2) return true;\n    }\n    return false;\n}`,
      complexity: "Time: O(N), Space: O(26)"
    },
    hinglish: {
      explanation: "### Intuition\nFixed length sliding window logic checks. s1 permutations search matching s2 subsegment window representation using running frequency array configurations.",
      pseudocode: "if s1.len > s2.len: return false\n    initialize frequency tables for first s1.len chars\n    for sliding window slides:\n        add next right element frequency, subtract left element frequency\n        if frequency maps match: return true"
    }
  },
  "string-anagrams": {
    brute: {
      code: `// Similar to permutation-in-string brute, saving indexes`,
      complexity: "Time: O(N * M log M), Space: O(M)"
    },
    optimal: {
      code: `#include <vector>\n#include <string>\nusing namespace std;\n\nvector<int> findAnagrams(string s, string p) {\n    int lenS = s.length(), lenP = p.length();\n    vector<int> res;\n    if (lenS < lenP) return res;\n    vector<int> countP(26, 0), countS(26, 0);\n    for (int i = 0; i < lenP; i++) {\n        countP[p[i] - 'a']++;\n        countS[s[i] - 'a']++;\n    }\n    if (countP == countS) res.push_back(0);\n    for (int i = lenP; i < lenS; i++) {\n        countS[s[i] - 'a']++;\n        countS[s[i - lenP] - 'a']--;\n        if (countP == countS) res.push_back(i - lenP + 1);\n    }\n    return res;\n}`,
      complexity: "Time: O(N), Space: O(26)"
    },
    hinglish: {
      explanation: "### Intuition\nThis is identical to finding s1 permutations in s2, but we collect all starting indices of matching windows.",
      pseudocode: "Same sliding window frequency match checks as permutation search, pushing index to result array."
    }
  },
  "words-concatenation": {
    brute: {
      code: `// Nested scans generating string combinations`,
      complexity: "Time: O(N * NumWords * WordLen), Space: O(NumWords * WordLen)"
    },
    optimal: {
      code: `#include <vector>\n#include <string>\n#include <unordered_map>\nusing namespace std;\n\nvector<int> findSubstring(string s, vector<string>& words) {\n    vector<int> result;\n    if (s.empty() || words.empty()) return result;\n    int wordLen = words[0].length(), numWords = words.size();\n    int totalLen = wordLen * numWords;\n    if (s.length() < totalLen) return result;\n    unordered_map<string, int> wordCount;\n    for (const string& w : words) wordCount[w]++;\n    for (int i = 0; i <= (int)s.length() - totalLen; i++) {\n        unordered_map<string, int> seen;\n        int j = 0;\n        for (; j < numWords; j++) {\n            string sub = s.substr(i + j * wordLen, wordLen);\n            if (wordCount.count(sub)) {\n                seen[sub]++;\n                if (seen[sub] > wordCount[sub]) break;\n            } else {\n                break;\n            }\n        }\n        if (j == numWords) result.push_back(i);\n    }\n    return result;\n}`,
      complexity: "Time: O(N * NumWords * WordLen), Space: O(NumWords)"
    },
    hinglish: {
      explanation: "### Intuition\nSlice words pieces checking matched lengths. For every start index, grab subsegments equal to word lengths and check if valid concatenation sequence matching words list counts.",
      pseudocode: "map wordCounts\n    for i = 0 to s.len - totalWordsLen:\n        map seen\n        for j = 0 to numWords:\n            extract sub string word slice\n            if word invalid or seen count exceeds: break\n        if all words matched: add i to result"
    }
  },

  // === KADANE PATTERN ===
  "minimum-subarray-sum": {
    brute: {
      code: `#include <vector>\n#include <algorithm>\n#include <climits>\nusing namespace std;\n\nint minSubArraySumBrute(vector<int>& nums) {\n    int n = nums.size();\n    int minSum = INT_MAX;\n    for(int i=0; i<n; i++) {\n        int sum = 0;\n        for(int j=i; j<n; j++) {\n            sum += nums[j];\n            minSum = min(minSum, sum);\n        }\n    }\n    return minSum;\n}`,
      complexity: "Time: O(N^2), Space: O(1)"
    },
    optimal: {
      code: `#include <vector>\n#include <algorithm>\n#include <climits>\nusing namespace std;\n\nint minSubArraySum(vector<int>& nums) {\n    int minSum = INT_MAX;\n    int currSum = 0;\n    for(int num : nums) {\n        currSum += num;\n        minSum = min(minSum, currSum);\n        if(currSum > 0) currSum = 0; // Kadane reverse reset\n    }\n    return minSum;\n}`,
      complexity: "Time: O(N), Space: O(1)"
    },
    hinglish: {
      explanation: "### Intuition\nKadane algorithm in reverse logic checks. Accumulate negative sum, if current sum goes positive, reset to 0 to capture minimum sum subarray.",
      pseudocode: "currSum = 0, minSum = infinity\n    for num in nums:\n        currSum += num\n        minSum = min(minSum, currSum)\n        if currSum > 0: currSum = 0"
    }
  },
  "maximum-product-subarray": {
    brute: {
      code: `#include <vector>\n#include <algorithm>\n#include <climits>\nusing namespace std;\n\nint maxProductBrute(vector<int>& nums) {\n    int n = nums.size();\n    int maxProd = INT_MIN;\n    for(int i=0; i<n; i++) {\n        long long prod = 1;\n        for(int j=i; j<n; j++) {\n            prod *= nums[j];\n            if(prod > INT_MAX) break;\n            maxProd = max(maxProd, (int)prod);\n        }\n    }\n    return maxProd;\n}`,
      complexity: "Time: O(N^2), Space: O(1)"
    },
    optimal: {
      code: `#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint maxProduct(vector<int>& nums) {\n    int n = nums.size();\n    double maxVal = nums[0];\n    double minVal = nums[0];\n    double maxProd = nums[0];\n    for (int i = 1; i < n; i++) {\n        if (nums[i] < 0) swap(maxVal, minVal); // Multiply by negative flips min/max\n        maxVal = max((double)nums[i], maxVal * nums[i]);\n        minVal = min((double)nums[i], minVal * nums[i]);\n        maxProd = max(maxProd, maxVal);\n    }\n    return (int)maxProd;\n}`,
      complexity: "Time: O(N), Space: O(1)"
    },
    hinglish: {
      explanation: "### Intuition\nRunning product tracking. Negative values swap maxVal and minVal because multiplying a negative flips the extreme bounds. Track running min and max products.",
      pseudocode: "for num in nums:\n        if num < 0: swap(currMax, currMin)\n        currMax = max(num, currMax * num)\n        currMin = min(num, currMin * num)\n        ans = max(ans, currMax)"
    }
  },
  "max-subarray-sum-one-deletion": {
    brute: {
      code: `// Remove each element and run Kadane max sum`,
      complexity: "Time: O(N^2), Space: O(1)"
    },
    optimal: {
      code: `#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint maximumSum(vector<int>& arr) {\n    int n = arr.size();\n    vector<int> fw(n), bw(n);\n    int currMax = arr[0], maxVal = arr[0];\n    fw[0] = arr[0];\n    for (int i = 1; i < n; i++) {\n        currMax = max(arr[i], currMax + arr[i]);\n        fw[i] = currMax;\n        maxVal = max(maxVal, fw[i]);\n    }\n    bw[n - 1] = arr[n - 1];\n    currMax = arr[n - 1];\n    for (int i = n - 2; i >= 0; i--) {\n        currMax = max(arr[i], currMax + arr[i]);\n        bw[i] = currMax;\n    }\n    for (int i = 1; i < n - 1; i++) {\n        maxVal = max(maxVal, fw[i - 1] + bw[i + 1]);\n    }\n    return maxVal;\n}`,
      complexity: "Time: O(N), Space: O(N)"
    },
    hinglish: {
      explanation: "### Intuition\nForward and backward Kadane arrays setup. For every index i, skip element i, sum equals `fw[i-1] + bw[i+1]`, select maximum overall.",
      pseudocode: "compute forward max sums fw\n    compute backward max sums bw\n    result = max(fw)\n    for i = 1 to n-2: result = max(result, fw[i-1] + bw[i+1])"
    }
  },
  "max-absolute-sum-subarray": {
    brute: {
      code: `// Nested loop checking absolute sums`,
      complexity: "Time: O(N^2), Space: O(1)"
    },
    optimal: {
      code: `#include <vector>\n#include <algorithm>\n#include <cmath>\nusing namespace std;\n\nint maxAbsoluteSum(vector<int>& nums) {\n    int maxVal = 0, minVal = 0;\n    int maxSoFar = 0, minSoFar = 0;\n    for(int num : nums) {\n        maxSoFar = max(num, maxSoFar + num);\n        maxVal = max(maxVal, maxSoFar);\n        minSoFar = min(num, minSoFar + num);\n        minVal = min(minVal, minSoFar);\n    }\n    return max(maxVal, abs(minVal));\n}`,
      complexity: "Time: O(N), Space: O(1)"
    },
    hinglish: {
      explanation: "### Intuition\nWe simultaneously track the maximum subarray sum (via Kadane) and minimum subarray sum. The maximum absolute sum is simply the maximum of `max_sum` and `abs(min_sum)`.",
      pseudocode: "Run standard Kadane for max_sum and min_sum. Return max(max_sum, abs(min_sum))."
    }
  },
  "max-sum-circular-array": {
    brute: {
      code: `// Checked nested circular indexing loops`,
      complexity: "Time: O(N^2), Space: O(1)"
    },
    optimal: {
      code: `#include <vector>\n#include <algorithm>\n#include <numeric>\nusing namespace std;\n\nint maxSubarraySumCircular(vector<int>& nums) {\n    int totalSum = 0;\n    int maxVal = nums[0], currMax = 0;\n    int minVal = nums[0], currMin = 0;\n    for (int num : nums) {\n        totalSum += num;\n        currMax = max(num, currMax + num);\n        maxVal = max(maxVal, currMax);\n        currMin = min(num, currMin + num);\n        minVal = min(minVal, currMin);\n    }\n    if (maxVal < 0) return maxVal; // All negative elements\n    return max(maxVal, totalSum - minVal);\n}`,
      complexity: "Time: O(N), Space: O(1)"
    },
    hinglish: {
      explanation: "### Intuition\nMax sum circular subarray coordinates: target is either normal subarray in middle (standard Kadane) or wraps around. Wraparound sum = totalSum - minimum subarray sum.",
      pseudocode: "total = sum(nums)\n    max_normal = KadaneMax(nums)\n    min_normal = KadaneMin(nums)\n    if max_normal < 0: return max_normal\n    return max(max_normal, total - min_normal)"
    }
  }
};
