Package.describe({
  name: 'npaton:github',
  summary: 'Github API V3 simple wrapper',
  version: '0.1.0',
  git: 'https://github.com/npaton/meteor-github.git'
});

Package.onUse(function(api) {
  api.versionsFrom('1.0');
  api.addFiles('github.js');
  api.export('GithubApi');
});
