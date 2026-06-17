// Group 7 Solutions: Graphs

export const solutionsGroup7 = {
  "construct-adj-list": {
    brute: {
      code: `// Iterate edge lists, add connections O(E)`,
      complexity: "Time: O(E), Space: O(V + E)"
    },
    optimal: {
      code: `#include <vector>\nusing namespace std;\n\nvector<vector<int>> printGraph(int V, vector<pair<int, int>>& edges) {\n    vector<vector<int>> adj(V);\n    for(const auto& edge : edges) {\n        adj[edge.first].push_back(edge.second);\n        adj[edge.second].push_back(edge.first); // Undirected\n    }\n    return adj;\n}`,
      complexity: "Time: O(E), Space: O(V + E)"
    },
    hinglish: {
      explanation: "### Intuition\nConstruct Adjacency List. Read edges list and add vertices to adjacency vector slots for both directions.",
      pseudocode: "for each edge(u, v): adj[u].add(v), adj[v].add(u)"
    }
  },
  "graph-bfs": {
    brute: {
      code: `// Recursive DFS simulating BFS order`,
      complexity: "Time: O(V + E), Space: O(V)"
    },
    optimal: {
      code: `#include <vector>\n#include <queue>\nusing namespace std;\n\nvector<int> bfsOfGraph(int V, vector<int> adj[]) {\n    vector<int> bfs;\n    vector<bool> visited(V, false);\n    queue<int> q;\n    q.push(0);\n    visited[0] = true;\n    while(!q.empty()) {\n        int node = q.front(); q.pop();\n        bfs.push_back(node);\n        for(int neighbor : adj[node]) {\n            if(!visited[neighbor]) {\n                visited[neighbor] = true;\n                q.push(neighbor);\n            }\n        }\n    }\n    return bfs;\n}`,
      complexity: "Time: O(V + E), Space: O(V)"
    },
    hinglish: {
      explanation: "### Intuition\nBFS traversal. Push root node to queue, mark visited. Pop, visit, and push all unvisited neighbors to queue.",
      pseudocode: "queue.push(0), visited[0]=true\n    while queue:\n        node = queue.pop()\n        visit(node)\n        for neighbor in adj[node]:\n            if neighbor not visited: visited[neighbor]=true, queue.push(neighbor)"
    }
  },
  "rotting-oranges": {
    brute: {
      code: `// Iteratively scan grid and rot neighbors`,
      complexity: "Time: O((N*M)^2), Space: O(N*M)"
    },
    optimal: {
      code: `#include <vector>\n#include <queue>\nusing namespace std;\n\nint orangesRotting(vector<vector<int>>& grid) {\n    int n = grid.size(), m = grid[0].size();\n    queue<pair<int, int>> q;\n    int fresh = 0;\n    for(int i = 0; i < n; i++) {\n        for(int j = 0; j < m; j++) {\n            if(grid[i][j] == 2) q.push({i, j});\n            else if(grid[i][j] == 1) fresh++;\n        }\n    }\n    if(fresh == 0) return 0;\n    int minutes = 0;\n    vector<int> dirs = {-1, 0, 1, 0, -1};\n    while(!q.empty() && fresh > 0) {\n        int size = q.size();\n        for(int i = 0; i < size; i++) {\n            auto [r, c] = q.front(); q.pop();\n            for(int d = 0; d < 4; d++) {\n                int nr = r + dirs[d], nc = c + dirs[d + 1];\n                if(nr >= 0 && nc >= 0 && nr < n && nc < m && grid[nr][nc] == 1) {\n                    grid[nr][nc] = 2;\n                    fresh--;\n                    q.push({nr, nc});\n                }\n            }\n        }\n        minutes++;\n    }\n    return fresh == 0 ? minutes : -1;\n}`,
      complexity: "Time: O(N * M), Space: O(N * M)"
    },
    hinglish: {
      explanation: "### Intuition\nMulti-source BFS. Push all initial rotten oranges (2s) to queue. Push fresh neighbors and decrement fresh count level-by-level, incrementing minutes.",
      pseudocode: "Find rotten, push to queue, count fresh.\n    BFS: pop rotten, rot adjacent fresh oranges, push to queue.\n    Return minutes if fresh==0 else -1."
    }
  },
  "cycle-detection-undirected": {
    brute: {
      code: `// standard search tracking all nodes`,
      complexity: "Time: O(V + E), Space: O(V)"
    },
    optimal: {
      code: `#include <vector>\n#include <queue>\nusing namespace std;\n\nbool checkForCycle(int src, int V, vector<int> adj[], vector<bool>& visited) {\n    queue<pair<int, int>> q; // {node, parent}\n    visited[src] = true;\n    q.push({src, -1});\n    while(!q.empty()) {\n        int node = q.front().first;\n        int parent = q.front().second;\n        q.pop();\n        for(auto neighbor : adj[node]) {\n            if(!visited[neighbor]) {\n                visited[neighbor] = true;\n                q.push({neighbor, node});\n            } else if(parent != neighbor) {\n                return true; // Cycle detected\n            }\n        }\n    }\n    return false;\n}\nbool isCycle(int V, vector<int> adj[]) {\n    vector<bool> visited(V, false);\n    for(int i=0; i<V; i++) {\n        if(!visited[i]) {\n            if(checkForCycle(i, V, adj, visited)) return true;\n        }\n    }\n    return false;\n}`,
      complexity: "Time: O(V + E), Space: O(V)"
    },
    hinglish: {
      explanation: "### Intuition\nCycle detection in undirected graph. Maintain `{node, parent}` in BFS queue. If neighbor node is already visited and is not parent, cycle exists.",
      pseudocode: "Queue stores {node, parent}.\n    If neighbor is visited and neighbor != parent: cycle found."
    }
  },
  "cycle-detection-directed": {
    brute: {
      code: `// Backtracking search DFS`,
      complexity: "Time: O(V + E), Space: O(V)"
    },
    optimal: {
      code: `#include <vector>\nusing namespace std;\n\nbool dfsCheck(int node, vector<int> adj[], vector<bool>& visited, vector<bool>& pathVisited) {\n    visited[node] = true;\n    pathVisited[node] = true;\n    for(int neighbor : adj[node]) {\n        if(!visited[neighbor]) {\n            if(dfsCheck(neighbor, adj, visited, pathVisited)) return true;\n        } else if(pathVisited[neighbor]) {\n            return true; // Cycle detected\n        }\n    }\n    pathVisited[node] = false;\n    return false;\n}\nbool isCyclic(int V, vector<int> adj[]) {\n    vector<bool> visited(V, false), pathVisited(V, false);\n    for(int i=0; i<V; i++) {\n        if(!visited[i]) {\n            if(dfsCheck(i, adj, visited, pathVisited)) return true;\n        }\n    }\n    return false;\n}`,
      complexity: "Time: O(V + E), Space: O(V)"
    },
    hinglish: {
      explanation: "### Intuition\nCycle detection in directed graph. Maintain `pathVisited` array tracking active recursion stack nodes. If node visited again on active path, cycle detected.",
      pseudocode: "DFS: set visited and pathVisited true.\n    If neighbor in pathVisited: return true.\n    Reset pathVisited false on backtrack."
    }
  },
  "bipartite-graph": {
    brute: {
      code: `// Check all color combinations O(2^V)`,
      complexity: "Time: O(2^V), Space: O(V)"
    },
    optimal: {
      code: `#include <vector>\n#include <queue>\nusing namespace std;\n\nbool bfsCheckBipartite(int start, const vector<vector<int>>& adj, vector<int>& color) {\n    queue<int> q;\n    q.push(start);\n    color[start] = 0;\n    while(!q.empty()) {\n        int node = q.front(); q.pop();\n        for(int neighbor : adj[node]) {\n            if(color[neighbor] == -1) {\n                color[neighbor] = 1 - color[node]; // Opposite color\n                q.push(neighbor);\n            } else if(color[neighbor] == color[node]) {\n                return false;\n            }\n        }\n    }\n    return true;\n}\nbool isBipartite(vector<vector<int>>& adj) {\n    int V = adj.size();\n    vector<int> color(V, -1);\n    for(int i=0; i<V; i++) {\n        if(color[i] == -1) {\n            if(!bfsCheckBipartite(i, adj, color)) return false;\n        }\n    }\n    return true;\n}`,
      complexity: "Time: O(V + E), Space: O(V)"
    },
    hinglish: {
      explanation: "### Intuition\nGraph coloring. Color neighbors with opposite color (0 vs 1). If neighbor has same color as current node, graph is not bipartite.",
      pseudocode: "Color start node 0.\n    BFS: color neighbor 1 - color[node].\n    If neighbor color == node color: return false."
    }
  },
  "surrounded-regions": {
    brute: {
      code: `// DFS all region O(N*M)`,
      complexity: "Time: O(N*M), Space: O(N*M)"
    },
    optimal: {
      code: `#include <vector>\nusing namespace std;\n\nvoid dfsSurround(int r, int c, vector<vector<char>>& board) {\n    int n = board.size(), m = board[0].size();\n    if(r < 0 || c < 0 || r >= n || c >= m || board[r][c] != 'O') return;\n    board[r][c] = '#'; // Mark as boundary connected\n    dfsSurround(r + 1, c, board);\n    dfsSurround(r - 1, c, board);\n    dfsSurround(r, c + 1, board);\n    dfsSurround(r, c - 1, board);\n}\nvoid solveRegions(vector<vector<char>>& board) {\n    if(board.empty()) return;\n    int n = board.size(), m = board[0].size();\n    // Run DFS for boundary 'O's\n    for(int i=0; i<n; i++) {\n        dfsSurround(i, 0, board);\n        dfsSurround(i, m - 1, board);\n    }\n    for(int j=0; j<m; j++) {\n        dfsSurround(0, j, board);\n        dfsSurround(n - 1, j, board);\n    }\n    // Flip remaining 'O's to 'X', restore '#' to 'O'\n    for(int i=0; i<n; i++) {\n        for(int j=0; j<m; j++) {\n            if(board[i][j] == 'O') board[i][j] = 'X';\n            else if(board[i][j] == '#') board[i][j] = 'O';\n        }\n    }\n}`,
      complexity: "Time: O(N * M), Space: O(N * M)"
    },
    hinglish: {
      explanation: "### Intuition\nBoundary-connected regions can't be surrounded. Run DFS from all boundary 'O's and mark them `#`. Flip remaining 'O's to 'X', restore `#` to 'O'.",
      pseudocode: "DFS from all boundary 'O' cells to flag connected cells.\n    Flip unflagged 'O' cells to 'X', restore flagged cells."
    }
  },
  "shortest-path-unweighted": {
    brute: {
      code: `// DFS path checks O(V!)`,
      complexity: "Time: O(V!), Space: O(V)"
    },
    optimal: {
      code: `#include <vector>\n#include <queue>\n#include <algorithm>\nusing namespace std;\n\nvector<int> shortestPath(vector<vector<int>>& adj, int src, int dest, int V) {\n    vector<int> dist(V, -1), parent(V, -1);\n    queue<int> q;\n    q.push(src);\n    dist[src] = 0;\n    while(!q.empty()) {\n        int node = q.front(); q.pop();\n        for(int neighbor : adj[node]) {\n            if(dist[neighbor] == -1) {\n                dist[neighbor] = dist[node] + 1;\n                parent[neighbor] = node;\n                q.push(neighbor);\n            }\n        }\n    }\n    vector<int> path;\n    int curr = dest;\n    while(curr != -1) {\n        path.push_back(curr);\n        curr = parent[curr];\n    }\n    reverse(path.begin(), path.end());\n    return path;\n}`,
      complexity: "Time: O(V + E), Space: O(V)"
    },
    hinglish: {
      explanation: "### Intuition\nBFS finds shortest path in unweighted graphs. BFS queue stores parent relationships, trace back from destination to source.",
      pseudocode: "Run BFS from src tracking parent nodes. Reconstruct path from dest backwards."
    }
  },
  "dijkstra-alg": {
    brute: {
      code: `// Check all path permutations`,
      complexity: "Time: O(V!), Space: O(V)"
    },
    optimal: {
      code: `#include <vector>\n#include <queue>\n#include <climits>\nusing namespace std;\n\nvector<int> dijkstra(int V, vector<vector<pair<int, int>>>& adj, int S) {\n    vector<int> dist(V, INT_MAX);\n    // Min heap: {distance, node}\n    priority_queue<pair<int, int>, vector<pair<int, int>>, greater<pair<int, int>>> pq;\n    dist[S] = 0;\n    pq.push({0, S});\n    while(!pq.empty()) {\n        int node = pq.top().second;\n        int d = pq.top().first;\n        pq.pop();\n        if(d > dist[node]) continue;\n        for(auto neighbor : adj[node]) {\n            int adjNode = neighbor.first;\n            int wt = neighbor.second;\n            if(d + wt < dist[adjNode]) {\n                dist[adjNode] = d + wt;\n                pq.push({dist[adjNode], adjNode});\n            }\n        }\n    }\n    return dist;\n}`,
      complexity: "Time: O(E log V), Space: O(V)"
    },
    hinglish: {
      explanation: "### Intuition\nDijkstra's shortest path. Min Heap tracks closest node. Pop node, check all neighbors; if path distance is smaller, update and push to heap.",
      pseudocode: "dist[S] = 0, heap.push({0, S}).\n    While heap:\n        pop min, check neighbors.\n        If dist[curr] + weight < dist[neighbor]: update and push."
    }
  },
  "network-delay-time": {
    brute: {
      code: `// DFS all paths`,
      complexity: "Time: O(V!), Space: O(V)"
    },
    optimal: {
      code: `#include <vector>\n#include <queue>\n#include <algorithm>\n#include <climits>\nusing namespace std;\n\nint networkDelayTime(vector<vector<int>>& times, int n, int k) {\n    vector<vector<pair<int, int>>> adj(n + 1);\n    for(const auto& t : times) adj[t[0]].push_back({t[1], t[2]});\n    vector<int> dist(n + 1, INT_MAX);\n    priority_queue<pair<int, int>, vector<pair<int, int>>, greater<pair<int, int>>> pq;\n    dist[k] = 0;\n    pq.push({0, k});\n    while(!pq.empty()) {\n        int u = pq.top().second;\n        int d = pq.top().first;\n        pq.pop();\n        if(d > dist[u]) continue;\n        for(auto neighbor : adj[u]) {\n            int v = neighbor.first;\n            int w = neighbor.second;\n            if(dist[u] + w < dist[v]) {\n                dist[v] = dist[u] + w;\n                pq.push({dist[v], v});\n            }\n        }\n    }\n    int maxDelay = 0;\n    for(int i=1; i<=n; i++) {\n        if(dist[i] == INT_MAX) return -1; // Unreachable\n        maxDelay = max(maxDelay, dist[i]);\n    }\n    return maxDelay;\n}`,
      complexity: "Time: O(E log V), Space: O(V + E)"
    },
    hinglish: {
      explanation: "### Intuition\nDijkstra from node K. Find maximum value of shortest path array; if any node unreachable, return -1.",
      pseudocode: "Run Dijkstra from node K. Max value in dist array is the result."
    }
  },
  "min-effort-path": {
    brute: {
      code: `// DFS backtracking paths O(3^(N*M))`,
      complexity: "Time: O(3^(N*M)), Space: O(N*M)"
    },
    optimal: {
      code: `#include <vector>\n#include <queue>\n#include <algorithm>\n#include <cmath>\n#include <climits>\nusing namespace std;\n\nint minimumEffortPath(vector<vector<int>>& heights) {\n    int n = heights.size(), m = heights[0].size();\n    vector<vector<int>> effort(n, vector<int>(m, INT_MAX));\n    // Min heap: {effort, {r, c}}\n    priority_queue<pair<int, pair<int, int>>, vector<pair<int, pair<int, int>>>, greater<pair<int, pair<int, int>>>> pq;\n    effort[0][0] = 0;\n    pq.push({0, {0, 0}});\n    int dr[] = {-1, 0, 1, 0};\n    int dc[] = {0, 1, 0, -1};\n    while(!pq.empty()) {\n        auto curr = pq.top(); pq.pop();\n        int d = curr.first;\n        int r = curr.second.first, c = curr.second.second;\n        if(r == n - 1 && c == m - 1) return d;\n        if(d > effort[r][c]) continue;\n        for(int i=0; i<4; i++) {\n            int nr = r + dr[i], nc = c + dc[i];\n            if(nr >= 0 && nc >= 0 && nr < n && nc < m) {\n                int newEffort = max(d, abs(heights[r][c] - heights[nr][nc]));\n                if(newEffort < effort[nr][nc]) {\n                    effort[nr][nc] = newEffort;\n                    pq.push({newEffort, {nr, nc}});\n                }\n            }\n        }\n    }\n    return 0;\n}`,
      complexity: "Time: O(N*M log(N*M)), Space: O(N*M)"
    },
    hinglish: {
      explanation: "### Intuition\nDijkstra on grid. Distance is maximum absolute elevation difference along path. Pop minimum effort cell, relax neighbors.",
      pseudocode: "Min heap tracks cells by path effort.\n    For neighbors: newEffort = max(eff, abs(height diff)).\n    Relax if newEffort < effort[neighbor]."
    }
  },
  "swim-rising-water": {
    brute: {
      code: `// DFS path scans`,
      complexity: "Time: O(3^(N*M)), Space: O(N*M)"
    },
    optimal: {
      code: `#include <vector>\n#include <queue>\n#include <algorithm>\n#include <climits>\nusing namespace std;\n\nint swimInWater(vector<vector<int>>& grid) {\n    int n = grid.size();\n    vector<vector<int>> time(n, vector<int>(n, INT_MAX));\n    priority_queue<pair<int, pair<int, int>>, vector<pair<int, pair<int, int>>>, greater<pair<int, pair<int, int>>>> pq;\n    time[0][0] = grid[0][0];\n    pq.push({grid[0][0], {0, 0}});\n    int dr[] = {-1, 0, 1, 0};\n    int dc[] = {0, 1, 0, -1};\n    while(!pq.empty()) {\n        auto curr = pq.top(); pq.pop();\n        int t = curr.first;\n        int r = curr.second.first, c = curr.second.second;\n        if(r == n - 1 && c == n - 1) return t;\n        for(int i=0; i<4; i++) {\n            int nr = r + dr[i], nc = c + dc[i];\n            if(nr >= 0 && nc >= 0 && nr < n && nc < n) {\n                int nextTime = max(t, grid[nr][nc]);\n                if(nextTime < time[nr][nc]) {\n                    time[nr][nc] = nextTime;\n                    pq.push({nextTime, {nr, nc}});\n                }\n            }\n        }\n    }\n    return 0;\n}`,
      complexity: "Time: O(N^2 log N), Space: O(N^2)"
    },
    hinglish: {
      explanation: "### Intuition\nSame Dijkstra model. Path weight is maximum cell value along path. Find path that minimizes the maximum height visited.",
      pseudocode: "Same as min-effort-path, comparing node heights."
    }
  },
  "bellman-ford": {
    brute: {
      code: `// DFS all paths`,
      complexity: "Time: O(V!), Space: O(V)"
    },
    optimal: {
      code: `#include <vector>\nusing namespace std;\n\nvector<int> bellman_ford(int V, vector<vector<int>>& edges, int S) {\n    vector<int> dist(V, 1e8);\n    dist[S] = 0;\n    // Relax all edges V-1 times\n    for (int i = 0; i < V - 1; i++) {\n        for (auto it : edges) {\n            int u = it[0], v = it[1], wt = it[2];\n            if (dist[u] != 1e8 && dist[u] + wt < dist[v]) {\n                dist[v] = dist[u] + wt;\n            }\n        }\n    }\n    // Check for negative cycle\n    for (auto it : edges) {\n        int u = it[0], v = it[1], wt = it[2];\n        if (dist[u] != 1e8 && dist[u] + wt < dist[v]) {\n            return {-1}; // Negative cycle exists\n        }\n    }\n    return dist;\n}`,
      complexity: "Time: O(V * E), Space: O(V)"
    },
    hinglish: {
      explanation: "### Intuition\nBellman-Ford algorithm. Relax all edges V-1 times to find shortest paths. A V-th check detects negative cycles (if values still decrease).",
      pseudocode: "for V-1 times: relax all edges.\n    check negative cycle: if dist[u]+wt < dist[v] return -1"
    }
  },
  "cheapest-flights-k-stops": {
    brute: {
      code: `// DFS backtracking path search`,
      complexity: "Time: O(V!), Space: O(V)"
    },
    optimal: {
      code: `#include <vector>\n#include <queue>\n#include <algorithm>\n#include <climits>\nusing namespace std;\n\nint findCheapestPrice(int n, vector<vector<int>>& flights, int src, int dst, int k) {\n    vector<vector<pair<int, int>>> adj(n);\n    for(const auto& f : flights) adj[f[0]].push_back({f[1], f[2]});\n    vector<int> dist(n, INT_MAX);\n    dist[src] = 0;\n    queue<pair<int, pair<int, int>>> q; // {stops, {node, price}}\n    q.push({0, {src, 0}});\n    while(!q.empty()) {\n        auto curr = q.front(); q.pop();\n        int stops = curr.first;\n        int u = curr.second.first;\n        int price = curr.second.second;\n        if(stops > k) continue;\n        for(auto neighbor : adj[u]) {\n            int v = neighbor.first;\n            int w = neighbor.second;\n            if(price + w < dist[v]) {\n                dist[v] = price + w;\n                q.push({stops + 1, {v, dist[v]}});\n            }\n        }\n    }\n    return dist[dst] == INT_MAX ? -1 : dist[dst];\n}`,
      complexity: "Time: O(V + E), Space: O(V + E)"
    },
    hinglish: {
      explanation: "### Intuition\nBFS level order tracks stops. Queue holds `{stops, {node, cost}}`. Stop processing if stops > K. Relax neighbor costs.",
      pseudocode: "Queue tracks stops and cost.\n    BFS level relaxation; if stops <= K, update neighbor costs."
    }
  },
  "prim-mst": {
    brute: {
      code: `// Check all spanning tree permutations`,
      complexity: "Time: O(V^V), Space: O(V)"
    },
    optimal: {
      code: `#include <vector>\n#include <queue>\nusing namespace std;\n\nint spanningTree(int V, vector<vector<int>> adj[]) {\n    // Min heap: {weight, node}\n    priority_queue<pair<int, int>, vector<pair<int, int>>, greater<pair<int, int>>> pq;\n    vector<bool> inMST(V, false);\n    pq.push({0, 0});\n    int sum = 0;\n    while(!pq.empty()) {\n        int u = pq.top().second;\n        int wt = pq.top().first;\n        pq.pop();\n        if(inMST[u]) continue;\n        inMST[u] = true;\n        sum += wt;\n        for(auto neighbor : adj[u]) {\n            int v = neighbor[0];\n            int w = neighbor[1];\n            if(!inMST[v]) pq.push({w, v});\n        }\n    }\n    return sum;\n}`,
      complexity: "Time: O(E log V), Space: O(V)"
    },
    hinglish: {
      explanation: "### Intuition\nPrim's MST algorithm. Min Heap tracks cheapest edge. Pop minimum edge, add node to MST set, push all its neighbors to heap.",
      pseudocode: "Heap tracks edges {weight, node}.\n    Pop, if node not in MST: add weight, mark node in MST, push unvisited neighbor edges."
    }
  },
  "word-ladder": {
    brute: {
      code: `// DFS all paths`,
      complexity: "Time: O(V!), Space: O(V)"
    },
    optimal: {
      code: `#include <string>\n#include <vector>\n#include <unordered_set>\n#include <queue>\nusing namespace std;\n\nint ladderLength(string beginWord, string endWord, vector<string>& wordList) {\n    unordered_set<int> st(wordList.begin(), wordList.end());\n    if(!st.count(endWord)) return 0;\n    queue<pair<string, int>> q;\n    q.push({beginWord, 1});\n    while(!q.empty()) {\n        string word = q.front().first;\n        int steps = q.front().second;\n        q.pop();\n        if(word == endWord) return steps;\n        for(int i=0; i<word.length(); i++) {\n            char original = word[i];\n            for(char c='a'; c<='z'; c++) {\n                word[i] = c;\n                if(st.count(word)) {\n                    st.erase(word); // Visited\n                    q.push({word, steps + 1});\n                }\n            }\n            word[i] = original;\n        }\n    }\n    return 0;\n}`,
      complexity: "Time: O(N * 26 * L), Space: O(N * L)"
    },
    hinglish: {
      explanation: "### Intuition\nBFS shortest path in word network. Modify each character position of current word from 'a' to 'z'; if valid word exists in list, push to queue and erase from list.",
      pseudocode: "BFS: pop word, change each char 'a'..'z'.\n    If match in wordList: push to queue, erase from wordList to mark visited."
    }
  }
};
