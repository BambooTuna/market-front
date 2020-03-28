# market-front

## ローカル
```bash
$ docker-compose exec -e NODE_ENV=production vuecli4 npm run serve --prefix ./market-front -- --port 9050 --host 0.0.0.0
```

## GithubActions
### Enable gcloud API
https://console.developers.google.com/apis/api/appengine.googleapis.com/overview

### SetSecrets
1. 
    - Key: GcloudServiceKey
    - value: [$ base64 -i service_account_key.json]

2.
    - key: ProjectName
    - value: [Your GCP Project Name]
