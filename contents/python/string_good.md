---
date: '2023-07-10'
title: '파이썬에서 문자열 출력 잘하는 법'
categories: ['Python']
summary: '아니 이거 너무 좋은걸..?'
thumbnail: '../images/thumbnail/chocoball.webp'
---

## 들어가기 전
파이썬을 사용하면서 문자열 가공을 가장 많이 처리할 겁니다. 어떤 언어보다도 문자열 처리하기가 제일 좋은 이유가 있기 때문이죠!  
 그래서 이번에 파이썬에서 다양한 문자열 출력 방법이 있는데 그중 어떤 것이 왜 가장 좋은지 한 번 알아봅시다.   
결론이 급하신 분들은 맨 마지막 인터폴레이션만 보시면 될 것 같습니다! 
 
이번 글은 [파이썬 코딩의 기술](https://product.kyobobook.co.kr/detail/S000001834494)을 보고 참조하였습니다.  
만약 문제 발생시 글을 삭제처리 하도록 하겠습니다!

## 🥉 C 스타일 형식 문자열 출력 방법
C 스타일 형식 문자열은 파이썬에서 문자열을 형식화하는 방법 중 하나입니다.

<div class="code-header">
	<span class="red btn"></span>
	<span class="yellow btn"></span>
	<span class="green btn"></span>
</div>

```python
a = 0b10111011
b = 0xc5f
print('이진수: %d, 십육진수: %d' % (a, b))

# 이진수: 187, 십육진수: 3167
```

형식 문자열은 연산자 왼쪽에 있는 값을 끼워 넣을 자리를 표현하기 위해 %d 같은 형식 지정자를 사용합니다.  
파이썬의 형식 지정자 문법은 printf 함수에서 비롯됐습니다.

하지만 이런 C 스타일 형식 문자열은 `문제점`이 있습니다.

**문제점 1. 형식화 식에서 오른쪽에 있는 tuple 내 데이터 값의 순서를 바꾸거나 값의 타입을 바꾸면 타입 변환이 불가능하므로 오류가 발생할 수 있습니다.**
<div class="code-header">
	<span class="red btn"></span>
	<span class="yellow btn"></span>
	<span class="green btn"></span>
</div>

```python
key = 'my_var'
value = 1.234
formatted = '%-10s = %.2f' % (key, value)
print(formatted)

# my_var = 1.23
```
<div class="code-header">
	<span class="red btn"></span>
	<span class="yellow btn"></span>
	<span class="green btn"></span>
</div>

```python
# key와 value 순서 변경
reordered_tuple = '%-10s = %.2f' % (value, key)
# 에러 발생
```
형식 문자열도 같이 변경을 하지 않았기 때문에 에러가 발생했습니다. 이와 같이 % 연산자의 좌우가 잘 맞아야 하는 단점이 있습니다.

**문제점 2. 형식화를 하기 전에 값을 살짝 변경해야 한다면 식을 읽기가 매우 어렵습니다.**
<div class="code-header">
	<span class="red btn"></span>
	<span class="yellow btn"></span>
	<span class="green btn"></span>
</div>

```python
pantry = [
	('아보카도', 1.25),
	('바나나', 2.5),
	('체리', 15),
]

for i, (item, count) in enumerate(pantry):
	print('#%d: %-10s = %.2f' % (i, item, count))

# #0: 아보카도      = 1.25
# #1: 바나나     = 2.50
# #2: 체리     = 15.00
```

<div class="code-header">
	<span class="red btn"></span>
	<span class="yellow btn"></span>
	<span class="green btn"></span>
</div>

```python
for i, (item, count) in enumerate(pantry):
    print('#%d: %-10s = %d' % (
        i + 1,
        item.title(),
        round(count)))
```
이렇게 할 경우 형식화 식에 있는 tuple의 길이가 너무 길어져서 여러 줄에 나눠 써야 하는데, 가독성이 나빠집니다.

**문제점 3. 형식화 문자열에서 같은 값을 여러 번 사용하고 싶다면 튜플에서 같은 값을 여러 번 반복해야 합니다.**
<div class="code-header">
	<span class="red btn"></span>
	<span class="yellow btn"></span>
	<span class="green btn"></span>
</div>

```python
template = '%s는 음식을 좋아해. %s가 요리하는 모습을 봐요.'
name = '철수'
formatted = template % (name, name) # <- 반복되는 부분
print(formatted)

# 철수는 음식을 좋아해. 철수가 요리하는 모습을 봐요.
```
이런 식으로 같은 값을 반복해야 하면, 형식화할 값을 살짝 변경해야 하는 경우 실수하기도 쉽고 코딩하기에도 성가십니다.

**문제점 4. 형식화 식에 딕셔너리를 사용하면 문장이 번잡스러워집니다.**

각 키를 최소 두 번 반복하게 되고, 키에 해당하는 값이 변수에 들어 있다면 변수 이름까지 세 번 이상 같은 이름을 반복해서 사용할 수 있습니다.
<div class="code-header">
	<span class="red btn"></span>
	<span class="yellow btn"></span>
	<span class="green btn"></span>
</div>

```python
soup = 'lentil'
formatted = 'Today\'s soup is %(soup)s.' % {'soup': soup} # soup가 4번 반복됨
print(formatted)
```
이러한 문제점들이 있기 때문에 C 형식화 문자열 출력 방법을 추천하지 않습니다..!

## 🥈 내장 함수 format과 str.format 문자열 출력 방법

파이썬 3부터는 더 표현력이 좋은 고급 문자열 형식화 기능이 도입됐습니다.
<div class="code-header">
	<span class="red btn"></span>
	<span class="yellow btn"></span>
	<span class="green btn"></span>
</div>

```python
a = 1234.5678
formatted = format(a, ',.2f')
print(formatted)

b = 'my 문자열'
formatted = format(b, '^20s')
print('*', formatted, '*')

# 1,234.57
# *        my 문자열        *
```
format을 이용한 방법도 형식 지정자를 붙일 수 있습니다.
<div class="code-header">
	<span class="red btn"></span>
	<span class="yellow btn"></span>
	<span class="green btn"></span>
</div>

```python
formatted = '{:<10} = {:.2f}'.format(key, value)
print(formatted)

print('%.2f%%' % 12.5) # C 형식에서 %를 표현할 경우
print('{} replaces {{}}'.format(1.23)) # 중괄호를 표현할 경우

# my_var     = 1.23
# 12.50%
# 1.23 replaces {}
```
형식화한 값의 출력 순서를 변경할 수도 있습니다.
<div class="code-header">
	<span class="red btn"></span>
	<span class="yellow btn"></span>
	<span class="green btn"></span>
</div>

```python
formatted = '{1} = {0}'.format(key, value)
print(formatted)
```

**문제점 1. 형식화를 하기 전에 값을 변경해야 경우에는 코드 읽기가 어려워집니다.**
<div class="code-header">
	<span class="red btn"></span>
	<span class="yellow btn"></span>
	<span class="green btn"></span>
</div>

```python
for i, (item, count) in enumerate(pantry): 
    new_style = '#{}: {:<10s} = {}'.format(
        i + 1,
        item.title(),
        round(count)) # 분리됨
        
    print(new_style)
# #1: 아보카도       = 1
# #2: 바나나        = 2
# #3: 체리         = 15
```

**문제점 2. 딕셔너리의 Key가 반복되는 경우의 중복을 줄여주지는 못합니다.**

<div class="code-header">
	<span class="red btn"></span>
	<span class="yellow btn"></span>
	<span class="green btn"></span>
</div>

```python
# C 스타일
old_template = (
    'Today\'s soup is %(soup)s, '
    'buy one get two %(oyster)s oysters, '
    'and our special entrée is %(special)s.')
old_formatted = template % {
    'soup': 'lentil',
    'oyster': 'tongyoung',
    'special': 'schnitzel',
}

# Format 함수 
new_template = (
    'Today\'s soup is {soup}, '
    'buy one get two {oyster} oysters, '
    'and our special entrée is {special}.')
new_formatted = new_template.format(
    soup='lentil',
    oyster='tongyoung',
    special='schnitzel',
)
```
아직도 문제점이 해결되지 않았으므로 새로운 방법이 필요해 보입니다!

## 🥇 인터폴레이션을 통한 형식 문자열
앞의 문제들을 한 번에 완전히 해결하기 위해 파이썬 3.6부터는 인터폴레이션(interpolation)을 형식 문자열(짧게 f-문자열이라고 부릅니다.)이 도입됐습니다.  

이 새로운 언어 문법에서는 형식 문자열 앞에 f 문자를 붙여야 합니다.  
f-문자열은 형식 문자열의 표현력을 극대화하고, 앞에서 설명한 문제점인 형식화 문자열에서 키와 값을 불필요하게 중복 지정해야 하는 경우를 없애줍니다.

<div class="code-header">
	<span class="red btn"></span>
	<span class="yellow btn"></span>
	<span class="green btn"></span>
</div>

```python
key = 'my_var'
value = 1.234

formatted = f'{key!r:<10} = {value:.2f}'
print(formatted)
# 'my_var'   = 1.23
```
> {}안에 !r은 무엇일까요?  
> !r은 raw String을 의미합니다! {} 안에 있는 표현식을 raw String으로 출력해줍니다

값을 약간 변경하고 싶을 때도 간결한 구문으로 표기할 수 있으므로, 앞에서 설명한 문제점(`형식화를 하기 전에 값을 살짝 변경해야 한다면 식을 읽기가 매우 어렵습니다`)을 해결할 수 있습니다.
<div class="code-header">
	<span class="red btn"></span>
	<span class="yellow btn"></span>
	<span class="green btn"></span>
</div>

```python
for i, (item, count) in enumerate(pantry):
	# C 형식
	old_style = '#%d: %-10s = %d' % (
			i + 1,
			item.title(),
			round(count))
	
	# format
	new_style = '#{}: {:<10s} = {}'.format(
			i + 1,
			item.title(),
			round(count))
	
	# interpolation
	f_string = f'#{i+1}: {item.title():<10s} = {round(count)}'
			
	assert old_style == new_style == f_string
```
파이썬 식을 형식 지정자 옵션에 넣을 수도 있습니다.

<div class="code-header">
	<span class="red btn"></span>
	<span class="yellow btn"></span>
	<span class="green btn"></span>
</div>

```python
places = 3
number = 1.23456
print(f'내가 고른 숫자는 {number:.{places}f}')
```
값을 문자열로 형식화해야 하는 상황을 만나게 되면 다른 대안 대신 f-문자열을 택하면 될 것 같습니다!

## 요약
- % 연산자를 사용하는 C 스타일 형식화 문자열은 여러 가지 단점과 번잡성이라는 문제가 있습니다.
- str.format 메서드도 C 스타일 형식 문자열의 문제점을 그대로 가지고 있으므로, 가능하면 str.format 사용을 피하는 것이 좋습니다.
- f-문자열은 값을 문자열 안에 넣는 새로운 구문으로, C 스타일 형식화 문자열의 가장 큰 문제점을 해결해줍니다.
- f-문자열은 간결하지만, 위치 지정자 안에 임의의 파이썬 식을 직접 포함시킬 수 있으므로 매우 강력합니다.