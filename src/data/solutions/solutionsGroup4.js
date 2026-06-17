// Group 4 Solutions: Trees, Graphs, DP

export const solutionsGroup4 = {
  // === TREE PATTERN ===
  "binary-tree-preorder": {
    brute: {
      code: `// Simple recursive preorder traversal`,
      complexity: "Time: O(N), Space: O(N)"
    },
    optimal: {
      code: `#include <vector>\n#include <stack>\nusing namespace std;\n\nstruct TreeNode {\n    int val;\n    TreeNode *left, *right;\n    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}\n};\n\nvector<int> preorderTraversal(TreeNode* root) {\n    vector<int> res;\n    if(!root) return res;\n    stack<TreeNode*> st;\n    st.push(root);\n    while(!st.empty()) {\n        TreeNode* curr = st.top(); st.pop();\n        res.push_back(curr->val);\n        if(curr->right) st.push(curr->right); // Right first in stack\n        if(curr->left) st.push(curr->left);   // Left next to pop first\n    }\n    return res;\n}`,
      complexity: "Time: O(N), Space: O(N)"
    },
    hinglish: {
      explanation: "### Intuition\nPreorder (Root, Left, Right). Stack variables run iteration. Push right child first then left child so that left is popped first.",
      pseudocode: "stack.push(root)\n    while stack not empty:\n        node = stack.pop()\n        visit(node)\n        push(node.right)\n        push(node.left)"
    }
  },
  "binary-tree-postorder": {
    brute: {
      code: `// Simple recursive postorder traversal`,
      complexity: "Time: O(N), Space: O(N)"
    },
    optimal: {
      code: `#include <vector>\n#include <stack>\n#include <algorithm>\nusing namespace std;\n\nstruct TreeNode {\n    int val;\n    TreeNode *left, *right;\n    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}\n};\n\nvector<int> postorderTraversal(TreeNode* root) {\n    vector<int> res;\n    if(!root) return res;\n    stack<TreeNode*> st;\n    st.push(root);\n    while(!st.empty()) {\n        TreeNode* curr = st.top(); st.pop();\n        res.push_back(curr->val);\n        if(curr->left) st.push(curr->left);\n        if(curr->right) st.push(curr->right);\n    }\n    reverse(res.begin(), res.end()); // Root-Right-Left reversed is Left-Right-Root\n    return res;\n}`,
      complexity: "Time: O(N), Space: O(N)"
    },
    hinglish: {
      explanation: "### Intuition\nPostorder (Left, Right, Root). Run iterative Root-Right-Left traversal, then reverse the result list to get Left-Right-Root.",
      pseudocode: "stack.push(root)\n    while stack not empty:\n        node = stack.pop()\n        res.push(node.val)\n        push(left), push(right)\n    reverse(res)"
    }
  },
  "binary-tree-level-order": {
    brute: {
      code: `// Recursive level order keeping track of depths`,
      complexity: "Time: O(N), Space: O(N)"
    },
    optimal: {
      code: `#include <vector>\n#include <queue>\nusing namespace std;\n\nstruct TreeNode {\n    int val;\n    TreeNode *left, *right;\n    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}\n};\n\nvector<vector<int>> levelOrder(TreeNode* root) {\n    vector<vector<int>> res;\n    if(!root) return res;\n    queue<TreeNode*> q;\n    q.push(root);\n    while(!q.empty()) {\n        int size = q.size();\n        vector<int> level;\n        for(int i = 0; i < size; i++) {\n            TreeNode* curr = q.front(); q.pop();\n            level.push_back(curr->val);\n            if(curr->left) q.push(curr->left);\n            if(curr->right) q.push(curr->right);\n        }\n        res.push_back(level);\n    }\n    return res;\n}`,
      complexity: "Time: O(N), Space: O(N)"
    },
    hinglish: {
      explanation: "### Intuition\nBFS Queue level order. Use Queue to traverse breadth levels. For each level, record queue size and process that many elements in a loop.",
      pseudocode: "queue.push(root)\n    while queue not empty:\n        levelSize = queue.size\n        for i = 0 to levelSize:\n            node = queue.pop()\n            level.add(node.val)\n            push(left), push(right)\n        res.add(level)"
    }
  },
  "invert-tree": {
    brute: {
      code: `// Iterate nodes and swap left/right pointers using recursion`,
      complexity: "Time: O(N), Space: O(H)"
    },
    optimal: {
      code: `#include <algorithm>\nusing namespace std;\n\nstruct TreeNode {\n    int val;\n    TreeNode *left, *right;\n    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}\n};\n\nTreeNode* invertTree(TreeNode* root) {\n    if(!root) return nullptr;\n    swap(root->left, root->right);\n    invertTree(root->left);\n    invertTree(root->right);\n    return root;\n}`,
      complexity: "Time: O(N), Space: O(H)"
    },
    hinglish: {
      explanation: "### Intuition\nSwap left and right child nodes recursively for every subtree node.",
      pseudocode: "if root is null: return null\n    swap(root.left, root.right)\n    invertTree(root.left)\n    invertTree(root.right)"
    }
  },
  "symmetric-tree": {
    brute: {
      code: `// Clone tree, invert, and check if identical`,
      complexity: "Time: O(N), Space: O(N)"
    },
    optimal: {
      code: `#include <iostream>\nusing namespace std;\n\nstruct TreeNode {\n    int val;\n    TreeNode *left, *right;\n    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}\n};\n\nbool isMirror(TreeNode* t1, TreeNode* t2) {\n    if(!t1 && !t2) return true;\n    if(!t1 || !t2) return false;\n    return (t1->val == t2->val) && isMirror(t1->left, t2->right) && isMirror(t1->right, t2->left);\n}\nbool isSymmetric(TreeNode* root) {\n    return isMirror(root, root);\n}`,
      complexity: "Time: O(N), Space: O(H)"
    },
    hinglish: {
      explanation: "### Intuition\nMirror symmetric checks. Compare left child values of t1 with right child of t2 recursively, matching root contents.",
      pseudocode: "isMirror(t1, t2):\n    if t1 null and t2 null: return true\n    if t1 null or t2 null: return false\n    return val equal and mirror(t1.left, t2.right) and mirror(t1.right, t2.left)"
    }
  },
  "validate-bst": {
    brute: {
      code: `// Perform inorder, verify if array is strictly sorted`,
      complexity: "Time: O(N), Space: O(N)"
    },
    optimal: {
      code: `#include <climits>\nusing namespace std;\n\nstruct TreeNode {\n    int val;\n    TreeNode *left, *right;\n    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}\n};\n\nbool validate(TreeNode* root, long long minVal, long long maxVal) {\n    if(!root) return true;\n    if(root->val <= minVal || root->val >= maxVal) return false;\n    return validate(root->left, minVal, root->val) && validate(root->right, root->val, maxVal);\n}\nbool isValidBST(TreeNode* root) {\n    return validate(root, LONG_MIN, LONG_MAX);\n}`,
      complexity: "Time: O(N), Space: O(H)"
    },
    hinglish: {
      explanation: "### Intuition\nBST properties boundaries checks. Maintain valid range parameters `(minVal, maxVal)` dynamically as we go left and right recursively.",
      pseudocode: "validate(root, min, max):\n    if root is null: return true\n    if root.val <= min or root.val >= max: return false\n    return validate(root.left, min, root.val) and validate(root.right, root.val, max)"
    }
  },

  // === GRAPHS ===
  "number-of-islands": {
    brute: {
      code: `// Nested scans running visited maps`,
      complexity: "Time: O(N*M), Space: O(N*M)"
    },
    optimal: {
      code: `#include <vector>\nusing namespace std;\n\nvoid dfs(vector<vector<char>>& grid, int r, int c) {\n    int nr = grid.size(), nc = grid[0].size();\n    if (r < 0 || c < 0 || r >= nr || c >= nc || grid[r][c] == '0') return;\n    grid[r][c] = '0'; // Mark as visited\n    dfs(grid, r + 1, c);\n    dfs(grid, r - 1, c);\n    dfs(grid, r, c + 1);\n    dfs(grid, r, c - 1);\n}\nint numIslands(vector<vector<char>>& grid) {\n    if (grid.empty()) return 0;\n    int nr = grid.size(), nc = grid[0].size(), count = 0;\n    for (int r = 0; r < nr; r++) {\n        for (int c = 0; c < nc; c++) {\n            if (grid[r][c] == '1') {\n                count++;\n                dfs(grid, r, c);\n            }\n        }\n    }\n    return count;\n}`,
      complexity: "Time: O(N * M), Space: O(N * M)"
    },
    hinglish: {
      explanation: "### Intuition\nGrid land component clusters count. Traverse cells; when land '1' found, increment island count and run DFS/BFS to sink adjacent land cells to '0'.",
      pseudocode: "for row = 0 to rows-1:\n        for col = 0 to cols-1:\n            if grid[row][col] == '1':\n                count++\n                dfs_sink_adjacent(row, col)"
    }
  },
  "number-of-provinces": {
    brute: {
      code: `// Map components using visited array`,
      complexity: "Time: O(V^2), Space: O(V)"
    },
    optimal: {
      code: `#include <vector>\nusing namespace std;\n\nvoid dfsProvince(int node, const vector<vector<int>>& adj, vector<bool>& visited) {\n    visited[node] = true;\n    for (int neighbor = 0; neighbor < adj.size(); neighbor++) {\n        if (adj[node][neighbor] == 1 && !visited[neighbor]) {\n            dfsProvince(neighbor, adj, visited);\n        }\n    }\n}\nint findCircleNum(vector<vector<int>>& isConnected) {\n    int n = isConnected.size();\n    vector<bool> visited(n, false);\n    int count = 0;\n    for (int i = 0; i < n; i++) {\n        if (!visited[i]) {\n            count++;\n            dfsProvince(i, isConnected, visited);\n        }\n    }\n    return count;\n}`,
      complexity: "Time: O(N^2), Space: O(N)"
    },
    hinglish: {
      explanation: "### Intuition\nGraph components counting. Run standard DFS from unvisited nodes, tracking connected component numbers.",
      pseudocode: "for i = 0 to vertices-1:\n        if i not visited:\n            provinces_count++\n            dfs(i)"
    }
  },
  "topological-sort": {
    brute: {
      code: `// In-degree tracking using sorting`,
      complexity: "Time: O(V + E), Space: O(V)"
    },
    optimal: {
      code: `#include <vector>\n#include <queue>\nusing namespace std;\n\nvector<int> topoSort(int V, vector<int> adj[]) {\n    vector<int> indegree(V, 0);\n    for (int i = 0; i < V; i++) {\n        for (int x : adj[i]) indegree[x]++;\n    }\n    queue<int> q;\n    for (int i = 0; i < V; i++) {\n        if (indegree[i] == 0) q.push(i);\n    }\n    vector<int> topo;\n    while (!q.empty()) {\n        int node = q.front(); q.pop();\n        topo.push_back(node);\n        for (int neighbor : adj[node]) {\n            if (--indegree[neighbor] == 0) q.push(neighbor);\n        }\n    }\n    return topo;\n}`,
      complexity: "Time: O(V + E), Space: O(V)"
    },
    hinglish: {
      explanation: "### Intuition\nKahn's Algorithm BFS topological ordering. Keep track of indegrees. Push nodes with 0 indegree to queue. Decrement neighbor indegrees as we pop nodes.",
      pseudocode: "compute indegrees\n    push nodes with indegree=0 to queue\n    while queue:\n        node = pop()\n        add node to result\n        decrement neighbors indegrees; push if 0"
    }
  },

  // === DYNAMIC PROGRAMMING ===
  "house-robber": {
    brute: {
      code: `// Recursive checks checking include/exclude options`,
      complexity: "Time: O(2^N), Space: O(N)"
    },
    optimal: {
      code: `#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint rob(vector<int>& nums) {\n    int n = nums.size();\n    if(n == 0) return 0;\n    if(n == 1) return nums[0];\n    int prev2 = 0, prev1 = nums[0];\n    for(int i = 1; i < n; i++) {\n        int pick = nums[i] + prev2;\n        int skip = prev1;\n        int curr = max(pick, skip);\n        prev2 = prev1;\n        prev1 = curr;\n    }\n    return prev1;\n}`,
      complexity: "Time: O(N), Space: O(1)"
    },
    hinglish: {
      explanation: "### Intuition\nMax sum adjacent constraints. Keep running max of robs: either rob current house + `prev2` house max, or skip current house (keeping `prev1` house max).",
      pseudocode: "prev2 = 0, prev1 = nums[0]\n    for i = 1 to n-1:\n        curr = max(nums[i] + prev2, prev1)\n        prev2 = prev1, prev1 = curr\n    return prev1"
    }
  },
  "knapsack-01": {
    brute: {
      code: `// Excluded/included recursion O(2^N)`,
      complexity: "Time: O(2^N), Space: O(N)"
    },
    optimal: {
      code: `#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint knapsack(vector<int>& weights, vector<int>& values, int maxCap) {\n    int n = weights.size();\n    vector<int> dp(maxCap + 1, 0);\n    for (int i = 0; i < n; i++) {\n        for (int w = maxCap; w >= weights[i]; w--) {\n            dp[w] = max(dp[w], values[i] + dp[w - weights[i]]);\n        }\n    }\n    return dp[maxCap];\n}`,
      complexity: "Time: O(N * MaxCap), Space: O(MaxCap)"
    },
    hinglish: {
      explanation: "### Intuition\n1D tabulation array for weights capability checks. Iterate items, and update DP array backwards to prevent same-item double inclusions.",
      pseudocode: "dp array size Capacity+1 init 0\n    for i = 0 to items:\n        for w = Capacity down to weight[i]:\n            dp[w] = max(dp[w], value[i] + dp[w - weight[i]])"
    }
  },
  "subset-sum": {
    brute: {
      code: `// Check all subsets O(2^N)`,
      complexity: "Time: O(2^N), Space: O(N)"
    },
    optimal: {
      code: `#include <vector>\nusing namespace std;\n\nbool isSubsetSum(vector<int>& arr, int sum) {\n    int n = arr.size();\n    vector<bool> dp(sum + 1, false);\n    dp[0] = true;\n    for (int num : arr) {\n        for (int j = sum; j >= num; j--) {\n            if (dp[j - num]) dp[j] = true;\n        }\n    }\n    return dp[sum];\n}`,
      complexity: "Time: O(N * Sum), Space: O(Sum)"
    },
    hinglish: {
      explanation: "### Intuition\nSubset target sum checks. Same as knapsack: 1D boolean array checks if sum `j` is possible by selecting current element.",
      pseudocode: "dp[0] = true\n    for num in arr:\n        for j = sum down to num:\n            if dp[j-num] is true: dp[j] = true\n    return dp[sum]"
    }
  }
};
