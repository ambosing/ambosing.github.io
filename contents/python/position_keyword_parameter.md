---
date: '2023-09-12'
title: '[Python] 파이썬 위치인자, 키워드인자'
categories: ['Python']
summary: '파이썬에서 파라미터 위치, 키워드로 고정시켜보기!'
thumbnail: '../images/thumbnail/chocoball.webp'
---

## 들어가기 전
파이썬에는 함수의 파라미터를 키워드로 받을 수 있는 키워드인자, 위치로 받을 수 있는 위치 인자가 있습니다.  
이 두 개의 기능을 잘못 쓰게 되면 함수를 사용할 때 정말 헷갈리게 되는데요.   
이 부분을 책이 잘 설명해놓고 있어서 제가 약간 각색하여 정리해보려고 합니다!

이번 글은 [파이썬 코딩의 기술](https://product.kyobobook.co.kr/detail/S000001834494)을 보고 참조하였습니다.  
만약 문제 발생시 글을 삭제처리 하도록 하겠습니다!

## 예시 코드 소개
여기에 있는 글을 이해하시기 쉽게 먼저 예제코드를 소개하려고 합니다.

예제코드는 한 숫자를 다른 숫자로 나누는 코드입니다.  
그래서 어떤 경우에는 ZeroDivisionError 예외를 무시하고 무한대를 반환하고 싶고, 어떨 때는 Overflow 예외를 무시하고 대신 0을 반환하고 싶다고 합시다!

<div class="code-header">
	<span class="red btn"></span>
	<span class="yellow btn"></span>
	<span class="green btn"></span>
</div>

```python
def safe_division(number, divisor,
                  ignore_overflow,
                  ignore_zero_division):
    try:
        return number / divisor
    except OverflowError:
        if ignore_overflow:
            return 0
        else:
            raise
    except ZeroDivisionError:
        if ignore_zero_division:
            return float('inf')
        else:
            raise
```

`ignore_overflow=true한 경우`
<div class="code-header">
	<span class="red btn"></span>
	<span class="yellow btn"></span>
	<span class="green btn"></span>
</div>

```python
result = safe_division(1.0, 10**500, True, False)
print(result) # 0
```
`ignore_zero_division=true한 경우`
<div class="code-header">
	<span class="red btn"></span>
	<span class="yellow btn"></span>
	<span class="green btn"></span>
</div>

```python
result = safe_division(1.0, 0, False, True)
print(result) # inf
```

## 키워드 인자 사용할 때 주의점 
저희가 평소 사용하는 인자는 위치인자인데요.  
위치로 인자를 결정하다보면 함수를 사용할 때 어떤 값으로 들어가는지 함수의 정의를 봐야 알 수 있는 경우가 많습니다.  
이를 보완하기 위해 나온 것이 키워드 인자인데요.  
키워드 인자는 명시적으로 인자의 이름을 정해준다는 장점이 있으나, 함수를 사용하는 부분에서 키워드를 작성하다 보니 코드가 길어지는 단점이 존재합니다.  
또한, 키워드 인자를 쓰면 주의할 사항이 있는데요. 바로 위치인자 뒤에 키워드 인자가 와야 한다는 것입니다. 바로 코드로 보시죠!!
<div class="code-header">
	<span class="red btn"></span>
	<span class="yellow btn"></span>
	<span class="green btn"></span>
</div>

```python
result = safe_division(1.0, 10**500, ignore_overflow=True) # 1. 에러
result = safe_division(1.0, 10**500, ignore_overflow=True, False) # 2. 에러
result = safe_division(1.0, 10**500, True, ignore_zero_division=False) # 3. 정상
result = safe_division(1.0, 10**500, ignore_overflow=True, ignore_zero_division=False) # 4. 정상
```

함수는 기존 예시코드 함수를 사용했습니다!  
첫 번째 코드의 경우, 키워드 인자를 사용했지만 함수 정의에서 ignore_zero_division가 있는데 인자에서는 값을 정해주지 않아 오류가 발생했습니다. 이 경우 함수의 기본값을 정해주면 에러가 발생하지 않습니다.  
<div class="code-header">
	<span class="red btn"></span>
	<span class="yellow btn"></span>
	<span class="green btn"></span>
</div>

```python
# ignore_zero_division에 기본값 False 적용
def safe_division(number, divisor,
                  ignore_overflow,
                  ignore_zero_division=False):
```
두 번째 코드의 경우에는 <mark>위치 인자가 키워드 인자 뒤에 와서 오류가 발생</mark>합니다. 
나머지 경우는 정상적으로 잘 동작합니다.


## 키워드 인자 잘 사용하기!
키워드 인자는 선택적인 사항이므로 호출하는 쪽에서 명확성을 위해 키워드 인자를 꼭 쓸 수 없는 것이 문제입니다!  
복잡한 함수의 경우 호출자가 키워드만 사용하는 인자를 통해 의도를 명확히 밝히도록 요구하는 편이 좋습니다.  
키워드만 사용하는 인자는 키워드를 반드시 사용해 지정하게 하여, 위치 기반으로 지정할 수 없게 만드는 게 좋습니다.

다음은 safe_division 함수가 키워드만 사용하는 인자만 받도록 만든 코드입니다.  
인자 목록에 있는 `*`기호는 위치 인자의 마지막과 키워드만 사용하는 인자의 시작을 구분해줍니다.
<div class="code-header">
	<span class="red btn"></span>
	<span class="yellow btn"></span>
	<span class="green btn"></span>
</div>

```python
# divisor 전까지 위치 인자 / ignore부터 키워드 인자
# 기본값을 통해 인자를 꼭 받지 않아도 수정
def safe_division(number, divisor, *,
                  ignore_overflow=False,
                  ignore_zero_division=False):
```
그리고 파라미터 중 마지막 두 개의 파라미터는 ignore 옵션을 기본값으로 False 정해주었습니다!

---

이제 이 함수를 호출하면 함수의 뒤에 두 개의 인자는 키워드 인자를 사용해야 합니다.  
위치 인자를 사용하게 되면 아래처럼 에러가 발생합니다.
<div class="code-header">
	<span class="red btn"></span>
	<span class="yellow btn"></span>
	<span class="green btn"></span>
</div>

```python
safe_division(1.0, 10**500, True, False)

# 출력결과 
# safe_division(1.0, 10**500, True, False)
# TypeError: safe_division() takes 2 positional arguments but 4 were given
```
<div class="code-header">
	<span class="red btn"></span>
	<span class="yellow btn"></span>
	<span class="green btn"></span>
</div>

```python
result = safe_division(1.0, 0, ignore_zero_division=True) # 정상 동작
```

## 위치 인자로 고정하기!
이번에 수정한 safe_division 함수에도 문제가 있습니다.  
호출하는 쪽에서 이 함수의 앞에 있는 두 필수 파라미터`(number, divisor)`를 호출하면서 위치와 키워드를 혼용할 수 있습니다.
<div class="code-header">
	<span class="red btn"></span>
	<span class="yellow btn"></span>
	<span class="green btn"></span>
</div>

```python
assert safe_division(number=2, divisor=5) == 0.4
assert safe_division(divisor=5, number=2) == 0.4
assert safe_division(2, divisor=5) == 0.4
```

나중에 요구 사항이 바뀌거나 원하는 스타일이 바뀌어서 맨 앞의 두 인자 이름을 변경할 수도 있습니다.
<div class="code-header">
	<span class="red btn"></span>
	<span class="yellow btn"></span>
	<span class="green btn"></span>
</div>

```python
# number -> numerator, divisor -> denominator 변경
def safe_division(numerator, denominator, *,    # 변경
                    ignore_overflow=False,
                    ignore_zero_division=False):
```

이렇게 단순한 파라미터 이름 변경만으로도 number와 divisor 인자를 키워드로 호출하는 기존 호출 코드가 에러가 발생합니다!
<div class="code-header">
	<span class="red btn"></span>
	<span class="yellow btn"></span>
	<span class="green btn"></span>
</div>

```python
safe_division(number=2, divisor=5) # 에러 발생

## 출력 결과
    safe_division(number=2, divisor=5)
TypeError: safe_division() got an unexpected keyword argument 'number'
```

**파이썬 3.8에는 위치로만 지정하는 인자가 존재합니다.**  
위치로만 지정하는 인자는 반드시 위치만 사용해 인자를 지정해야 하고 키워드 인자로는 쓸 수 없습니다.

다음은 safe_division 함수를 처음 두 인자를 위치로만 지정하는 인자로 지정합니다.  
인자 목록의 `/` 기호는 위치로만 지정하는 인자의 끝을 표시합니다.
<div class="code-header">
	<span class="red btn"></span>
	<span class="yellow btn"></span>
	<span class="green btn"></span>
</div>

```python
def safe_division(numerator, denominator, /, *, # 변경
                    ignore_overflow=False,
                    ignore_zero_division=False):
```

위치로만 지정하는 인자를 키워드를 사용해 지정하면 에러가 발생합니다.
<div class="code-header">
	<span class="red btn"></span>
	<span class="yellow btn"></span>
	<span class="green btn"></span>
</div>

```python
safe_division(2, 5) # 1. 정상 동작
safe_division(numerator=2, denominator=5) # 2. 에러 발생

## 출력 결과
safe_division(numerator=2, denominator=5) # 2. 에러 발생
TypeError: safe_division() got some positional-only arguments passed as keyword arguments: 'numerator, denominator'
```

만드는 API의 스타일이나 필요에 따라 두 인자 전달 방식을 모두 사용하면 가독성을 높이고 잡음도 줄일 수 있습니다.  
예를 들어, 다음 코드에서는 결과를 표시할 때 얼마나 많은 자릿수를 사용할지 결정하고자 반올림할 위치를 지정하는 인자를 safe_division에 추가할 수 있습니다.
<div class="code-header">
	<span class="red btn"></span>
	<span class="yellow btn"></span>
	<span class="green btn"></span>
</div>

```python
def safe_division_e(numerator, denominator, /,
                    ndigits=10, *,                 # 변경
                    ignore_overflow=False,
                    ignore_zero_division=False):
    try:
        fraction = numerator / denominator         # 변경
        return round(fraction, ndigits)            # 변경
    except OverflowError:
        if ignore_overflow:
            return 0
        else:
            raise
    except ZeroDivisionError:
        if ignore_zero_division:
            return float('inf')
        else:
            raise
```
위 함수에서 ndigits는 위치나 키워드를 사용해 전달할 수 있는 선택적인 파라미터이므로 어떤 방식으로든 함수 호출에 사용할 수 있습니다!

<div class="code-header">
	<span class="red btn"></span>
	<span class="yellow btn"></span>
	<span class="green btn"></span>
</div>

```python
result = safe_division_e(22, 7)
print(result)

result = safe_division_e(22, 7, 5)
print(result)

result = safe_division_e(22, 7, ndigits=2)
print(result)

```

## 정리
- 키워드로만 지정해야 하는 `*` 인자를 사용하면 호출하는 쪽에서 특정 인자를 반드시 키워드를 사용해 호출하도록 강제할 수 있습니다.
- 위치로만 지정해야 하는 `/` 인자를 사용하면 호출하는 쪽에서 키워드를 사용해 인자를 지정하지 못하게 만들 수 있습니다.
- 인자 목록에서 `/`와 `*` 사이에 있는 파라미터는 키워드를 사용해 전달해도 되고 위치를 기반으로 전달해도 됩니다.