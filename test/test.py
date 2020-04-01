num = input()
num = int(num)
if num == 0:
    print(1)
elif num == 1:
    print(1)
else:
    f1 = 1
    f2 = 1
    for i in range(2,num):
        f3 = f1+f2
        f1 = f2
        f2 = f3
    print(f3)