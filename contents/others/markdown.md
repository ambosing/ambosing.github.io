---
date: '2023-03-28'
title: '마크다운 문법 모음집'
categories: ['Others']
summary: '블로그 디자인하려고 올린 게시글'
thumbnail: '../images/thumbnail/chocoball.webp'
---

> <small>개인적으로 마크다운 문법 정리 및 블로그 디자인을 하기 위해 올린 게시글입니다.</small>

---

# ~~This is a H1~~

<small>게시글 제목이 h1이니까 내용 안에서 소제목 작성할땐 h2부터 사용할 것</small>

## This is a H2
### This is a H3
#### This is a H4

1. 첫번째
2. 두번째
   1. 두번째 안의 첫번째
   2. 두번째 안의 두번째
      1. 두번째 안의 두번째 안의 첫번째
2. 세번째
3. 네번째

- 빨강
- 분홍
- 보라
  - 녹색
    - 파랑
- 검정

* 1단계
  - 2단계
    + 3단계
      + 4단계

> This is a first blockquote.
>   > This is a second blockquote.
>   >   > This is a third blockquote.

> 이것은 인용구입니다

첫번째 각주[^1]
두번째 각주[^2]

각주는 어디에 작성하든 페이지 맨 밑에 표시됨, 가로선도 알아서 들어감
[^1]: 첫번째 각주
[^2]: 두번째 각주 - 각주를 여러줄로 넣고 싶으면,  
    앞줄 끝에는 2칸, 뒷줄 앞에는 4칸의  
    공백을 넣을것!

1. ol이랑 ul 섞어 쓰려면 들여쓰기 두번씩 해야됨
2. 순서있는 항목
    - 그 안에 순서 없는 항목1
        - 그 안에 또 순서 없는 항목
    - 순서 없는 항목2
3. 순서 있는 항목2
    1. 그 안에 순서 있는 항목1
        1. 그 안에 또 순서 있는 항목
    2. 그 안에 순서 있는 항목2

한줄 `this is code` 코드

```javascript
this is code block
```

<div class="code-header">
   <span class="red btn"></span>
   <span class="yellow btn"></span>
   <span class="green btn"></span>
</div>

```javascript
this is code block too
```

*기울임꼴*
_기울임꼴_
**강조하기**
__강조하기__
~~취소선~~
***기울이면서 강조하기***
___기울이면서 강조하기___
<mark>형광펜 배경</mark>

<sub>아래첨자</sub>텍스트
<sup>위첨자</sup>텍스트

|테이블1|테이블2|테이블3|
|---|---|---|
|내용1|내용2|내용3|
|내용1|내용2|내용3|
|내용1|내용2|내용3|

이건 줄바꿈 안한 문장

줄 바꿈을 하기 위해서는 앞줄 마지막에서 **2칸이상**을 띄어쓰기해야 한다.  
이렇게

- 리스트에서 줄바꿈 하려면 앞줄 마지막을 2칸 이상 띄우고,  
  다음 줄도 2칸 이상 들여쓰기 해야함  
  이렇게!

<!-- 표시되지 않을 주석 -->

![](../images/content/2023-03-29-14-49-13.webp)

<div class="source">이미지랑 이미지 캡션넣기</div>

- 링크 걸기
  - [마크다운 문법 참고 사이트1](https://gist.github.com/ihoneymon/652be052a0727ad59601)
  - [마크다운 문법 참고 사이트2](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax)