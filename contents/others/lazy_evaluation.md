---
date: '2023-09-20'
title: 'Lazy Evaluation 지연 계산법'
categories: ['Others']
summary: '지연 계산법 너는 무엇이냐!'
thumbnail: '../images/thumbnail/chocoball.webp'
---

## 들어가며
Lazy Evaluation은 예전에 조건문에서 두 개의 조건이 존재할 때 AND에서는 앞 조건이 False라고 하는 경우 뒤 조건을 안하는 경우를 Early Termination이라고 들은 적이 있었습니다. 그 때 비슷한 최적화의 형태로 Lazy Evaluation가 있다고 들었었는데요.  
뭔가 다른 건가 싶기도 했었습니다. 한참 데이터 쪽으로 공부하고 있을 때 spark에 대해서 공부한 적이 있었는데요. spark는 Lazy Evaluation을 지원해서 좋다고 합니다. 아니 그래서 뭐가 좋은건지도 모르지 말고 이번에는 공부하면서 블로그에 정리하려고 합니다. ~~역시 공부는 호기심~~

참고:  
[Lazy Evaluation 정의](https://ko.wikipedia.org/wiki/%EB%8A%90%EA%B8%8B%ED%95%9C_%EA%B3%84%EC%82%B0%EB%B2%95)  
[그림 동작 및 예제 : edykim님 블로그](https://edykim.com/ko/post/introduction-to-lodashs-delay-evaluation-by-filip-zawada/)


## Lazy Evaluation
컴퓨터 프로그래밍에서 <mark>느긋한 계산법(Lazy Evaluation)</mark>은 계산의 결과값이 필요할 때까지 계산을 늦추는 기법입니다. 반대말로는 Eager Evaluation(즉시 연산, 조급한 연산)이 존재합니다.

먼저 장단점을 알면 편하므로 장단점을 정리해보겠습니다.
### 장점
- **효율성**: 필요한 값만 계산하므로 불필요한 연산을 피할 수 있습니다. 예를 들어, 무한한 리스트에서 처음 10개의 요소만 필요한 경우, lazy evaluation을 사용하면 실제로 10개의 요소만 계산됩니다.
- **모듈화와 조합성**: 계산을 나중에 실행하게 되면, 프로그램의 여러 부분을 더 쉽게 조합하거나 재사용할 수 있습니다.
- **무한한 자료구조**: Lazy evaluation을 사용하면 무한한 크기의 자료구조를 생성하고, 필요한 부분만 사용할 수 있습니다. 예를 들어, Haskell(프로그래밍 언어)에서 무한한 리스트를 정의하고 사용할 수 있습니다.
- **가능한 결과 생성**: Lazy evaluation은 아직 계산되지 않은 결과를 표현할 수 있어, 연산의 가능한 결과를 모두 나열하고 나중에 특정 결과를 선택할 수 있습니다.
### 단점
- **예측하기 어려운 성능**: 연산이 언제 실행될지 예측하기가 어렵기 때문에, 프로그램의 성능을 예측하거나 분석하기가 어려울 수 있습니다.
- **메모리 사용**: 연산이 아직 실행되지 않았다는 것을 표시하기 위한 내부 데이터 구조가 추가적인 메모리를 사용할 수 있습니다. 이로 인해 메모리 사용이 증가할 수 있습니다.
- **디버깅 어려움**: Lazy evaluation의 동작 방식 때문에, 오류를 디버깅하기가 어려울 수 있습니다. 오류의 원인이 되는 코드와 오류가 실제로 발생하는 시점 사이에 시간 차이가 있을 수 있기 때문입니다.
- **부작용**: 부작용(side-effects)를 가진 연산과 lazy evaluation이 혼합될 때, 부작용의 발생 시점과 순서를 예측하기 어려울 수 있습니다.

이렇게 장단점을 알아봤습니다. 그런데 이 장점 중 왜 효율적일까, 무한한 자료구조는 어떻게 하는 걸까에 대해서 중점적으로 알아보겠습니다.

## Lazy Evaluation은 어떻게 효율적으로 동작하는걸까
자바 예제부터 보겠습니다.
아래의 자바 코드는 정수의 List에서 10보다 작은 것 중 3개만 가져오는 코드입니다.
<div class="code-header">
	<span class="red btn"></span>
	<span class="yellow btn"></span>
	<span class="green btn"></span>
</div>

```java
final List<Integer> list = Arrays.asList(4, 15, 20, 7, 3, 13, 2, 20);

System.out.println(
  list.stream()
    .filter(i -> {
        return i < 10;
    })
    .limit(3)
    .collect(Collectors.toList())
);
```
모르는 사람이 처음 위의 코드를 접했을 때 위 코드 동작 방식을 
1. 반복을 통해 Array에서 요소들 중 10보다 작은 값을 구하고
2. 그 중 3개만 가져옵니다.
라고 생각할 수 있지만 그렇지 않습니다.  
그렇지 동작하지 않는 이유를 알기 위해 출력해보겠습니다.
<div class="code-header">
	<span class="red btn"></span>
	<span class="yellow btn"></span>
	<span class="green btn"></span>
</div>

```java
final List<Integer> list = Arrays.asList(4, 15, 20, 7, 3, 13, 2, 20);

System.out.println(
        list.stream()
                .filter(i -> {
                    System.out.println("i: " + i + " < 10");
                    return i < 10;
                })
                .limit(3)
                .collect(Collectors.toList())
);
```
```java
i: 4 < 10
i: 15 < 10
i: 20 < 10
i: 7 < 10
i: 3 < 10
[4, 7, 3]
```
위는 출력해본 결과입니다! 이를 통해 조건에 맞는 것을 찾으면 종료한다는 것을 알 수 있습니다.  
이 동작을 그림으로 표현한 것이 있어서 가져왔습니다.  
출처는 맨 위에 있습니다.

![](https://farm1.staticflickr.com/499/19802991361_f410fb2ae6_o.gif?w=660&ssl=1)

위 코드를 그림으로 나타낸것입니다.
그림을 보면 출력 결과와 같이 동작한다는 것을 알 수 있습니다.  
어찌보면 3개를 취했을 때 반복문이 종료되므로 더 효율적으로 종료될 수 있는 것입니다!

이를 메모리 관점에서는 동작이 다르겠지만 로직 처리쪽으로만 본다면 아래의 코드처럼 나타낼 수 있습니다.
<div class="code-header">
	<span class="red btn"></span>
	<span class="yellow btn"></span>
	<span class="green btn"></span>
</div>

```java
final List<Integer> list = Arrays.asList(4, 15, 20, 7, 3, 13, 2, 20);
final List<Integer> newList = new ArrayList<>();

for (int i = 0; i < list.size(); i++) {
    System.out.println("list[i]: " + list.get(i) + " < 10");
    if (list.get(i) < 10) {
        newList.add(list.get(i));
        if (newList.size() == 3) break;
    }
}

System.out.println(newList);
```
출력결과 
```java
list[i]: 4 < 10
list[i]: 15 < 10
list[i]: 20 < 10
list[i]: 7 < 10
list[i]: 3 < 10
[4, 7, 3]

```

출력결과를 보면 동일한 것을 알 수 있습니다.  
Lazy Evaluation을 통해 조건을 만족하면 반복문이 종료되는 것을 알 수 있습니다.  
이를 통해 효율성을 챙기는 것입니다.

그럼 이번에는 메모리 관점으로 어떻게 무한한 자료구조를 쓸 수 있는지 보겠습니다.