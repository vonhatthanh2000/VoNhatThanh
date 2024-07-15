// Assume that this function is sum from 0 to n

// Approach 1
function sum_to_n_a(n: number): number {
  // apply arithmetic progression, we have sum to n equivalent to n*(n+1)/2
  // complexity O(1)
  return n <= 0 ? 0 : (n * (n + 1)) / 2;
}

// Approach 2
function sum_to_n_a_apprach2(n: number): number {
  // complexity O(n)
  let sum = 0;
  for (let i = 0; i <= n; i++) {
    sum += i;
  }
  return sum;
}

// Approach 3
function sum_to_n_a_approach3(n: number): number {
  // complexity O(n)

  if (n <= 0) return 0;
  else if (n === 1) return 1;

  return n + sum_to_n_a(n - 1);
}
