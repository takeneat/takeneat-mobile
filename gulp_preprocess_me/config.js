app.constant('appConfig', {
  // @if NODE_ENV == 'DEVELOPMENT'
  baseApiUrl: 'http://localhost:8080/api/v1',
  debug: true
  // @endif
  // @if NODE_ENV == 'PRODUCTION'
  baseApiUrl: 'https://takeneat-services.herokuapp.com/api/v1'
  // @endif
});