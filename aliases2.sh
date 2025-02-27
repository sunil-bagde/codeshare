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


# Checkout Aliases
alias co="git checkout"  # Shortcut for `git checkout`
alias cob="checkout_branch"  # Create and switch to a new branch

checkout_branch() {
  if [ -z "$1" ]; then
    echo "Error: Branch name is required."
  else
    git checkout -b "$1"
  fi
}

alias cof="git checkout --"  # Checkout a file (undo changes in a file)
alias com="git checkout master"  # Checkout the master branch
alias co-main="git checkout main"  # Checkout the main branch

