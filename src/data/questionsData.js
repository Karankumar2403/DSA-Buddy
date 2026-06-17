// C++ answers for all questions are structured here.
// Key questions contain full interactive dry run states, C++ code tabs, and Hinglish pseudocode notes.

export const topicsData = [
  {
    id: "two-pointers",
    title: "Two Pointers",
    description: "Use two pointers moving in tandem or opposite directions to search pairs or process arrays with O(1) extra space.",
    questions: [
      {
        id: "pair-with-target-sum",
        title: "Pair with Target Sum (easy)",
        difficulty: "Easy",
        leetcode: "https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/description/",
        gfg: "",
        brute: {
          code: `// Brute Force: Check all pairs
// Time Complexity: O(N^2) | Space Complexity: O(1)
#include <vector>
using namespace std;

vector<int> twoSum(vector<int>& numbers, int target) {
    int n = numbers.size();
    for (int i = 0; i < n; i++) {
        for (int j = i + 1; j < n; j++) {
            if (numbers[i] + numbers[j] == target) {
                return {i + 1, j + 1}; // 1-based index
            }
        }
    }
    return {-1, -1};
}`,
          complexity: "Time: O(N^2), Space: O(1)"
        },
        better: {
          code: `// Better Approach: Hash Map to store seen numbers
// Time Complexity: O(N) | Space Complexity: O(N)
#include <vector>
#include <unordered_map>
using namespace std;

vector<int> twoSum(vector<int>& numbers, int target) {
    unordered_map<int, int> mp;
    for (int i = 0; i < numbers.size(); i++) {
        int complement = target - numbers[i];
        if (mp.count(complement)) {
            return {mp[complement] + 1, i + 1};
        }
        mp[numbers[i]] = i;
    }
    return {-1, -1};
}`,
          complexity: "Time: O(N), Space: O(N)"
        },
        optimal: {
          code: `// Optimal Approach: Two Pointers (works since array is sorted)
// Time Complexity: O(N) | Space Complexity: O(1)
#include <vector>
using namespace std;

vector<int> twoSum(vector<int>& numbers, int target) {
    int left = 0;
    int right = numbers.size() - 1;
    while (left < right) {
        int current_sum = numbers[left] + numbers[right];
        if (current_sum == target) {
            return {left + 1, right + 1}; // 1-based indexing
        } else if (current_sum < target) {
            left++; // Sum chhota hai, bada karne ke liye left pointer badhao
        } else {
            right--; // Sum bada hai, chhota karne ke liye right pointer ghatao
        }
    }
    return {-1, -1};
}`,
          complexity: "Time: O(N), Space: O(1)"
        },
        hinglish: {
          explanation: `### Intuition (Pehle Soch)
Hume array sorted mil rha hai.
1. **Brute Force (N^2)**: Hum har pair check kar sakte hain \`i\` aur \`j\` chalakar.
2. **Better (O(N) space)**: Map mein values store karke index fetch kar sakte hain. But sorted property use nahi ho rahi isme.
3. **Optimal (Two Pointers)**: Kyuki array already sorted hai, hum ek pointer start (\`left\`) par aur ek pointer end (\`right\`) par rakh sakte hain.
- Agar current sum target se bada hai, iska matlab hume sum kam karne ki zarurat hai, isliye hum \`right\` ko peeche layenge (\`right--\`).
- Agar current sum target se chota hai, iska matlab sum badhane ki zarurat hai, isliye \`left\` ko aage badhayenge (\`left++\`).
- Jaise hi sum target ke equal hoga, return kar denge.`,
          pseudocode: `function twoSum(numbers, target):
    left = 0
    right = numbers.length - 1
    while left < right:
        current_sum = numbers[left] + numbers[right]
        if current_sum == target:
            return [left + 1, right + 1]
        else if current_sum < target:
            left = left + 1
        else:
            right = right - 1
    return [-1, -1]`
        },
        simulator: {
          inputType: "two-pointers-sum",
          defaultInput: { arr: [2, 7, 11, 15], target: 9 },
          steps: [
            { line: 2, vars: { left: 0, right: 3, sum: null, target: 9, arr: [2, 7, 11, 15] }, explanation: "Pehle left pointer ko index 0 (value = 2) par aur right pointer ko index 3 (value = 15) par rakha." },
            { line: 4, vars: { left: 0, right: 3, sum: 17, target: 9, arr: [2, 7, 11, 15] }, explanation: "Dono pointers ka sum check kiya: 2 + 15 = 17." },
            { line: 5, vars: { left: 0, right: 3, sum: 17, target: 9, arr: [2, 7, 11, 15] }, explanation: "Kya sum (17) target (9) ke barabar hai? Nahi." },
            { line: 7, vars: { left: 0, right: 3, sum: 17, target: 9, arr: [2, 7, 11, 15] }, explanation: "Kya sum (17) target (9) se chota hai? Nahi. Toh right pointer ko peeche layenge." },
            { line: 10, vars: { left: 0, right: 2, sum: 17, target: 9, arr: [2, 7, 11, 15] }, explanation: "Right pointer decrement kiya (right = 2, value = 11)." },
            { line: 4, vars: { left: 0, right: 2, sum: 13, target: 9, arr: [2, 7, 11, 15] }, explanation: "Dono pointers ka naya sum calculate kiya: 2 + 11 = 13." },
            { line: 10, vars: { left: 0, right: 1, sum: 13, target: 9, arr: [2, 7, 11, 15] }, explanation: "Sum (13) target (9) se bada hai, isliye right pointer ko fir se decrement kiya (right = 1, value = 7)." },
            { line: 4, vars: { left: 0, right: 1, sum: 9, target: 9, arr: [2, 7, 11, 15] }, explanation: "Dono pointers ka naya sum calculate kiya: 2 + 7 = 9." },
            { line: 5, vars: { left: 0, right: 1, sum: 9, target: 9, arr: [2, 7, 11, 15] }, explanation: "Kya sum (9) target (9) ke barabar hai? Haan! Answer mil gaya." },
            { line: 6, vars: { left: 0, right: 1, sum: 9, target: 9, arr: [2, 7, 11, 15] }, explanation: "Hum indexes (1-based): {left + 1, right + 1} = {1, 2} return kar denge." }
          ]
        }
      },
      {
        id: "rearrange-0-and-1",
        title: "Rearrange 0 and 1 (easy)",
        difficulty: "Easy",
        leetcode: "",
        gfg: "https://www.geeksforgeeks.org/problems/segregate-0s-and-1s5106/1",
        brute: {
          code: `// Brute Force: Sort the array
// Time Complexity: O(N log N) | Space Complexity: O(1)
#include <vector>
#include <algorithm>
using namespace std;

void segregate0and1(vector<int>& arr) {
    sort(arr.begin(), arr.end());
}`,
          complexity: "Time: O(N log N), Space: O(1)"
        },
        better: {
          code: `// Better: Count number of 0s
// Time Complexity: O(N) | Space Complexity: O(1) (requires 2 passes)
#include <vector>
using namespace std;

void segregate0and1(vector<int>& arr) {
    int count0 = 0;
    for (int num : arr) {
        if (num == 0) count0++;
    }
    for (int i = 0; i < arr.size(); i++) {
        if (i < count0) arr[i] = 0;
        else arr[i] = 1;
    }
}`,
          complexity: "Time: O(N), Space: O(1) (2-pass)"
        },
        optimal: {
          code: `// Optimal: Two Pointers (1-pass)
// Time Complexity: O(N) | Space Complexity: O(1)
#include <vector>
using namespace std;

void segregate0and1(vector<int>& arr) {
    int left = 0;
    int right = arr.size() - 1;
    while (left < right) {
        if (arr[left] == 0) {
            left++;
        } else if (arr[right] == 1) {
            right--;
        } else {
            swap(arr[left], arr[right]);
            left++;
            right--;
        }
    }
}`,
          complexity: "Time: O(N), Space: O(1) (1-pass)"
        },
        hinglish: {
          explanation: `### Intuition (Pehle Soch)
Hume saare 0s ko left aur saare 1s ko right mein lana hai.
1. **Brute Force**: Array ko standard Sorting algorithms se sort kar do. Time: O(N log N).
2. **Better (Count method)**: Ek baar traverse karke saare 0s gin lo. Fir starting elements ko 0 aur baakiyo ko 1 kar do. Time: O(N) but 2 passes.
3. **Optimal (Two Pointers)**: Ek \`left\` pointer rakho index 0 par aur \`right\` pointer end par.
- Agar \`arr[left] == 0\` hai, toh left aage badhao (\`left++\`).
- Agar \`arr[right] == 1\` hai, toh right peeche badhao (\`right--\`).
- Agar \`arr[left] == 1\` aur \`arr[right] == 0\` hai, toh dono ko swap kar do, aur \`left++\`, \`right--\` kar do.`,
          pseudocode: `function segregate(arr):
    left = 0
    right = arr.length - 1
    while left < right:
        if arr[left] == 0:
            left = left + 1
        else if arr[right] == 1:
            right = right - 1
        else:
            swap(arr[left], arr[right])
            left = left + 1
            right = right - 1`
        },
        simulator: {
          inputType: "two-pointers-segregate",
          defaultInput: { arr: [1, 0, 1, 0, 0, 1] },
          steps: [
            { line: 2, vars: { left: 0, right: 5, arr: [1, 0, 1, 0, 0, 1] }, explanation: "Left pointer index 0 (value=1) aur right pointer index 5 (value=1) par initialized." },
            { line: 6, vars: { left: 0, right: 4, arr: [1, 0, 1, 0, 0, 1] }, explanation: "arr[right] ki value 1 hai. Right pointer ko decrement kiya (right = 4, value=0)." },
            { line: 8, vars: { left: 1, right: 3, arr: [0, 0, 1, 0, 1, 1] }, explanation: "arr[left] is 1 aur arr[right] is 0. Dono ko swap kiya. Left pointer 1 hua aur Right pointer 3 hua." },
            { line: 4, vars: { left: 2, right: 3, arr: [0, 0, 1, 0, 1, 1] }, explanation: "arr[left] index 1 par 0 hai. Left pointer aage badhaya (left = 2, value=1)." },
            { line: 8, vars: { left: 3, right: 2, arr: [0, 0, 0, 1, 1, 1] }, explanation: "arr[left] index 2 par 1 hai aur arr[right] index 3 par 0 hai. Swap kiya aur pointers move kiye." },
            { line: 3, vars: { left: 3, right: 2, arr: [0, 0, 0, 1, 1, 1] }, explanation: "Ab left (3) >= right (2) ho gaya, loop se exit kiya. Array segregated!" }
          ]
        }
      },
      {
        id: "remove-duplicates-easy",
        title: "Remove Duplicates (easy)",
        difficulty: "Easy",
        leetcode: "https://leetcode.com/problems/remove-duplicates-from-sorted-array/description/",
        gfg: "",
        brute: {
          code: `// Brute Force: Set use karke duplicates remove karna
// Time Complexity: O(N log N) | Space Complexity: O(N)
#include <vector>
#include <set>
using namespace std;

int removeDuplicates(vector<int>& nums) {
    set<int> st(nums.begin(), nums.end());
    int index = 0;
    for (int x : st) {
        nums[index++] = x;
    }
    return st.size();
}`,
          complexity: "Time: O(N log N), Space: O(N)"
        },
        optimal: {
          code: `// Optimal: Two Pointers (In-place)
// Time Complexity: O(N) | Space Complexity: O(1)
#include <vector>
using namespace std;

int removeDuplicates(vector<int>& nums) {
    if (nums.empty()) return 0;
    int i = 0; // unique element pointer
    for (int j = 1; j < nums.size(); j++) {
        if (nums[j] != nums[i]) {
            i++;
            nums[i] = nums[j]; // unique element copy kar diya naye position pe
        }
    }
    return i + 1;
}`,
          complexity: "Time: O(N), Space: O(1)"
        },
        hinglish: {
          explanation: `### Intuition (Pehle Soch)
Array sorted hai, matlab identical elements saath-saath honge.
1. **Brute Force**: Set ka use karein. Elements set mein daalkar wapas array mein overwrite karein. Par isme extra space lagta hai.
2. **Optimal**: Do pointers use karein. Ek pointer \`i\` unique elements ki count/position track karega, aur \`j\` se array scan karenge.
- Jab bhi koi naya element mile (\`nums[j] != nums[i]\`), toh \`i\` ko aage badhayein aur us naye element ko \`nums[i]\` par write kar dein.`,
          pseudocode: `function removeDuplicates(nums):
    if nums.length == 0: return 0
    i = 0
    for j = 1 to nums.length - 1:
        if nums[j] != nums[i]:
            i = i + 1
            nums[i] = nums[j]
    return i + 1`
        },
        simulator: {
          inputType: "remove-duplicates",
          defaultInput: { arr: [1, 1, 2, 2, 3] },
          steps: [
            { line: 3, vars: { i: 0, j: 1, arr: [1, 1, 2, 2, 3] }, explanation: "i pointer index 0 par set kiya. j pointer index 1 se loop start karega." },
            { line: 5, vars: { i: 0, j: 2, arr: [1, 1, 2, 2, 3] }, explanation: "j=1 aur i=0 dono ki value 1 hai (duplicate). Hum aage badhenge." },
            { line: 6, vars: { i: 1, j: 2, arr: [1, 2, 2, 2, 3] }, explanation: "j=2 par value 2 hai, jo i=0 (value 1) se different hai. i ko badhakar i=1 kiya, aur nums[1] ko 2 kar diya." },
            { line: 5, vars: { i: 1, j: 3, arr: [1, 2, 2, 2, 3] }, explanation: "j=3 par value 2 hai, jo i=1 (value 2) ke equal hai. Duplicate hai, skip!" },
            { line: 6, vars: { i: 2, j: 4, arr: [1, 2, 3, 2, 3] }, explanation: "j=4 par value 3 hai, jo i=1 (value 2) se different hai. i ko badhakar i=2 kiya, aur nums[2] ko 3 kiya." },
            { line: 8, vars: { i: 2, j: 5, arr: [1, 2, 3, 2, 3] }, explanation: "Loop end hua. Unique length return karenge: i + 1 = 3." }
          ]
        }
      },
      { id: "squaring-a-sorted-array", title: "Squaring a Sorted Array (easy)", difficulty: "Easy", leetcode: "https://leetcode.com/problems/squares-of-a-sorted-array/", gfg: "" },
      { id: "triplet-sum-to-zero", title: "Triplet Sum to Zero (medium)", difficulty: "Medium", leetcode: "https://leetcode.com/problems/3sum/", gfg: "" },
      { id: "triplet-sum-close-to-target", title: "Triplet Sum Close to Target (medium)", difficulty: "Medium", leetcode: "https://leetcode.com/problems/3sum-closest/", gfg: "" },
      { id: "triplets-with-smaller-sum", title: "Triplets with Smaller Sum (medium)", difficulty: "Medium", leetcode: "", gfg: "https://www.geeksforgeeks.org/problems/count-triplets-with-sum-smaller-than-x5549/1" },
      { id: "subarrays-with-product-less-than-a-target", title: "Subarrays with Product Less than a Target (medium)", difficulty: "Medium", leetcode: "https://leetcode.com/problems/subarray-product-less-than-k/", gfg: "" },
      { id: "dutch-national-flag-problem", title: "Dutch National Flag Problem (medium)", difficulty: "Medium", leetcode: "https://leetcode.com/problems/sort-colors/description/", gfg: "" },
      { id: "quadruple-sum-to-target", title: "Quadruple Sum to Target (medium)", difficulty: "Medium", leetcode: "https://leetcode.com/problems/4sum/", gfg: "" },
      { id: "comparing-strings-containing-backspaces", title: "Comparing Strings containing Backspaces (medium)", difficulty: "Medium", leetcode: "https://leetcode.com/problems/backspace-string-compare/", gfg: "" },
      { id: "minimum-window-sort", title: "Minimum Window Sort (medium)", difficulty: "Medium", leetcode: "https://leetcode.com/problems/shortest-unsorted-continuous-subarray/", gfg: "" }
    ]
  },
  {
    id: "fast-slow-pointers",
    title: "Fast & Slow Pointers",
    description: "Use two pointers moving at different speeds (usually one pointer moves twice as fast as the other) to detect cycles and patterns.",
    questions: [
      {
        id: "linkedlist-cycle",
        title: "LinkedList Cycle (easy)",
        difficulty: "Easy",
        leetcode: "https://leetcode.com/problems/linked-list-cycle/",
        gfg: "",
        brute: {
          code: `// Brute Force: Use Hash Set to store visited nodes
// Time Complexity: O(N) | Space Complexity: O(N)
#include <unordered_set>
using namespace std;

struct ListNode {
    int val;
    ListNode *next;
    ListNode(int x) : val(x), next(NULL) {}
};

bool hasCycle(ListNode *head) {
    unordered_set<ListNode*> visited;
    ListNode *curr = head;
    while (curr != nullptr) {
        if (visited.count(curr)) {
            return true;
        }
        visited.insert(curr);
        curr = curr->next;
    }
    return false;
}`,
          complexity: "Time: O(N), Space: O(N)"
        },
        optimal: {
          code: `// Optimal Approach: Floyd's Cycle Detection (Tortoise and Hare)
// Time Complexity: O(N) | Space Complexity: O(1)
struct ListNode {
    int val;
    ListNode *next;
    ListNode(int x) : val(x), next(NULL) {}
};

bool hasCycle(ListNode *head) {
    if (head == nullptr || head->next == nullptr) return false;
    
    ListNode *slow = head;
    ListNode *fast = head;
    
    while (fast != nullptr && fast->next != nullptr) {
        slow = slow->next;       // Slow ek step aage badhega
        fast = fast->next->next; // Fast do step aage badhega
        
        if (slow == fast) {
            return true; // Dono mil gaye, cycle present hai
        }
    }
    return false; // Loop end ho gaya, cycle nahi hai
}`,
          complexity: "Time: O(N), Space: O(1)"
        },
        hinglish: {
          explanation: `### Intuition (Pehle Soch)
Hume check karna hai ki linked list mein circular path (cycle) hai ya nahi.
1. **Brute Force**: Hum har node par visit karte hue use ek Set/Map mein rakh sakte hain. Agar list traverse karte waqt koi node dobara dikhe jo set mein pehle se hai, iska matlab cycle hai. Isme O(N) auxiliary space lagega.
2. **Optimal (Fast & Slow Pointers)**:
- Do pointers banayein: \`slow\` aur \`fast\`, dono head par honge.
- \`slow\` ko ek node aage badhayein (\`slow = slow.next\`) aur \`fast\` ko do node aage (\`fast = fast.next.next\`).
- Agar cycle nahi hai, toh \`fast\` null par pahunch jayega.
- Agar cycle hai, toh \`fast\` circle mein ghumte hue peeche se \`slow\` ko pakad lega, aur dono kisi node par mil jayenge (\`slow == fast\`).`,
          pseudocode: `function hasCycle(head):
    if head == null: return false
    slow = head
    fast = head
    while fast != null and fast.next != null:
        slow = slow.next
        fast = fast.next.next
        if slow == fast:
            return true
    return false`
        },
        simulator: {
          inputType: "linkedlist-cycle",
          defaultInput: { nodes: [3, 2, 0, -4], pos: 1 },
          steps: [
            { line: 8, vars: { slow: 0, fast: 0, nodes: [3, 2, 0, -4], pos: 1 }, explanation: "Slow aur fast pointer head node (value = 3) par set kiya." },
            { line: 11, vars: { slow: 1, fast: 2, nodes: [3, 2, 0, -4], pos: 1 }, explanation: "Slow 1 step aage badha (value = 2). Fast 2 steps aage badha (value = 0)." },
            { line: 11, vars: { slow: 2, fast: 0, nodes: [3, 2, 0, -4], pos: 1 }, explanation: "Slow 1 step badha (value = 0). Fast circular path ke through index 1 node par gaya, phir index 0 node par nahi, direct index 3 (-4) se back to index 1 (value = 2). Toh fast index 0 par aaya. (Values: slow=0, fast=2)." },
            { line: 11, vars: { slow: 3, fast: 2, nodes: [3, 2, 0, -4], pos: 1 }, explanation: "Slow badha (value = -4). Fast circular path ke along move karke 2 aur aage badha (values match now at index 1)." },
            { line: 14, vars: { slow: 1, fast: 1, match: true }, explanation: "Slow aur fast pointers identical node (index 1, value = 2) par meet kar gaye. Cycle found! Return true." }
          ]
        }
      },
      { id: "start-of-linkedlist-cycle", title: "Start of LinkedList Cycle (medium)", difficulty: "Medium", leetcode: "https://leetcode.com/problems/linked-list-cycle-ii/", gfg: "" },
      { id: "happy-number", title: "Happy Number (medium)", difficulty: "Medium", leetcode: "https://leetcode.com/problems/happy-number/", gfg: "" },
      { id: "find-duplicate-number", title: "FIND DUPLICATE NUMBER", difficulty: "Medium", leetcode: "https://leetcode.com/problems/find-the-duplicate-number/description/", gfg: "" },
      { id: "middle-of-linkedlist", title: "Middle of the LinkedList (easy)", difficulty: "Easy", leetcode: "https://leetcode.com/problems/middle-of-the-linked-list/", gfg: "" },
      { id: "palindrome-linkedlist", title: "Palindrome LinkedList (medium)", difficulty: "Medium", leetcode: "https://leetcode.com/problems/palindrome-linked-list/", gfg: "" },
      { id: "rearrange-linkedlist", title: "Rearrange a LinkedList (medium)", difficulty: "Medium", leetcode: "https://leetcode.com/problems/reorder-list/", gfg: "" },
      { id: "cycle-in-circular-array", title: "Cycle in a Circular Array (hard)", difficulty: "Hard", leetcode: "https://leetcode.com/problems/circular-array-loop/", gfg: "" }
    ]
  },
  {
    id: "sliding-window",
    title: "Sliding Window",
    description: "Maintain a sub-segment (window) of elements and slide it over the sequence to satisfy target criteria in linear time.",
    questions: [
      {
        id: "max-sum-subarray-of-size-k",
        title: "Maximum Sum Subarray of Size K (easy)",
        difficulty: "Easy",
        leetcode: "",
        gfg: "https://www.geeksforgeeks.org/problems/max-sum-subarray-of-size-k5313/1",
        brute: {
          code: `// Brute Force: Check all subarrays of size K
// Time Complexity: O(N * K) | Space Complexity: O(1)
#include <vector>
#include <algorithm>
using namespace std;

long maximumSumSubarray(int K, vector<int>& Arr, int N) {
    long max_sum = 0;
    for (int i = 0; i <= N - K; i++) {
        long current_sum = 0;
        for (int j = i; j < i + K; j++) {
            current_sum += Arr[j];
        }
        max_sum = max(max_sum, current_sum);
    }
    return max_sum;
}`,
          complexity: "Time: O(N * K), Space: O(1)"
        },
        optimal: {
          code: `// Optimal: Sliding Window
// Time Complexity: O(N) | Space Complexity: O(1)
#include <vector>
#include <algorithm>
using namespace std;

long maximumSumSubarray(int K, vector<int>& Arr, int N) {
    long current_sum = 0;
    // Pehle K elements ka sum nikaal lo
    for (int i = 0; i < K; i++) {
        current_sum += Arr[i];
    }
    
    long max_sum = current_sum;
    // Window ko slide karo
    for (int i = K; i < N; i++) {
        current_sum += Arr[i] - Arr[i - K]; // Naya element add karo, purana element subtract karo
        max_sum = max(max_sum, current_sum);
    }
    
    return max_sum;
}`,
          complexity: "Time: O(N), Space: O(1)"
        },
        hinglish: {
          explanation: `### Intuition (Pehle Soch)
Hume contiguous subarray chahiye jiska size exact \`K\` ho aur sum maximum ho.
1. **Brute Force (O(N * K))**: Har starting index \`i\` ke liye, \`K\` elements ka sum nikaalo. Isse duplicate additions hote hain.
2. **Optimal (Sliding Window)**:
- Pehle starting ke \`K\` elements ka sum nikaal lo.
- Jab hum window ko 1 step aage khiskayenge (slide karenge), toh naya element index \`i\` add hoga aur purana element index \`i-K\` window se nikal jayega.
- Iska sum hum O(1) mein nikal sakte hain: \`current_sum = current_sum + Arr[i] - Arr[i - K]\`.
- Har step par maximum track karte raho.`,
          pseudocode: `function maximumSumSubarray(K, Arr, N):
    current_sum = sum of first K elements
    max_sum = current_sum
    for i = K to N - 1:
        current_sum = current_sum + Arr[i] - Arr[i - K]
        max_sum = max(max_sum, current_sum)
    return max_sum`
        },
        simulator: {
          inputType: "sliding-window-max",
          defaultInput: { arr: [2, 1, 5, 1, 3, 2], k: 3 },
          steps: [
            { line: 2, vars: { k: 3, current_sum: 8, max_sum: 8, i: 2, arr: [2, 1, 5, 1, 3, 2] }, explanation: "Pehle 3 elements [2, 1, 5] ka sum nikala: 2 + 1 + 5 = 8. max_sum ko bhi 8 set kiya." },
            { line: 9, vars: { k: 3, current_sum: 7, max_sum: 8, i: 3, arr: [2, 1, 5, 1, 3, 2] }, explanation: "Window slide hui. Element 1 (arr[3]) add kiya, aur 2 (arr[0]) subtract kiya. Naya sum = 8 + 1 - 2 = 7. max_sum remains 8." },
            { line: 9, vars: { k: 3, current_sum: 9, max_sum: 9, i: 4, arr: [2, 1, 5, 1, 3, 2] }, explanation: "Window slide hui. Element 3 (arr[4]) add kiya, aur 1 (arr[1]) subtract kiya. Naya sum = 7 + 3 - 1 = 9. max_sum is updated to 9." },
            { line: 9, vars: { k: 3, current_sum: 6, max_sum: 9, i: 5, arr: [2, 1, 5, 1, 3, 2] }, explanation: "Window slide hui. Element 2 (arr[5]) add kiya, aur 5 (arr[2]) subtract kiya. Naya sum = 9 + 2 - 5 = 6. max_sum remains 9." },
            { line: 12, vars: { current_sum: 6, max_sum: 9 }, explanation: "Loop khatam. Maximum sum of subarray of size 3 is 9." }
          ]
        }
      },
      { id: "smallest-subarray-sum", title: "Smallest Subarray with a given sum (easy)", difficulty: "Easy", leetcode: "https://leetcode.com/problems/minimum-size-subarray-sum/", gfg: "" },
      { id: "longest-substring-k-distinct", title: "Longest Substring with K Distinct Characters (medium)", difficulty: "Medium", leetcode: "", gfg: "https://www.geeksforgeeks.org/problems/longest-k-unique-characters-substring0853/1" },
      { id: "fruits-into-baskets", title: "Fruits into Baskets (medium)", difficulty: "Medium", leetcode: "https://leetcode.com/problems/fruit-into-baskets/", gfg: "" },
      { id: "no-repeat-substring", title: "No-repeat Substring (hard)", difficulty: "Hard", leetcode: "https://leetcode.com/problems/longest-substring-without-repeating-characters/", gfg: "" },
      { id: "longest-substring-same-letters", title: "Longest Substring with Same Letters after Replacement (hard)", difficulty: "Hard", leetcode: "https://leetcode.com/problems/longest-repeating-character-replacement/", gfg: "" },
      { id: "longest-subarray-ones", title: "Longest Subarray with Ones after Replacement (hard)", difficulty: "Hard", leetcode: "https://leetcode.com/problems/max-consecutive-ones-iii/", gfg: "" },
      { id: "min-size-subarray-sum-dup", title: "Minimum size subarray SUM", difficulty: "Medium", leetcode: "https://leetcode.com/problems/minimum-size-subarray-sum/", gfg: "" },
      { id: "minimum-window-substring", title: "MInimum Size Substring (HARD)", difficulty: "Hard", leetcode: "https://leetcode.com/problems/minimum-window-substring/description/", gfg: "" },
      { id: "permutation-in-string", title: "Problem Challenge 1: Permutation in a String (hard)", difficulty: "Hard", leetcode: "https://leetcode.com/problems/permutation-in-string/", gfg: "" },
      { id: "string-anagrams", title: "Problem Challenge 2: String Anagrams (hard)", difficulty: "Hard", leetcode: "https://leetcode.com/problems/find-all-anagrams-in-a-string/", gfg: "" },
      { id: "words-concatenation", title: "Problem Challenge 4: Words Concatenation (hard)", difficulty: "Hard", leetcode: "https://leetcode.com/problems/substring-with-concatenation-of-all-words/", gfg: "" }
    ]
  },
  {
    id: "kadane-pattern",
    title: "Kadane Pattern",
    description: "Keep track of the maximum sum of subarray ending at each position and update the global max sum.",
    questions: [
      {
        id: "maximum-subarray-sum",
        title: "Maximum subarray sum",
        difficulty: "Easy",
        leetcode: "https://leetcode.com/problems/maximum-subarray/",
        gfg: "",
        brute: {
          code: `// Brute Force: Check sum of all possible subarrays
// Time Complexity: O(N^2) | Space Complexity: O(1)
#include <vector>
#include <algorithm>
using namespace std;

int maxSubArray(vector<int>& nums) {
    int max_sum = nums[0];
    int n = nums.size();
    for (int i = 0; i < n; i++) {
        int current_sum = 0;
        for (int j = i; j < n; j++) {
            current_sum += nums[j];
            max_sum = max(max_sum, current_sum);
        }
    }
    return max_sum;
}`,
          complexity: "Time: O(N^2), Space: O(1)"
        },
        optimal: {
          code: `// Optimal: Kadane's Algorithm
// Time Complexity: O(N) | Space Complexity: O(1)
#include <vector>
#include <algorithm>
using namespace std;

int maxSubArray(vector<int>& nums) {
    int max_sum = nums[0];
    int current_sum = 0;
    for (int num : nums) {
        current_sum += num;
        max_sum = max(max_sum, current_sum);
        if (current_sum < 0) {
            current_sum = 0; // Agar cumulative sum negative ho jaye, use reset kar do
        }
    }
    return max_sum;
}`,
          complexity: "Time: O(N), Space: O(1)"
        },
        hinglish: {
          explanation: `### Intuition (Pehle Soch)
Hume maximum sum wala continuous subarray nikalna hai.
1. **Brute Force (O(N^2))**: Saare possible subarrays ka sum check karein.
2. **Optimal (Kadane's Algorithm)**:
- Hum array mein aage badhte hue current sum (\`current_sum\`) calculate karte hain.
- Har step par hum update karte hain ki abhi tak ka sabse bada sum (\`max_sum\`) kya mila hai.
- **Important logic**: Agar kisi index par \`current_sum\` negative (\`< 0\`) ho jaye, toh aage ke subarray mein use add karne se sum kam hi hoga, isliye hum use fir se \`0\` par reset kar dete hain.`,
          pseudocode: `function maxSubArray(nums):
    max_sum = nums[0]
    current_sum = 0
    for num in nums:
        current_sum = current_sum + num
        max_sum = max(max_sum, current_sum)
        if current_sum < 0:
            current_sum = 0
    return max_sum`
        },
        simulator: {
          inputType: "kadane",
          defaultInput: { arr: [-2, 1, -3, 4, -1, 2, 1] },
          steps: [
            { line: 2, vars: { current_sum: 0, max_sum: -2, num: null, arr: [-2, 1, -3, 4, -1, 2, 1] }, explanation: "Initialize max_sum with the first element (-2) and current_sum with 0." },
            { line: 5, vars: { current_sum: -2, max_sum: -2, num: -2, arr: [-2, 1, -3, 4, -1, 2, 1] }, explanation: "Step 1: num = -2. current_sum = 0 + (-2) = -2. max_sum is -2." },
            { line: 8, vars: { current_sum: 0, max_sum: -2, num: -2, arr: [-2, 1, -3, 4, -1, 2, 1] }, explanation: "current_sum is negative (-2), so we reset current_sum to 0." },
            { line: 5, vars: { current_sum: 1, max_sum: 1, num: 1, arr: [-2, 1, -3, 4, -1, 2, 1] }, explanation: "Step 2: num = 1. current_sum = 0 + 1 = 1. max_sum is updated to 1." },
            { line: 5, vars: { current_sum: -2, max_sum: 1, num: -3, arr: [-2, 1, -3, 4, -1, 2, 1] }, explanation: "Step 3: num = -3. current_sum = 1 + (-3) = -2. max_sum is still 1." },
            { line: 8, vars: { current_sum: 0, max_sum: 1, num: -3, arr: [-2, 1, -3, 4, -1, 2, 1] }, explanation: "current_sum is negative, reset to 0." },
            { line: 5, vars: { current_sum: 4, max_sum: 4, num: 4, arr: [-2, 1, -3, 4, -1, 2, 1] }, explanation: "Step 4: num = 4. current_sum = 0 + 4 = 4. max_sum is updated to 4." },
            { line: 5, vars: { current_sum: 3, max_sum: 4, num: -1, arr: [-2, 1, -3, 4, -1, 2, 1] }, explanation: "Step 5: num = -1. current_sum = 4 + (-1) = 3. max_sum remains 4." },
            { line: 5, vars: { current_sum: 5, max_sum: 5, num: 2, arr: [-2, 1, -3, 4, -1, 2, 1] }, explanation: "Step 6: num = 2. current_sum = 3 + 2 = 5. max_sum is updated to 5." },
            { line: 5, vars: { current_sum: 6, max_sum: 6, num: 1, arr: [-2, 1, -3, 4, -1, 2, 1] }, explanation: "Step 7: num = 1. current_sum = 5 + 1 = 6. max_sum is updated to 6. End of array." },
            { line: 11, vars: { current_sum: 6, max_sum: 6 }, explanation: "Return max_sum = 6." }
          ]
        }
      },
      { id: "minimum-subarray-sum", title: "Minimum Subarray Sum", difficulty: "Easy", leetcode: "", gfg: "https://www.geeksforgeeks.org/problems/smallest-sum-contiguous-subarray/1" },
      { id: "maximum-product-subarray", title: "Maximum product subarray", difficulty: "Medium", leetcode: "https://leetcode.com/problems/maximum-product-subarray/", gfg: "" },
      { id: "max-subarray-sum-one-deletion", title: "Maximum subarray sum with one deletion", difficulty: "Hard", leetcode: "https://leetcode.com/problems/maximum-subarray-sum-with-one-deletion/description/", gfg: "" },
      { id: "max-absolute-sum-subarray", title: "Maximum absolute sum of any subarray", difficulty: "Medium", leetcode: "https://leetcode.com/problems/maximum-absolute-sum-of-any-subarray/", gfg: "" },
      { id: "max-sum-circular-array", title: "Maximum sum in circular array variant", difficulty: "Medium", leetcode: "https://leetcode.com/problems/maximum-sum-circular-subarray/", gfg: "" }
    ]
  },
  {
    id: "prefix-sum",
    title: "Prefix Sum",
    description: "Precompute cumulative sums of the array elements to allow efficient O(1) query operations on subarrays.",
    questions: [
      {
        id: "subarray-sum-equals-k",
        title: "Subarray Sum Equals K (EASY)",
        difficulty: "Medium",
        leetcode: "https://leetcode.com/problems/subarray-sum-equals-k/description/",
        gfg: "",
        brute: {
          code: `// Brute Force: Check sum of all subarrays
// Time Complexity: O(N^2) | Space Complexity: O(1)
#include <vector>
using namespace std;

int subarraySum(vector<int>& nums, int k) {
    int count = 0;
    int n = nums.size();
    for (int i = 0; i < n; i++) {
        int sum = 0;
        for (int j = i; j < n; j++) {
            sum += nums[j];
            if (sum == k) count++;
        }
    }
    return count;
}`,
          complexity: "Time: O(N^2), Space: O(1)"
        },
        optimal: {
          code: `// Optimal: Prefix Sum + HashMap
// Time Complexity: O(N) | Space Complexity: O(N)
#include <vector>
#include <unordered_map>
using namespace std;

int subarraySum(vector<int>& nums, int k) {
    unordered_map<int, int> mp;
    mp[0] = 1; // Base case: prefix sum = 0 has occurred 1 time
    int sum = 0;
    int count = 0;
    
    for (int num : nums) {
        sum += num;
        int remove = sum - k;
        if (mp.count(remove)) {
            count += mp[remove];
        }
        mp[sum]++;
    }
    
    return count;
}`,
          complexity: "Time: O(N), Space: O(N)"
        },
        hinglish: {
          explanation: `### Intuition (Pehle Soch)
Hume aisi subarrays dhoondhni hain jinka sum exact \`k\` ho.
1. **Brute Force (O(N^2))**: Saari possible subarrays nikaalkar sum check karo.
2. **Optimal (Prefix Sum + HashMap)**:
- Hume pata hai kisi range \`[i, j]\` ka sum kya hota hai: \`PrefixSum[j] - PrefixSum[i-1]\`.
- Agar hume \`PrefixSum[j] - PrefixSum[i-1] == k\` chahiye, toh hum ise rewrite kar sakte hain: \`PrefixSum[i-1] == PrefixSum[j] - k\`.
- Jab hum array ko traverse karte hain, tab hum cumulative sum (\`sum\`) track karte hain.
- Hum ek Map rakhte hain jisme check karte hain ki kya \`sum - k\` hume pehle kabhi mila hai? Agar haan, toh wo index range hume target sum \`k\` dega.
- Map mein hum cumulative sum ki frequency badhate rehte hain.`,
          pseudocode: `function subarraySum(nums, k):
    mp = new Map()
    mp.set(0, 1)
    sum = 0
    count = 0
    for num in nums:
        sum = sum + num
        if mp.has(sum - k):
            count = count + mp.get(sum - k)
        mp.set(sum, (mp.get(sum) || 0) + 1)
    return count`
        },
        simulator: {
          inputType: "prefix-sum-k",
          defaultInput: { arr: [1, 1, 1], k: 2 },
          steps: [
            { line: 2, vars: { sum: 0, count: 0, map: { 0: 1 }, num: null, arr: [1, 1, 1], k: 2 }, explanation: "Map me {0: 1} initialize kiya, sum aur count ko 0." },
            { line: 7, vars: { sum: 1, count: 0, map: { 0: 1, 1: 1 }, num: 1, arr: [1, 1, 1], k: 2 }, explanation: "Step 1: num = 1. sum = 0 + 1 = 1. sum - k = 1 - 2 = -1. Map me -1 nahi hai. Map me {1: 1} push kiya." },
            { line: 7, vars: { sum: 2, count: 1, map: { 0: 1, 1: 1, 2: 1 }, num: 1, arr: [1, 1, 1], k: 2 }, explanation: "Step 2: num = 1. sum = 1 + 1 = 2. sum - k = 2 - 2 = 0. Map me 0 present hai (value = 1). count ko increment kiya 1 se. Map me {2: 1} add kiya." },
            { line: 7, vars: { sum: 3, count: 2, map: { 0: 1, 1: 2, 2: 1, 3: 1 }, num: 1, arr: [1, 1, 1], k: 2 }, explanation: "Step 3: num = 1. sum = 2 + 1 = 3. sum - k = 3 - 2 = 1. Map me 1 present hai (value = 1). count ko +1 kiya. count = 2. Map me {3: 1} add kiya." },
            { line: 11, vars: { sum: 3, count: 2 }, explanation: "Array scanning completed. Total count of subarrays with sum 2 is 2." }
          ]
        }
      },
      { id: "find-pivot-index", title: "Find Pivot Index (EASY)", difficulty: "Easy", leetcode: "https://leetcode.com/problems/find-pivot-index/description/", gfg: "" },
      { id: "subarray-sums-divisible-k", title: "Subarray Sums Divisible By K (Med)", difficulty: "Medium", leetcode: "https://leetcode.com/problems/subarray-sums-divisible-by-k/description/", gfg: "" },
      { id: "contiguous-array", title: "Contiguous array (MED)", difficulty: "Medium", leetcode: "https://leetcode.com/problems/contiguous-array/description/", gfg: "" },
      { id: "shortest-subarray-sum-at-least-k", title: "Shortest Subarray With Sum at Least K (HARD)", difficulty: "Hard", leetcode: "https://leetcode.com/problems/shortest-subarray-with-sum-at-least-k/description/", gfg: "" },
      { id: "count-range-sum", title: "Count Range Sum (hard)", difficulty: "Hard", leetcode: "https://leetcode.com/problems/count-of-range-sum/description/", gfg: "" }
    ]
  },
  {
    id: "merge-intervals",
    title: "Merge Intervals",
    description: "Sort and compare interval endpoints to merge overlapping segments or schedule meetings.",
    questions: [
      {
        id: "merge-intervals-med",
        title: "Merge Intervals (medium)",
        difficulty: "Medium",
        leetcode: "https://leetcode.com/problems/merge-intervals/description/",
        gfg: "",
        brute: {
          code: `// Brute Force: Check overlaps for all intervals
// Time Complexity: O(N^2) | Space Complexity: O(N)
#include <vector>
#include <algorithm>
using namespace std;

vector<vector<int>> mergeBrute(vector<vector<int>>& intervals) {
    int n = intervals.size();
    sort(intervals.begin(), intervals.end());
    vector<vector<int>> merged;
    for (int i = 0; i < n; i++) {
        int start = intervals[i][0];
        int end = intervals[i][1];
        if (!merged.empty() && end <= merged.back()[1]) {
            continue;
        }
        for (int j = i + 1; j < n; j++) {
            if (intervals[j][0] <= end) {
                end = max(end, intervals[j][1]);
            } else {
                break;
            }
        }
        merged.push_back({start, end});
    }
    return merged;
}`,
          complexity: "Time: O(N^2), Space: O(N)"
        },
        optimal: {
          code: `// Optimal: Sorting and Single Pass Merge
// Time Complexity: O(N log N) | Space Complexity: O(N) for output
#include <vector>
#include <algorithm>
using namespace std;

vector<vector<int>> merge(vector<vector<int>>& intervals) {
    if (intervals.empty()) return {};
    
    // 1. Sort intervals by start time
    sort(intervals.begin(), intervals.end());
    
    vector<vector<int>> merged;
    merged.push_back(intervals[0]);
    
    for (int i = 1; i < intervals.size(); i++) {
        // Agar current interval, last merged interval ke sath overlap kare
        if (intervals[i][0] <= merged.back()[1]) {
            merged.back()[1] = max(merged.back()[1], intervals[i][1]); // End time stretch karo
        } else {
            merged.push_back(intervals[i]); // Overlap nahi hai, toh direct add karo
        }
    }
    
    return merged;
}`,
          complexity: "Time: O(N log N), Space: O(N)"
        },
        hinglish: {
          explanation: `### Intuition (Pehle Soch)
Hume overlapping intervals ko aapas mein merge karna hai (e.g. \`[1, 3]\` and \`[2, 6]\` merge hokar \`[1, 6]\` ban jayenge).
1. **Pehla Step**: Intervals ko unke start times ke basis par Sort kar do. Sorting se overlapping intervals ek sath aa jayengi.
2. **Merge Loop**:
- Pehli interval ko \`merged\` list mein push karo.
- Agli interval \`current\` ko dekho. Agar \`current.start <= last_merged.end\` hai, toh dono overlap kar rhe hain. Hum \`last_merged.end\` ko update kar denge dono ka maximum lekar (\`max(last_merged.end, current.end)\`).
- Agar overlap nahi hai, toh direct \`current\` ko \`merged\` list mein push kar do aur vo hamara naya target ban jayega comparison ke liye.`,
          pseudocode: `function merge(intervals):
    if intervals.length == 0: return []
    sort(intervals by start time)
    merged = [intervals[0]]
    for i = 1 to intervals.length - 1:
        current = intervals[i]
        last = merged.lastElement()
        if current.start <= last.end:
            last.end = max(last.end, current.end)
        else:
            merged.push(current)
    return merged`
        },
        simulator: {
          inputType: "intervals",
          defaultInput: { intervals: [[1, 3], [2, 6], [8, 10], [15, 18]] },
          steps: [
            { line: 2, vars: { intervals: [[1, 3], [2, 6], [8, 10], [15, 18]], merged: [[1, 3]], i: 1 }, explanation: "Sort intervals completed. Pehle interval [1, 3] ko merged array me push kiya. Loop i=1 se start karenge." },
            { line: 8, vars: { intervals: [[1, 3], [2, 6], [8, 10], [15, 18]], merged: [[1, 6]], i: 2 }, explanation: "Interval [2, 6] check kiya. Kyuki 2 <= 3 (overlap), merged array ke last interval [1, 3] ko update kiya to [1, max(3, 6)] = [1, 6]." },
            { line: 10, vars: { intervals: [[1, 3], [2, 6], [8, 10], [15, 18]], merged: [[1, 6], [8, 10]], i: 3 }, explanation: "Interval [8, 10] check kiya. 8 > 6 (no overlap). Is interval ko direct merged array me push kiya." },
            { line: 10, vars: { intervals: [[1, 3], [2, 6], [8, 10], [15, 18]], merged: [[1, 6], [8, 10], [15, 18]], i: 4 }, explanation: "Interval [15, 18] check kiya. 15 > 10 (no overlap). Isko bhi direct merged array me push kiya." },
            { line: 12, vars: { merged: [[1, 6], [8, 10], [15, 18]] }, explanation: "Loop ended. Final merged intervals: [[1, 6], [8, 10], [15, 18]]." }
          ]
        }
      },
      { id: "insert-interval", title: "Insert Interval (medium)", difficulty: "Medium", leetcode: "https://leetcode.com/problems/insert-interval/", gfg: "" },
      { id: "intervals-intersection", title: "Intervals Intersection (medium)", difficulty: "Medium", leetcode: "https://leetcode.com/problems/interval-list-intersections/description/", gfg: "" },
      { id: "overlapping-intervals", title: "Overlapping Intervals", difficulty: "Medium", leetcode: "", gfg: "https://www.geeksforgeeks.org/check-if-any-two-intervals-overlap-among-a-given-set-of-intervals/" },
      { id: "minimum-meeting-rooms", title: "Problem Challenge 1: Minimum Meeting Rooms (hard)", difficulty: "Hard", leetcode: "", gfg: "https://www.geeksforgeeks.org/problems/attend-all-meetings-ii/1" },
      { id: "maximum-cpu-load", title: "Problem Challenge 2: Maximum CPU Load (hard)", difficulty: "Hard", leetcode: "", gfg: "https://www.geeksforgeeks.org/maximum-cpu-load-from-the-given-list-of-jobs/" },
      { id: "employee-free-time", title: "Problem Challenge 3: Employee Free Time (hard)", difficulty: "Hard", leetcode: "https://www.codertrain.co/employee-free-time", gfg: "" }
    ]
  },
  {
    id: "inplace-reversal-linkedlist",
    title: "In-place Reversal of a LinkedList",
    description: "Reverse linkages between list nodes in-place without allocating extra storage nodes.",
    questions: [
      {
        id: "reverse-linkedlist-easy",
        title: "Reverse a LinkedList (easy)",
        difficulty: "Easy",
        leetcode: "https://leetcode.com/problems/reverse-linked-list/",
        gfg: "",
        brute: {
          code: `// Brute Force: Push values to stack and rewrite nodes
// Time Complexity: O(N) | Space Complexity: O(N)
#include <stack>
using namespace std;

struct ListNode {
    int val;
    ListNode *next;
    ListNode(int x) : val(x), next(NULL) {}
};

ListNode* reverseListBrute(ListNode* head) {
    if (!head) return head;
    stack<int> st;
    ListNode* curr = head;
    while (curr) {
        st.push(curr->val);
        curr = curr->next;
    }
    curr = head;
    while (curr) {
        curr->val = st.top();
        st.pop();
        curr = curr->next;
    }
    return head;
}`,
          complexity: "Time: O(N), Space: O(N)"
        },
        optimal: {
          code: `// Optimal Approach: 3 Pointers (Iterative)
// Time Complexity: O(N) | Space Complexity: O(1)
struct ListNode {
    int val;
    ListNode *next;
    ListNode(int x) : val(x), next(NULL) {}
};

ListNode* reverseList(ListNode* head) {
    ListNode* prev = nullptr;
    ListNode* curr = head;
    while (curr != nullptr) {
        ListNode* nextNode = curr->next; // Agla node save kiya
        curr->next = prev;              // Link reverse kiya
        prev = curr;                    // prev ko current par laya
        curr = nextNode;                // curr ko aage badhaya
    }
    return prev; // Naya head return kiya
}`,
          complexity: "Time: O(N), Space: O(1)"
        },
        hinglish: {
          explanation: `### Intuition (Pehle Soch)
Hume Linked List ki links reverse karni hain taaki last node head ban jaye.
1. **Brute Force**: Stack mein values daal kar list par dobara traverse karte hue value change karo. Time O(N) but O(N) extra memory space lagega values store karne ke liye.
2. **Optimal**: 3 pointers (\`prev\`, \`curr\`, \`nextNode\`) use karke loop mein pointers ki direction change karenge:
- Pehle \`curr.next\` ko \`nextNode\` pointer mein save karein taaki hum aage ka track na khoyen.
- Fir \`curr.next = prev\` karke arrow ki direction change karein.
- Ab \`prev\` aur \`curr\` ko ek-ek step aage badha dein.`,
          pseudocode: `function reverseList(head):
    prev = null
    curr = head
    while curr != null:
        nextNode = curr.next
        curr.next = prev
        prev = curr
        curr = nextNode
    return prev`
        },
        simulator: {
          inputType: "linked-list-reversal",
          defaultInput: { list: [1, 2, 3, 4, 5] },
          steps: [
            { line: 2, vars: { prev: "null", curr: 0, nextNode: "null", list: [1, 2, 3, 4, 5] }, explanation: "Pointers initialize kiye: prev = null, curr = node 1 (value=1)." },
            { line: 5, vars: { prev: "null", curr: 0, nextNode: 1, list: [1, 2, 3, 4, 5] }, explanation: "Agla node save kiya: nextNode = node 2 (value=2)." },
            { line: 6, vars: { prev: "null", curr: 0, nextNode: 1, list: [1, "->null", 2, 3, 4, 5] }, explanation: "curr node (1) ka next change kiya: 1.next = prev (null)." },
            { line: 7, vars: { prev: 0, curr: 0, nextNode: 1 }, explanation: "prev ko update kiya: prev = curr (node 1)." },
            { line: 8, vars: { prev: 0, curr: 1, nextNode: 1 }, explanation: "curr ko aage badhaya: curr = nextNode (node 2)." },
            { line: 5, vars: { prev: 0, curr: 1, nextNode: 2 }, explanation: "Next cycle: nextNode = node 3." },
            { line: 6, vars: { prev: 0, curr: 1, nextNode: 2, list: [2, "->1", 3, 4, 5] }, explanation: "curr node (2) ka next change kiya: 2.next = 1." },
            { line: 8, vars: { prev: 1, curr: 2, nextNode: 2 }, explanation: "Pointers aage badhaye: prev = 2, curr = 3." },
            { line: 10, vars: { prev: 4, curr: "null" }, explanation: "Traverse end tak ho gaya. prev (node 5) ab list ka naya head hai. Return prev." }
          ]
        }
      },
      { id: "reverse-sublist", title: "Reverse a Sub-list (medium)", difficulty: "Medium", leetcode: "https://leetcode.com/problems/reverse-linked-list-ii/", gfg: "" },
      { id: "reverse-list-pairs", title: "Reverse List in Pairs (Medium)", difficulty: "Medium", leetcode: "https://leetcode.com/problems/swap-nodes-in-pairs/description/", gfg: "" },
      { id: "reverse-every-k-sublist", title: "Reverse every K-element Sub-list (HARD)", difficulty: "Hard", leetcode: "https://leetcode.com/problems/reverse-nodes-in-k-group/", gfg: "" },
      { id: "reverse-nodes-even-groups", title: "Problem Challenge 1: Reverse nodes in EVEN Length Groups (HARD)", difficulty: "Hard", leetcode: "https://leetcode.com/problems/reverse-nodes-even-length-groups/description/", gfg: "" },
      { id: "rotate-linkedlist-med", title: "Problem Challenge 2: Rotate a LinkedList (medium)", difficulty: "Medium", leetcode: "https://leetcode.com/problems/rotate-list/", gfg: "" }
    ]
  },
  {
    id: "stack-pattern",
    title: "Stack",
    description: "Manage structured LIFO memory queues to check balanced conditions, simplify paths, or track monotonic values.",
    questions: [
      {
        id: "balanced-parentheses",
        title: "Balanced Parentheses",
        difficulty: "Easy",
        leetcode: "https://leetcode.com/problems/valid-parentheses/description/",
        gfg: "",
        brute: {
          code: `// Brute Force: Replace sets of brackets until no changes occur
// Time Complexity: O(N^2) | Space Complexity: O(N)
#include <string>
using namespace std;

bool isValidBrute(string s) {
    while (s.find("()") != string::npos || s.find("[]") != string::npos || s.find("{}") != string::npos) {
        size_t p;
        if ((p = s.find("()")) != string::npos) s.erase(p, 2);
        else if ((p = s.find("[]")) != string::npos) s.erase(p, 2);
        else if ((p = s.find("{}")) != string::npos) s.erase(p, 2);
    }
    return s.empty();
}`,
          complexity: "Time: O(N^2), Space: O(N)"
        },
        optimal: {
          code: `// Optimal: LIFO Stack
// Time Complexity: O(N) | Space Complexity: O(N)
#include <string>
#include <stack>
using namespace std;

bool isValid(string s) {
    stack<char> st;
    for (char c : s) {
        if (c == '(' || c == '[' || c == '{') {
            st.push(c); // Opening bracket ko stack me daalo
        } else {
            // Closing bracket milne par check karo stack empty toh nahi hai
            if (st.empty()) return false;
            
            char top = st.top();
            if ((c == ')' && top == '(') || 
                (c == ']' && top == '[') || 
                (c == '}' && top == '{')) {
                st.pop(); // Matching pair mil gaya, pop kar do
            } else {
                return false; // Mismatched brackets
            }
        }
    }
    return st.empty(); // Agar stack empty hai toh all brackets are balanced
}`,
          complexity: "Time: O(N), Space: O(N)"
        },
        hinglish: {
          explanation: `### Intuition (Pehle Soch)
Hume matching open/close brackets ko track karna hai correct order mein.
1. **Optimal (Stack)**:
- Kyuki matching parenthesisation LIFO (Last In First Out) property ko satisfy karti hai, hum stack use karte hain.
- Jab bhi opening bracket (\`(\`, \`[\`, \`{\`) mile, stack mein push kar do.
- Jab bhi closing bracket (\`)\`, \`]\`, \`}\`) mile, hum check karenge ki kya stack ka top element usi character ka matching open pair hai?
- Agar matching pair hai, toh stack se pop kar do.
- Agar matching pair nahi hai ya stack empty hai, toh return false.
- End mein, agar stack empty hai toh invalid parameters nahi the aur sab match ho gaye.`,
          pseudocode: `function isValid(s):
    st = empty stack
    for char in s:
        if char is '(' or '[' or '{':
            st.push(char)
        else:
            if st.isEmpty(): return false
            top = st.pop()
            if char matches top: continue
            else: return false
    return st.isEmpty()`
        },
        simulator: {
          inputType: "stack",
          defaultInput: { s: "{[()]}" },
          steps: [
            { line: 2, vars: { s: "{[()]}", stack: [], char: null, i: 0 }, explanation: "Stack initialize kiya. Loop char by char iterate karega." },
            { line: 5, vars: { s: "{[()]}", stack: ["{"], char: "{", i: 1 }, explanation: "Character '{' ek opening bracket hai, isko stack me push kiya." },
            { line: 5, vars: { s: "{[()]}", stack: ["{", "["], char: "[", i: 2 }, explanation: "Character '[' ek opening bracket hai, stack me push kiya." },
            { line: 5, vars: { s: "{[()]}", stack: ["{", "[", "("], char: "(", i: 3 }, explanation: "Character '(' opening bracket hai, isko bhi push kiya." },
            { line: 8, vars: { s: "{[()]}", stack: ["{", "["], char: ")", i: 4 }, explanation: "Character ')' closing bracket hai. Stack ke top '(' se match ho gaya, isliye pop kiya." },
            { line: 8, vars: { s: "{[()]}", stack: ["{"], char: "]", i: 5 }, explanation: "Character ']' closing bracket hai. Stack ke top '[' se match hua, pop kiya." },
            { line: 8, vars: { s: "{[()]}", stack: [], char: "}", i: 6 }, explanation: "Character '}' closing bracket hai. Stack ke top '{' se match hua, pop kiya." },
            { line: 11, vars: { s: "{[()]}", stack: [], success: true }, explanation: "String empty scan ho chuki hai aur stack empty hai. Valid parentheses pattern! Return true." }
          ]
        }
      },
      { id: "remove-adjacent-duplicates", title: "remove adjacent duplicates", difficulty: "Easy", leetcode: "https://leetcode.com/problems/remove-all-adjacent-duplicates-in-string/description/", gfg: "" },
      { id: "reverse-string-stack", title: "Reverse a String", difficulty: "Easy", leetcode: "", gfg: "" },
      { id: "next-greater-element", title: "Next Greater Element (easy)", difficulty: "Medium", leetcode: "https://leetcode.com/problems/next-greater-element-ii/description/", gfg: "" },
      { id: "daily-temperatures", title: "Daily Temperatures (easy)", difficulty: "Medium", leetcode: "https://leetcode.com/problems/daily-temperatures/", gfg: "" },
      { id: "remove-nodes-ll", title: "Remove Nodes From Linked List (easy)", difficulty: "Medium", leetcode: "https://leetcode.com/problems/remove-nodes-from-linked-list/", gfg: "" },
      { id: "remove-adjacent-duplicates-ii", title: "Remove All Adjacent Duplicates in String II (medium)", difficulty: "Medium", leetcode: "https://leetcode.com/problems/remove-all-adjacent-duplicates-in-string-ii/", gfg: "" },
      { id: "simplify-path", title: "Simplify Path (Problem Challenge)", difficulty: "Medium", leetcode: "https://leetcode.com/problems/simplify-path/", gfg: "" },
      { id: "remove-k-digits", title: "Remove K Digits (hard) Problem challenge", difficulty: "Hard", leetcode: "https://leetcode.com/problems/remove-k-digits/", gfg: "" }
    ]
  },
  {
    id: "hash-maps",
    title: "Hash Maps",
    description: "Store values in custom dynamic hash slots for O(1) average lookup and lookup checks.",
    questions: [
      { id: "first-non-repeating-char", title: "First Non-repeating Character (easy)", difficulty: "Easy", leetcode: "https://leetcode.com/problems/first-unique-character-in-a-string/", gfg: "" },
      { id: "max-balloons", title: "Maximum Number of Balloons (easy)", difficulty: "Easy", leetcode: "https://leetcode.com/problems/maximum-number-of-balloons/", gfg: "" },
      { id: "longest-palindrome", title: "Longest Palindrome(easy)", difficulty: "Easy", leetcode: "https://leetcode.com/problems/longest-palindrome/", gfg: "" },
      { id: "ransom-note", title: "Ransom Note (easy)", difficulty: "Easy", leetcode: "https://leetcode.com/problems/ransom-note/", gfg: "" }
    ]
  },
  {
    id: "binary-search",
    title: "Binary Search",
    description: "Search in logarithmic O(log N) runtime by dividing the searchable space in half repeatedly.",
    questions: [
      {
        id: "binary-search-basic",
        title: "Binary search basic",
        difficulty: "Easy",
        leetcode: "https://leetcode.com/problems/binary-search/",
        gfg: "",
        brute: {
          code: `// Brute Force: Linear Search
// Time Complexity: O(N) | Space Complexity: O(1)
#include <vector>
using namespace std;

int searchBrute(vector<int>& nums, int target) {
    for (int i = 0; i < nums.size(); i++) {
        if (nums[i] == target) return i;
    }
    return -1;
}`,
          complexity: "Time: O(N), Space: O(1)"
        },
        optimal: {
          code: `// Optimal: Binary Search (works since array is sorted)
// Time Complexity: O(log N) | Space Complexity: O(1)
#include <vector>
using namespace std;

int search(vector<int>& nums, int target) {
    int low = 0;
    int high = nums.size() - 1;
    while (low <= high) {
        int mid = low + (high - low) / 2; // overflow se bachne ke liye
        if (nums[mid] == target) {
            return mid; // Element mil gaya!
        } else if (nums[mid] < target) {
            low = mid + 1; // Right half me search karo
        } else {
            high = mid - 1; // Left half me search karo
        }
    }
    return -1; // Element list me nahi hai
}`,
          complexity: "Time: O(log N), Space: O(1)"
        },
        hinglish: {
          explanation: `### Intuition (Pehle Soch)
Hume target element index nikalna hai sorted array se.
1. **Brute Force (O(N))**: Ek ek karke saare elements check karo (Linear Search).
2. **Optimal (Binary Search)**:
- Kyuki array already sorted hai, hum search space ko har baar half divide kar sakte hain.
- \`low\` pointer ko index 0 aur \`high\` ko \`size - 1\` par set karein.
- \`mid = low + (high - low) / 2\` nikaalein.
- Agar \`nums[mid] == target\`, return \`mid\`.
- Agar \`nums[mid] < target\`, iska matlab hamara target right half mein hoga, isliye \`low = mid + 1\` kar do.
- Agar \`nums[mid] > target\`, target left half mein hoga, isliye \`high = mid - 1\` kar do.`,
          pseudocode: `function search(nums, target):
    low = 0
    high = nums.length - 1
    while low <= high:
        mid = low + floor((high - low) / 2)
        if nums[mid] == target:
            return mid
        else if nums[mid] < target:
            low = mid + 1
        else:
            high = mid - 1
    return -1`
        },
        simulator: {
          inputType: "binary-search",
          defaultInput: { arr: [-1, 0, 3, 5, 9, 12], target: 9 },
          steps: [
            { line: 2, vars: { low: 0, high: 5, mid: null, target: 9, arr: [-1, 0, 3, 5, 9, 12] }, explanation: "low = 0 (val=-1) aur high = 5 (val=12) initialize kiya." },
            { line: 4, vars: { low: 0, high: 5, mid: 2, target: 9, arr: [-1, 0, 3, 5, 9, 12] }, explanation: "mid calculate kiya: 0 + (5-0)/2 = 2. nums[mid] = nums[2] = 3." },
            { line: 5, vars: { low: 0, high: 5, mid: 2, target: 9, arr: [-1, 0, 3, 5, 9, 12] }, explanation: "nums[mid] (3) is less than target (9). Right half me move karenge. low = mid + 1 = 3." },
            { line: 4, vars: { low: 3, high: 5, mid: 4, target: 9, arr: [-1, 0, 3, 5, 9, 12] }, explanation: "Next step mid: 3 + (5-3)/2 = 4. nums[mid] = nums[4] = 9." },
            { line: 5, vars: { low: 3, high: 5, mid: 4, target: 9, success: true }, explanation: "nums[mid] (9) is equal to target (9). Target found at index 4!" }
          ]
        }
      },
      { id: "upper-bound-ceiling", title: "Upper Bound/ Ceiling", difficulty: "Easy", leetcode: "", gfg: "https://www.geeksforgeeks.org/problems/ceil-in-a-sorted-array/1" },
      { id: "first-and-last-position", title: "First and Last position", difficulty: "Medium", leetcode: "https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/", gfg: "" },
      { id: "count-number-of-occurences", title: "Count number of occurences", difficulty: "Medium", leetcode: "", gfg: "https://www.geeksforgeeks.org/problems/number-of-occurrence2259/1" },
      { id: "search-infinite-sorted-array", title: "Search in infinite Sorted array", difficulty: "Medium", leetcode: "", gfg: "https://www.geeksforgeeks.org/find-position-element-sorted-array-infinite-numbers/" },
      { id: "peak-index-mountain", title: "Peak index in Mountain", difficulty: "Easy", leetcode: "https://leetcode.com/problems/peak-index-in-a-mountain-array/", gfg: "" },
      { id: "find-peak-element", title: "Find peak in mountain range", difficulty: "Medium", leetcode: "https://leetcode.com/problems/find-peak-element/", gfg: "" },
      { id: "find-min-rotated-sorted", title: "Find minimum in rotated sorted array", difficulty: "Medium", leetcode: "https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/", gfg: "" },
      { id: "find-rotations-sorted", title: "Find number of rotations to sorted array", difficulty: "Easy", leetcode: "", gfg: "https://www.geeksforgeeks.org/problems/rotation4723/1" },
      { id: "search-rotated-sorted", title: "Search in rotated sorted array", difficulty: "Medium", leetcode: "https://leetcode.com/problems/search-in-rotated-sorted-array/description/", gfg: "" },
      { id: "koko-eating-bananas", title: "KOKO eating BANANAS", difficulty: "Medium", leetcode: "https://leetcode.com/problems/koko-eating-bananas/", gfg: "" },
      { id: "min-days-bouquets", title: "Min num of days to make m bouquets", difficulty: "Medium", leetcode: "https://leetcode.com/problems/minimum-number-of-days-to-make-m-bouquets/", gfg: "" },
      { id: "aggressive-cows", title: "Aggresive cows", difficulty: "Medium", leetcode: "", gfg: "https://www.geeksforgeeks.org/problems/aggressive-cows/1" },
      { id: "h-index-2", title: "H index 2", difficulty: "Medium", leetcode: "https://leetcode.com/problems/h-index-ii/description/", gfg: "" },
      { id: "max-candies-k-children", title: "Max candies to k children", difficulty: "Medium", leetcode: "https://leetcode.com/problems/maximum-candies-allocated-to-k-children/description/", gfg: "" },
      { id: "capacity-ship-packages", title: "Capacity to ship packages in d days", difficulty: "Medium", leetcode: "https://leetcode.com/problems/capacity-to-ship-packages-within-d-days/description/", gfg: "" },
      { id: "book-allocation", title: "Book Allocation Problem", difficulty: "Hard", leetcode: "", gfg: "https://www.geeksforgeeks.org/problems/allocate-minimum-number-of-pages0937/1" },
      { id: "split-largest-array", title: "Split largest arrray", difficulty: "Hard", leetcode: "https://leetcode.com/problems/split-array-largest-sum/description/", gfg: "" },
      { id: "search-2d-matrix", title: "Search 2 D matrix", difficulty: "Medium", leetcode: "https://leetcode.com/problems/search-a-2d-matrix/", gfg: "" },
      { id: "search-2d-matrix-ii", title: "Search 2D matrix (Hard)", difficulty: "Medium", leetcode: "https://leetcode.com/problems/search-a-2d-matrix-ii/description/", gfg: "" },
      { id: "kth-smallest-sorted-matrix", title: "kth smallest in sorted matrix", difficulty: "Medium", leetcode: "https://leetcode.com/problems/kth-smallest-element-in-a-sorted-matrix/description/", gfg: "" },
      { id: "kth-smallest-multiplication", title: "kth smallest in multiplication matrix", difficulty: "Hard", leetcode: "https://leetcode.com/problems/kth-smallest-number-in-multiplication-table/description/", gfg: "" },
      { id: "median-two-sorted-arrays", title: "median of 2 sorted arrays", difficulty: "Hard", leetcode: "https://leetcode.com/problems/median-of-two-sorted-arrays/", gfg: "" }
    ]
  },
  {
    id: "heap-pattern",
    title: "Heap Pattern",
    description: "Manage prioritised datasets with min/max binary heaps to query extreme values in O(1) and update in O(log K).",
    questions: [
      {
        id: "kth-largest-element",
        title: "kth largest",
        difficulty: "Medium",
        leetcode: "https://leetcode.com/problems/kth-largest-element-in-an-array/description/",
        gfg: "",
        brute: {
          code: `// Brute Force: Sort array in descending order
// Time Complexity: O(N log N) | Space Complexity: O(1)
#include <vector>
#include <algorithm>
using namespace std;

int findKthLargestBrute(vector<int>& nums, int k) {
    sort(nums.begin(), nums.end(), greater<int>());
    return nums[k - 1];
}`,
          complexity: "Time: O(N log N), Space: O(1)"
        },
        optimal: {
          code: `// Optimal: Min Heap of size K
// Time Complexity: O(N log K) | Space Complexity: O(K)
#include <vector>
#include <queue>
using namespace std;

int findKthLargest(vector<int>& nums, int k) {
    // Min heap maintain karenge jo K largest elements ko hold kare
    priority_queue<int, vector<int>, greater<int>> min_heap;
    
    for (int num : nums) {
        min_heap.push(num);
        if (min_heap.size() > k) {
            min_heap.pop(); // K se extra elements bahar nikal do
        }
    }
    return min_heap.top(); // Heap ka top hi Kth largest element hoga
}`,
          complexity: "Time: O(N log K), Space: O(K)"
        },
        hinglish: {
          explanation: `### Intuition (Pehle Soch)
Hume array ka Kth largest element nikalna hai.
1. **Brute Force (O(N log N))**: Array ko descending sort karke \`k-1\` index wala element return kar do. Isme poora array sort ho jata hai.
2. **Optimal (Min Heap of size K)**:
- Agar hum ek **Min Heap** banayein aur uska size maximum \`K\` rakhein:
- Har element ko heap mein push karein.
- Jab size \`K\` se bada ho jaye, toh minimum element (\`heap.top()\`) ko pop kar dein.
- Isse heap mein hamesha abhi tak ke top \`K\` elements hi bachenge.
- Top \`K\` elements mein jo sabse chota hoga (top par), wahi humara K-th largest element hoga!`,
          pseudocode: `function findKthLargest(nums, k):
    min_heap = new MinHeap()
    for num in nums:
        min_heap.push(num)
        if min_heap.size() > k:
            min_heap.pop()
    return min_heap.top()`
        },
        simulator: {
          inputType: "heap",
          defaultInput: { arr: [3, 2, 1, 5, 6, 4], k: 2 },
          steps: [
            { line: 2, vars: { k: 2, heap: [], num: null, arr: [3, 2, 1, 5, 6, 4] }, explanation: "Min-heap initialize kiya aur loop start kiya." },
            { line: 5, vars: { k: 2, heap: [3], num: 3, arr: [3, 2, 1, 5, 6, 4] }, explanation: "Step 1: num = 3. Heap me push kiya: heap = [3]." },
            { line: 5, vars: { k: 2, heap: [2, 3], num: 2, arr: [3, 2, 1, 5, 6, 4] }, explanation: "Step 2: num = 2. Heap me push kiya: heap = [2, 3]. Heap size <= K." },
            { line: 5, vars: { k: 2, heap: [2, 3], num: 1, arr: [3, 2, 1, 5, 6, 4] }, explanation: "Step 3: num = 1. Heap me push: heap = [1, 2, 3] (temporary). Size (3) > K (2). Min element 1 pop kiya. Heap = [2, 3]." },
            { line: 5, vars: { k: 2, heap: [3, 5], num: 5, arr: [3, 2, 1, 5, 6, 4] }, explanation: "Step 4: num = 5. Heap me push: heap = [2, 3, 5] (temp). Size > K. Pop kiya min 2. Heap = [3, 5]." },
            { line: 5, vars: { k: 2, heap: [5, 6], num: 6, arr: [3, 2, 1, 5, 6, 4] }, explanation: "Step 5: num = 6. Heap me push: heap = [3, 5, 6] (temp). Size > K. Pop kiya min 3. Heap = [5, 6]." },
            { line: 5, vars: { k: 2, heap: [5, 6], num: 4, arr: [3, 2, 1, 5, 6, 4] }, explanation: "Step 6: num = 4. Heap me push: heap = [4, 5, 6] (temp). Size > K. Pop kiya min 4. Heap = [5, 6]." },
            { line: 9, vars: { k: 2, heap: [5, 6], result: 5 }, explanation: "Array completed. Heap.top() = 5 return kiya. So 5 is the 2nd largest element." }
          ]
        }
      },
      { id: "kth-smallest", title: "kth smallest", difficulty: "Medium", leetcode: "", gfg: "https://www.geeksforgeeks.org/problems/kth-smallest-element5635/1" },
      { id: "top-k-frequent-elements", title: "TOP K frequent Elements", difficulty: "Medium", leetcode: "https://leetcode.com/problems/top-k-frequent-elements/description/", gfg: "" },
      { id: "top-k-frequent-words", title: "Top K frequent Words", difficulty: "Medium", leetcode: "https://leetcode.com/problems/top-k-frequent-words/description/", gfg: "" },
      { id: "k-closest-points-origin", title: "K closest points to origin", difficulty: "Medium", leetcode: "https://leetcode.com/problems/k-closest-points-to-origin/description/", gfg: "" },
      { id: "find-k-closest-elements", title: "Find K closest elements", difficulty: "Medium", leetcode: "https://leetcode.com/problems/find-k-closest-elements/description/", gfg: "" },
      { id: "kth-weakest-row-matrix", title: "Kth weakest row in Matrix", difficulty: "Easy", leetcode: "https://leetcode.com/problems/the-k-weakest-rows-in-a-matrix/description/", gfg: "" },
      { id: "merge-k-sorted-arrays", title: "Merge K Sorted Arrays", difficulty: "Medium", leetcode: "", gfg: "https://www.geeksforgeeks.org/problems/merge-k-sorted-arrays/1" },
      { id: "kth-smallest-sorted-matrix-heap", title: "Kth Smallest in Sorted Matrix", difficulty: "Medium", leetcode: "https://leetcode.com/problems/kth-smallest-element-in-a-sorted-matrix/description/", gfg: "" },
      { id: "last-stone-weight", title: "LAST STONE WEIGHT", difficulty: "Easy", leetcode: "https://leetcode.com/problems/last-stone-weight/description/", gfg: "" },
      { id: "cpu-task-scheduler", title: "CPU Task Scheduler", difficulty: "Medium", leetcode: "https://leetcode.com/problems/task-scheduler/description/", gfg: "" },
      { id: "reorganize-string", title: "Reorganize String", difficulty: "Medium", leetcode: "https://leetcode.com/problems/reorganize-string/", gfg: "" },
      { id: "min-refueling-stops", title: "Min number of refueling stops", difficulty: "Hard", leetcode: "https://leetcode.com/problems/minimum-number-of-refueling-stops/description/", gfg: "" },
      { id: "ipo", title: "IPO", difficulty: "Hard", leetcode: "https://leetcode.com/problems/ipo/description/", gfg: "" },
      { id: "course-scheduler-3", title: "Course Scheduler 3", difficulty: "Hard", leetcode: "https://leetcode.com/problems/course-schedule-iii/description/", gfg: "" },
      { id: "find-median-data-stream", title: "Find median in data stream", difficulty: "Hard", leetcode: "https://leetcode.com/problems/find-median-from-data-stream/description/", gfg: "" },
      { id: "sliding-window-median", title: "Sliding Window Median (hard)", difficulty: "Hard", leetcode: "https://leetcode.com/problems/sliding-window-median/description/", gfg: "" }
    ]
  },
  {
    id: "recursion-backtracking",
    title: "Recursion & Backtracking",
    description: "Solve problems recursively by making multiple choice paths and reverting state variables (backtracking) on returns.",
    questions: [
      {
        id: "fibonacci",
        title: "Fibonnaci",
        difficulty: "Easy",
        leetcode: "https://leetcode.com/problems/fibonacci-number/description/",
        gfg: "",
        brute: {
          code: `// Brute Force: Plain Recursion (Exponential)
// Time Complexity: O(2^N) | Space Complexity: O(N)
int fib(int n) {
    if (n <= 1) return n;
    return fib(n - 1) + fib(n - 2);
}`,
          complexity: "Time: O(2^N), Space: O(N)"
        },
        optimal: {
          code: `// Optimal: Dynamic Programming (Iterative / Memoization)
// Time Complexity: O(N) | Space Complexity: O(1)
int fib(int n) {
    if (n <= 1) return n;
    int a = 0, b = 1;
    for (int i = 2; i <= n; i++) {
        int temp = a + b;
        a = b;
        b = temp;
    }
    return b;
}`,
          complexity: "Time: O(N), Space: O(1)"
        },
        hinglish: {
          explanation: `### Intuition (Pehle Soch)
Fibonacci sequence nikalna hai: \`0, 1, 1, 2, 3, 5, 8...\` jisme \`F(n) = F(n-1) + F(n-2)\`.
1. **Brute Force (Recursion)**: Direct standard recursive function \`fib(n - 1) + fib(n - 2)\` call karo. Isme ek hi subproblem bar-bar calculate hoti hai, jisse complexity \`O(2^N)\` (exponential) ho jati hai.
2. **Optimal (Space Optimized DP)**: Hum values ko memory mein track karne ki jagah bas do variables \`a\` (previous to previous) aur \`b\` (previous) ko update karte hue iterate kar sakte hain.`,
          pseudocode: `function fib(n):
    if n <= 1: return n
    a = 0
    b = 1
    for i = 2 to n:
        temp = a + b
        a = b
        b = temp
    return b`
        },
        simulator: {
          inputType: "recursion-fib",
          defaultInput: { n: 4 },
          steps: [
            { line: 2, vars: { n: 4, a: 0, b: 1, i: 2 }, explanation: "Base cases check completed. Variables sets: a = 0, b = 1. i = 2 se loop start." },
            { line: 5, vars: { n: 4, a: 1, b: 1, i: 2, temp: 1 }, explanation: "i = 2: temp = a + b = 0 + 1 = 1. Update: a = 1, b = 1." },
            { line: 5, vars: { n: 4, a: 1, b: 2, i: 3, temp: 2 }, explanation: "i = 3: temp = a + b = 1 + 1 = 2. Update: a = 1, b = 2." },
            { line: 5, vars: { n: 4, a: 2, b: 3, i: 4, temp: 3 }, explanation: "i = 4: temp = a + b = 1 + 2 = 3. Update: a = 2, b = 3." },
            { line: 8, vars: { n: 4, result: 3 }, explanation: "Loop over. Fib(4) = 3 return kiya." }
          ]
        }
      },
      { id: "palindrome-string-rec", title: "Check if string is Pallindrome", difficulty: "Easy", leetcode: "", gfg: "https://www.geeksforgeeks.org/problems/palindrome-string0817/1" },
      { id: "check-array-sorted-rec", title: "Check if Array is Sorted", difficulty: "Easy", leetcode: "", gfg: "https://www.geeksforgeeks.org/problems/check-if-an-array-is-sorted0701/1" },
      { id: "sum-digits-rec", title: "Sum of digits of a number", difficulty: "Easy", leetcode: "", gfg: "https://www.geeksforgeeks.org/problems/sum-of-digits1742/1" },
      { id: "remove-char-rec", title: "Remove occurences of a character in string", difficulty: "Easy", leetcode: "", gfg: "https://www.geeksforgeeks.org/problems/remove-all-occurrences-of-a-character-in-a-string/1" },
      { id: "generate-parentheses", title: "Generate parenthesis", difficulty: "Medium", leetcode: "https://leetcode.com/problems/generate-parentheses/description/", gfg: "" },
      { id: "letter-combinations-phone", title: "Letter Combinations of phone number", difficulty: "Medium", leetcode: "https://leetcode.com/problems/letter-combinations-of-a-phone-number/description/", gfg: "" },
      { id: "permutations", title: "Permutations", difficulty: "Medium", leetcode: "https://leetcode.com/problems/permutations/description/", gfg: "" },
      { id: "combination-sum", title: "Combination Sum", difficulty: "Medium", leetcode: "https://leetcode.com/problems/combination-sum/description/", gfg: "" },
      { id: "palindrome-partitioning", title: "Pallindrome partition", difficulty: "Hard", leetcode: "https://leetcode.com/problems/palindrome-partitioning/description/", gfg: "" }
    ]
  },
  {
    id: "tree-pattern",
    title: "Tree Pattern",
    description: "Operate recursively on hierarchical root-child nodes using tree traversals (DFS, BFS) or validation parameters.",
    questions: [
      {
        id: "binary-tree-inorder",
        title: "Inorder Traversal",
        difficulty: "Easy",
        leetcode: "https://leetcode.com/problems/binary-tree-inorder-traversal/description/",
        gfg: "",
        brute: {
          code: `// Iterative Inorder Traversal using Stack
// Time Complexity: O(N) | Space Complexity: O(N)
#include <vector>
#include <stack>
using namespace std;

struct TreeNode {
    int val;
    TreeNode *left;
    TreeNode *right;
    TreeNode(int x) : val(x), left(NULL), right(NULL) {}
};

vector<int> inorderTraversal(TreeNode* root) {
    vector<int> result;
    stack<TreeNode*> st;
    TreeNode* curr = root;
    while (curr != nullptr || !st.empty()) {
        while (curr != nullptr) {
            st.push(curr);     // Leftmost leaf tak push karo
            curr = curr->left;
        }
        curr = st.top();
        st.pop();
        result.push_back(curr->val); // Value process karo
        curr = curr->right;          // Right child par jao
    }
    return result;
}`,
          complexity: "Time: O(N), Space: O(N)"
        },
        optimal: {
          code: `// Optimal Recursive Inorder Traversal
// Time Complexity: O(N) | Space Complexity: O(H) (height of tree)
#include <vector>
using namespace std;

struct TreeNode {
    int val;
    TreeNode *left;
    TreeNode *right;
    TreeNode(int x) : val(x), left(NULL), right(NULL) {}
};

void helper(TreeNode* root, vector<int>& res) {
    if (root == nullptr) return;
    helper(root->left, res);  // Left subtree traverse karein
    res.push_back(root->val); // Node process karein
    helper(root->right, res); // Right subtree traverse karein
}

vector<int> inorderTraversal(TreeNode* root) {
    vector<int> result;
    helper(root, result);
    return result;
}`,
          complexity: "Time: O(N), Space: O(H)"
        },
        hinglish: {
          explanation: `### Intuition (Pehle Soch)
Binary Tree ka **Inorder Traversal** hume \`Left -> Root -> Right\` sequence deta hai.
1. **Recursive Approach**:
- Bahut simple hai. Agar node null hai, toh return kar jao (Base case).
- Pehle left subtree ke liye function dobara call karo: \`helper(root->left)\`.
- Phir current node ki value print ya vector mein store karo.
- Phir right subtree ke liye function call karo: \`helper(root->right)\`.
2. **Iterative Approach**:
- Stack ka use karke leftmost elements ko store karte jate hain. Jab leftmost child null ho jaye, toh element pop karke process karte hain aur right subtree par jate hain.`,
          pseudocode: `function inorder(root):
    if root == null: return
    inorder(root.left)
    print(root.val)
    inorder(root.right)`
        },
        simulator: {
          inputType: "tree-traversal",
          defaultInput: { tree: [1, "null", 2, 3] },
          steps: [
            { line: 12, vars: { root: 1, path: "Root node 1" }, explanation: "Inorder traversal root node (value=1) se call hua." },
            { line: 14, vars: { root: 1, call: "helper(1->left)" }, explanation: "Left child traverse: 1->left = null. Call helper(null) immediately returns." },
            { line: 15, vars: { root: 1, result: [1] }, explanation: "Node 1 ki value print/store ki: result = [1]." },
            { line: 16, vars: { root: 2, call: "helper(1->right)" }, explanation: "Right child traverse: 1->right = node 2. Recursive call helper(2)." },
            { line: 14, vars: { root: 3, call: "helper(2->left)" }, explanation: "Node 2 ke left child par gaye: 2->left = node 3. Call helper(3)." },
            { line: 14, vars: { root: 3, call: "helper(3->left)" }, explanation: "Node 3 ke left child par gaye: 3->left = null. Returns." },
            { line: 15, vars: { root: 3, result: [1, 3] }, explanation: "Node 3 ki value store ki: result = [1, 3]." },
            { line: 16, vars: { root: 3, call: "helper(3->right)" }, explanation: "Node 3->right = null. Returns." },
            { line: 15, vars: { root: 2, result: [1, 3, 2] }, explanation: "Back to node 2. Node 2 process kiya: result = [1, 3, 2]." },
            { line: 16, vars: { root: 2, call: "helper(2->right)" }, explanation: "Node 2->right = null. Returns. All traversal completed!" }
          ]
        }
      },
      { id: "binary-tree-preorder", title: "Preorder Traversal", difficulty: "Easy", leetcode: "https://leetcode.com/problems/binary-tree-preorder-traversal/description/", gfg: "" },
      { id: "binary-tree-postorder", title: "Postorder Traversal", difficulty: "Easy", leetcode: "https://leetcode.com/problems/binary-tree-postorder-traversal/description/", gfg: "" },
      { id: "binary-tree-level-order", title: "Level Order Traversal", difficulty: "Easy", leetcode: "https://leetcode.com/problems/binary-tree-level-order-traversal/description/", gfg: "" },
      { id: "binary-tree-zigzag", title: "ZigZag Order Traversal", difficulty: "Medium", leetcode: "https://leetcode.com/problems/binary-tree-zigzag-level-order-traversal/description/", gfg: "" },
      { id: "binary-tree-level-order-ii", title: "Level Order II", difficulty: "Easy", leetcode: "https://leetcode.com/problems/binary-tree-level-order-traversal-ii/description/", gfg: "" },
      { id: "invert-tree", title: "Invert Tree", difficulty: "Easy", leetcode: "https://leetcode.com/problems/invert-binary-tree/description/", gfg: "" },
      { id: "symmetric-tree", title: "Symmetric Tree", difficulty: "Easy", leetcode: "https://leetcode.com/problems/symmetric-tree/description/", gfg: "" },
      { id: "same-tree", title: "Same Tree", difficulty: "Easy", leetcode: "https://leetcode.com/problems/same-tree/description/", gfg: "" },
      { id: "subtree-another-tree", title: "Subtree of another TREE", difficulty: "Easy", leetcode: "https://leetcode.com/problems/subtree-of-another-tree/description/", gfg: "" },
      { id: "flip-equivalent-tree", title: "Flip Equivalent Tree", difficulty: "Medium", leetcode: "https://leetcode.com/problems/flip-equivalent-binary-trees/description/", gfg: "" },
      { id: "lca-binary-tree", title: "LCA of Binary TREE", difficulty: "Medium", leetcode: "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/description/", gfg: "" },
      { id: "binary-search-tree-search", title: "Binary Search Tree", difficulty: "Easy", leetcode: "https://leetcode.com/problems/search-in-a-binary-search-tree/", gfg: "" },
      { id: "lca-bst", title: "LCA of BST", difficulty: "Easy", leetcode: "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/description/", gfg: "" },
      { id: "lca-deepest-leaves", title: "LCA of Deepest Leaves", difficulty: "Medium", leetcode: "https://leetcode.com/problems/lowest-common-ancestor-of-deepest-leaves/description/", gfg: "" },
      { id: "two-sum-iv", title: "Two Sum IV", difficulty: "Easy", leetcode: "https://leetcode.com/problems/two-sum-iv-input-is-a-bst/description/", gfg: "" },
      { id: "kth-smallest-bst", title: "Kth smallest element in BST", difficulty: "Medium", leetcode: "https://leetcode.com/problems/kth-smallest-element-in-a-bst/description/", gfg: "" },
      { id: "min-depth-tree", title: "Minimum Depth of Binary Tree", difficulty: "Easy", leetcode: "https://leetcode.com/problems/minimum-depth-of-binary-tree/description/", gfg: "" },
      { id: "max-depth-tree", title: "Maximum Depth of Binary Tree", difficulty: "Easy", leetcode: "https://leetcode.com/problems/maximum-depth-of-binary-tree/description/", gfg: "" },
      { id: "balanced-binary-tree", title: "Balanced Binary Tree", difficulty: "Easy", leetcode: "https://leetcode.com/problems/balanced-binary-tree/description/", gfg: "" },
      { id: "diameter-tree", title: "Diameter of Binary Tree", difficulty: "Easy", leetcode: "https://leetcode.com/problems/diameter-of-binary-tree/description/", gfg: "" },
      { id: "check-completeness-tree", title: "Check Completeness of Binary Tree", difficulty: "Medium", leetcode: "https://leetcode.com/problems/check-completeness-of-a-binary-tree/description/", gfg: "" },
      { id: "validate-bst", title: "Validate BST", difficulty: "Medium", leetcode: "https://leetcode.com/problems/validate-binary-search-tree/description/", gfg: "" },
      { id: "recover-bst", title: "Recover BST", difficulty: "Hard", leetcode: "https://leetcode.com/problems/recover-binary-search-tree/description/", gfg: "" },
      { id: "path-sum", title: "Path Sum", difficulty: "Easy", leetcode: "https://leetcode.com/problems/path-sum/description/", gfg: "" },
      { id: "path-sum-ii", title: "Path Sum II", difficulty: "Medium", leetcode: "https://leetcode.com/problems/path-sum-ii/", gfg: "" },
      { id: "sum-root-to-leaf", title: "Sum of Root to Leaf", difficulty: "Medium", leetcode: "https://leetcode.com/problems/sum-root-to-leaf-numbers/description/", gfg: "" },
      { id: "max-path-sum-tree", title: "Maximum Path Sum", difficulty: "Hard", leetcode: "https://leetcode.com/problems/binary-tree-maximum-path-sum/description/", gfg: "" },
      { id: "construct-tree-pre-in", title: "Contruct tree from preorder and inorder", difficulty: "Medium", leetcode: "https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/description/", gfg: "" },
      { id: "construct-tree-post-in", title: "Contruct tree from postorder and inorder", difficulty: "Medium", leetcode: "https://leetcode.com/problems/construct-binary-tree-from-inorder-and-postorder-traversal/description/", gfg: "" },
      { id: "sorted-array-to-bst", title: "Sorted Array to BST", difficulty: "Easy", leetcode: "https://leetcode.com/problems/convert-sorted-array-to-binary-search-tree/description/", gfg: "" }
    ]
  },
  {
    id: "graphs",
    title: "Graphs",
    description: "Traverse graph nodes using DFS/BFS, check cycles, calculate short paths with Dijkstra, or compute topological sorts.",
    questions: [
      {
        id: "graph-dfs",
        title: "Graph DFS",
        difficulty: "Easy",
        leetcode: "",
        gfg: "https://www.geeksforgeeks.org/problems/depth-first-traversal-for-a-graph/1",
        brute: {
          code: `// Standard DFS using Recursion & Adjacency List
// Time Complexity: O(V + E) | Space Complexity: O(V)
#include <vector>
using namespace std;

void dfs(int node, vector<int> adj[], vector<bool>& visited, vector<int>& ans) {
    visited[node] = true;
    ans.push_back(node);
    for (int neighbor : adj[node]) {
        if (!visited[neighbor]) {
            dfs(neighbor, adj, visited, ans);
        }
    }
}

vector<int> dfsOfGraph(int V, vector<int> adj[]) {
    vector<int> ans;
    vector<bool> visited(V, false);
    dfs(0, adj, visited, ans); // Start DFS from node 0
    return ans;
}`,
          complexity: "Time: O(V + E), Space: O(V)"
        },
        optimal: {
          code: `// Optimal Approach: Iterative DFS using Stack
// Time Complexity: O(V + E) | Space Complexity: O(V)
#include <vector>
#include <stack>
using namespace std;

vector<int> dfsOfGraph(int V, vector<int> adj[]) {
    vector<int> ans;
    vector<bool> visited(V, false);
    stack<int> st;
    st.push(0);
    while(!st.empty()) {
        int curr = st.top();
        st.pop();
        if(!visited[curr]) {
            visited[curr] = true;
            ans.push_back(curr);
            for(auto it = adj[curr].rbegin(); it != adj[curr].rend(); ++it) {
                if(!visited[*it]) {
                    st.push(*it);
                }
            }
        }
    }
    return ans;
}`,
          complexity: "Time: O(V + E), Space: O(V)"
        },
        hinglish: {
          explanation: `### Intuition (Pehle Soch)
Graph Depth First Search (DFS) ka matlab hai deep traverse karna. Hum kisi root node se start karke uske neighbours ke depths tak jaate hain.
- **Algorithm**:
- Ek boolean arrays \`visited\` rakhein jo tracks karega ki humne kis node ko visit kar liya hai.
- Node 0 se recursion stack start karein.
- Node ko visit mark karein, answer list mein store karein.
- Phir is node ke har unvisited padosi (neighbour) ke liye recursion trigger karein.`,
          pseudocode: `function dfs(node, adj, visited, ans):
    visited[node] = true
    ans.push(node)
    for neighbor in adj[node]:
        if not visited[neighbor]:
            dfs(neighbor, adj, visited, ans)`
        },
        simulator: {
          inputType: "graph",
          defaultInput: { v: 5, edges: [[0, 1], [0, 2], [0, 3], [2, 4]] },
          steps: [
            { line: 13, vars: { node: 0, visited: {0: true}, ans: [0] }, explanation: "DFS start kiya source node 0 se. visited[0] ko true kiya, ans vector me 0 insert kiya." },
            { line: 7, vars: { node: 1, visited: {0: true, 1: true}, ans: [0, 1] }, explanation: "0 ka padosi 1 unvisited hai. DFS call kiya dfs(1). visited[1]=true, ans=[0, 1]." },
            { line: 9, vars: { node: 1 }, explanation: "Node 1 ka koi aur neighbour nahi hai. Recursion stack wapas index 0 node par return hua." },
            { line: 7, vars: { node: 2, visited: {0: true, 1: true, 2: true}, ans: [0, 1, 2] }, explanation: "0 ka padosi 2 unvisited hai. Call dfs(2). visited[2]=true, ans=[0, 1, 2]." },
            { line: 7, vars: { node: 4, visited: {0: true, 1: true, 2: true, 4: true}, ans: [0, 1, 2, 4] }, explanation: "Node 2 ka neighbour 4 unvisited hai. dfs(4) call kiya. visited[4]=true, ans=[0, 1, 2, 4]." },
            { line: 7, vars: { node: 3, visited: {0: true, 1: true, 2: true, 4: true, 3: true}, ans: [0, 1, 2, 4, 3] }, explanation: "Back to 0. Next padosi 3 unvisited hai. Call dfs(3). visited[3]=true, ans=[0, 1, 2, 4, 3]." },
            { line: 15, vars: { ans: [0, 1, 2, 4, 3] }, explanation: "Saare nodes traverse ho chuke hain. Final DFS list: [0, 1, 2, 4, 3]." }
          ]
        }
      },
      { id: "construct-adj-list", title: "Construct Adjancency List from EDGES+Nodes", difficulty: "Easy", leetcode: "", gfg: "https://www.geeksforgeeks.org/problems/print-adjacency-list-1587115620/1" },
      { id: "graph-bfs", title: "GRAPH BFS", difficulty: "Easy", leetcode: "", gfg: "https://www.geeksforgeeks.org/problems/bfs-traversal-of-graph/1" },
      { id: "number-of-islands", title: "Number of Islands", difficulty: "Medium", leetcode: "https://leetcode.com/problems/number-of-islands/description/", gfg: "" },
      { id: "number-of-provinces", title: "Number of Provinces", difficulty: "Medium", leetcode: "https://leetcode.com/problems/number-of-provinces/description/", gfg: "" },
      { id: "rotting-oranges", title: "Rotten Oranges", difficulty: "Medium", leetcode: "https://leetcode.com/problems/rotting-oranges/", gfg: "" },
      { id: "cycle-detection-undirected", title: "Cycle detection in undirected graph", difficulty: "Medium", leetcode: "", gfg: "https://www.geeksforgeeks.org/problems/detect-cycle-in-an-undirected-graph/1" },
      { id: "cycle-detection-directed", title: "Cycle detection in directed graph", difficulty: "Medium", leetcode: "", gfg: "https://www.geeksforgeeks.org/problems/detect-cycle-in-a-directed-graph/1" },
      { id: "topological-sort", title: "Topological sort", difficulty: "Medium", leetcode: "", gfg: "https://www.geeksforgeeks.org/problems/topological-sort/1" },
      { id: "bipartite-graph", title: "Bipartite Graph/ Graph Coloring", difficulty: "Medium", leetcode: "https://leetcode.com/problems/is-graph-bipartite/", gfg: "" },
      { id: "surrounded-regions", title: "Surrounded Regoins", difficulty: "Medium", leetcode: "https://leetcode.com/problems/surrounded-regions/", gfg: "" },
      { id: "shortest-path-unweighted", title: "Shortest Path in Non-Weighted Graph", difficulty: "Medium", leetcode: "", gfg: "https://www.geeksforgeeks.org/problems/shortest-path-in-undirected-graph-having-unit-distance/1" },
      { id: "dijkstra-alg", title: "Dijkstra's Algorithm", difficulty: "Medium", leetcode: "", gfg: "https://www.geeksforgeeks.org/problems/implementing-dijkstra-set-1-adjacency-matrix/1" },
      { id: "network-delay-time", title: "Network Delay", difficulty: "Medium", leetcode: "https://leetcode.com/problems/network-delay-time/", gfg: "" },
      { id: "min-effort-path", title: "Path With Minimum Effort", difficulty: "Medium", leetcode: "https://leetcode.com/problems/path-with-minimum-effort/", gfg: "" },
      { id: "swim-rising-water", title: "Swim in Rising Water", difficulty: "Hard", leetcode: "https://leetcode.com/problems/swim-in-rising-water/", gfg: "" },
      { id: "bellman-ford", title: "Bellman ford", difficulty: "Medium", leetcode: "", gfg: "https://www.geeksforgeeks.org/problems/distance-from-the-source-bellman-ford-algorithm/1" },
      { id: "cheapest-flights-k-stops", title: "Cheapest Path in K stops", difficulty: "Medium", leetcode: "https://leetcode.com/problems/cheapest-flights-within-k-stops/description/", gfg: "" },
      { id: "prim-mst", title: "Prim MST", difficulty: "Medium", leetcode: "", gfg: "https://www.geeksforgeeks.org/problems/minimum-spanning-tree/1" },
      { id: "word-ladder", title: "Word Ladder", difficulty: "Hard", leetcode: "https://leetcode.com/problems/word-ladder/", gfg: "" }
    ]
  },
  {
    id: "dynamic-programming",
    title: "Dynamic Programming (DP)",
    description: "Optimize overlapping recursive subproblems by storing subproblem answers in table matrices (Memoization / Tabulation).",
    questions: [
      {
        id: "climbing-stairs",
        title: "Episode 03: Climbing Stairs",
        difficulty: "Easy",
        leetcode: "https://leetcode.com/problems/climbing-stairs/description/",
        gfg: "",
        brute: {
          code: `// Brute Force: Plain Recursion
// Time Complexity: O(2^N) | Space Complexity: O(N)
int climbStairsBrute(int n) {
    if (n <= 1) return 1;
    return climbStairsBrute(n - 1) + climbStairsBrute(n - 2);
}`,
          complexity: "Time: O(2^N), Space: O(N)"
        },
        optimal: {
          code: `// Optimal DP: Tabulation (Space Optimized)
// Time Complexity: O(N) | Space Complexity: O(1)
int climbStairs(int n) {
    if (n <= 1) return 1;
    int prev2 = 1; // F(i-2)
    int prev1 = 1; // F(i-1)
    for (int i = 2; i <= n; i++) {
        int curr = prev1 + prev2;
        prev2 = prev1;
        prev1 = curr;
    }
    return prev1;
}`,
          complexity: "Time: O(N), Space: O(1)"
        },
        hinglish: {
          explanation: `### Intuition (Pehle Soch)
Hume \`n\` stairs chadhni hain. Har step par hum ya toh \`1\` step chal sakte hain ya \`2\` steps.
- **Brute Force (Recursion)**:
\`climb(n) = climb(n-1) + climb(n-2)\`. Yeh Fibonacci jaisa exponential recursion tree banata hai.
- **Optimal (DP)**:
- Kyuki \`n\` stair par pahunchne ke do tarike hain: \`n-1\` se 1 step lekar, ya \`n-2\` se 2 steps lekar.
- Hum is relation ko bottom-up solve kar sakte hain.
- Aur space optimize karne ke liye bas do variables \`prev1\` aur \`prev2\` ko update karte hue standard Fibonacci calculate kar sakte hain.`,
          pseudocode: `function climbStairs(n):
    if n <= 1: return 1
    prev2 = 1
    prev1 = 1
    for i = 2 to n:
        curr = prev1 + prev2
        prev2 = prev1
        prev1 = curr
    return prev1`
        },
        simulator: {
          inputType: "climb-stairs",
          defaultInput: { n: 4 },
          steps: [
            { line: 2, vars: { n: 4, prev2: 1, prev1: 1, i: 2 }, explanation: "Initial state set for stairs. prev2 (climbStairs(0)) = 1, prev1 (climbStairs(1)) = 1." },
            { line: 5, vars: { n: 4, prev2: 1, prev1: 2, i: 2, curr: 2 }, explanation: "i = 2 (2nd stair): curr = prev1 + prev2 = 1 + 1 = 2. Update prev2 = 1, prev1 = 2." },
            { line: 5, vars: { n: 4, prev2: 2, prev1: 3, i: 3, curr: 3 }, explanation: "i = 3 (3rd stair): curr = 2 + 1 = 3. Update prev2 = 2, prev1 = 3." },
            { line: 5, vars: { n: 4, prev2: 3, prev1: 5, i: 4, curr: 5 }, explanation: "i = 4 (4th stair): curr = 3 + 2 = 5. Update prev2 = 3, prev1 = 5." },
            { line: 8, vars: { n: 4, result: 5 }, explanation: "Target stair reached. Return result = 5." }
          ]
        }
      },
      { id: "fibonacci-dp", title: "Episode-02: Fibonacci", difficulty: "Easy", leetcode: "https://leetcode.com/problems/fibonacci-number/description/", gfg: "" },
      { id: "house-robber", title: "Episode 04: House Robber", difficulty: "Medium", leetcode: "https://leetcode.com/problems/house-robber/", gfg: "" },
      { id: "knapsack-01", title: "Episode 05: 0/1 Knapsack", difficulty: "Medium", leetcode: "", gfg: "https://www.geeksforgeeks.org/problems/0-1-knapsack-problem0945/1" },
      { id: "tabulation-intro", title: "Episode 06: tabulation Intro", difficulty: "Easy", leetcode: "", gfg: "" },
      { id: "knapsack-01-tabulation", title: "Episode 07: 0/1 Knapsack Tabulation", difficulty: "Medium", leetcode: "", gfg: "https://www.geeksforgeeks.org/problems/0-1-knapsack-problem0945/1" },
      { id: "subset-sum", title: "Episode 08: Subset sum", difficulty: "Medium", leetcode: "", gfg: "https://www.geeksforgeeks.org/problems/subset-sum-problem-1611555638/1" }
    ]
  }
];
