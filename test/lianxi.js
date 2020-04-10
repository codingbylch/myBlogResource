function mergeSortedLists(list1, list2) {
    // 合并两个有序数组
    let len1 = list1.length;
    let len2 = list2.length;
    let i = 0,
        j = 0;
    let result = []
    while (i !== len1 && j !== len2) {
        if (list1[i] > list2[j]) {
            result.push(list2[j])
            j += 1
        } else {
            result.push(list1[i])
            i += 1
        }
    }
    if (i == len1) {
        while (j < len2) {
            result.push(list2[j])
            j += 1
        }
    } else if (j == len2) {
        while (i < len1) {
            result.push(list1[i])
            i += 1
        }
    }
    return result
}


/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

var mergeTwoLists = function (l1, l2) {
    // 合并有序链表
    let rear = new ListNode();
    let current_reference = rear;
    while (l1 && l2) {
        if (l1.val <= l2.val) {
            current_reference.next = new ListNode(l1.val);
            l1 = l1.next;
        } else {
            current_reference.next = new ListNode(l2.val);
            l2 = l2.next;
        }
        current_reference = current_reference.next;
    }
    current_reference.next = l1 || l2;
    return rear.next;
};