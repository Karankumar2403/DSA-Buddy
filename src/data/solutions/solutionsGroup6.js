// Group 6 Solutions: Trees

export const solutionsGroup6 = {
  "binary-tree-zigzag": {
    brute: {
      code: `// Get standard level order, reverse alternate levels`,
      complexity: "Time: O(N), Space: O(N)"
    },
    optimal: {
      code: `#include <vector>\n#include <queue>\n#include <algorithm>\nusing namespace std;\n\nstruct TreeNode {\n    int val;\n    TreeNode *left, *right;\n    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}\n};\n\nvector<vector<int>> zigzagLevelOrder(TreeNode* root) {\n    vector<vector<int>> res;\n    if(!root) return res;\n    queue<TreeNode*> q;\n    q.push(root);\n    bool leftToRight = true;\n    while(!q.empty()) {\n        int size = q.size();\n        vector<int> level(size);\n        for(int i=0; i<size; i++) {\n            TreeNode* curr = q.front(); q.pop();\n            int index = leftToRight ? i : (size - 1 - i);\n            level[index] = curr->val;\n            if(curr->left) q.push(curr->left);\n            if(curr->right) q.push(curr->right);\n        }\n        leftToRight = !leftToRight;\n        res.push_back(level);\n    }\n    return res;\n}`,
      complexity: "Time: O(N), Space: O(N)"
    },
    hinglish: {
      explanation: "### Intuition\nBFS Level order. Maintain a flag `leftToRight`. For each level, place elements in level array from start or end based on the flag direction.",
      pseudocode: "leftToRight = true\n    while queue:\n        for i = 0 to size-1:\n            idx = leftToRight ? i : size-1-i\n            level[idx] = pop().val\n        leftToRight = !leftToRight"
    }
  },
  "binary-tree-level-order-ii": {
    brute: {
      code: `// Get level order, reverse the entire result list`,
      complexity: "Time: O(N), Space: O(N)"
    },
    optimal: {
      code: `// Run standard levelOrder, then reverse(result.begin(), result.end())`,
      complexity: "Time: O(N), Space: O(N)"
    },
    hinglish: {
      explanation: "### Intuition\nPerform standard level order traversal from top to bottom, then reverse the result list to get bottom-up level order.",
      pseudocode: "Run levelOrder. Reverse result list."
    }
  },
  "same-tree": {
    brute: {
      code: `// DFS traversal strings match checks`,
      complexity: "Time: O(N), Space: O(N)"
    },
    optimal: {
      code: `struct TreeNode {\n    int val;\n    TreeNode *left, *right;\n    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}\n};\n\nbool isSameTree(TreeNode* p, TreeNode* q) {\n    if(!p && !q) return true;\n    if(!p || !q) return false;\n    return (p->val == q->val) && isSameTree(p->left, q->left) && isSameTree(p->right, q->right);\n}`,
      complexity: "Time: O(N), Space: O(H)"
    },
    hinglish: {
      explanation: "### Intuition\nCompare current nodes. If both null, true. If one null or value differs, false. Recursively check left and right subtrees.",
      pseudocode: "isSame(p, q): if both null return true; if one null or val mismatch return false; return same(left) and same(right)"
    }
  },
  "subtree-another-tree": {
    brute: {
      code: `// Traverse all nodes and run same-tree checks`,
      complexity: "Time: O(N * M), Space: O(H)"
    },
    optimal: {
      code: `struct TreeNode {\n    int val;\n    TreeNode *left, *right;\n    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}\n};\n\nbool isIdentical(TreeNode* r1, TreeNode* r2) {\n    if(!r1 && !r2) return true;\n    if(!r1 || !r2) return false;\n    return (r1->val == r2->val) && isIdentical(r1->left, r2->left) && isIdentical(r1->right, r2->right);\n}\nbool isSubtree(TreeNode* root, TreeNode* subRoot) {\n    if(!root) return false;\n    if(isIdentical(root, subRoot)) return true;\n    return isSubtree(root->left, subRoot) || isSubtree(root->right, subRoot);\n}`,
      complexity: "Time: O(N * M), Space: O(H)"
    },
    hinglish: {
      explanation: "### Intuition\nFor every node in `root`, check if the subtree starting there is identical to `subRoot` using the same-tree checker.",
      pseudocode: "isSubtree(r, sub): if r is null return false; if same(r, sub) return true; return sub(r.left) or sub(r.right)"
    }
  },
  "flip-equivalent-tree": {
    brute: {
      code: `// Check flips matching recursively`,
      complexity: "Time: O(N), Space: O(H)"
    },
    optimal: {
      code: `struct TreeNode {\n    int val;\n    TreeNode *left, *right;\n    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}\n};\n\nbool flipEquiv(TreeNode* root1, TreeNode* root2) {\n    if(!root1 && !root2) return true;\n    if(!root1 || !root2 || root1->val != root2->val) return false;\n    bool noFlip = flipEquiv(root1->left, root2->left) && flipEquiv(root1->right, root2->right);\n    bool flip = flipEquiv(root1->left, root2->right) && flipEquiv(root1->right, root2->left);\n    return noFlip || flip;\n}`,
      complexity: "Time: O(N), Space: O(H)"
    },
    hinglish: {
      explanation: "### Intuition\nCheck if root values match. Recursively check if children are equivalent either without flipping (left-left & right-right) or with flipping (left-right & right-left).",
      pseudocode: "flipEquiv(r1, r2): if both null return true; if mismatch return false; return (equiv(left,left) and equiv(right,right)) or (equiv(left,right) and equiv(right,left))"
    }
  },
  "lca-binary-tree": {
    brute: {
      code: `// Backtrack node path lists, find intersection`,
      complexity: "Time: O(N), Space: O(N)"
    },
    optimal: {
      code: `struct TreeNode {\n    int val;\n    TreeNode *left, *right;\n    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}\n};\n\nTreeNode* lowestCommonAncestor(TreeNode* root, TreeNode* p, TreeNode* q) {\n    if(!root || root == p || root == q) return root;\n    TreeNode* left = lowestCommonAncestor(root->left, p, q);\n    TreeNode* right = lowestCommonAncestor(root->right, p, q);\n    if(left && right) return root; // LCA found\n    return left ? left : right;\n}`,
      complexity: "Time: O(N), Space: O(H)"
    },
    hinglish: {
      explanation: "### Intuition\nRecursively search `p` and `q` in left and right subtrees. If both return non-null, current node is their LCA. Else return the non-null child.",
      pseudocode: "lca(root, p, q):\n    if null or p or q: return root\n    l = lca(left, p, q), r = lca(right, p, q)\n    if l and r: return root\n    return l ? l : r"
    }
  },
  "binary-search-tree-search": {
    brute: {
      code: `// Linear search DFS`,
      complexity: "Time: O(N), Space: O(H)"
    },
    optimal: {
      code: `struct TreeNode {\n    int val;\n    TreeNode *left, *right;\n    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}\n};\n\nTreeNode* searchBST(TreeNode* root, int val) {\n    if(!root || root->val == val) return root;\n    if(val < root->val) return searchBST(root->left, val);\n    return searchBST(root->right, val);\n}`,
      complexity: "Time: O(log N), Space: O(H)"
    },
    hinglish: {
      explanation: "### Intuition\nBST properties. If target val is smaller than current, search left subtree. If larger, search right subtree.",
      pseudocode: "search(root, val): if null or match: return root; if val < root.val return search(left) else return search(right)"
    }
  },
  "lca-bst": {
    brute: {
      code: `// Standard binary tree LCA O(N)`,
      complexity: "Time: O(N), Space: O(H)"
    },
    optimal: {
      code: `struct TreeNode {\n    int val;\n    TreeNode *left, *right;\n    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}\n};\n\nTreeNode* lowestCommonAncestorBST(TreeNode* root, TreeNode* p, TreeNode* q) {\n    if(p->val < root->val && q->val < root->val) return lowestCommonAncestorBST(root->left, p, q);\n    if(p->val > root->val && q->val > root->val) return lowestCommonAncestorBST(root->right, p, q);\n    return root;\n}`,
      complexity: "Time: O(log N), Space: O(H)"
    },
    hinglish: {
      explanation: "### Intuition\nBST properties leverage. If both `p` and `q` values are smaller than root, LCA must be in left subtree. If both larger, in right subtree. Otherwise, current root is LCA.",
      pseudocode: "lca(root, p, q):\n    if p.val < root.val and q.val < root.val: return lca(left)\n    if p.val > root.val and q.val > root.val: return lca(right)\n    return root"
    }
  },
  "lca-deepest-leaves": {
    brute: {
      code: `// Find depth and LCA`,
      complexity: "Time: O(N), Space: O(H)"
    },
    optimal: {
      code: `#include <algorithm>\nusing namespace std;\n\nstruct TreeNode {\n    int val;\n    TreeNode *left, *right;\n    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}\n};\n\npair<TreeNode*, int> helper(TreeNode* root) {\n    if(!root) return {nullptr, 0};\n    auto l = helper(root->left);\n    auto r = helper(root->right);\n    if(l.second == r.second) return {root, l.second + 1};\n    if(l.second > r.second) return {l.first, l.second + 1};\n    return {r.first, r.second + 1};\n}\nTreeNode* lcaDeepestLeaves(TreeNode* root) {\n    return helper(root).first;\n}`,
      complexity: "Time: O(N), Space: O(H)"
    },
    hinglish: {
      explanation: "### Intuition\nFind deepest node depths recursively. If left and right subtrees have equal maximum depths, current node is LCA. Else return LCA from deeper subtree.",
      pseudocode: "helper(root):\n    if null: return {null, 0}\n    l = helper(left), r = helper(right)\n    if l.depth == r.depth: return {root, l.depth + 1}\n    return l.depth > r.depth ? {l.node, l.depth + 1} : {r.node, r.depth + 1}"
    }
  },
  "two-sum-iv": {
    brute: {
      code: `// Preorder traversal to vector, run 2-pointers`,
      complexity: "Time: O(N), Space: O(N)"
    },
    optimal: {
      code: `#include <unordered_set>\nusing namespace std;\n\nstruct TreeNode {\n    int val;\n    TreeNode *left, *right;\n    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}\n};\n\nbool find(TreeNode* root, int k, unordered_set<int>& seen) {\n    if(!root) return false;\n    if(seen.count(k - root->val)) return true;\n    seen.insert(root->val);\n    return find(root->left, k, seen) || find(root->right, k, seen);\n}\nbool findTarget(TreeNode* root, int k) {\n    unordered_set<int> seen;\n    return find(root, k, seen);\n}`,
      complexity: "Time: O(N), Space: O(N)"
    },
    hinglish: {
      explanation: "### Intuition\nTraverse BST and use a Hash Set. For every node, check if `k - root->val` is in the set. If yes, return true. Otherwise insert value and recurse.",
      pseudocode: "find(root, k, set):\n    if null: return false\n    if (k - root.val) in set: return true\n    set.add(root.val)\n    return find(left) or find(right)"
    }
  },
  "kth-smallest-bst": {
    brute: {
      code: `// Get inorder array, return index k-1`,
      complexity: "Time: O(N), Space: O(N)"
    },
    optimal: {
      code: `struct TreeNode {\n    int val;\n    TreeNode *left, *right;\n    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}\n};\n\nvoid inorder(TreeNode* root, int k, int& counter, int& ans) {\n    if(!root || counter >= k) return;\n    inorder(root->left, k, counter, ans);\n    counter++;\n    if(counter == k) {\n        ans = root->val;\n        return;\n    }\n    inorder(root->right, k, counter, ans);\n}\nint kthSmallest(TreeNode* root, int k) {\n    int counter = 0, ans = -1;\n    inorder(root, k, counter, ans);\n    return ans;\n}`,
      complexity: "Time: O(H + K), Space: O(H)"
    },
    hinglish: {
      explanation: "### Intuition\nPerform in-order traversal (which yields sorted elements in BST). Increment a counter at each visit; when counter equals K, record value and stop.",
      pseudocode: "Inorder traversal tracking count. Set result when count reaches K."
    }
  },
  "min-depth-tree": {
    brute: {
      code: `// Traverse all and find min`,
      complexity: "Time: O(N), Space: O(H)"
    },
    optimal: {
      code: `#include <algorithm>\nusing namespace std;\n\nstruct TreeNode {\n    int val;\n    TreeNode *left, *right;\n    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}\n};\n\nint minDepth(TreeNode* root) {\n    if(!root) return 0;\n    if(!root->left) return minDepth(root->right) + 1;\n    if(!root->right) return minDepth(root->left) + 1;\n    return min(minDepth(root->left), minDepth(root->right)) + 1;\n}`,
      complexity: "Time: O(N), Space: O(H)"
    },
    hinglish: {
      explanation: "### Intuition\nRecursive depth calculation. If one child is null, we must check depth of non-null child. If both exist, return `min(left, right) + 1`.",
      pseudocode: "minDepth(root):\n    if null: return 0\n    if left null: return minDepth(right) + 1\n    if right null: return minDepth(left) + 1\n    return min(minDepth(left), minDepth(right)) + 1"
    }
  },
  "max-depth-tree": {
    brute: {
      code: `// Recursive max`,
      complexity: "Time: O(N), Space: O(H)"
    },
    optimal: {
      code: `#include <algorithm>\nusing namespace std;\n\nstruct TreeNode {\n    int val;\n    TreeNode *left, *right;\n    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}\n};\n\nint maxDepth(TreeNode* root) {\n    if(!root) return 0;\n    return max(maxDepth(root->left), maxDepth(root->right)) + 1;\n}`,
      complexity: "Time: O(N), Space: O(H)"
    },
    hinglish: {
      explanation: "### Intuition\nRecursive height. Return max height of left or right subtree plus 1 for the current node.",
      pseudocode: "maxDepth(root): if null return 0; return max(maxDepth(left), maxDepth(right)) + 1"
    }
  },
  "balanced-binary-tree": {
    brute: {
      code: `// Check height balance on every node O(N^2)`,
      complexity: "Time: O(N^2), Space: O(H)"
    },
    optimal: {
      code: `#include <algorithm>\n#include <cmath>\nusing namespace std;\n\nstruct TreeNode {\n    int val;\n    TreeNode *left, *right;\n    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}\n};\n\nint checkHeight(TreeNode* root) {\n    if(!root) return 0;\n    int left = checkHeight(root->left);\n    if(left == -1) return -1;\n    int right = checkHeight(root->right);\n    if(right == -1) return -1;\n    if(abs(left - right) > 1) return -1; // Unbalanced\n    return max(left, right) + 1;\n}\nbool isBalanced(TreeNode* root) {\n    return checkHeight(root) != -1;\n}`,
      complexity: "Time: O(N), Space: O(H)"
    },
    hinglish: {
      explanation: "### Intuition\nCompute height recursively. If any subtree height difference > 1, return -1 (unbalanced flag) upwards to exit early.",
      pseudocode: "checkHeight(root):\n    if null: return 0\n    l = checkHeight(left); r = checkHeight(right)\n    if l==-1 or r==-1 or abs(l-r)>1: return -1\n    return max(l, r) + 1"
    }
  },
  "diameter-tree": {
    brute: {
      code: `// Calculate max left+right height on every node O(N^2)`,
      complexity: "Time: O(N^2), Space: O(H)"
    },
    optimal: {
      code: `#include <algorithm>\nusing namespace std;\n\nstruct TreeNode {\n    int val;\n    TreeNode *left, *right;\n    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}\n};\n\nint height(TreeNode* root, int& diameter) {\n    if(!root) return 0;\n    int lh = height(root->left, diameter);\n    int rh = height(root->right, diameter);\n    diameter = max(diameter, lh + rh); // Update global max diameter\n    return max(lh, rh) + 1;\n}\nint diameterOfBinaryTree(TreeNode* root) {\n    int diameter = 0;\n    height(root, diameter);\n    return diameter;\n}`,
      complexity: "Time: O(N), Space: O(H)"
    },
    hinglish: {
      explanation: "### Intuition\nRecursively compute height. At each node, diameter candidate is `leftHeight + rightHeight`. Keep track of the maximum sum observed globally.",
      pseudocode: "height(root):\n    lh = height(left), rh = height(right)\n    global_max = max(global_max, lh + rh)\n    return max(lh, rh) + 1"
    }
  },
  "check-completeness-tree": {
    brute: {
      code: `// Get index mapping and check consecutive numbers`,
      complexity: "Time: O(N), Space: O(N)"
    },
    optimal: {
      code: `#include <queue>\nusing namespace std;\n\nstruct TreeNode {\n    int val;\n    TreeNode *left, *right;\n    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}\n};\n\nbool isCompleteTree(TreeNode* root) {\n    queue<TreeNode*> q;\n    q.push(root);\n    bool foundNull = false;\n    while(!q.empty()) {\n        TreeNode* curr = q.front(); q.pop();\n        if(!curr) foundNull = true;\n        else {\n            if(foundNull) return false; // Null node seen before active node\n            q.push(curr->left);\n            q.push(curr->right);\n        }\n    }\n    return true;\n}`,
      complexity: "Time: O(N), Space: O(N)"
    },
    hinglish: {
      explanation: "### Intuition\nBFS Level order. Queue nodes. If we see a null node, all subsequent popped nodes from the queue must also be null.",
      pseudocode: "queue.push(root)\n    foundNull = false\n    while queue:\n        curr = queue.pop()\n        if curr is null: foundNull = true\n        else:\n            if foundNull: return false\n            push(left), push(right)"
    }
  },
  "recover-bst": {
    brute: {
      code: `// Collect elements, sort, write back values`,
      complexity: "Time: O(N log N), Space: O(N)"
    },
    optimal: {
      code: `#include <algorithm>\nusing namespace std;\n\nstruct TreeNode {\n    int val;\n    TreeNode *left, *right;\n    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}\n};\n\nvoid inorder(TreeNode* root, TreeNode*& prev, TreeNode*& first, TreeNode*& second) {\n    if (!root) return;\n    inorder(root->left, prev, first, second);\n    if (prev && root->val < prev->val) {\n        if (!first) first = prev;\n        second = root;\n    }\n    prev = root;\n    inorder(root->right, prev, first, second);\n}\nvoid recoverTree(TreeNode* root) {\n    TreeNode *prev = nullptr, *first = nullptr, *second = nullptr;\n    inorder(root, prev, first, second);\n    if (first && second) swap(first->val, second->val);\n}`,
      complexity: "Time: O(N), Space: O(H)"
    },
    hinglish: {
      explanation: "### Intuition\nInorder traversal tracks sorted order. Identify where sorting property is violated (`curr->val < prev->val`). Save the swapped nodes and correct them.",
      pseudocode: "Inorder traversal. Identify violations where curr.val < prev.val. Swap first and second nodes values."
    }
  },
  "path-sum": {
    brute: {
      code: `// Recursive check target sum`,
      complexity: "Time: O(N), Space: O(H)"
    },
    optimal: {
      code: `struct TreeNode {\n    int val;\n    TreeNode *left, *right;\n    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}\n};\n\nbool hasPathSum(TreeNode* root, int targetSum) {\n    if(!root) return false;\n    if(!root->left && !root->right) return targetSum == root->val;\n    return hasPathSum(root->left, targetSum - root->val) || hasPathSum(root->right, targetSum - root->val);\n}`,
      complexity: "Time: O(N), Space: O(H)"
    },
    hinglish: {
      explanation: "### Intuition\nRecursive path sum subtraction. If we reach leaf node, check if remaining targetSum equals leaf value. Else, search left or right with `targetSum - root->val`.",
      pseudocode: "hasPathSum(root, sum):\n    if null return false\n    if leaf: return sum == root.val\n    return hasPathSum(left, sum - root.val) or hasPathSum(right, sum - root.val)"
    }
  },
  "path-sum-ii": {
    brute: {
      code: `// Check all root-to-leaf paths`,
      complexity: "Time: O(N^2), Space: O(N)"
    },
    optimal: {
      code: `#include <vector>\nusing namespace std;\n\nstruct TreeNode {\n    int val;\n    TreeNode *left, *right;\n    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}\n};\n\nvoid solve(TreeNode* root, int target, vector<int>& curr, vector<vector<int>>& res) {\n    if(!root) return;\n    curr.push_back(root->val);\n    if(!root->left && !root->right && target == root->val) {\n        res.push_back(curr);\n    } else {\n        solve(root->left, target - root->val, curr, res);\n        solve(root->right, target - root->val, curr, res);\n    }\n    curr.pop_back(); // Backtrack\n}\nvector<vector<int>> pathSum(TreeNode* root, int targetSum) {\n    vector<vector<int>> res;\n    vector<int> curr;\n    solve(root, targetSum, curr, res);\n    return res;\n}`,
      complexity: "Time: O(N^2), Space: O(N)"
    },
    hinglish: {
      explanation: "### Intuition\nBacktracking path tracer. Build path by adding current value; if leaf and target met, record path. Always pop node back when returning.",
      pseudocode: "backtrack(root, target, path):\n    add root.val to path\n    if leaf and target == root.val: add path to result\n    else: backtrack(left, target-val), backtrack(right, target-val)\n    pop from path"
    }
  },
  "sum-root-to-leaf": {
    brute: {
      code: `// Traversal generating path strings`,
      complexity: "Time: O(N), Space: O(N)"
    },
    optimal: {
      code: `struct TreeNode {\n    int val;\n    TreeNode *left, *right;\n    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}\n};\n\nint sumNumbers(TreeNode* root, int currentSum = 0) {\n    if(!root) return 0;\n    currentSum = currentSum * 10 + root->val;\n    if(!root->left && !root->right) return currentSum;\n    return sumNumbers(root->left, currentSum) + sumNumbers(root->right, currentSum);\n}`,
      complexity: "Time: O(N), Space: O(H)"
    },
    hinglish: {
      explanation: "### Intuition\nAccumulate path values base-10. Sum equals `currentSum * 10 + root->val`. Return sum of child recursive calls.",
      pseudocode: "sum(root, curr):\n    if null: return 0\n    curr = curr * 10 + root.val\n    if leaf: return curr\n    return sum(left, curr) + sum(right, curr)"
    }
  },
  "max-path-sum-tree": {
    brute: {
      code: `// Check all nodes O(N^2)`,
      complexity: "Time: O(N^2), Space: O(H)"
    },
    optimal: {
      code: `#include <algorithm>\n#include <climits>\nusing namespace std;\n\nstruct TreeNode {\n    int val;\n    TreeNode *left, *right;\n    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}\n};\n\nint maxPath(TreeNode* root, int& maxVal) {\n    if(!root) return 0;\n    int left = max(0, maxPath(root->left, maxVal)); // Ignore negative paths\n    int right = max(0, maxPath(root->right, maxVal));\n    maxVal = max(maxVal, left + right + root->val); // Update global max path sum\n    return max(left, right) + root->val;\n}\nint maxPathSum(TreeNode* root) {\n    int maxVal = INT_MIN;\n    maxPath(root, maxVal);\n    return maxVal;\n}`,
      complexity: "Time: O(N), Space: O(H)"
    },
    hinglish: {
      explanation: "### Intuition\nCompute maximum branch sum recursively. At each node, the maximum path sum through that node is `leftBranch + rightBranch + root->val`.",
      pseudocode: "maxPath(root):\n    l = max(0, maxPath(left)), r = max(0, maxPath(right))\n    global_max = max(global_max, l + r + root.val)\n    return max(l, r) + root.val"
    }
  },
  "construct-tree-pre-in": {
    brute: {
      code: `// Vector slicing search`,
      complexity: "Time: O(N^2), Space: O(N)"
    },
    optimal: {
      code: `#include <vector>\n#include <unordered_map>\nusing namespace std;\n\nstruct TreeNode {\n    int val;\n    TreeNode *left, *right;\n    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}\n};\n\nTreeNode* build(const vector<int>& preorder, int& preIdx, int inStart, int inEnd, unordered_map<int, int>& mp) {\n    if(inStart > inEnd) return nullptr;\n    int val = preorder[preIdx++];\n    TreeNode* root = new TreeNode(val);\n    int inIdx = mp[val];\n    root->left = build(preorder, preIdx, inStart, inIdx - 1, mp);\n    root->right = build(preorder, preIdx, inIdx + 1, inEnd, mp);\n    return root;\n}\nTreeNode* buildTree(vector<int>& preorder, vector<int>& inorder) {\n    unordered_map<int, int> mp;\n    for(int i=0; i<inorder.size(); i++) mp[inorder[i]] = i;\n    int preIdx = 0;\n    return build(preorder, preIdx, 0, inorder.size() - 1, mp);\n}`,
      complexity: "Time: O(N), Space: O(N)"
    },
    hinglish: {
      explanation: "### Intuition\nPreorder first element is root. Find root position in inorder array (using map lookups) to split array into left and right subtrees recursively.",
      pseudocode: "Use preorder indices to select root.\n    Split inorder using root position index mapping, recurse left/right."
    }
  },
  "construct-tree-post-in": {
    brute: {
      code: `// Vector slice search`,
      complexity: "Time: O(N^2), Space: O(N)"
    },
    optimal: {
      code: `#include <vector>\n#include <unordered_map>\nusing namespace std;\n\nstruct TreeNode {\n    int val;\n    TreeNode *left, *right;\n    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}\n};\n\nTreeNode* buildPost(const vector<int>& postorder, int& postIdx, int inStart, int inEnd, unordered_map<int, int>& mp) {\n    if(inStart > inEnd) return nullptr;\n    int val = postorder[postIdx--];\n    TreeNode* root = new TreeNode(val);\n    int inIdx = mp[val];\n    root->right = buildPost(postorder, postIdx, inIdx + 1, inEnd, mp); // Right subtree first\n    root->left = buildPost(postorder, postIdx, inStart, inIdx - 1, mp);\n    return root;\n}\nTreeNode* buildTreePostIn(vector<int>& inorder, vector<int>& postorder) {\n    unordered_map<int, int> mp;\n    for(int i=0; i<inorder.size(); i++) mp[inorder[i]] = i;\n    int postIdx = postorder.size() - 1;\n    return buildPost(postorder, postIdx, 0, inorder.size() - 1, mp);\n}`,
      complexity: "Time: O(N), Space: O(N)"
    },
    hinglish: {
      explanation: "### Intuition\nPostorder last element is root. Traverse postorder backwards; construct right subtree first, then left subtree.",
      pseudocode: "Similar to preorder/inorder, but read postorder backwards and build right child first."
    }
  },
  "sorted-array-to-bst": {
    brute: {
      code: `// Linear insert`,
      complexity: "Time: O(N log N), Space: O(N)"
    },
    optimal: {
      code: `#include <vector>\nusing namespace std;\n\nstruct TreeNode {\n    int val;\n    TreeNode *left, *right;\n    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}\n};\n\nTreeNode* helper(const vector<int>& nums, int start, int end) {\n    if(start > end) return nullptr;\n    int mid = start + (end-start)/2;\n    TreeNode* root = new TreeNode(nums[mid]);\n    root->left = helper(nums, start, mid - 1);\n    root->right = helper(nums, mid + 1, end);\n    return root;\n}\nTreeNode* sortedArrayToBST(vector<int>& nums) {\n    return helper(nums, 0, nums.size() - 1);\n}`,
      complexity: "Time: O(N), Space: O(H)"
    },
    hinglish: {
      explanation: "### Intuition\nFind middle element of sorted array and make it root. Recursively convert left and right halves to left and right subtrees.",
      pseudocode: "build(start, end):\n    if start > end: return null\n    mid = (start+end)/2\n    root = new Node(arr[mid])\n    root.left = build(start, mid-1)\n    root.right = build(mid+1, end)\n    return root"
    }
  }
};
