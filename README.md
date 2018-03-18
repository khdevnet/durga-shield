# Shiva shield
> git-flow standards validator

![](shiva.gif)

Provides a binary that can be used as a `git-hook` to validate branch names and commit messages according to `git-flow` prior to pushing upstream. 

Validate branch name:
```sh
$ git rev-parse --abbrev-ref HEAD
Output: features/dev-reg
  
$ git push
Output:
Error:
 Branch name is not allowed by pattern ^(develop|dev|realese)|^(feature|bugfix|hotfix)/[A-Za-z]+-\d+.
 Branch name: features/dev-reg
```

Validate commit message:
```sh
$ git commit -m"Add readme"
Output:
Error:
 Commit message is not allowed by pattern '^[A-Za-z]+-\d+'.
 Message: Add readme
```


## Features

- Validate branch name according to default `git-flow` format. <br>
  pattern: [^(develop|dev|realese)|^(feature|bugfix|hotfix)\/[A-Za-z]+-\\d+].
- Validate commit message according to default `git-flow` format. <br>
  pattern: [^[A-Za-z]+-\\d+].
- Prevent pushes to certain branches such as `master` or `staging`.
- Completely customizable, for Regex validation.

## Installation

```sh
$ npm install shivas --save-dev
$ npm install husky@next --save-dev
```

Update packages.json
```
{
...
  "husky": {
    "hooks": {
      "commit-msg": "node ./node_modules/shivas/commitmsg.js",
      "pre-push": "node ./node_modules/shivas/branchname.js"
    }
  }
}
```

- Use [husky](http://npm.im/husky) to setup `pre-push` and `commit-msg` git hooks. Requires `git 1.8.2+`


## Usage

### Options

Define options in husky hook `package.json` file (values display below are the default values):

```
{
...
  "husky": {
    "hooks": {
      "commit-msg": "node ./node_modules/shivas/commitmsg.js '^[A-Za-z]+-\\d+'",
      "pre-push": "node ./node_modules/shivas/branchname.js '^(develop|dev|realese)|^(feature|bugfix|hotfix)\/[A-Za-z]+-\\d+'"
    }
  }
}
```

Skip validation commit messages and branches:

```
{
...
  "husky": {
    "hooks": {
      "commit-msg": "node ./node_modules/shivas/commitmsg.js skip",
      "pre-push": "node ./node_modules/shivas/branchname.js skip"
    }
  }
}
```

#### prefixes

`git-flow` branch prefixes allowed. 

#### disallowed

Prevent pushing to certain branches, must be the entire branch name, including prefixes.
Prevent commit to certain branches, must be the entire commit message, including prefixes and task number.

## License

MIT
