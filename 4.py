import math
#implementacion lineal
def seg(routes, num):
  msum = routes[0]
  csum = msum
  ni, nj = 0, -1
  for i in range(1, len(routes)):
    if routes[i]+csum < routes[i]:
      csum = routes[i]
      ni = i+1
    else:
      csum = routes[i]+csum
      nj = i+1
    # csum = max(routes[i]+csum, routes[i])
    msum = max(csum, msum)
  if ni != 0 and nj == -1:
    nj = ni+1
  if msum > 0:
      print("La mejor parte para la ruta", num, "es entre las clalles es", ni, "y", nj)
  else:
    print("La ruta", num, "no tiene solucion")
    
#recursivo    
def segdv (A):
  def segdv_(A, p, r):
    if p==r:
      return max(0, A[p])
    q = math.floor((p+r)/2)
    maxleft = segdv_(A, p, q)
    maxright = segdv_(A, q+1, r)
    sum_ = 0 
    max2left = sum_ = A[q]
    for i in range(q-1, p, -1):
      sum_ = sum_+A[i]
      max2left = max(max2left, sum_)
    sum_ = 0
    max2right = sum_ = A[q+1]
    for f in range(q+2, r):
      sum_ = sum_+A[f]
      max2right = max(max2right, sum_)
    maxcr = max2left+max2right
    return max(maxleft, maxcr, maxright)
  print(segdv_(A, 0, len(A)-1))


#Recursivo
segdv([4, -5, 4, -3, 4, 4, -4, 4, -5])
segdv([-3, -4, -5])
segdv([-1, 6])

n = int(input())
lst = [None] * n
for i in range(n):
  nc = int(input())-1
  lst[i] = [None]*nc
  for j in range(nc):
    lst[i][j] = int(input())

for i in range(n):
  seg(lst[i], i+1)

