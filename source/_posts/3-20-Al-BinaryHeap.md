---
title: 二叉堆实现优先级队列
date: 2020-03-20 17:00:10
tags: 算法
discription: 二叉堆实现优先级队列的python写法
---

二叉堆（Binary Heap）其主要操作就两个，sink（下沉）和 swim（上浮），用以维护二叉堆的性质。其主要应用有两个，首先是一种排序方法「堆排序」，第二是一种很有用的数据结构「优先级队列」。

## 一、二叉堆概览
二叉堆其实就是一种特殊的二叉树（完全二叉树），只不过存储在数组里。在数组里，我们把数组索引作为指针：
二叉堆还分为最大堆和最小堆。最大堆的性质是：每个节点都大于等于它的两个子节点。类似的，最小堆的性质是：每个节点都小于等于它的子节点。
## 二、优先级队列实现
数据结构的功能无非增删查该，优先级队列有两个主要 API，分别是 insert 插入一个元素和 delMax 删除最大元素（如果底层用最小堆，那么就是 delMin）。
以下是代码实现：

```python
class MaxPriorityQueue():
    '''
    优先级队列, 最大堆
    方法: 返回最大值maxNum, 插入操作insert, 删除最大元素delMax
    '''

    def __init__(self):
        self.pq = []
        self.N = 0
        self.pq.append(None)

    def maxNum(self):
        '''方法：返回最大值'''
        return self.pq[1]

    def insert(self, e):
        '''方法：插入操作'''
        self.N += 1
        self.pq.append(e)
        self.__swim(self.N)

    def delMax(self):
        '''方法：删除最大元素并返回'''
        themax = self.pq[1]
        self.__exchange(1, self.N)
        self.pq[self.N] = None
        self.N -= 1
        self.__sink(1)
        return themax

    def __parent(self, root):
        '''私有：返回父节点的秩'''
        return root // 2

    def __left(self, root):
        '''私有：返回左节点的秩'''
        return root * 2

    def __right(self, root):
        '''私有：返回右节点的秩'''
        return root * 2 + 1

    def __exchange(self, i, j):
        '''私有：交换'''
        self.pq[i], self.pq[j] = self.pq[j], self.pq[i]

    def __less(self, i, j):
        '''私有：比较'''
        return self.pq[i] < self.pq[j]

    def __swim(self, k):
        '''私有：上浮'''
        while k > 1 and self.__less(self.__parent(k), k):
            self.__exchange(self.__parent(k), k)
            k = self.__parent(k)

    def __sink(self, k):
        '''私有：下沉'''
        while self.__left(k) <= self.self.N:
            older = self.__left(k)
            if self.__right(k) <= self.N and self.__less(older, self.__right(k)):
                older = self.__right(k)
            if older < k:
                break
            self.__exchange(k, older)
            k = older


# 测试
a = MaxPriorityQueue()
lists = [2, 5, 1, 7, 8, 9, 2, 5, 6, 33, 2, 1, 6, 8, 355, 7, 72, 145]
for x in lists:
    a.insert(x)
print(a.maxNum())
```

