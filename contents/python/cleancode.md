---
date: '2023-06-15'
title: '파이썬에서의 코드 악취 대응하기'
categories: ['Spring']
summary: '으..~ 냄새! 얼른 제거하자!'
thumbnail: '../images/thumbnail/chocoball.webp'
---

## 들어가기 전
파이썬을 사용하면서 어떻게 하면 파이썬을 더욱 이쁘게 사용할 수 있을까?   
내가 정말 파이썬스럽게 코드를 짜고 있는 것인가라는 의문이 들었습니다..ㅠ   
그래서 이번에는 파이썬에서 악취나는 코드들을 살펴보고 그에 대한 해결 방안을 찾아보면서 파이썬에서의 클린 코드를 한층 업그레이드 해보려고 합니다!

## 중복된 코드
가장 흔한 코드는 역시 중복된 코드입니다! 먼저 중복된 코드를 보시고 나쁜 점을 살펴봅시다.
<div class="code-header">
	<span class="red btn"></span>
	<span class="yellow btn"></span>
	<span class="green btn"></span>
</div>

```python
# 중복된 코드 예시

# 사각형의 넓이 계산
length = 5
width = 3
rectangle_area = length * width
print("넓이:", rectangle_area)

# 삼각형의 넓이 계산
base = 4
height = 2
triangle_area = 0.5 * base * height
print("넓이:", triangle_area)

# 원의 넓이 계산
radius = 2
circle_area = 3.14 * radius * radius
print("넓이:", circle_area)

```

위의 예시에서 `넓이`를 출력하는 부분이 중복되고 있습니다.


중복된 코드의 나쁜 점은 다음과 같습니다

<mark>유지 보수의 어려움</mark>: 중복된 코드가 있는 경우, 해당 코드의 수정이 필요한 경우 여러 곳에서 수정해야 합니다. 이는 시간 소모적이며, 실수로 일부 수정을 빠뜨리는 등의 문제가 발생할 수 있습니다.

<mark>코드의 가독성 저하</mark>: 중복된 코드가 있는 경우, 같은 동작을 하는 코드가 여러 곳에 반복되므로 코드가 복잡해지고 가독성이 떨어집니다.

<mark>오류 발생 가능성</mark>: 중복된 코드는 여러 곳에서 동일한 동작을 수행하므로, 하나의 버그가 여러 곳에 영향을 미칠 수 있습니다. 또한, 중복된 코드의 복사 및 붙여넣기 작업 시 실수로 오타가 발생할 수 있습니다.

이러한 문제를 해결하기 위해 함수와 반복문을 사용할 수 있습니다.

<mark> 함수로 중복 제거 </mark>
<div class="code-header">
	<span class="red btn"></span>
	<span class="yellow btn"></span>
	<span class="green btn"></span>
</div>

```python
def calculate_square_area(side):
    return side * side

def calculate_rectangle_area(length, width):
    return length * width

def calculate_triangle_area(base, height):
    return 0.5 * base * height

side = 5
square_area = calculate_square_area(side)

length = 4
width = 6
rectangle_area = calculate_rectangle_area(length, width)

base = 3
height = 7
triangle_area = calculate_triangle_area(base, height)

```

<mark> 반복문으로 중복 제거 </mark>
<div class="code-header">
	<span class="red btn"></span>
	<span class="yellow btn"></span>
	<span class="green btn"></span>
</div>

```python
shapes = [
    {'type': 'square', 'side': 5},
    {'type': 'rectangle', 'length': 4, 'width': 6},
    {'type': 'triangle', 'base': 3, 'height': 7}
]

areas = []
for shape in shapes:
    if shape['type'] == 'square':
        area = shape['side'] * shape['side']
    elif shape['type'] == 'rectangle':
        area = shape['length'] * shape['width']
    elif shape['type'] == 'triangle':
        area = 0.5 * shape['base'] * shape['height']
    areas.append(area)

print(areas)

```
위의 예시에서는 도형의 종류와 해당 도형의 속성을 딕셔너리로 나타내고, 함수와 반복문을 사용하여 중복을 제거했습니다. 이를 통해 코드의 가독성이 향상되고, 유지 보수가 용이해집니다.


## 중첩된 리스트 컴프리헨션 
컴프리헨션은 복잡한 리스트, 집합, 딕셔너리 값을 만드는 간결한 방법입니다.

### 리스트 컴프리헨션

리스트 컴프리헨션은 기존의 리스트를 사용하여 간단하게 새로운 리스트를 생성하는 방법입니다.

