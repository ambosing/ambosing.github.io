---
date: '2023-07-25'
title: '파이썬에서 정렬을 잘 사용하는 법'
categories: ['Python']
summary: '파이썬 sort(), sorted(), key, cmp_to_key'
thumbnail: '../images/thumbnail/chocoball.webp'
---

## 들어가기 전
코딩테스트 문제를 풀다가 정렬 문제를 마주한 적이 있습니다..!  
정렬에서는 sort, key 정도만 알고 있었는데 그 이상의 것들로 푸시는 분들도 있더라구요..!  
이번에는 거기서 영감을 받고, 현재 읽고 있는 책 내용에도 존재해서 이번에는 정렬에 대해서 조금 더 깊이 알아보려고 합니다!
 
이번 글은 [파이썬 코딩의 기술](https://product.kyobobook.co.kr/detail/S000001834494)을 보고 참조하였습니다.  
만약 문제 발생시 글을 삭제처리 하도록 하겠습니다!

## sort와 sorted
파이썬 리스트에는 리스트를 제자리에서(in-place) 수정하는 내장 <mark>list.sort()</mark> 메서드가 존재합니다! 또한, iterable로부터 새로운 정렬된 리스트를 만드는 <mark>sorted()</mark> 내장 함수도 존재합니다.

먼저 sorted() 내장 함수 사용법을 봅시다.
<div class="code-header">
	<span class="red btn"></span>
	<span class="yellow btn"></span>
	<span class="green btn"></span>
</div>

```python
sorted([5, 2, 3, 1, 4]) # 새로운 리스트 반환
[1, 2, 3, 4, 5]
```
sorted()메서드와는 달리 sort() 함수는 리스트에만 존재합니다.  
list.sort() 메서드를 사용해서 제자리(in-place)에서 수정할 수 있습니다.  
list.sort()는 None을 반환합니다.  
<div class="code-header">
	<span class="red btn"></span>
	<span class="yellow btn"></span>
	<span class="green btn"></span>
</div>

```python
a = [5, 2, 3, 1, 4]
a.sort()
print(a.sort())
>> None
a
>> [1, 2, 3, 4, 5]
```
일반적으로 list.sort()는 sorted()보다는 불편합니다..!
하지만 원래 목록이 필요하지 않다면, 새로운 리스트를 하나 더 만드는 sorted()보다 효율적입니다.(공간복잡도가 낮아집니다!)
(sorted()는 새로운 리스트를 반환하므로)

또 다른 점은 list.sort() 메서드가 리스트에게만 정의된다는 것입니다. 이와 달리, sorted() 함수는 모든 iterable을 받아들입니다.
<div class="code-header">
	<span class="red btn"></span>
	<span class="yellow btn"></span>
	<span class="green btn"></span>
</div>

```python
sorted({1: 'D', 2: 'B', 3: 'B', 4: 'E', 5: 'A'})
[1, 2, 3, 4, 5]
```

## 복잡한 기준을 사용할 때는 key 파라미터를 사용하자!
<div class="code-header">
	<span class="red btn"></span>
	<span class="yellow btn"></span>
	<span class="green btn"></span>
</div>

```python
class Tool:
    def __init__(self, name, weight):
        self.name = name
        self.weight = weight

    def __repr__(self):
        return f'Tool({self.name!r}, {self.weight})'

tools = [
    Tool('수준계', 3.5),
    Tool('해머', 1.25),
    Tool('스크류드라이버', 0.5),
    Tool('끌', 0.25),
]
```
이런 코드가 있다고 가정합시다!  
기본적인 list.sort()를 사용하면 어떤 기준으로 정렬할 지 모르기 때문에 에러가 발생합니다.

<div class="code-header">
	<span class="red btn"></span>
	<span class="yellow btn"></span>
	<span class="green btn"></span>
</div>

```python
Traceback (most recent call last):
  File "C:\Users\user\PycharmProjects\issueKeyword\test.py", line 17, in <module>
    tools.sort()
TypeError: '<' not supported between instances of 'Tool' and 'Tool'
```
정렬을 사용하고 싶은 애트리뷰트가 객체에 들어 있는 경우가 많습니다. 이런 상황을 지원하기 위해 sort에는 key라는 파라미터가 존재합니다.  
key는 함수여야 하고, 정렬 중인 리스트의 원소가 전달되어야 합니다.  
다음은 이름으로 Tool들을 정렬해 보겠습니다.
<div class="code-header">
	<span class="red btn"></span>
	<span class="yellow btn"></span>
	<span class="green btn"></span>
</div>

```python
print('미정렬:', repr(tools))
tools.sort(key=lambda x: x.name)
print('정렬: ', tools)

>> 미정렬: [Tool('수준계', 3.5), Tool('해머', 1.25), Tool('스크류드라이버', 0.5), Tool('끌', 0.25)]
>> 정렬:  [Tool('끌', 0.25), Tool('수준계', 3.5), Tool('스크류드라이버', 0.5), Tool('해머', 1.25)]
```

이번에는 Weight로 정렬하는 람다 함수를 만들어서 sort의 key 파라미터로 전달해보겠습니다.
<div class="code-header">
	<span class="red btn"></span>
	<span class="yellow btn"></span>
	<span class="green btn"></span>
</div>

```python
tools.sort(key=lambda x: x.weight)
print('무게순 정렬:', tools)
>> 무게순 정렬: [Tool('끌', 0.25), Tool('스크류드라이버', 0.5), Tool('해머', 1.25), Tool('수준계', 3.5)]
```

그렇다면 weight로 먼저 정렬한 다음에 name으로 정렬하고 싶다면 어떻게 해야 할까요..!?  
-> 바로 키에 Tuple 타입을 사용하는 겁니다.  

튜플은 기본적으로 비교가 가능하며 자연스러운 순서가 정해져 있습니다. 이는 sort에 필요한 `__lt__`정의가 들어 있다는 말과 동일합니다.

먼저 weight로 정렬하고 그 후 name으로 정렬해보겠습니다.
<div class="code-header">
	<span class="red btn"></span>
	<span class="yellow btn"></span>
	<span class="green btn"></span>
</div>

```python
power_tools = [
    Tool('드릴', 4),
    Tool('원형 톱', 5),
    Tool('착암기', 40),
    Tool('연마기', 4),
]
power_tools.sort(key=lambda x: (x.weight, x.name))
print(power_tools)
>> [Tool('드릴', 4), Tool('연마기', 4), Tool('원형 톱', 5), Tool('착암기', 40)]
```
숫자 값의 경우 `- 연산자`를 사용해 정렬 방향을 변경할 수 있습니다.
<div class="code-header">
	<span class="red btn"></span>
	<span class="yellow btn"></span>
	<span class="green btn"></span>
</div>

```python
power_tools.sort(key=lambda x: (-x.weight, x.name)) # weight에 - 연산자 (역순 정렬)
print(power_tools)
>> [Tool('착암기', 40), Tool('원형 톱', 5), Tool('드릴', 4), Tool('연마기', 4)]
```

모든 타입에 부호 반전을 사용할 수는 없습니다. name을 반전시켜서 앞처럼 역순 정렬 해보려고 해도 실패하고 맙니다..!
<div class="code-header">
	<span class="red btn"></span>
	<span class="yellow btn"></span>
	<span class="green btn"></span>
</div>

```python
Traceback (most recent call last):
  File "C:\Users\user\PycharmProjects\issueKeyword\test.py", line 16, in <module>
    power_tools.sort(key=lambda x: (x.weight, -x.name),
  File "C:\Users\user\PycharmProjects\issueKeyword\test.py", line 16, in <lambda>
    power_tools.sort(key=lambda x: (x.weight, -x.name),
TypeError: bad operand type for unary -: 'str'
```

## 파이썬은 Stable 정렬을 제공한다..!
파이썬은 Stable 정렬 알고리즘을 제공합니다.  
아니 갑자기 왜 Stable 정렬이냐구요..?  
이유는 바로 뒤에 나옵니다! 
리스트 타입의 sort 메서드는 key 함수가 반환하는 값이 서로 같은 경우 리스트에 들어 있던 원래 순서를 그대로 유지해줍니다!  
이는 같은 리스트에 대해 서로 다른 기준으로 sort를 여러 번 호출해도 된다는 뜻입니다.
<div class="code-header">
	<span class="red btn"></span>
	<span class="yellow btn"></span>
	<span class="green btn"></span>
</div>

```python
# power_tools.sort(key=lambda x: (x.weight, -x.name))

power_tools.sort(key=lambda x: x.name, reverse=True)  # name 기준 내림차순
power_tools.sort(key=lambda x: x.weight)  # weight 기준 오름차순
print(power_tools)
>> [Tool('연마기', 4), Tool('드릴', 4), Tool('원형 톱', 5), Tool('착암기', 40)]
```
파이썬의 Stable한 정렬 덕분에 아까 에러가 발생했던 (weight, -name)에 대한 정렬 결과를 위 코드처럼 두 번 정렬함으로써 결과를 도출할 수 있습니다.

## cmp_to_key
파이썬에서 key 파라미터로 해결되지 않고, 두 변수를 변경시켜 정렬을 해야하는 경우가 있습니다. 그럴 때는 functools의 cmp_to_key를 사용하면 됩니다.  
<div class="code-header">
	<span class="red btn"></span>
	<span class="yellow btn"></span>
	<span class="green btn"></span>
</div>

```python
from functools import cmp_to_key

# 구식 비교 함수
def compare(a, b):
    return a - b  # a < b 이면 음수 반환, a == b 이면 0 반환, a > b 이면 양수 반환

# 키 함수로 변환
key_func = cmp_to_key(compare)

# 이제 sort나 sorted와 함께 사용할 수 있습니다
my_list = [5, 2, 9, 1, 7]
my_list.sort(key=key_func)
print(my_list)  # 출력: [1, 2, 5, 7, 9]
```

## cmp_to_key 예시
프로그래머스의 가장 큰 수라는 문제에서 cmp_to_key를 활용하여 문제를 풀 수 있습니다.

### 문제 설명  
0 또는 양의 정수가 주어졌을 때, 정수를 이어 붙여 만들 수 있는 가장 큰 수를 알아내 주세요.

예를 들어, 주어진 정수가 [6, 10, 2]라면 [6102, 6210, 1062, 1026, 2610, 2106]를 만들 수 있고, 이중 가장 큰 수는 6210입니다.

0 또는 양의 정수가 담긴 배열 numbers가 매개변수로 주어질 때, 순서를 재배치하여 만들 수 있는 가장 큰 수를 문자열로 바꾸어 return 하도록 solution 함수를 작성해주세요.

### 제한 사항
numbers의 길이는 1 이상 100,000 이하입니다.
numbers의 원소는 0 이상 1,000 이하입니다.
정답이 너무 클 수 있으니 문자열로 바꾸어 return 합니다.
### 입출력 예
|numbers|return|
|---|---|
|[6, 10, 2]|"6210"|
|[3, 30, 34, 5, 9]|"9534330"|

<div class="code-header">
	<span class="red btn"></span>
	<span class="yellow btn"></span>
	<span class="green btn"></span>
</div>

```python
from functools import cmp_to_key


def cmp(a, b):
    ab, ba = a + b, b + a
    if ab > ba:
        return 1
    elif ab < ba:
        return -1
    return 0


def solution(numbers):
    numbers = list(map(str, numbers))
    numbers.sort(key=cmp_to_key(cmp), reverse=True)
    return str(int(''.join(numbers)))

```
이 문제의 해결 방법은 numbers 리스트에 있는 값들을 적절히 조합하여 가장 큰 수를 만드는 문제입니다.  
이 때, cmp_to_key를 사용하여 함수를 정의해 a + b, b + a의 대소 비교를 통해 정렬을 구현한 적이 있습니다!!

## 요약
- list.sort()를 사용하면 제자리에서(in-place)로 정렬을 할 수 있습니다.
- sorted() 메서드를 사용하면 편리하지만 새로운 리스트를 반환하므로 비효율적입니다. 하지만 다른 iterable 객체를 모두 정렬시킬 수 있습니다.
- sort 메서드의 key 파라미터를 사용하면 리스트의 각 원소 대신 비교에 사용할 객체를 반환하는 도우미 함수를 제공할 수 있습니다.
- key 함수에서 튜플을 반환하면 여러 정렬 기준을 하나로 엮을 수 있습니다. `- 연산자`를 사용하면 숫자 타입인 경우 역순 정렬을 할 수 있습니다.
- 부호를 바꿀 수 없는 타입의 경우, 여러 정렬 기준을 조합하려면 각 정렬 기준마다 reverse 값으로 정렬 순서를 지정하면서 sort 메서드를 여러 번 사용해야 합니다. 이 때 <mark>정렬 기준의 우선순위가 점점 높아지는 순서로 sort를 호출해야 합니다.</mark></br>ex) 정렬 기준 (a, b, c) -> sort(key=c), sort(key=b), sort(key=a)