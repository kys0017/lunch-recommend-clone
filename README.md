## [슬랙 점심 추천기](https://tre2man.tistory.com/327) 따라하기

### using Serverless Framework with AWS DynamoDB

<br />

![recommend image](https://kys0017-s3-bucket.s3.ap-southeast-2.amazonaws.com/images/recommend.png)

[Daily DevBlog](http://daily-devblog.com/) 구독하다 발견한 블로그.  
슬랙 slash command 커스터마이징이 재밌을 것 같아서 바로 Try.

### 약간의 차이점

- aws-sdk@v3 로 db 관련 코드 수정 (src/db.ts)
- 메뉴 추가 전 이미 있는 메뉴인지 체크
- 메뉴 조건부 조회 시 필터 조건으로 contains(like 검색같은?) 적용
- 예약 작업 없음
<!-- - 배포 후 슬랙 채널 알림 (.github/workflows/serverless_deploy.yml) -->

### Deployment

<!-- In order to deploy the project, you need to run the following command: -->

```
$ serverless deploy
```

### Invocation

<!-- After successful deployment, you can invoke the deployed function by using the following command: -->

```bash
serverless invoke --function <function-name>
```

### Ref.

[슬랙 점심 추천기](https://tre2man.tistory.com/327)  
[lunch-recommend](https://github.com/tre2man/lunch-recommend) (repo.)  
[Serverless](https://www.serverless.com/)  
[AWS DynamoDB Example - Using the DynamoDB Document Client](https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/dynamodb-example-dynamodb-utilities.html)  
[Slack API - Enabling interactivity with Slash Commands](https://api.slack.com/interactivity/slash-commands)
