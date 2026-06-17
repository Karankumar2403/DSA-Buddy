// Group 3 Solutions: Hash Maps, Binary Search, Heap, Recursion & Backtracking

export const solutionsGroup3 = {
  // === HASH MAPS ===
  "max-balloons": {
    brute: {
      code: `#include <string>\n#include <algorithm>\n#include <unordered_map>\nusing namespace std;\n\nint maxNumberOfBalloonsBrute(string text) {\n    // Count combinations...\n    unordered_map<char, int> mp;\n    for(char c : text) mp[c]++;\n    int ans = 0;\n    while(true) {\n        if(mp['b']>=1 && mp['a']>=1 && mp['l']>=2 && mp['o']>=2 && mp['n']>=1) {\n            mp['b']--; mp['a']--; mp['l']-=2; mp['o']-=2; mp['n']--;\n            ans++;\n        } else break;\n    }\n    return ans;\n}`,
      complexity: "Time: O(N), Space: O(1)"
    },
    optimal: {
      code: `#include <string>\n#include <algorithm>\n#include <vector>\nusing namespace std;\n\nint maxNumberOfBalloons(string text) {\n    vector<int> count(26, 0);\n    for (char c : text) count[c - 'a']++;\n    int b = count['b' - 'a'];\n    int a = count['a' - 'a'];\n    int l = count['l' - 'a'] / 2;\n    int o = count['o' - 'a'] / 2;\n    int n = count['n' - 'a'];\n    return min({b, a, l, o, n});\n}`,
      complexity: "Time: O(N), Space: O(1)"
    },
    hinglish: {
      explanation: "### Intuition\nWord 'balloon' characters counts calculate target counts. Find minimum count boundary of balloon characters ('l' and 'o' counted half).",
      pseudocode: "count chars: b, a, l, o, n\n    l = l/2, o = o/2\n    return min({b, a, l, o, n})"
    }
  },
  "longest-palindrome": {
    brute: {
      code: `// Generate all combinations and check palindrome`,
      complexity: "Time: O(2^N), Space: O(N)"
    },
    optimal: {
      code: `#include <string>\n#include <vector>\nusing namespace std;\n\nint longestPalindrome(string s) {\n    vector<int> count(128, 0);\n    for(char c : s) count[c]++;\n    int len = 0;\n    bool hasOdd = false;\n    for(int x : count) {\n        if(x % 2 == 0) len += x;\n        else { len += x - 1; hasOdd = true; }\n    }\n    return len + (hasOdd ? 1 : 0);\n}`,
      complexity: "Time: O(N), Space: O(1)"
    },
    hinglish: {
      explanation: "### Intuition\nCharacters frequency check. Palindrome contains even characters counts plus at most one odd center character.",
      pseudocode: "count char frequencies\n    len = sum of even portions of counts\n    if any count is odd: len += 1"
    }
  },
  "ransom-note": {
    brute: {
      code: `// Sort both strings and compare`,
      complexity: "Time: O(N log N + M log M), Space: O(1)"
    },
    optimal: {
      code: `#include <string>\n#include <vector>\nusing namespace std;\n\nbool canConstruct(string ransomNote, string magazine) {\n    vector<int> count(26, 0);\n    for(char c : magazine) count[c - 'a']++;\n    for(char c : ransomNote) {\n        if(--count[c - 'a'] < 0) return false;\n    }\n    return true;\n}`,
      complexity: "Time: O(N + M), Space: O(1)"
    },
    hinglish: {
      explanation: "### Intuition\nMagazine characters frequency mapping. Ransom note consumes frequency; if counts drop below zero, print false.",
      pseudocode: "map magazine chars frequencies; decrement for ransomNote chars; if frequency < 0: return false"
    }
  },
  "first-non-repeating-char": {
    brute: {
      code: `#include <string>\nusing namespace std;\n\nint firstUniqCharBrute(string s) {\n    for(int i = 0; i < s.length(); i++) {\n        bool found = false;\n        for(int j = 0; j < s.length(); j++) {\n            if(i != j && s[i] == s[j]) {\n                found = true;\n                break;\n            }\n        }\n        if(!found) return i;\n    }\n    return -1;\n}`,
      complexity: "Time: O(N^2), Space: O(1)"
    },
    optimal: {
      code: `#include <string>\n#include <vector>\nusing namespace std;\n\nint firstUniqChar(string s) {\n    vector<int> count(26, 0);\n    for(char c : s) {\n        count[c - 'a']++;\n    }\n    for(int i = 0; i < s.length(); i++) {\n        if(count[s[i] - 'a'] == 1) {\n            return i;\n        }\n    }\n    return -1;\n}`,
      complexity: "Time: O(N), Space: O(1)"
    },
    hinglish: {
      explanation: "### Intuition\nBrute Force me har character ke liye check karenge ki kya wo aage repeat ho raha hai. Optimal approach me hum 26-size ka array frequency counter ke liye use karenge. Pehle loop me frequency calculate karenge, aur doosre loop me jis character ki frequency 1 milegi uski index return kar denge.",
      pseudocode: "count = array of size 26 initialized with 0\nfor char in s:\n    count[char - 'a']++\nfor i = 0 to s.length - 1:\n    if count[s[i] - 'a'] == 1:\n        return i\nreturn -1"
    }
  },

  // === BINARY SEARCH ===
  "upper-bound-ceiling": {
    brute: {
      code: `#include <vector>\nusing namespace std;\n\nint findCeilingBrute(vector<int>& arr, int target) {\n    for(int i=0; i<arr.size(); i++) {\n        if(arr[i] >= target) return i;\n    }\n    return -1;\n}`,
      complexity: "Time: O(N), Space: O(1)"
    },
    optimal: {
      code: `#include <vector>\nusing namespace std;\n\nint findCeiling(vector<int>& arr, int target) {\n    int low = 0, high = arr.size() - 1;\n    int ans = -1;\n    while(low <= high) {\n        int mid = low + (high - low)/2;\n        if(arr[mid] >= target) {\n            ans = mid;\n            high = mid - 1; // Try left smaller\n        } else {\n            low = mid + 1;\n        }\n    }\n    return ans;\n}`,
      complexity: "Time: O(log N), Space: O(1)"
    },
    hinglish: {
      explanation: "### Intuition\nBinary search check. If `arr[mid] >= target`, mid can be the ceiling candidate. Prune search space on right side by setting `high = mid - 1`.",
      pseudocode: "low=0, high=n-1, ans=-1\n    while low <= high:\n        mid = (low+high)/2\n        if arr[mid] >= target: ans=mid, high=mid-1\n        else: low=mid+1"
    }
  },
  "first-and-last-position": {
    brute: {
      code: `#include <vector>\nusing namespace std;\n\nvector<int> searchRangeBrute(vector<int>& nums, int target) {\n    int first = -1, last = -1;\n    for(int i=0; i<nums.size(); i++) {\n        if(nums[i] == target) {\n            if(first == -1) first = i;\n            last = i;\n        }\n    }\n    return {first, last};\n}`,
      complexity: "Time: O(N), Space: O(1)"
    },
    optimal: {
      code: `#include <vector>\nusing namespace std;\n\nint findBound(vector<int>& nums, int target, bool isFirst) {\n    int low = 0, high = nums.size() - 1, ans = -1;\n    while(low <= high) {\n        int mid = low + (high - low)/2;\n        if(nums[mid] == target) {\n            ans = mid;\n            if(isFirst) high = mid - 1;\n            else low = mid + 1;\n        } else if(nums[mid] < target) low = mid + 1;\n        else high = mid - 1;\n    }\n    return ans;\n}\nvector<int> searchRange(vector<int>& nums, int target) {\n    return {findBound(nums, target, true), findBound(nums, target, false)};\n}`,
      complexity: "Time: O(log N), Space: O(1)"
    },
    hinglish: {
      explanation: "### Intuition\nRun two separate binary searches: one for the first occurrence (searches left side when target found) and one for the last occurrence.",
      pseudocode: "first = searchFirstBound(nums, target)\n    last = searchLastBound(nums, target)\n    return {first, last}"
    }
  },
  "count-number-of-occurences": {
    brute: {
      code: `// Linear count`,
      complexity: "Time: O(N), Space: O(1)"
    },
    optimal: {
      code: `// Run first-and-last-position, subtract bounds: last - first + 1`,
      complexity: "Time: O(log N), Space: O(1)"
    },
    hinglish: {
      explanation: "### Intuition\nGet first index of target, then last index. Count = `last_index - first_index + 1`.",
      pseudocode: "f = searchFirst(nums, t), l = searchLast(nums, t). Return l - f + 1"
    }
  },
  "search-infinite-sorted-array": {
    brute: {
      code: `// Linear search`,
      complexity: "Time: O(N), Space: O(1)"
    },
    optimal: {
      code: `#include <vector>\nusing namespace std;\n\n// Dummy reader function\nint getElement(int idx);\n\nint searchInfinite(int target) {\n    int low = 0, high = 1;\n    while (getElement(high) < target) {\n        low = high;\n        high *= 2; // Exponential expansion of search window\n    }\n    while(low <= high) {\n        int mid = low + (high-low)/2;\n        int val = getElement(mid);\n        if(val == target) return mid;\n        else if(val < target) low = mid + 1;\n        else high = mid - 1;\n    }\n    return -1;\n}`,
      complexity: "Time: O(log N), Space: O(1)"
    },
    hinglish: {
      explanation: "### Intuition\nArray bounds unknown. Double high pointer index until `arr[high] > target`. Then perform binary search in `[low, high]` range.",
      pseudocode: "low=0, high=1\n    while arr[high] < target: low = high, high = high * 2\n    run binarySearch in range [low, high]"
    }
  },
  "peak-index-mountain": {
    brute: {
      code: `// Find maximum index`,
      complexity: "Time: O(N), Space: O(1)"
    },
    optimal: {
      code: `#include <vector>\nusing namespace std;\n\nint peakIndexInMountainArray(vector<int>& arr) {\n    int low = 0, high = arr.size() - 1;\n    while(low < high) {\n        int mid = low + (high - low)/2;\n        if(arr[mid] < arr[mid + 1]) low = mid + 1;\n        else high = mid;\n    }\n    return low;\n}`,
      complexity: "Time: O(log N), Space: O(1)"
    },
    hinglish: {
      explanation: "### Intuition\nMountain properties. If `arr[mid] < arr[mid+1]`, mid is on the rising slope, so peak must be rightwards. Otherwise peak is at or left of mid.",
      pseudocode: "while low < high:\n        mid = (low+high)/2\n        if arr[mid] < arr[mid+1]: low = mid + 1\n        else: high = mid"
    }
  },
  "find-peak-element": {
    brute: {
      code: `// Same as peak-index-mountain brute`,
      complexity: "Time: O(N), Space: O(1)"
    },
    optimal: {
      code: `// Same as peak-index-mountain optimal implementation`,
      complexity: "Time: O(log N), Space: O(1)"
    },
    hinglish: {
      explanation: "### Intuition\nExactly similar to peak in mountain. Pointers partition peak bounds binary search.",
      pseudocode: "See peak-index-mountain"
    }
  },
  "find-min-rotated-sorted": {
    brute: {
      code: `#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint findMinBrute(vector<int>& nums) {\n    return *min_element(nums.begin(), nums.end());\n}`,
      complexity: "Time: O(N), Space: O(1)"
    },
    optimal: {
      code: `#include <vector>\nusing namespace std;\n\nint findMin(vector<int>& nums) {\n    int low = 0, high = nums.size() - 1;\n    while(low < high) {\n        int mid = low + (high-low)/2;\n        if(nums[mid] > nums[high]) low = mid + 1; // Pivot lies to the right\n        else high = mid;\n    }\n    return nums[low];\n}`,
      complexity: "Time: O(log N), Space: O(1)"
    },
    hinglish: {
      explanation: "### Intuition\nRotated array properties. If `nums[mid] > nums[high]`, pivot/minimum element lies in right unsorted portion. Else it lies in left portion.",
      pseudocode: "while low < high:\n        mid = (low+high)/2\n        if nums[mid] > nums[high]: low = mid + 1\n        else: high = mid"
    }
  },
  "find-rotations-sorted": {
    brute: {
      code: `// Linear search for minimum index`,
      complexity: "Time: O(N), Space: O(1)"
    },
    optimal: {
      code: `// Run find-min-rotated-sorted, returns the index of min element`,
      complexity: "Time: O(log N), Space: O(1)"
    },
    hinglish: {
      explanation: "### Intuition\nThe rotation count is simply the index of the minimum element in the rotated sorted array.",
      pseudocode: "index = findMinRotatedSorted(nums); return index"
    }
  },
  "search-rotated-sorted": {
    brute: {
      code: `// Linear search O(N)`,
      complexity: "Time: O(N), Space: O(1)"
    },
    optimal: {
      code: `#include <vector>\nusing namespace std;\n\nint search(vector<int>& nums, int target) {\n    int low = 0, high = nums.size() - 1;\n    while(low <= high) {\n        int mid = low + (high-low)/2;\n        if(nums[mid] == target) return mid;\n        if(nums[low] <= nums[mid]) { // Left side is sorted\n            if(target >= nums[low] && target < nums[mid]) high = mid - 1;\n            else low = mid + 1;\n        } else { // Right side is sorted\n            if(target > nums[mid] && target <= nums[high]) low = mid + 1;\n            else high = mid - 1;\n        }\n    }\n    return -1;\n}`,
      complexity: "Time: O(log N), Space: O(1)"
    },
    hinglish: {
      explanation: "### Intuition\nIdentify which half is sorted. If left half is sorted, check if target falls in left bounds; else check right sorted bounds.",
      pseudocode: "while low <= high:\n        if target == mid: return mid\n        if left sorted:\n            if target in range: high = mid-1 else: low = mid+1\n        else right sorted:\n            if target in range: low = mid+1 else: high = mid-1"
    }
  },
  "koko-eating-bananas": {
    brute: {
      code: `// Linear check speed from 1 to max pile`,
      complexity: "Time: O(N * MaxPile), Space: O(1)"
    },
    optimal: {
      code: `#include <vector>\n#include <algorithm>\n#include <cmath>\nusing namespace std;\n\nbool canEatAll(const vector<int>& piles, int h, int k) {\n    long long hours = 0;\n    for(int p : piles) {\n        hours += (p + k - 1) / k;\n    }\n    return hours <= h;\n}\nint minEatingSpeed(vector<int>& piles, int h) {\n    int low = 1, high = *max_element(piles.begin(), piles.end());\n    int ans = high;\n    while(low <= high) {\n        int mid = low + (high-low)/2;\n        if(canEatAll(piles, h, mid)) {\n            ans = mid;\n            high = mid - 1; // Try slower speed\n        } else {\n            low = mid + 1;\n        }\n    }\n    return ans;\n}`,
      complexity: "Time: O(N log(MaxPile)), Space: O(1)"
    },
    hinglish: {
      explanation: "### Intuition\nBinary search over eating speed options. Range `[1, max(piles)]`. If speed `mid` is valid, record and test slower speed (left half).",
      pseudocode: "low = 1, high = max(piles)\n    while low <= high:\n        mid = (low+high)/2\n        if canEat(mid): ans = mid, high = mid-1\n        else: low = mid + 1"
    }
  },
  "min-days-bouquets": {
    brute: {
      code: `// Linear search days`,
      complexity: "Time: O(N * MaxDay), Space: O(1)"
    },
    optimal: {
      code: `#include <vector>\n#include <algorithm>\nusing namespace std;\n\nbool isValid(const vector<int>& bloomDay, int m, int k, int days) {\n    int count = 0, bouquets = 0;\n    for(int d : bloomDay) {\n        if(d <= days) {\n            count++;\n            if(count == k) { bouquets++; count = 0; }\n        } else {\n            count = 0;\n        }\n    }\n    return bouquets >= m;\n}\nint minDays(vector<int>& bloomDay, int m, int k) {\n    long long totalNeeded = (long long)m * k;\n    if(bloomDay.size() < totalNeeded) return -1;\n    int low = 1, high = *max_element(bloomDay.begin(), bloomDay.end());\n    int ans = -1;\n    while(low <= high) {\n        int mid = low + (high-low)/2;\n        if(isValid(bloomDay, m, k, mid)) {\n            ans = mid;\n            high = mid - 1;\n        } else {\n            low = mid + 1;\n        }\n    }\n    return ans;\n}`,
      complexity: "Time: O(N log(MaxDay)), Space: O(1)"
    },
    hinglish: {
      explanation: "### Intuition\nBinary search answer space. Low = 1, High = max(bloomDay). Validate if current days mid is enough to build `m` bouquets of size `k`.",
      pseudocode: "Binary search bloom days range. Validator counts adjacent flowers bloomed by day <= mid."
    }
  },
  "aggressive-cows": {
    brute: {
      code: `// Linear search separation distance`,
      complexity: "Time: O(N * MaxDist), Space: O(1)"
    },
    optimal: {
      code: `#include <vector>\n#include <algorithm>\nusing namespace std;\n\nbool canPlace(const vector<int>& stalls, int cows, int minDist) {\n    int count = 1, lastPos = stalls[0];\n    for(size_t i=1; i<stalls.size(); i++) {\n        if(stalls[i] - lastPos >= minDist) {\n            count++;\n            lastPos = stalls[i];\n            if(count == cows) return true;\n        }\n    }\n    return false;\n}\nint aggressiveCows(vector<int>& stalls, int k) {\n    sort(stalls.begin(), stalls.end());\n    int low = 1, high = stalls.back() - stalls[0], ans = 0;\n    while(low <= high) {\n        int mid = low + (high-low)/2;\n        if(canPlace(stalls, k, mid)) {\n            ans = mid;\n            low = mid + 1; // Try larger separation\n        } else {\n            high = mid - 1;\n        }\n    }\n    return ans;\n}`,
      complexity: "Time: O(N log N + N log(Range)), Space: O(1)"
    },
    hinglish: {
      explanation: "### Intuition\nBinary search separation bounds. Sort stalls. Place cows greedily at distance >= mid. If successful, search right half to maximize minimum distance.",
      pseudocode: "sort stalls\n    low = 1, high = maxDist\n    while low <= high:\n        mid = (low+high)/2\n        if canPlaceCows(mid): ans = mid, low = mid + 1\n        else: high = mid - 1"
    }
  },
  "capacity-ship-packages": {
    brute: {
      code: `// Linear check capacity from max element to sum`,
      complexity: "Time: O(N * SumWeight), Space: O(1)"
    },
    optimal: {
      code: `#include <vector>\n#include <numeric>\n#include <algorithm>\nusing namespace std;\n\nbool canShip(const vector<int>& weights, int days, int capacity) {\n    int d = 1, currSum = 0;\n    for(int w : weights) {\n        if(currSum + w > capacity) {\n            d++;\n            currSum = w;\n        } else {\n            currSum += w;\n        }\n    }\n    return d <= days;\n}\nint shipWithinDays(vector<int>& weights, int days) {\n    int low = *max_element(weights.begin(), weights.end());\n    int high = accumulate(weights.begin(), weights.end(), 0);\n    int ans = high;\n    while(low <= high) {\n        int mid = low + (high-low)/2;\n        if(canShip(weights, days, mid)) {\n            ans = mid;\n            high = mid - 1;\n        } else {\n            low = mid + 1;\n        }\n    }\n    return ans;\n}`,
      complexity: "Time: O(N log(SumWeight)), Space: O(1)"
    },
    hinglish: {
      explanation: "### Intuition\nBinary search ship capacity. Range starts at max package weight, ends at sum of all weights. Test if mid capacity fits packages in given days.",
      pseudocode: "low = max(weights), high = sum(weights)\n    while low <= high:\n        mid = (low+high)/2\n        if fitsInDays(mid): ans = mid, high = mid-1\n        else: low = mid + 1"
    }
  },
  "book-allocation": {
    brute: {
      code: `// Linear search pages`,
      complexity: "Time: O(N * SumPages), Space: O(1)"
    },
    optimal: {
      code: `// Binary search capacity range: [max(pages), sum(pages)], checks student counts greedily. Identical to split-largest-array.`,
      complexity: "Time: O(N log(SumPages)), Space: O(1)"
    },
    hinglish: {
      explanation: "### Intuition\nAllocation of book pages. Same paradigm: binary search over maximum pages per student, greedy checker.",
      pseudocode: "Same as capacity-ship-packages logic."
    }
  },
  "split-largest-array": {
    brute: {
      code: `// Linear search max subarray sum limits`,
      complexity: "Time: O(N * Sum), Space: O(1)"
    },
    optimal: {
      code: `// Same as capacity-ship-packages optimal implementation (Weights = Array values, Days = Split count K).`,
      complexity: "Time: O(N log(Sum)), Space: O(1)"
    },
    hinglish: {
      explanation: "### Intuition\nMinimize the maximum subarray sum. Binary search range `[max(arr), sum(arr)]` with greedy validator.",
      pseudocode: "See capacity-ship-packages"
    }
  },
  "search-2d-matrix": {
    brute: {
      code: `#include <vector>\nusing namespace std;\n\nbool searchMatrixBrute(vector<vector<int>>& matrix, int target) {\n    for(const auto& row : matrix) {\n        for(int x : row) {\n            if(x == target) return true;\n        }\n    }\n    return false;\n}`,
      complexity: "Time: O(N*M), Space: O(1)"
    },
    optimal: {
      code: `#include <vector>\nusing namespace std;\n\nbool searchMatrix(vector<vector<int>>& matrix, int target) {\n    if(matrix.empty()) return false;\n    int n = matrix.size(), m = matrix[0].size();\n    int low = 0, high = n * m - 1;\n    while(low <= high) {\n        int mid = low + (high-low)/2;\n        int val = matrix[mid / m][mid % m]; // Convert 1D index to 2D indices\n        if(val == target) return true;\n        else if(val < target) low = mid + 1;\n        else high = mid - 1;\n    }\n    return false;\n}`,
      complexity: "Time: O(log(N*M)), Space: O(1)"
    },
    hinglish: {
      explanation: "### Intuition\nFlatten 2D grid coordinates mentally to 1D index array size. Perform standard binary search translating `index` to `[index / cols][index % cols]` matrix coordinates.",
      pseudocode: "low = 0, high = rows * cols - 1\n    while low <= high:\n        mid = (low+high)/2\n        val = matrix[mid / cols][mid % cols]\n        if val == target: return true\n        else if val < target: low = mid + 1\n        else: high = mid - 1"
    }
  },
  "search-2d-matrix-ii": {
    brute: {
      code: `// Double loop O(N*M)`,
      complexity: "Time: O(N*M), Space: O(1)"
    },
    optimal: {
      code: `#include <vector>\nusing namespace std;\n\nbool searchMatrix2(vector<vector<int>>& matrix, int target) {\n    if(matrix.empty()) return false;\n    int r = 0, c = matrix[0].size() - 1; // Start top-right corner\n    while(r < matrix.size() && c >= 0) {\n        if(matrix[r][c] == target) return true;\n        else if(matrix[r][c] > target) c--; // Move left\n        else r++; // Move down\n    }\n    return false;\n}`,
      complexity: "Time: O(N + M), Space: O(1)"
    },
    hinglish: {
      explanation: "### Intuition\nStart top-right cell. If target is smaller than cell value, it can't be in this column (shift left). If larger, it can't be in this row (shift down).",
      pseudocode: "row = 0, col = cols - 1\n    while row < rows and col >= 0:\n        if matrix[row][col] == target: return true\n        else if matrix[row][col] > target: col--\n        else: row++"
    }
  },
  "kth-smallest-sorted-matrix": {
    brute: {
      code: `// Flatten matrix, sort elements O(N*M log(N*M))`,
      complexity: "Time: O(N*M log(N*M)), Space: O(N*M)"
    },
    optimal: {
      code: `#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint countLessEqual(const vector<vector<int>>& matrix, int mid, int n) {\n    int count = 0, c = n - 1, r = 0;\n    while (r < n && c >= 0) {\n        if (matrix[r][c] <= mid) {\n            count += (c + 1);\n            r++;\n        } else {\n            c--;\n        }\n    }\n    return count;\n}\nint kthSmallest(vector<vector<int>>& matrix, int k) {\n    int n = matrix.size();\n    int low = matrix[0][0], high = matrix[n - 1][n - 1];\n    int ans = low;\n    while (low <= high) {\n        int mid = low + (high - low) / 2;\n        if (countLessEqual(matrix, mid, n) >= k) {\n            ans = mid;\n            high = mid - 1;\n        } else {\n            low = mid + 1;\n        }\n    }\n    return ans;\n}`,
      complexity: "Time: O(N log(Max-Min)), Space: O(1)"
    },
    hinglish: {
      explanation: "### Intuition\nBinary search over values ranges. For mid guess, count how many elements are smaller using stair-step method starting from top-right corner.",
      pseudocode: "low = matrix[0][0], high = matrix[n-1][n-1]\n    while low <= high:\n        mid = (low+high)/2\n        if countLessEqual(mid) >= k: ans=mid, high=mid-1\n        else: low=mid+1"
    }
  },
  "kth-smallest-multiplication": {
    brute: {
      code: `// Generate values, sort`,
      complexity: "Time: O(N*M log(N*M)), Space: O(N*M)"
    },
    optimal: {
      code: `#include <algorithm>\nusing namespace std;\n\nint countLessEqualTable(int m, int n, int mid) {\n    int count = 0;\n    for(int i = 1; i <= m; i++) {\n        count += min(mid / i, n);\n    }\n    return count;\n}\nint findKthNumber(int m, int n, int k) {\n    int low = 1, high = m * n, ans = high;\n    while(low <= high) {\n        int mid = low + (high-low)/2;\n        if(countLessEqualTable(m, n, mid) >= k) {\n            ans = mid;\n            high = mid - 1;\n        } else {\n            low = mid + 1;\n        }\n    }\n    return ans;\n}`,
      complexity: "Time: O(M log(M*N)), Space: O(1)"
    },
    hinglish: {
      explanation: "### Intuition\nBinary search answer range. For a guess mid, count elements in multiplication table <= mid. Count is simply sum of `min(mid / row, cols)`.",
      pseudocode: "low = 1, high = m * n\n    while low <= high:\n        mid = (low+high)/2\n        if countLessEqual(mid) >= k: ans=mid, high=mid-1\n        else: low=mid+1"
    }
  },
  "median-two-sorted-arrays": {
    brute: {
      code: `// Merge two arrays, find middle element`,
      complexity: "Time: O(N + M), Space: O(N + M)"
    },
    optimal: {
      code: `#include <vector>\n#include <algorithm>\n#include <climits>\nusing namespace std;\n\ndouble findMedianSortedArrays(vector<int>& nums1, vector<int>& nums2) {\n    if (nums1.size() > nums2.size()) return findMedianSortedArrays(nums2, nums1);\n    int x = nums1.size(), y = nums2.size();\n    int low = 0, high = x;\n    while (low <= high) {\n        int partitionX = (low + high) / 2;\n        int partitionY = (x + y + 1) / 2 - partitionX;\n        int maxLeftX = (partitionX == 0) ? INT_MIN : nums1[partitionX - 1];\n        int minRightX = (partitionX == x) ? INT_MAX : nums1[partitionX];\n        int maxLeftY = (partitionY == 0) ? INT_MIN : nums2[partitionY - 1];\n        int minRightY = (partitionY == y) ? INT_MAX : nums2[partitionY];\n        if (maxLeftX <= minRightY && maxLeftY <= minRightX) {\n            if ((x + y) % 2 == 0) {\n                return ((double)max(maxLeftX, maxLeftY) + min(minRightX, minRightY)) / 2.0;\n            } else {\n                return (double)max(maxLeftX, maxLeftY);\n            }\n        } else if (maxLeftX > minRightY) {\n            high = partitionX - 1;\n        } else {\n            low = partitionX + 1;\n        }\n    }\n    return 0.0;\n}`,
      complexity: "Time: O(log(Min(N,M))), Space: O(1)"
    },
    hinglish: {
      explanation: "### Intuition\nPartition both arrays such that elements on left are smaller than elements on right. Perform binary search on partition size of smaller array.",
      pseudocode: "Run partition binary search. Check overlaps: maxLeftX <= minRightY and maxLeftY <= minRightX."
    }
  },

  // === HEAP PATTERN ===
  "kth-smallest": {
    brute: {
      code: `// Sort and return index k-1`,
      complexity: "Time: O(N log N), Space: O(1)"
    },
    optimal: {
      code: `#include <vector>\n#include <queue>\nusing namespace std;\n\nint findKthSmallest(vector<int>& nums, int k) {\n    priority_queue<int> maxHeap; // Track smallest elements using Max Heap\n    for(int x : nums) {\n        maxHeap.push(x);\n        if(maxHeap.size() > k) maxHeap.pop();\n    }\n    return maxHeap.top();\n}`,
      complexity: "Time: O(N log K), Space: O(K)"
    },
    hinglish: {
      explanation: "### Intuition\nMaintain a Max Heap of size K. If heap size exceeds K, pop the maximum element. Top represents K-th smallest.",
      pseudocode: "Run Max Heap of size K. Pop top when size > K."
    }
  },
  "top-k-frequent-elements": {
    brute: {
      code: `// Map frequencies, sort frequency list`,
      complexity: "Time: O(N log N), Space: O(N)"
    },
    optimal: {
      code: `#include <vector>\n#include <unordered_map>\n#include <queue>\nusing namespace std;\n\nvector<int> topKFrequent(vector<int>& nums, int k) {\n    unordered_map<int, int> count;\n    for(int x : nums) count[x]++;\n    // Min heap tracking frequencies\n    priority_queue<pair<int, int>, vector<pair<int, int>>, greater<pair<int, int>>> minHeap;\n    for(auto p : count) {\n        minHeap.push({p.second, p.first});\n        if(minHeap.size() > k) minHeap.pop();\n    }\n    vector<int> res;\n    while(!minHeap.empty()) {\n        res.push_back(minHeap.top().second);\n        minHeap.pop();\n    }\n    return res;\n}`,
      complexity: "Time: O(N log K), Space: O(N + K)"
    },
    hinglish: {
      explanation: "### Intuition\nMap frequencies. Use Min Heap of pairs `{frequency, element}` of size K. Top contains K most frequent elements.",
      pseudocode: "Build freq map.\n    Push pairs {freq, num} to min heap of size K.\n    Pop top if size > K.\n    Return elements."
    }
  },
  "top-k-frequent-words": {
    brute: {
      code: `// Map, sort words O(N log N)`,
      complexity: "Time: O(N log N), Space: O(N)"
    },
    optimal: {
      code: `#include <vector>\n#include <string>\n#include <unordered_map>\n#include <queue>\n#include <algorithm>\nusing namespace std;\n\nvector<string> topKFrequent(vector<string>& words, int k) {\n    unordered_map<string, int> count;\n    for(const string& w : words) count[w]++;\n    auto comp = [](const pair<int, string>& a, const pair<int, string>& b) {\n        return a.first > b.first || (a.first == b.first && a.second < b.second);\n    };\n    priority_queue<pair<int, string>, vector<pair<int, string>>, decltype(comp)> pq(comp);\n    for(const auto& p : count) {\n        pq.push({p.second, p.first});\n        if(pq.size() > k) pq.pop();\n    }\n    vector<string> res;\n    while(!pq.empty()) { res.push_back(pq.top().second); pq.pop(); }\n    reverse(res.begin(), res.end());\n    return res;\n}`,
      complexity: "Time: O(N log K), Space: O(N)"
    },
    hinglish: {
      explanation: "### Intuition\nMap frequencies. Use custom heap comparing frequencies and alphabetical ordering to store top K frequent words.",
      pseudocode: "Heap with custom comparator for frequency and lexicographical checks."
    }
  },
  "k-closest-points-origin": {
    brute: {
      code: `// Sort points by Euclidean distance`,
      complexity: "Time: O(N log N), Space: O(1)"
    },
    optimal: {
      code: `#include <vector>\n#include <queue>\nusing namespace std;\n\nvector<vector<int>> kClosest(vector<vector<int>>& points, int k) {\n    priority_queue<pair<int, int>> maxHeap; // Track closest via Max Heap\n    for(int i=0; i<points.size(); i++) {\n        int dist = points[i][0]*points[i][0] + points[i][1]*points[i][1];\n        maxHeap.push({dist, i});\n        if(maxHeap.size() > k) maxHeap.pop();\n    }\n    vector<vector<int>> res;\n    while(!maxHeap.empty()) {\n        res.push_back(points[maxHeap.top().second]);\n        maxHeap.pop();\n    }\n    return res;\n}`,
      complexity: "Time: O(N log K), Space: O(K)"
    },
    hinglish: {
      explanation: "### Intuition\nCalculate Euclidean distance squared. Maintain Max Heap of size K containing `{distance, index}`. Top holds K closest points.",
      pseudocode: "Calculate distance squared.\n    Feed Max Heap of size K.\n    Pop maximum distance when size > K."
    }
  },
  "merge-k-sorted-arrays": {
    brute: {
      code: `// Combine all elements, sort`,
      complexity: "Time: O(N log N), Space: O(N)"
    },
    optimal: {
      code: `#include <vector>\n#include <queue>\nusing namespace std;\n\nstruct Element {\n    int val, valIdx, arrayIdx;\n};\n\nvector<int> mergeKArrays(vector<vector<int>>& arrays) {\n    auto comp = [](const Element& a, const Element& b) { return a.val > b.val; };\n    priority_queue<Element, vector<Element>, decltype(comp)> minHeap(comp);\n    for(int i=0; i<arrays.size(); i++) {\n        if(!arrays[i].empty()) minHeap.push({arrays[i][0], 0, i});\n    }\n    vector<int> res;\n    while(!minHeap.empty()) {\n        Element curr = minHeap.top();\n        minHeap.pop();\n        res.push_back(curr.val);\n        if(curr.valIdx + 1 < arrays[curr.arrayIdx].size()) {\n            minHeap.push({arrays[curr.arrayIdx][curr.valIdx + 1], curr.valIdx + 1, curr.arrayIdx});\n        }\n    }\n    return res;\n}`,
      complexity: "Time: O(N log K), Space: O(K)"
    },
    hinglish: {
      explanation: "### Intuition\nUse Min Heap. Insert first element of each of the K arrays. Repeatedly pop the minimum, add it to result, and insert next element from same array.",
      pseudocode: "Push first elements of K arrays into Min Heap.\n    While heap is not empty:\n        pop min, add to result\n        push next element from same array source if exists"
    }
  },
  "find-median-data-stream": {
    brute: {
      code: `// Insert into vector, sort, return middle`,
      complexity: "Time: O(N log N), Space: O(N)"
    },
    optimal: {
      code: `#include <queue>\n#include <vector>\nusing namespace std;\n\nclass MedianFinder {\n    priority_queue<int> maxHeap; // stores smaller half\n    priority_queue<int, vector<int>, greater<int>> minHeap; // stores larger half\npublic:\n    void addNum(int num) {\n        maxHeap.push(num);\n        minHeap.push(maxHeap.top());\n        maxHeap.pop();\n        if (maxHeap.size() < minHeap.size()) {\n            maxHeap.push(minHeap.top());\n            minHeap.pop();\n        }\n    }\n    double findMedian() {\n        return maxHeap.size() > minHeap.size() ? maxHeap.top() : (maxHeap.top() + minHeap.top()) / 2.0;\n    }\n};`,
      complexity: "Time: O(log N) addNum, O(1) findMedian, Space: O(N)"
    },
    hinglish: {
      explanation: "### Intuition\nUse two heaps: Max Heap for smaller half elements, Min Heap for larger half. Keep their sizes balanced; median is either top of Max Heap or average of both tops.",
      pseudocode: "Add to maxHeap, then balance to minHeap.\n    If size maxHeap < size minHeap: balance back.\n    Median is top or average of both tops."
    }
  },

  // === RECURSION & BACKTRACKING ===
  "generate-parentheses": {
    brute: {
      code: `// Generate all combinations and check balance`,
      complexity: "Time: O(2^(2N) * N), Space: O(N)"
    },
    optimal: {
      code: `#include <vector>\n#include <string>\nusing namespace std;\n\nvoid backtrack(vector<string>& res, string curr, int open, int close, int n) {\n    if(curr.length() == 2 * n) {\n        res.push_back(curr);\n        return;\n    }\n    if(open < n) backtrack(res, curr + '(', open + 1, close, n);\n    if(close < open) backtrack(res, curr + ')', open, close + 1, n);\n}\nvector<string> generateParenthesis(int n) {\n    vector<string> res;\n    backtrack(res, \"\", 0, 0, n);\n    return res;\n}`,
      complexity: "Time: O(4^N / sqrt(N)), Space: O(N)"
    },
    hinglish: {
      explanation: "### Intuition\nBacktracking choices tree. Add '(' if we have remaining open brackets. Add ')' only if number of open brackets > close brackets.",
      pseudocode: "function backtrack(curr, open, close):\n    if curr.len == 2*n: add to res; return\n    if open < n: backtrack(curr + '(', open+1, close)\n    if close < open: backtrack(curr + ')', open, close+1)"
    }
  },
  "permutations": {
    brute: {
      code: `// Standard recursive permutations, using visited table`,
      complexity: "Time: O(N! * N), Space: O(N)"
    },
    optimal: {
      code: `#include <vector>\n#include <algorithm>\nusing namespace std;\n\nvoid solvePermutations(vector<int>& nums, int start, vector<vector<int>>& res) {\n    if (start == nums.size()) {\n        res.push_back(nums);\n        return;\n    }\n    for (int i = start; i < nums.size(); i++) {\n        swap(nums[start], nums[i]);\n        solvePermutations(nums, start + 1, res);\n        swap(nums[start], nums[i]); // Backtrack\n    }\n}\nvector<vector<int>> permute(vector<int>& nums) {\n    vector<vector<int>> res;\n    solvePermutations(nums, 0, res);\n    return res;\n}`,
      complexity: "Time: O(N! * N), Space: O(N)"
    },
    hinglish: {
      explanation: "### Intuition\nRecursive swap selections. For each index position, swap current element with subsequent elements to generate all permutations, then swap back.",
      pseudocode: "function permute(start):\n    if start == end: add nums to res; return\n    for i = start to end:\n        swap(nums[start], nums[i])\n        permute(start + 1)\n        swap(nums[start], nums[i])"
    }
  },
  "letter-combinations-phone": {
    brute: {
      code: `// Recursive nested letters accumulation`,
      complexity: "Time: O(4^N), Space: O(N)"
    },
    optimal: {
      code: `#include <vector>\n#include <string>\nusing namespace std;\n\nconst vector<string> mapping = {\"\", \"\", \"abc\", \"def\", \"ghi\", \"jkl\", \"mno\", \"pqrs\", \"tuv\", \"wxyz\"};\n\nvoid solvePhone(const string& digits, int idx, string curr, vector<string>& res) {\n    if(idx == digits.length()) {\n        res.push_back(curr);\n        return;\n    }\n    string letters = mapping[digits[idx] - '0'];\n    for(char c : letters) {\n        solvePhone(digits, idx + 1, curr + c, res);\n    }\n}\nvector<string> letterCombinations(string digits) {\n    vector<string> res;\n    if(digits.empty()) return res;\n    solvePhone(digits, 0, \"\", res);\n    return res;\n}`,
      complexity: "Time: O(4^N), Space: O(N)"
    },
    hinglish: {
      explanation: "### Intuition\nPhone map letters branching. Recursively build letter combinations by mapping digits index to their corresponding character arrays.",
      pseudocode: "letters = map[digit]\n    for char in letters:\n        backtrack(index + 1, curr + char)"
    }
  },
  "combination-sum": {
    brute: {
      code: `// Check all subsets combinations`,
      complexity: "Time: O(2^Target), Space: O(Target)"
    },
    optimal: {
      code: `#include <vector>\nusing namespace std;\n\nvoid solveSum(const vector<int>& candidates, int idx, int target, vector<int>& curr, vector<vector<int>>& res) {\n    if(target == 0) {\n        res.push_back(curr);\n        return;\n    }\n    if(idx == candidates.size() || target < 0) return;\n    // Choice 1: Include current element (can repeat)\n    curr.push_back(candidates[idx]);\n    solveSum(candidates, idx, target - candidates[idx], curr, res);\n    curr.pop_back(); // Backtrack\n    // Choice 2: Exclude current element\n    solveSum(candidates, idx + 1, target, curr, res);\n}\nvector<vector<int>> combinationSum(vector<int>& candidates, int target) {\n    vector<vector<int>> res;\n    vector<int> curr;\n    solveSum(candidates, 0, target, curr, res);\n    return res;\n}`,
      complexity: "Time: O(2^T), Space: O(T)"
    },
    hinglish: {
      explanation: "### Intuition\nTake / Not Take paradigm. Recursively subtract target value; we can include the current index candidate multiple times, or skip to next index.",
      pseudocode: "backtrack(idx, target):\n    if target == 0: add to res; return\n    if target < 0: return\n    // take candidate[idx]\n    curr.push(candidate[idx])\n    backtrack(idx, target - candidate[idx])\n    curr.pop()\n    // skip candidate[idx]\n    backtrack(idx + 1, target)"
    }
  }
};
