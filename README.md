# durga-shield
shiva validate branches and commit messages for git

^(CSDP-)\d* - start with commit message
(develop)|(feature|bugfix|)\/(CSDP-) - branch name

$ durga -t branch -r (develop)|(feature|bugfix|)\/(CSDP-)
$ durga -t branch -r ^(CSDP-)\d*
