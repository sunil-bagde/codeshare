# Function to get the current Git branch
get_branch() {
  git rev-parse --abbrev-ref HEAD
}

# Shortcut to push to the current branch
function current_branch() {
  get_branch
}

# Alias to publish (push) to the current branch
alias publish="git push -u origin $(get_branch)"

# Git Aliases
alias gs="git status"
alias ga="git add -A"
alias gb="git branch"
alias gc="git commit -m"
alias lg="git log"
alias wip="git add -A  && git commit -m 'wip'"
alias nah="git reset --hard && git clean -df"

# Push and Pull to the current branch using a function
alias push="git push -u origin \$(get_branch)"
alias pull="git pull origin \$(get_branch)"

# Clear command
alias c="clear"
