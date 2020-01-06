# Sensible default which I stole from https://tech.davis-hansson.com/p/make/
SHELL := bash
.ONESHELL:
.SHELLFLAGS := -eu -o pipefail -c
.DELETE_ON_ERROR:
MAKEFLAGS += --warn-undefined-variables
MAKEFLAGS += --no-builtin-rules

# Constant declaration
FILE_EXT := .md
POST_DIR := src/posts/
MOST_RECENT_POST := $(shell find ${POST_DIR} -type f -name '*.md' -print0 | xargs -0 basename -s .md -a | sort -r | head -n1)

# Rules
post_new:
	@echo $(POST_DIR)$(MOST_RECENT_POST)$(FILE_EXT)
