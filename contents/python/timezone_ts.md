---
date: '2023-08-26'
title: '파이썬에서 타임존 트러블 슈팅'
categories: ['Python']
summary: '세상에 이렇게 혼란스러운 일은 없었다..! 이 시간은 UTC인가 KST인가 아니면 또 다른 무엇인가'
thumbnail: '../images/thumbnail/chocoball.webp'
---

## 들어가기 전
회사에서 Timezone을 UTC를 KST로 조작할 일이 있었습니다!  
그래서 간단하게 해결할 방법으로 timezone을 KST로 조작해주었습니다.  
하지만 예상하는 날짜 값이 도출된 것이 아니라 예상 날짜 값보다 하루가 전 날이 나왔습니다.

## 왜 예상대로 안됐을까
먼저 일단 예제로 제가 구성한 코드를 보시는 게 이해가 더 빠르실 거라 먼저 코드를 보여드리겠습니다.

<div class="code-header">
	<span class="red btn"></span>
	<span class="yellow btn"></span>
	<span class="green btn"></span>
</div>

```python
from datetime import datetime, timedelta
from dateutil import tz

local_tz = tz.gettz('Asia/Seoul')

a = datetime(2023, 7, 23, 15, 00, 00)
print(a)
b = a.astimezone(local_tz)
print(b)
b -= timedelta(days=1)
print(b.strftime('%Y-%m-%d'))
```
```python
2023-07-23 15:00:00
2023-07-23 15:00:00+09:00
2023-07-22
```
저는 일단 처음 15시로 되어 있던 시간을 KST(+9시간)을 함으로써 다음 날이 되게 하려고 했습니다.  
하지만 1번과 같이 보시다시피 `2023-07-23 15:00:00+09:00` 이런 결과가 나왔습니다.  
그래서 2번에서 날짜를 하나 빼서 날짜만 String 값으로 변경해보니 예상했던 결과인 `2023-07-23`이 아닌 `2023-07-22`가 나왔습니다.

## 해결 방법
<div class="code-header">
	<span class="red btn"></span>
	<span class="yellow btn"></span>
	<span class="green btn"></span>
</div>

```python
local_tz = tz.gettz('Asia/Seoul')

a = datetime(2023, 7, 23, 15, 00, 00)
print(a) # 1
a = a.replace(tzinfo=tz.UTC) # <- 해결 방법
print(a) # 2
b = a.astimezone(local_tz)
print(b) # 3
b -= timedelta(days=1)
print(b.strftime('%Y-%m-%d')) # 4
```
```python
2023-07-23 15:00:00 # 1
2023-07-23 15:00:00+00:00 # 2
2023-07-24 00:00:00+09:00 # 3
2023-07-23 # 4
```
처음에 Datetime을 초기화해주고 `a = a.replace(tzinfo=tz.UTC)`를 통해 타임존을 replace해주니 위 출력결과 처럼 `#1`에서 `#2`처럼 변했습니다.  
이 상태에서 KST로 timezone을 변경해주고 하루를 빼주니 원하는 결과가 나왔습니다.

## 결론
사실 이런 사소한 오류들이 원하는 로직처럼 흘러가지 않는 경우가 있습니다.  
특히나 날짜를 가지고 데이터 조작을 하거나 데이터 쿼리 조건을 날린다던지 그랬을 때 쿼리는 또 정상적으로 작동은 합니다만 집계하는 데이터와 전체 데이터의 날짜 범위가 맞지 않는 경우가 발생합니다..!   
이런 에러들은 테스트 코드를 통해 잡지 않는 이상 어렵다고 생각합니다. 하지만 이제 일이라는게 언제나 테스트 코드를 짤 수는 없을 수도 있으므로..!

 이번에 파이썬에서 처음에 알게 되어 다른 분들에게 제 글이 도움이 되었으면 합니다!

