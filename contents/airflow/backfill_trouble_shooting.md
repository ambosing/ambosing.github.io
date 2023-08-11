---
date: '2023-08-06'
title: 'Airflow Backfill 트러블 슈팅'
categories: ['Airflow']
summary: 'Airflow'
thumbnail: '../images/thumbnail/chocoball.webp'
---
## 문제 상황
기존 원본 데이터는 크롤링을 통해서 수집하고 있는 상황이었는데 Airflow를 이용한 배치 시스템 자체를 이후에 적용했습니다.  
그래서 Airflow에 있는 Backfill 기능을 사용해 기존 데이터를 채웠습니다만..!  
데이터가 원하는대로 들어가지 않았습니다..  
예시로 들면, 2023-07-23 데이터와 2023-07-24 데이터의 차이가 원래 1000이라고 한다면 막상 2023-07-24 변화량 값의 데이터는 모두 다 기본값인 0으로 들어가 있었던 거죠.

## 원인 파악하기 
이유는 요구사항이 전날 데이터를 기준으로 데이터 차이의 결과를 구해야 했는데 이 때 오늘 데이터는 하루 전날 데이터를 의존하게 됩니다.  
저는 병렬로 실행하는 CeleryExecutor를 사용하고 있었고, Backfill의 실행 순서는 랜덤으로 실행이 됩니다.  
하지만 이 사실을 모른 저는 Backfill을 진행했고, 위와 같은 문제 상황에 마주한 것입니다.
![](../images/content/2023-08-11-17-57-40.png)
<div class="source">Backfill했을 때 시간 순서상이 아닌 랜덤</div>


