---
date: '2023-07-10'
title: '반복문 파이썬스럽게 쓰는 방법'
categories: ['Python']
summary: '파이썬 반복문, 너는 다 알고 있니 ? 아니.. 그러면 드루와'
thumbnail: '../images/thumbnail/chocoball.webp'
---

## 들어가기 전
다른 언어들도 각각의 특성에 맞게 반복문이 특징이 있을 때가 있는데요.  
파이썬은 매우 특이한 케이스라고 저는 생각합니다..!  
그래서 이번에는 특이하다고 생각되는 반복문을 조금 더 파이썬스럽게 쓸 수 있는 방법들을 알아보고자 합니다
 
이번 글은 [파이썬 코딩의 기술](https://product.kyobobook.co.kr/detail/S000001834494)을 보고 참조하였습니다.  
만약 문제 발생시 글을 삭제처리 하도록 하겠습니다!

## range보단 enumerate!
range 내장 함수는 어떤 정수 집합을 반복하는 루프가 필요할 때 유용합니다!
<div class="code-header">
	<span class="red btn"></span>
	<span class="yellow btn"></span>
	<span class="green btn"></span>
</div>

```python
for i in range(10):
    print(i, end=' ')
# 0 1 2 3 4 5 6 7 8 9 
```

리스트를 반복하면서 리스트의 몇 번째 원소를 처리 중인지를 알아야 할 때가 있습니다.  
예를 들어, 아이스크림 맛의 선호도 순위를 출력하고 싶다고 합시다!

<div class="code-header">
	<span class="red btn"></span>
	<span class="yellow btn"></span>
	<span class="green btn"></span>
</div>

```python
flavor_list = ['바닐라', '초콜릿', '피칸', '딸기']

for i in range(len(flavor_list)):
    flavor = flavor_list[i]
    print(f'{i + 1}: {flavor}')
```
이 코드는 조금 투박해 보입니다..!  
일단 list의 길이를 알아야 하고, 인덱스를 사용해 배열 원소에 접근해야 합니다.  
이렇게 단계가 여러 개이므로 코드의 가독성이 떨어집니다.


파이썬은 이런 문제를 해결할 수 있는 <mark>enumerate</mark> 내장함수를 제공합니다.  
enumerate는 이터레이터를 **지연 계산 제너레이터(lazy generator)** 로 감쌉니다.
enumerate는 인덱스와 다음 값으로 이뤄진 쌍을 넘겨줍니다. <= yield 시키는 것과 동일!
<div class="code-header">
	<span class="red btn"></span>
	<span class="yellow btn"></span>
	<span class="green btn"></span>
</div>

```python
it = enumerate(flavor_list)
print(next(it))
print(next(it))

# (0, '바닐라')
# (1, '초콜릿')
```

enumerate가 넘겨주는 각 쌍을 for문에서 간결하게 언패킹할 수 있습니다.

<div class="code-header">
	<span class="red btn"></span>
	<span class="yellow btn"></span>
	<span class="green btn"></span>
</div>

```python
for i, flavor in enumerate(flavor_list):
    print(f'{i + 1}: {flavor}')

>>
1: 바닐라
2: 초콜릿
3: 피칸
4: 딸기
```

enumerate는 두 번째 파라미터로 어디부터 수를 세기 시작할지 지정할 수 있습니다.

<div class="code-header">
	<span class="red btn"></span>
	<span class="yellow btn"></span>
	<span class="green btn"></span>
</div>

```python
for i, flavor in enumerate(flavor_list, 1):
    print(f'{i}: {flavor}')

>>
1: 바닐라
2: 초콜릿
3: 피칸
4: 딸기
```
<mark>이 부분에서 주의할점은 1부터 센다고 해서 인덱스 0을 빼고 반복하는 것이 아니라 인덱스에만 +1되는 것을 주의하세요!</mark>

~~저는 착각하고 사용해서 당함...~~

## 여러 이터레이터를 한 번에 zip으로!
<div class="code-header">
	<span class="red btn"></span>
	<span class="yellow btn"></span>
	<span class="green btn"></span>
</div>

```python
names = ['Cecilia', '남궁민수', '毛泽东']
counts = [len(n) for n in names]
print(names)
print(counts)

>>
['Cecilia', '남궁민수', '毛泽东']
[7, 4, 3]
```

위와 같이 주어졌을 때, 가장 긴 이름과 가장 긴 이름의 길이를 구하고 싶다고 해봅시다.

우리는 바로 위에서 enumerate를 배웠으니 enumerate를 써봅시다!

<div class="code-header">
	<span class="red btn"></span>
	<span class="yellow btn"></span>
	<span class="green btn"></span>
</div>

```python
longest_name = None
max_count = 0

for i, name in enumerate(names):
    count = counts[i]
    if count > max_count:
        longest_name = name
        max_count = count

print(longest_name)
print(max_count)

>>
Cecilia
7
```
enumerate를 사용하니깐 깔끔해보이긴 하지만 아직 counts의 인덱싱이 마음에 들지 않습니다.  
이 때 코드를 더 깔끔하게 만들 수 있는 것이 **zip**이라는 내장 함수입니다.

<mark>zip은 둘 이상의 이터레이터를 지연 계산 제너레이터를 사용해 묶어줍니다!</mark>  
zip 제너레이터는 각 이터레이터의 다음 값이 들어 있는 튜플을 반환하고, for문에서는 이를 바로 언패킹 할 수 있습니다.

<div class="code-header">
	<span class="red btn"></span>
	<span class="yellow btn"></span>
	<span class="green btn"></span>
</div>

```python
for name, count in zip(names, counts):
    if count > max_count:
        longest_name = name
        max_count = count
```
이제는 인덱싱 없이 코드가 아주 깔끔해졌습니다.

zip에서는 주의할 점이 있는데요.  
바로 서로 다른 길이의 이터레이터가 입력으로 주어졌을 때입니다.
names에 하나의 길이를 추가한다고 했을 때, names의 길이는 4가 되고 counts의 길이는 3이 됩니다.

<div class="code-header">
	<span class="red btn"></span>
	<span class="yellow btn"></span>
	<span class="green btn"></span>
</div>

```python
names.append('Rosalind')
for name, count in zip(names, counts):
    print(f'{name}: {count}')
>> 
Cecilia: 7
남궁민수: 4
毛泽东: 3
```
결과를 보시면 3개까지만 출력하는 것을 볼 수 있습니다.
zip은 자신이 감싼 이터레이터 중 어느 하나가 끝날 때까지 튜플을 내놓습니다. 따라서 출력은 가장 짧은 입력의 길이와 같습니다.

만약 긴 이터레이터의 뒷부분을 찍고 싶다면 itertools 내장 모듈에 있는 zip_longest를 사용하면 됩니다.

<div class="code-header">
	<span class="red btn"></span>
	<span class="yellow btn"></span>
	<span class="green btn"></span>
</div>

```python
import itertools
for name, count in itertools.zip_longest(names, counts):
    print(f'{name}: {count}')
>>
Cecilia: 7
남궁민수: 4
毛泽东: 3
Rosalind: None
```

## for나 while 뒤에 else 블록 사용하지 않기!
파이썬에서는 반복문이 반복 수행하는 내부 블록 바로 다음에 else 블록을 추가할 수 있습니다.


<div class="code-header">
	<span class="red btn"></span>
	<span class="yellow btn"></span>
	<span class="green btn"></span>
</div>

```python
for i in range(3):
    print('Loop', i)
else:
    print('Else block!')


for i in range(3):
    print('Loop', i)
    if i == 1:
        break
else:
    print('Else block!')
>>
Loop 0
Loop 1
Loop 2
Else block!
Loop 0
Loop 1
```
for/else의 else 부분은 루프가 정상적으로 완료되어야 동작 하는 것을 알 수 있습니다.


빈 이터레이터나 반복문 조건이 처음부터 False였을 경우에도 else 블록이 바로 실행됩니다.
<div class="code-header">
	<span class="red btn"></span>
	<span class="yellow btn"></span>
	<span class="green btn"></span>
</div>

```python
for x in []:
    print('이 줄은 실행되지 않음')
else:
    print('For Else block!')

while False:
    print('이 줄은 실행되지 않음')
else:
    print('While Else block!')
>>
For Else block!
While Else block!
```
이런 방식으로 동작하는 이유는 break를 했을 때는 동작하지 않고, 모든 반복이 끝날 때만 동작하는 경우가 유용하기 때문입니다!
이렇게 작성하면 가독성이 떨어지고 직관적이지 않습니다.

이를 위해 해결할 방법 중 첫 번째는 원하는 조건을 찾자마자 빠르게 함수를 반환하는 방식입니다. 
<div class="code-header">
	<span class="red btn"></span>
	<span class="yellow btn"></span>
	<span class="green btn"></span>
</div>

```python
def check():
    for i in range(3):
        print('Loop', i)
        if i == 1:
            return False
    return True


if check():
    print('if block!')
```

두 번째 방법은 루프 안에서 원하는 대상을 찾았는지 나타내는 결과 변수를 도입하는 것입니다.
<div class="code-header">
	<span class="red btn"></span>
	<span class="yellow btn"></span>
	<span class="green btn"></span>
</div>

```python
def check2():
    is_not_break = True
    for i in range(3):
        print('Loop', i)
        if i == 1:
            is_not_break = False
            break
    return is_not_break


if check2():
    print('if block!')
```

파이썬에서 루프와 같은 간단한 구성 요소는 그 자체로 의미가 명확해야 합니다.
따라서 절대로 루프 뒤에 else 블록을 사용하지 말라고 하네요..!

## 요약
- enumerate를 사용하면 이터레이터에 대해 루프를 돌면서 이터레이터에서 가져오는 원소의 인덱스까지 얻는 코드를 간결하게 작성할 수 있습니다!
- zip 내장 함수를 사용해 여러 이터레이터를 같이 이터레이션할 수 있습니다.
- 입력 이터레이터의 길이가 서로 다르면 zip은 가장 짧은 이터레이터 길이까지만 튜플을 내놓고 더 긴 이터레이터의 나머지 원소는 무시합니다.
- 서로 다른 이터레이터에 대해 더 긴 이터레이터까지 루프를 수행하려면 itertools 내장 모듈의 zip_longest 함수를 사용하면 됩니다!
- for/while 뒤에 오는 else 블록은 루프가 반복되는 도중에 break를 만나지 않은 경우에만 실행됩니다.
- for/while - else는 동작이 직관적이지 않고 혼동을 야기할 수 있으므로 else 블록을 사용하지 않는 게 좋습니다.