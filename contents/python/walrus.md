---
date: '2023-07-20'
title: '파이썬에서 대입식을 통해 코드 중복을 없애는 방법 feat. 왈러스(Walrus)'
categories: ['Python']
summary: '파이썬 3.8에서 나온 신기능이라구!'
thumbnail: '../images/thumbnail/chocoball.webp'
---

## 들어가기 전
책을 읽다가 새로운 기능인 왈러스를 알게되었는데, 이 기능을 다른 분들도 알게 된다면 좋을 것 같아서 정리해봅니다!  
아!! 이 기능은 <mark>파이썬 3.8이상</mark>부터 사용가능합니다! 
 
이번 글은 [파이썬 코딩의 기술](https://product.kyobobook.co.kr/detail/S000001834494)을 보고 참조하였습니다.  
만약 문제 발생시 글을 삭제처리 하도록 하겠습니다!

## 중복이 되는 문제 상황
주스 바에서 사용할 신선한 과일 바구니를 관리한다고 해봅시다!
고객이 레모네이드를 주문했다면 과즙을 낼 레몬이 바구니에 최소 하나는 있어야 합니다. 다음 코드는 레몬의 개수를 읽어와서 그 값이 0이 아닌지 확인하는 코드입니다.

<div class="code-header">
	<span class="red btn"></span>
	<span class="yellow btn"></span>
	<span class="green btn"></span>
</div>

```python
fresh_fruit = {
    '사과': 10,
    '바나나': 8,
    '레몬': 5,
}

def make_lemonade(count):
    ....

def out_of_stock():
    ...

count = fresh_fruit.get('레몬', 0)
if count:
    make_lemonade(count)
else:
    out_of_stock()
```
이 코드는 문제점이 있습니다. count 변수는 if 문의 첫 번째 블록 안에서만 쓰인다는 것입니다.  
파이썬에서는 이런 식으로 값을 가져와서 그 값이 0이 아닌지 검사한 후 사용하는 패턴이 자주 발생합니다.  

## 왈러스(대입식)을 활용한 해결 방법
왈러스(대입식)이 추가되면서 이런 유형의 코드를 제대로 처리할 수 있게 되었습니다.
<div class="code-header">
	<span class="red btn"></span>
	<span class="yellow btn"></span>
	<span class="green btn"></span>
</div>

```python
if count := fresh_fruit.get('레몬', 0):
	make_lemonade(count)
```
한 줄 더 짧기도 하지만, count가 if 문의 첫 번째 블록에서만 의미가 있다는 점이 명확히 보이기 때문에 이 코드가 더 읽기 쉽습니다.

## if, elif, else 깊게 내포 시키는 문제!
파이썬에는 유연한 switch/case 문이 없다는 점도 파이썬을 처음 접한 프로그래머들을 자주 당황하게 만드는 원인 중 하나입니다.
파이썬에서 이런 유형의 기능을 흉내 내는 일반적인 스타일은 if, elif, else 문을 깊게 내포시키는 방법이 있습니다.

예를 들어, 현재 주스 바에서 만들 수 있는 주스 중 가장 좋은 주스를 고객에게 제공한다고 합시다.  
1. 바나나
2. 애플 주스
3. 레모네이드
위의 순서대로 제공하는 로직입니다.
<div class="code-header">
	<span class="red btn"></span>
	<span class="yellow btn"></span>
	<span class="green btn"></span>
</div>

```python
if count >= 2:
    pieces = slice_bananas(count)
    to_enjoy = make_smoothies(pieces)
else:
    count = fresh_fruit.get('사과', 0)
    if count >= 4:
        to_enjoy = make_cider(count)
    else:
        count = fresh_fruit.get('레몬', 0)
        if count:
            to_enjoy = make_lemonade(count)
        else:
            to_enjoy = '아무것도 없음'
```

## 왈러스 연산자를 사용하여 해결!
앞에서 봤던 if-else 중첩은 코드를 보는 사람을 어렵게 합니다..!  
그래서 이 코드도 왈러스(대입식) 연산자를 사용하여 해결해보겠습니다.
<div class="code-header">
	<span class="red btn"></span>
	<span class="yellow btn"></span>
	<span class="green btn"></span>
</div>

```python
if (count := fresh_fruit.get('바나나', 0)) >= 2:
    pieces = slice_bananas(count)
    to_enjoy = make_smoothies(pieces)
elif (count := fresh_fruit.get('사과', 0)) >= 4:
    to_enjoy = make_cider(count)
elif count := fresh_fruit.get('레몬', 0):
    to_enjoy = make_lemonade(count)
else:
    to_enjoy = '아무것도 없음'
```
왈러스 연산자를 사용하면 switch/case문 같은 다중 선택 전용 구문과 거의 비슷한 느낌이 드는 우아한 해법을 만들 수 있습니다.

## 왈러스 연산자로 Do-While 만들기
파이썬에는 Do-While 루프가 없습니다!  

먼저 예를 들겠습니다. 신선한 과일이 배달돼서 이 과일을 모두 주스로 만든 후 병에 담기로 했다고 합시다.
다음은 while 루프로 이 로직을 구현한 코드입니다.
<div class="code-header">
	<span class="red btn"></span>
	<span class="yellow btn"></span>
	<span class="green btn"></span>
</div>

```python
bottles = []
fresh_fruit = pick_fruit() # 1
while fresh_fruit:
    for fruit, count in fresh_fruit.items():
        batch = make_juice(fruit, count)
        bottles.extend(batch)
    fresh_fruit = pick_fruit() # 2

print(bottles)
```
이 코드는 fresh_fruit = pick_fruit() 호출을 두 번하므로 반복적입니다.

**호출의 이유**
1. 루프 직전에 초기화
2. 루프의 끝에서 배달받은 신선한 과일을 다시 선택

왈러스 연산자를 사용하면 while 루프에서 매번 fresh_fruit 변수에 대입하고 조건을 검사할 수 있습니다.
<div class="code-header">
	<span class="red btn"></span>
	<span class="yellow btn"></span>
	<span class="green btn"></span>
</div>

```python
bottles = []
while fresh_fruit := pick_fruit():
    for fruit, count in fresh_fruit.items():
        batch = make_juice(fruit, count)
        bottles.extend(batch)

print(bottles)
```

## 요약
- 대입식에서는 왈러스 연산자(:=)를 사용해 하나의 식 안에서 변수 이름에 값을 대입하면서 이 값을 평가할 수 있고, 중복을 줄일 수 있습니다.
- 파이썬에서는 Switch/case 문이나 Do/While 루프를 쓸 수 없지만, 대입식을 사용하면 이런 기능을 더 깔끔하게 흉내 낼 수 있습니다.
- 대입식, 즉 왈러스 연산자(:=) 파이썬 3.8이상부터 사용할 수 있다는 걸 꼭 기억하세요!!