def count_swaps(pos):
  nswaps = 0
  for i in pos:
    if i % 2 == 0:
      nswaps = nswaps + 1
  return nswaps


def inverse(A):
  return [chr(ord('0') + ord('1') - ord(c)) for c in A]

# min_swaps returns minimum swaps required to 
# form alternating rows. If B is an invalid matrix, 
# returns -1 to denote an impossible case.
def min_swaps(M, N):
  # Step 1.
  typeA = M[0]
  typeB = inverse(typeA)

  pos_A = []
  pos_B = []
  for i in range(2 * N):
    # Step 2 a.
    if M[i] == typeA:
      pos_A.append(i)
    # Step 2 b.
    elif M[i] == typeB:
      pos_B.append(i)
    # Step 2 c.
    else:
      return -1
  # Step 3.
  if len(pos_A) != len(pos_B):
    return -1

  # Step 4.
  return min(count_swaps(pos_A), count_swaps(pos_B))


def solve(M, N):
  # Step 1-4.
  row_swaps = min_swaps(M, N)
  if row_swaps == -1:
    return "IMPOSSIBLE"

  Mt = [list(i) for i in zip(*M)]  # Transpose matrix M

  # Step 5.
  col_swaps = min_swaps(Mt, N)
  if col_swaps == -1:
    return "IMPOSSIBLE"

  return row_swaps + col_swaps

f = open('A-small-practice.in','r');

for tc in range(int(f.readline())):
  N = int(f.readline())
  M = []
  for i in range(2 * N):
	mm = list(f.readline())
	mm.pop()
	M.append(mm)
  print("Case #%d: %s" % (tc + 1, solve(M, N)))
