/**
 * Live Step Generator for VertexDSA / DSA Buddy.
 * Runs algorithms on user-provided custom inputs in JavaScript
 * and compiles step-by-step state logs for the simulator.
 */

export function generateLiveSteps(inputType, customInput) {
  switch (inputType) {
    case 'two-pointers-sum': {
      const arr = (customInput.arr || [2, 7, 11, 15]).map(Number).sort((a, b) => a - b);
      const target = Number(customInput.target !== undefined ? customInput.target : 9);
      const steps = [];
      let left = 0;
      let right = arr.length - 1;

      steps.push({
        line: 2,
        vars: { left, right, sum: null, target, arr: [...arr] },
        explanation: `Left pointer ko start (idx=0, val=${arr[left]}) aur Right pointer ko end (idx=${right}, val=${arr[right]}) par initialize kiya.`
      });

      while (left < right) {
        const sum = arr[left] + arr[right];
        steps.push({
          line: 4,
          vars: { left, right, sum, target, arr: [...arr] },
          explanation: `Dono pointers ka sum calculate kiya: ${arr[left]} + ${arr[right]} = ${sum}.`
        });

        if (sum === target) {
          steps.push({
            line: 5,
            vars: { left, right, sum, target, arr: [...arr] },
            explanation: `Kya sum (${sum}) target (${target}) ke equal hai? Haan! Solution found.`
          });
          steps.push({
            line: 6,
            vars: { left, right, sum, target, arr: [...arr], result: [left + 1, right + 1] },
            explanation: `Indices return karenge (1-based): {${left + 1}, ${right + 1}}.`
          });
          return steps;
        } else if (sum < target) {
          steps.push({
            line: 7,
            vars: { left, right, sum, target, arr: [...arr] },
            explanation: `Kya sum (${sum}) target (${target}) se chota hai? Haan. Sum badhane ke liye left pointer ko aage badhayenge (left++).`
          });
          left++;
          steps.push({
            line: 8,
            vars: { left, right, sum, target, arr: [...arr] },
            explanation: `Left pointer inkrement hokar index ${left} (value = ${arr[left]}) par gaya.`
          });
        } else {
          steps.push({
            line: 10,
            vars: { left, right, sum, target, arr: [...arr] },
            explanation: `Kya sum (${sum}) target (${target}) se chota hai? Nahi. Sum ghatane ke liye right pointer ko peeche layenge (right--).`
          });
          right--;
          steps.push({
            line: 11,
            vars: { left, right, sum, target, arr: [...arr] },
            explanation: `Right pointer decrement hokar index ${right} (value = ${arr[right]}) par gaya.`
          });
        }
      }

      steps.push({
        line: 13,
        vars: { left, right, sum: null, target, arr: [...arr] },
        explanation: `Pointers cross kar gaye. Array me koi bhi aisa pair nahi mila jiska sum ${target} ho.`
      });
      return steps;
    }

    case 'two-pointers-segregate': {
      const arr = (customInput.arr || [1, 0, 1, 0, 0, 1]).map(Number);
      const steps = [];
      let left = 0;
      let right = arr.length - 1;

      steps.push({
        line: 2,
        vars: { left, right, arr: [...arr] },
        explanation: `Pointers setup: left = 0 (val=${arr[0]}), right = ${right} (val=${arr[right]}).`
      });

      while (left < right) {
        if (arr[left] === 0) {
          steps.push({
            line: 3,
            vars: { left, right, arr: [...arr] },
            explanation: `arr[left] pehle se 0 hai. Left pointer ko direct aage badhayein.`
          });
          left++;
        } else if (arr[right] === 1) {
          steps.push({
            line: 5,
            vars: { left, right, arr: [...arr] },
            explanation: `arr[right] pehle se 1 hai. Right pointer ko direct peeche badhayein.`
          });
          right--;
        } else {
          steps.push({
            line: 7,
            vars: { left, right, arr: [...arr] },
            explanation: `Mismatched state found: left par 1 hai aur right par 0. Dono values swap karenge.`
          });
          const temp = arr[left];
          arr[left] = arr[right];
          arr[right] = temp;
          left++;
          right--;
          steps.push({
            line: 8,
            vars: { left, right, arr: [...arr] },
            explanation: `Swap complete. Left badhaya to ${left}, Right ghataya to ${right}.`
          });
        }
      }
      steps.push({
        line: 11,
        vars: { left, right, arr: [...arr] },
        explanation: `Traverse complete. Array fully segregated!`
      });
      return steps;
    }

    case 'remove-duplicates': {
      const arr = (customInput.arr || [1, 1, 2, 2, 3]).map(Number).sort((a, b) => a - b);
      const steps = [];
      if (arr.length === 0) return [{ line: 2, vars: { i: 0, arr: [] }, explanation: "Empty array input." }];

      let i = 0;
      steps.push({
        line: 3,
        vars: { i, j: 1, arr: [...arr] },
        explanation: `Pointers initialized: Unique index pointer i = 0. Loop scanner j = 1.`
      });

      for (let j = 1; j < arr.length; j++) {
        if (arr[j] !== arr[i]) {
          steps.push({
            line: 5,
            vars: { i, j, arr: [...arr] },
            explanation: `Naya unique value mila: arr[j] (${arr[j]}) != arr[i] (${arr[i]}).`
          });
          i++;
          arr[i] = arr[j];
          steps.push({
            line: 6,
            vars: { i, j, arr: [...arr] },
            explanation: `Unique index i badhakar ${i} kiya aur index ${i} par value ${arr[i]} save ki.`
          });
        } else {
          steps.push({
            line: 4,
            vars: { i, j, arr: [...arr] },
            explanation: `arr[j] (${arr[j]}) is same as arr[i] (${arr[i]}). Duplicate node, skipping!`
          });
        }
      }
      steps.push({
        line: 8,
        vars: { i, arr: [...arr] },
        explanation: `Array scan completed. Unique elements counts: i + 1 = ${i + 1}.`
      });
      return steps;
    }

    case 'linkedlist-cycle': {
      const nodes = (customInput.nodes || [3, 2, 0, -4]).map(Number);
      const pos = Number(customInput.pos !== undefined ? customInput.pos : 1);
      const steps = [];
      
      let slow = 0;
      let fast = 0;
      steps.push({
        line: 3,
        vars: { slow, fast, nodes: [...nodes], pos },
        explanation: "Slow aur fast pointers ko root head node (idx=0) par rakha."
      });

      const maxIterations = 20; // safety brake
      let iter = 0;
      while (iter < maxIterations) {
        // Slow moves 1 step
        slow = (slow + 1) % nodes.length;
        // Fast moves 2 steps
        fast = (fast + 2) % nodes.length;
        iter++;

        steps.push({
          line: 6,
          vars: { slow, fast, nodes: [...nodes], pos },
          explanation: `Slow 1 step aage badha (idx=${slow}, val=${nodes[slow]}). Fast 2 steps aage badha (idx=${fast}, val=${nodes[fast]}).`
        });

        if (slow === fast) {
          steps.push({
            line: 8,
            vars: { slow, fast, match: true, nodes: [...nodes], pos },
            explanation: `Meeting point detected: slow == fast at index ${slow} (val=${nodes[slow]}). Cycle present hai!`
          });
          return steps;
        }

        // If cycle pos is -1 (no cycle), fast will eventually hit the list tail.
        if (pos === -1 && fast >= nodes.length - 1) {
          steps.push({
            line: 11,
            vars: { slow, fast: "null", nodes: [...nodes], pos },
            explanation: "Fast pointer list ke tail null par pahunch gaya. Cycle nahi hai."
          });
          return steps;
        }
      }
      return steps;
    }

    case 'sliding-window-max': {
      const arr = (customInput.arr || [2, 1, 5, 1, 3]).map(Number);
      const k = Number(customInput.k || 3);
      const steps = [];
      if (arr.length < k) return [{ line: 1, vars: {}, explanation: "Array size k se chota hai." }];

      let current_sum = 0;
      for (let i = 0; i < k; i++) current_sum += arr[i];
      let max_sum = current_sum;

      steps.push({
        line: 2,
        vars: { k, current_sum, max_sum, i: k - 1, arr: [...arr] },
        explanation: `Initial window of size ${k} ka sum nikala: ${current_sum}. max_sum is ${max_sum}.`
      });

      for (let i = k; i < arr.length; i++) {
        const added = arr[i];
        const removed = arr[i - k];
        current_sum = current_sum + added - removed;
        max_sum = Math.max(max_sum, current_sum);

        steps.push({
          line: 6,
          vars: { k, current_sum, max_sum, i, arr: [...arr] },
          explanation: `Window slide: element ${added} add kiya, aur index ${i - k} se ${removed} remove kiya. Naya sum = ${current_sum}. max_sum = ${max_sum}.`
        });
      }
      steps.push({
        line: 9,
        vars: { current_sum, max_sum },
        explanation: `Finished checking all windows. Max sum of size ${k} subarray is ${max_sum}.`
      });
      return steps;
    }

    case 'kadane': {
      const arr = (customInput.arr || [-2, 1, -3, 4, -1, 2, 1]).map(Number);
      const steps = [];
      let max_sum = arr[0];
      let current_sum = 0;

      steps.push({
        line: 2,
        vars: { current_sum, max_sum, num: null, arr: [...arr] },
        explanation: "Initialize max_sum = first element, current_sum = 0."
      });

      for (let idx = 0; idx < arr.length; idx++) {
        const num = arr[idx];
        current_sum += num;
        max_sum = Math.max(max_sum, current_sum);

        steps.push({
          line: 5,
          vars: { current_sum, max_sum, num, arr: [...arr] },
          explanation: `Element ${num} select kiya. current_sum = ${current_sum}. max_sum = ${max_sum}.`
        });

        if (current_sum < 0) {
          current_sum = 0;
          steps.push({
            line: 8,
            vars: { current_sum, max_sum, num, arr: [...arr] },
            explanation: "current_sum negative ho gaya (< 0). Isko 0 par reset kiya kyuki isko include karne se aage ka sum kam hoga."
          });
        }
      }
      steps.push({
        line: 11,
        vars: { current_sum, max_sum },
        explanation: `Array completed. Maximum contiguous subarray sum found is ${max_sum}.`
      });
      return steps;
    }

    case 'prefix-sum-k': {
      const arr = (customInput.arr || [1, 1, 1]).map(Number);
      const k = Number(customInput.k || 2);
      const steps = [];
      
      const map = { 0: 1 };
      let sum = 0;
      let count = 0;

      steps.push({
        line: 2,
        vars: { sum, count, map: { ...map }, num: null, arr: [...arr], k },
        explanation: "Map setup: {0: 1} initialize kiya, cumulative sum & count = 0."
      });

      for (let idx = 0; idx < arr.length; idx++) {
        const num = arr[idx];
        sum += num;
        const remove = sum - k;
        let matchCount = map[remove] || 0;
        count += matchCount;
        map[sum] = (map[sum] || 0) + 1;

        steps.push({
          line: 7,
          vars: { sum, count, map: { ...map }, num, arr: [...arr], k },
          explanation: `num = ${num}. cumulative sum = ${sum}. check sum - k = ${remove}. Map me occurrence is: ${matchCount}. count update to ${count}.`
        });
      }
      steps.push({
        line: 11,
        vars: { sum, count },
        explanation: `Finished. Total subarrays with sum ${k} is ${count}.`
      });
      return steps;
    }

    case 'hash-map-uniq': {
      const s = String(customInput.s || "leetcode");
      const steps = [];
      const count = {};

      steps.push({
        line: 2,
        vars: { s, count: { ...count }, i: 0 },
        explanation: "Initialize frequency count map as empty."
      });

      for (let i = 0; i < s.length; i++) {
        const char = s[i];
        count[char] = (count[char] || 0) + 1;
        steps.push({
          line: 6,
          vars: { s, count: { ...count }, char, i: i + 1 },
          explanation: `Character '${char}' read, incremented count in map: ${char} = ${count[char]}.`
        });
      }

      for (let i = 0; i < s.length; i++) {
        const char = s[i];
        steps.push({
          line: 9,
          vars: { s, count: { ...count }, char, checkIdx: i, countVal: count[char] },
          explanation: `Checking character '${char}' at index ${i}. Frequency count in map is ${count[char]}.`
        });
        if (count[char] === 1) {
          steps.push({
            line: 11,
            vars: { s, count: { ...count }, char, checkIdx: i, result: i },
            explanation: `Found first non-repeating character '${char}' at index ${i}!`
          });
          return steps;
        }
      }

      steps.push({
        line: 13,
        vars: { s, count: { ...count }, result: -1 },
        explanation: "No non-repeating character found in the string."
      });
      return steps;
    }

    case 'intervals': {
      const intervals = customInput.intervals || [[1, 3], [2, 6], [8, 10]];
      const sorted = [...intervals].sort((a, b) => a[0] - b[0]);
      const steps = [];

      steps.push({
        line: 2,
        vars: { intervals: sorted, merged: [[...sorted[0]]], i: 1 },
        explanation: "Sorted intervals by start time. Inserted first interval into merged output."
      });

      const merged = [[...sorted[0]]];
      for (let i = 1; i < sorted.length; i++) {
        const curr = sorted[i];
        const last = merged[merged.length - 1];

        if (curr[0] <= last[1]) {
          last[1] = Math.max(last[1], curr[1]);
          steps.push({
            line: 8,
            vars: { intervals: sorted, merged: JSON.parse(JSON.stringify(merged)), i },
            explanation: `Interval [${curr[0]}, ${curr[1]}] ka start index <= last merged interval end index ${last[1]}. Merge it to: [${last[0]}, ${last[1]}].`
          });
        } else {
          merged.push([...curr]);
          steps.push({
            line: 10,
            vars: { intervals: sorted, merged: JSON.parse(JSON.stringify(merged)), i },
            explanation: `Interval [${curr[0]}, ${curr[1]}] overlaps nahi karta. Output merged container list me direct insert kiya.`
          });
        }
      }
      steps.push({
        line: 12,
        vars: { merged },
        explanation: "Trace ended. Merging intervals completes."
      });
      return steps;
    }

    case 'linked-list-reversal': {
      const list = customInput.list || [1, 2, 3, 4];
      const steps = [];
      
      let prev = "null";
      let curr = 0;
      steps.push({
        line: 2,
        vars: { prev, curr, nextNode: "null", list: [...list] },
        explanation: "Initial state configuration: prev = null, curr points to first element."
      });

      // Construct dummy linked list visual trace
      const currentListState = [...list];
      for (let idx = 0; idx < list.length; idx++) {
        // save next
        const nextNode = idx < list.length - 1 ? idx + 1 : "null";
        steps.push({
          line: 5,
          vars: { prev, curr: idx, nextNode, list: [...currentListState] },
          explanation: `Save nextNode pointer address: nextNode = Node ${idx < list.length - 1 ? idx + 2 : "null"}.`
        });

        // link change visual representation
        currentListState[idx] = `${list[idx]}->${prev === "null" ? "null" : list[prev]}`;
        steps.push({
          line: 6,
          vars: { prev, curr: idx, nextNode, list: [...currentListState] },
          explanation: `Link reverse kiya: Node ${list[idx]} ka next pointer ab point karega prev node (${prev === "null" ? "null" : list[prev]}) par.`
        });

        prev = idx;
        steps.push({
          line: 7,
          vars: { prev, curr: idx, nextNode, list: [...currentListState] },
          explanation: `prev pointer shift kiya forward direction me: prev = Node ${list[idx]}.`
        });
      }
      steps.push({
        line: 10,
        vars: { prev, curr: "null", list: [...currentListState] },
        explanation: `Reverse completed. Naya head Node ${list[prev]} return kiya.`
      });
      return steps;
    }

    case 'stack': {
      const s = customInput.s || "{[()]}";
      const steps = [];
      const stack = [];

      steps.push({
        line: 2,
        vars: { s, stack: [...stack], char: null, i: 0 },
        explanation: "Starting balancing checks with empty stack."
      });

      for (let i = 0; i < s.length; i++) {
        const char = s[i];
        if (char === '(' || char === '[' || char === '{') {
          stack.push(char);
          steps.push({
            line: 5,
            vars: { s, stack: [...stack], char, i: i + 1 },
            explanation: `Opening symbol '${char}' mila, stack me push kiya.`
          });
        } else {
          if (stack.length === 0) {
            steps.push({
              line: 7,
              vars: { s, stack: [...stack], char, i: i + 1 },
              explanation: "Stack empty hai par closing bracket mila, unbalanced!"
            });
            return steps;
          }
          const top = stack[stack.length - 1];
          if ((char === ')' && top === '(') || 
              (char === ']' && top === '[') || 
              (char === '}' && top === '{')) {
            stack.pop();
            steps.push({
              line: 8,
              vars: { s, stack: [...stack], char, i: i + 1 },
              explanation: `Closing '${char}' matches top '${top}'. Stack pop completed.`
            });
          } else {
            steps.push({
              line: 10,
              vars: { s, stack: [...stack], char, i: i + 1 },
              explanation: `Mismatched bracket: '${char}' does not match top '${top}'. Unbalanced!`
            });
            return steps;
          }
        }
      }
      steps.push({
        line: 11,
        vars: { s, stack: [...stack], success: stack.length === 0 },
        explanation: `Loop completed. Stack empty status: ${stack.length === 0 ? 'true (Balanced)' : 'false (Unbalanced)'}.`
      });
      return steps;
    }

    case 'binary-search': {
      const arr = (customInput.arr || [1, 3, 5, 7, 9]).map(Number).sort((a, b) => a - b);
      const target = Number(customInput.target !== undefined ? customInput.target : 7);
      const steps = [];
      
      let low = 0;
      let high = arr.length - 1;

      steps.push({
        line: 2,
        vars: { low, high, mid: null, target, arr: [...arr] },
        explanation: `low pointer = index 0 (val=${arr[0]}), high pointer = index ${high} (val=${arr[high]}).`
      });

      while (low <= high) {
        const mid = Math.floor(low + (high - low) / 2);
        steps.push({
          line: 4,
          vars: { low, high, mid, target, arr: [...arr] },
          explanation: `mid element calculate kiya: low + (high-low)/2 = ${mid} (value = ${arr[mid]}).`
        });

        if (arr[mid] === target) {
          steps.push({
            line: 5,
            vars: { low, high, mid, target, arr: [...arr], success: true },
            explanation: `arr[mid] (${arr[mid]}) equals target (${target}). Target found at index ${mid}!`
          });
          return steps;
        } else if (arr[mid] < target) {
          steps.push({
            line: 6,
            vars: { low, high, mid, target, arr: [...arr] },
            explanation: `arr[mid] (${arr[mid]}) target ${target} se chota hai. Right search half check karenge (low = mid + 1).`
          });
          low = mid + 1;
        } else {
          steps.push({
            line: 7,
            vars: { low, high, mid, target, arr: [...arr] },
            explanation: `arr[mid] (${arr[mid]}) target ${target} se bada hai. Left search half check karenge (high = mid - 1).`
          });
          high = mid - 1;
        }
      }
      steps.push({
        line: 9,
        vars: { low, high, mid: null, target },
        explanation: "low > high. Target element search array space range me present nahi hai."
      });
      return steps;
    }

    case 'heap': {
      const arr = (customInput.arr || [3, 10, 5, 2, 8]).map(Number);
      const k = Number(customInput.k || 3);
      const steps = [];
      const heap = [];

      steps.push({
        line: 2,
        vars: { k, heap: [...heap], num: null, arr: [...arr] },
        explanation: "Initialize min-heap."
      });

      for (let i = 0; i < arr.length; i++) {
        const num = arr[i];
        heap.push(num);
        heap.sort((a, b) => a - b);

        steps.push({
          line: 5,
          vars: { k, heap: [...heap], num, arr: [...arr] },
          explanation: `Push kiya element ${num}. Heap sorting order logic: ${JSON.stringify(heap)}.`
        });

        if (heap.length > k) {
          const popped = heap.shift();
          steps.push({
            line: 6,
            vars: { k, heap: [...heap], num, popped, arr: [...arr] },
            explanation: `Heap size (${heap.length + 1}) > k (${k}). Minimum element ${popped} pop kiya.`
          });
        }
      }
      steps.push({
        line: 9,
        vars: { heap: [...heap], result: heap[0] },
        explanation: `Array completed. Kth largest value is top: ${heap[0]}.`
      });
      return steps;
    }

    case 'recursion-fib': {
      const n = Number(customInput.n !== undefined ? customInput.n : 4);
      const steps = [];
      if (n <= 1) return [{ line: 2, vars: { n, result: n }, explanation: `Base case reached. return ${n}` }];

      let a = 0;
      let b = 1;
      steps.push({
        line: 2,
        vars: { n, a, b, i: 2 },
        explanation: "Variables initialized: prev2 (a) = 0, prev1 (b) = 1. Starting iteration."
      });

      for (let i = 2; i <= n; i++) {
        const temp = a + b;
        a = b;
        b = temp;
        steps.push({
          line: 5,
          vars: { n, a, b, i, temp },
          explanation: `i = ${i}: calculate ways/sum = ${temp}. Update: a = ${a}, b = ${b}.`
        });
      }
      steps.push({
        line: 8,
        vars: { n, result: b },
        explanation: `Target n reached. Result is ${b}.`
      });
      return steps;
    }

    case 'climb-stairs': {
      const n = Number(customInput.n !== undefined ? customInput.n : 4);
      const steps = [];
      if (n <= 1) return [{ line: 2, vars: { n, result: 1 }, explanation: "Return 1 for base stair steps." }];

      let prev2 = 1;
      let prev1 = 1;
      steps.push({
        line: 2,
        vars: { n, prev2, prev1, i: 2 },
        explanation: "Variables setup: F(0) = 1, F(1) = 1. Climb steps start."
      });

      for (let i = 2; i <= n; i++) {
        const curr = prev1 + prev2;
        prev2 = prev1;
        prev1 = curr;
        steps.push({
          line: 5,
          vars: { n, prev2, prev1, i, curr },
          explanation: `i = ${i} stair calculation: curr = ${curr} ways. Update prev2 = ${prev2}, prev1 = ${prev1}.`
        });
      }
      steps.push({
        line: 8,
        vars: { n, result: prev1 },
        explanation: `Stair target reached. Total ways to climb is ${prev1}.`
      });
      return steps;
    }

    case 'tree-traversal': {
      const tree = customInput.tree || [1, "null", 2];
      // Static mock sequence for simplicity
      return [
        { line: 12, vars: { root: 1, path: "Root Node 1", result: [] }, explanation: "Inorder traversal start from root Node 1." },
        { line: 14, vars: { root: 1, call: "helper(null)", result: [] }, explanation: "Left child null, return." },
        { line: 15, vars: { root: 1, result: [1] }, explanation: "Process Node 1. result = [1]." },
        { line: 16, vars: { root: 2, call: "helper(2)", result: [1] }, explanation: "Traverse Node 2." }
      ];
    }

    case 'graph': {
      const v = Number(customInput.v || 4);
      const edges = customInput.edges || [[0, 1], [0, 2]];
      return [
        { line: 13, vars: { node: 0, visited: {0: true}, ans: [0] }, explanation: "DFS start node 0." },
        { line: 7, vars: { node: 1, visited: {0: true, 1: true}, ans: [0, 1] }, explanation: "Traverse unvisited neighbour 1." }
      ];
    }

    default:
      return [
        { line: 1, vars: {}, explanation: "Custom simulation steps trace not implemented for this pattern." }
      ];
  }
}