먼저 각각의 컴프리헨션 생성 방법부터 보겠습니다!

<div class="code-header">
	<span class="red btn"></span>
	<span class="yellow btn"></span>
	<span class="green btn"></span>
</div>

```python
# 기존 방식
numbers = [1, 2, 3, 4, 5]
squared_numbers = []
for num in numbers:
    squared_numbers.append(num**2)
print(squared_numbers)

# 리스트 컴프리헨션 사용
numbers = [1, 2, 3, 4, 5]
squared_numbers = [num**2 for num in numbers]
print(squared_numbers)

```
위의 코드는 1부터 5까지의 숫자를 제곱하여 새로운 리스트를 생성하는 예시입니다. 리스트 컴프리헨션을 사용하면 반복문을 사용하지 않고도 간결하게 표현할 수 있습니다.

### 집합 컴프리헨션

집합 컴프리헨션은 리스트 컴프리헨션과 유사하지만, 중복된 원소를 가지지 않는 집합(set)을 생성합니다.

<div class="code-header">
	<span class="red btn"></span>
	<span class="yellow btn"></span>
	<span class="green btn"></span>
</div>

```python
# 기존 방식
numbers = [1, 2, 2, 3, 3, 4, 5, 5]
unique_numbers = set()
for num in numbers:
    unique_numbers.add(num)
print(unique_numbers)

# 집합 컴프리헨션 사용
numbers = [1, 2, 2, 3, 3, 4, 5, 5]
unique_numbers = {num for num in numbers}
print(unique_numbers)

```
위의 코드는 중복된 숫자를 제거하여 집합을 생성하는 예시입니다. 집합 컴프리헨션을 사용하면 반복문을 사용하지 않고도 간단하게 중복을 제거할 수 있습니다.


### 딕셔너리 컴프리헨션

딕셔너리 컴프리헨션은 리스트나 집합과 유사하게, 기존의 딕셔너리를 사용하여 새로운 딕셔너리를 생성하는 방법입니다.
<div class="code-header">
	<span class="red btn"></span>
	<span class="yellow btn"></span>
	<span class="green btn"></span>
</div>

```python
# 기존 방식
numbers = [1, 2, 3, 4, 5]
squared_dict = {}
for num in numbers:
    squared_dict[num] = num**2
print(squared_dict)

# 딕셔너리 컴프리헨션 사용
numbers = [1, 2, 3, 4, 5]
squared_dict = {num: num**2 for num in numbers}
print(squared_dict)
```
위의 코드는 1부터 5까지의 숫자를 키(key)로 하고, 해당 숫자의 제곱을 값(value)으로 갖는 딕셔너리를 생성하는 예시입니다. 딕셔너리 컴프리헨션을 사용하면 반복문을 사용하지 않고도 간단하게 딕셔너리를 생성할 수 있습니다.

파이썬은 컴프리헨션을 통해 반복문 코드를 한 줄로 줄일 수 있습니다!   
또한, 컴프리헨션은 중첩되게 사용될 수도 있습니다.   
중첩된 컴프리헨션은 파이썬에서 컴프리헨션을 중첩하여 사용하는 방법입니다. 중첩된 컴프리헨션은 다양한 데이터 구조를 생성하거나 조작할 수 있는 강력한 기능이지만, 가독성과 유지 보수 측면에서 주의해야 할 점이 있습니다.    
아래의 예시 코드를 통해 중첩된 컴프리헨션을 보여드리고, 단점에 대해 알려드리겠습니다.
<div class="code-header">
	<span class="red btn"></span>
	<span class="yellow btn"></span>
	<span class="green btn"></span>
</div>

```python
# 중첩된 컴프리헨션 예시
matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
flattened_matrix = [num for row in matrix for num in row]
print(flattened_matrix)

# 중첩된 컴프리헨션에서의 단점
matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
squared_matrix = [[num**2 for num in row] for row in matrix]
print(squared_matrix)
```

위의 예시 코드에서 첫 번째는 중첩된 컴프리헨션을 사용하여 2차원 리스트인 `matrix`를 1차원 리스트인 `flattened_matrix`로 만드는 예시입니다. 두 번째는 `matrix`의 각 요소들을 제곱하여 새로운 2차원 리스트인 `squared_matrix`를 생성하는 예시입니다.

중첩된 컴프리헨션의 단점은 다음과 같습니다.

