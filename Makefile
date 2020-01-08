# Sensible default which I stole from https://tech.davis-hansson.com/p/make/
SHELL := bash
.ONESHELL:
.SHELLFLAGS := -eu -o pipefail -c
.DELETE_ON_ERROR:
MAKEFLAGS += --warn-undefined-variables
MAKEFLAGS += --no-builtin-rules

# Constant declaration
POST_EXT := .md
POST_DIR := src/posts/
MOST_RECENT_POST := $(shell find ${POST_DIR} -type f -name '*.md' -print0 | \
						xargs -0 basename -s ${POST_EXT} -a | \
						sort -r | \
						head -n1)
NEXT_POST := $(shell expr ${MOST_RECENT_POST} + 1)
TEMPLATE_DIR := _template/
POST_TEMPLATE := $(TEMPLATE_DIR)post.tmpl

# Rules
post_new:
	@echo "Creating a new post..."
	@echo "Most recent post is $(MOST_RECENT_POST) so..."
	@echo "$(POST_DIR)$(NEXT_POST)$(POST_EXT) will be created."
	@printf "%s\n" "---" "title: Vol.${NEXT_POST}" \
		"date: 'YYYY-MM-DD'" \
		"desc: 'PLEASE FILL ME. THIS IS REQUIRED'" \
		"---" >${POST_DIR}${NEXT_POST}${POST_EXT}
	@echo "Done!"

