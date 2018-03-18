# Shiva shield

Provides a binary that can be used as a `git-hook` to validate branch names and commit messages according to `git-flow` prior to pushing upstream. 

```sh
$ (features/banned-regex-support) careful

CAREFUL! Branch prefix "features" is not allowed.
```

## Features

- Validate branch name according to default `git-flow` format [^(develop|dev|realese)|^(feature|bugfix|hotfix)\/[A-Za-z]+-\\d+].
- Validate commit message according to default `git-flow` format [^[A-Za-z]+-\\d+].
- Prevent pushes to certain branches such as `master` or `staging`.
- Completely customizable, for Regex validation.

## Installation

```sh
$ npm install shivas --save-dev
```

- Use [husky](http://npm.im/husky) to setup `pre-push` and `pre-commit` git hooks. Requires `git 1.8.2+`


## Usage

### Options

Define options in your `package.json` file (values displayed below are the default values):

```javascript
{
  "shivas": {
        branchname: "^(develop|dev|realese)|^(feature|bugfix|hotfix)\/[A-Za-z]+-\\d+", // if you clear this value validation will skip
        commitmsg: "^[A-Za-z]+-\\d+" // if you clear this value validation will skip
    }
}
```

Define options in `.shivasrc` file (values displayed below are the default values):

```yml
branchname: "^(develop|dev|realese)|^(feature|bugfix|hotfix)\/[A-Za-z]+-\\d+" # if you clear this value validation will skip
commitmsg: "^[A-Za-z]+-\\d+" # if you clear this value validation will skip
```

#### prefixes

`git-flow` branch prefixes allowed. 


#### disallowed

Prevent pushing to certain branches, must be the entire branch name, including prefixes.

#### seperator

Character used to seperate the `prefix` and branch `name`. Defaults to `/`, as Sourcetree converts branch names that use `/` into folders.

#### banned

Ban pushing to branches with a certain `name`. Checks both complete branch name, and the name of the branch with the prefix omitted.

## License

MIT