<mark>가독성 저하</mark>: 중첩된 컴프리헨션을 사용하면 코드가 복잡해지고 가독성이 저하될 수 있습니다. 특히, 여러 단계의 중첩된 컴프리헨션이 있을 경우 이해하기 어려워질 수 있습니다.

<mark>디버깅 어려움</mark>: 중첩된 컴프리헨션에서 오류가 발생한 경우, 오류를 찾고 수정하기가 어려울 수 있습니다. 오류 발생 지점을 정확히 파악하기 어려우며, 오류가 발생한 중첩 구문을 해체하고 분리하는 작업이 번거로울 수 있습니다.

<mark>유지 보수의 어려움</mark>: 중첩된 컴프리헨션에서 코드를 수정하거나 기능을 추가하려는 경우, 복잡한 구조로 인해 수정이 어려울 수 있습니다. 새로운 기능을 추가하기 위해 중첩된 컴프리헨션을 수정해야 하므로 코드의 일부를 재구성해야 할 수도 있습니다.

따라서, 중첩된 컴프리헨션을 사용할 때는 코드의 가독성과 유지 보수 가능성을 고려해야 합니다. 너무 복잡한 구조의 중첩된 컴프리헨션은 가독성을 저하시킬 수 있으며, 필요한 경우에는 중첩된 컴프리헨션을 분리하여 가독성을 개선하는 것이 좋습니다.

## 함수 마지막에는 return 문이 하나만 있어야 한다?
`하나의 입구, 하나의 출구` 아이디어는 어셈블리어와 포트란 언어로 프로그래밍하던 시절에 나온 조언을 잘못 해석한 데서 비롯된 것입니다. 

이러한 언어들은 서브루틴의 어떤 위치에도 진입이 가능하고, 서브루틴 내부에서 어떤 부분이 실행되었는지 디버깅을 하기 어렵게 되어 있습니다.

하지만 파이썬에서나 현재의 프로그래밍 언어들은 함수나 메서드마다 return 문을 하나씩만 유지하려면, 여러 return 문을 유지하는 경우와 비교해 일련의 난해한 if-else 문이 필요하므로 훨씬 더 혼란스럽습니다.

즉! 결론은 함수나 메서드에 return 문이 둘 이상 있어도 괜찮습니다.


## 플래그 인수는 나쁘다?
무조건적으로 나쁜 것은 아닙니다.
<div class="code-header">
	<span class="red btn"></span>
	<span class="yellow btn"></span>
	<span class="green btn"></span>
</div>

```python
def someFunction(flagArgument):
    if flagArgument:
        # 특정 코드 실행
    else:
        # 완전히 다른 특정 코드 실행
```

위와 같은 경우에는 함수의 코드의 절반을 실행할지 말지 결정하기보다는 두 개의 함수를 별도로 만드는 것이 좋습니다.  
그러나 파이썬의 sorted() 함수는 하나의 정렬 함수에서 오름차순으로 정렬할지, 내림차순으로 정렬하지 결정할 수 있습니다!

<mark> 바로 플래그 변수를 통해서죠! </mark>

<div class="code-header">
	<span class="red btn"></span>
	<span class="yellow btn"></span>
	<span class="green btn"></span>
</div>

```python
class Student:
    def __init__(self, name, grade, age):
        self.name = name
        self.grade = grade
        self.age = age
    def __repr__(self):
        return repr((self.name, self.grade, self.age))

student_objects = [
    Student('john', 'A', 15),
    Student('jane', 'B', 12),
    Student('dave', 'B', 10),
]
sorted(student_objects, key=lambda student: student.age)   # sort by age
[('dave', 'B', 10), ('jane', 'B', 12), ('john', 'A', 15)]
```
위와 같은 예시 클래스가 주어졌다고 했을 때, 우리는 플래그 변수를 sorted()함수 전달해 오름차순으로 정렬할지, 내림차순으로 정렬할지 결정할 수 있습니다.

<div class="code-header">
	<span class="red btn"></span>
	<span class="yellow btn"></span>
	<span class="green btn"></span>
</div>

```python
sorted(student_tuples, key=itemgetter(2), reverse=True)
[('john', 'A', 15), ('jane', 'B', 12), ('dave', 'B', 10)]

sorted(student_objects, key=itemgetter(2), reverse=False)
[('dave', 'B', 10), ('jane', 'B', 12),('john', 'A', 15) ]
```
reverse의 값을 False로 지정하지 않아도 기본값은 False입니다.  

그래서 결론은 `플래그 변수가 무조건적으로 나쁜 것은 아니다`입니다.