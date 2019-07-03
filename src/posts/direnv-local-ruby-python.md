---
title: direnv for local Ruby and Python (inc Pipenv) development
date: '2018-06-17'
tags:
  - cyber
---

There are lots of ways to get isolated local development environments for your projects. Many people like to use Docker. If you want to go for an elegant option there's [nix](https://nixos.org/nix/).

I wanted something lightweight, portable and with automatic switching of environments. I'm usually working with Python and already use [pyenv](https://github.com/pyenv/pyenv) for managing Python versions and have recently started using [Pipenv](https://docs.pipenv.org/) to manage virtual environments and packages.

Since I'm learning Ruby again, it was time to get a similar Ruby environment set up where I could easily get a specific Ruby version available for each project and install dependencies in an isolated way.

Installing [ruby-install](https://github.com/postmodern/ruby-install) and [chruby](https://github.com/postmodern/chruby) is the first step in the process.

## Enter direnv

The next step is to get the appropriate Python and Ruby environments activated when we enter project directories. Instead of using a different language specific tool for each language we can use [direnv](https://direnv.net/) to automate switching language versions and activating project isolated dependency installs. (It's also useful for setting project specific environment variables and other handy tasks - see the [direnv docs](https://direnv.net/).)

Install direnv making sure to follow the instructions to hook it into your shell. Now create `~/.direnvrc` with the following contents (with thanks to [this post](http://www.thekidds.org/blog/2016/03/07/closer-to-environmental-bliss-with-direnv/) for the Ruby section):

```bash
# Python
use_python() {
  local python_root=$PYENV_ROOT/versions/$1
  load_prefix "$python_root"
  if [[ -x "$python_root/bin/python" ]]; then
    layout python "$python_root/bin/python"
  else
    echo "Error: $python_root/bin/python can't be executed."
    exit
  fi
}

# Ruby
use_ruby() {
  # enable the chruby command in an environment
  source /usr/local/opt/chruby/share/chruby/chruby.sh

  # desired Ruby version as first parameter
  local ver=$1

  # if version not given as parameter and there is a .ruby-version file, get
  # version from the file
  if [[ -z $ver ]] && [[ -f .ruby-version ]]; then
    ver=$(cat .ruby-version)
  fi

  # if the version still isn't set, error cause we don't know what to do
  if [[ -z $ver ]]; then
    echo Unknown ruby version
    exit 1
  fi

  # switch to the desired ruby version
  chruby $ver

  # Sets the GEM_HOME environment variable to `$PWD/.direnv/ruby/RUBY_VERSION`.
  # This forces the installation of any gems into the project’s sub-folder. If
  # you’re using bundler it will create wrapper programs that can be invoked
  # directly instead of using the `bundle exec` prefix.
  layout_ruby
}
```

### Using direnv in projects

Now in any project directory you can add a `.envrc` file with the language and version we want, e.g. `use ruby 2.5.1` or `use python 3.6.5`. (Make sure you've installed the versions you want with pyenv or ruby-install first.)

After saving the file, you'll be prompted to do a `direnv allow`. After that, each time you enter and leave the project directory, the relevant language version will be enabled and the environment will be configured to install and use dependencies from a `.direnv` directory in the project root. Now you can `pip install ...` or `gem install bundler` to start installing your dependencies.

### Using direnv with pipenv

Direnv has a [lightly documented Pipenv layout](https://github.com/direnv/direnv/wiki/Python#-pipenv) that was [introduced recently](https://github.com/direnv/direnv/pull/314/files). To start a new Python project that you want to use Pipenv with, create a directory for it and create a `Pipfile` with at least the following minimal content to specify the Python version you want:

```bash
[requires]
python_version = "3.6.5"
```

Then create a `.envrc` file with this in it: `layout_pipenv`.

Pipenv will now create the virtualenv like it normally does and direnv will handle automatically activating and deactivating it.

## Update .gitignore

add `.direnv` and `.enrvc` to you global gitignore file to make sure they don't get added to repositories:

```bash
# direnv env #
##############
.env
.envrc
.direnv
```

## Extend and embrace

Since direnv is installed globally you can extend the ideas above to other languages and tools you work with, such as automatic setting of `GOPATH`. See the [direnv wiki](https://github.com/direnv/direnv/wiki) for some ideas.
