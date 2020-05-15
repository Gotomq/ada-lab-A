import numpy as np
import time
import random

def mergeSort(array):
    if len(array) <= 1:
        return array
    else:
        left = array[:int(len(array)/2)]
        right = array[int(len(array)/2):]
        return merge(mergeSort(left),mergeSort(right))

def merge(array1, array2):
    merged_array = []
    pointer1, pointer2 = 0, 0
    while pointer1 < len(array1) and pointer2 < len(array2):
        if array1[pointer1] < array2[pointer2]:
            merged_array.append(array1[pointer1])
            pointer1 += 1
        else:
            merged_array.append(array2[pointer2])
            pointer2 += 1
    while pointer1 < len(array1):
        merged_array.append(array1[pointer1])
        pointer1 += 1

    while pointer2 < len(array2):
        merged_array.append(array2[pointer2])
        pointer2 += 1

    return merged_array

def merge_sort_ada (array):

    def ms (arr, p, r):
        if p < r:
            q = int((p+r)/2)
            ms(arr, p, q)
            ms(arr, q+1, r)
            mr_ada(arr, p, q, r)

    def mr_ada (arr, p, q, r):
            i, j = p, q+1
            temp = [None] * (r-p+1) 
            while i <= q:
                temp[i-p] = arr[i]
                i += 1
            while j <= r:
                temp[r+q+1-j-p] = arr[j]
                j += 1
            i, j, k = p, r, p
            while k <= r:
                if temp[i-p] <= temp[j-p]:
                    arr[k] = temp[i-p]
                    i += 1
                else:
                    arr[k] = temp[j-p]
                    j -= 1
                k += 1

    ms(array, 0, len(array) -1)

def insertionSort(arr): 
    # Traverse through 1 to len(arr) 
    for i in range(1, len(arr)): 
        key = arr[i] 
        j = i-1
        while j >=0 and key < arr[j] : 
                arr[j+1] = arr[j] 
                j -= 1
        arr[j+1] = key 

def getArray(size, ordered):
    if not ordered:
        return [random.randint(0,size) for i in range(size)]
    else: 
        return [i for i in range(size)]


# see if sort2 is faster
def compare(limit, ordered, mdata, idata, sort1, sort2):
    for i in range (1,limit):
        arr1 = getArray(i, ordered)
        arr2 = arr1.copy()

        # Taking time 1 Merge
        t1 = time.time()
        sort1(arr1)
        ed1 = time.time() - t1

        # Taking time 2 Insert
        t2 = time.time()
        sort2(arr2)
        ed2 = time.time() - t2

        #copy timing info
        mdata.append(ed1)
        idata.append(ed2)

        #comparing
        print('size:', i)
        if ed1 > ed2:
            print('MS-ADA wins')
            print('merge:',ed1)
            print('merge-ada:',ed2)
            
        else:
            print('MERGE wins')
            print('merge:',ed1)
            print('merge-ada:',ed2)
        print('_________________________________________')
            

# arr = [1]
# mr_ada(arr, 0, 2, 5)
# merge_sort_ada(arr)
# print(arr)

mData = []
iData = []
compare(1000, True, mData, iData, mergeSort, merge_sort_ada)

a = np.asarray([ mData, iData])
np.savetxt("inverse-best.csv", a.T, delimiter=",")

# arr = getArray(100, False)
# res = mergeSort(arr)
# print(res)
