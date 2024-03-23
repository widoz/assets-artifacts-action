# Assets Artifacts Action

> A GitHub Action to upload artifacts to a release

Assets Artifacts, is designed to compile the assets of your project and commit and push these assets back into the repository. It also moves the tags to point to the commit where the assets are pushed.

## What it does

1. **Compiles the assets**: The action runs the `yarn build` command to compile the assets of your project.

2. **Commits and pushes the assets**: After the compilation is completed, the action commits the changes and pushes the assets back into the repository.

3. **Moves the tags**: The action moves the tags to point to the commit where the assets are pushed.

## Configuration

The configuration for this action is mostly hardcoded for now. The command used for compiling the assets is always `yarn build` and the target directory is always `./build`.

## Workflow Example

Here is an example of how to use this action in a workflow:

```yaml
name: Build Artifacts

on:
  push:
    tags:
      - '*'

jobs:
  build:
    runs-on: ubuntu-latest
    if: ${{ !contains(github.event.head_commit.message, '--skip-assets-artifacts') }}
    steps:
      - name: Checkout
        uses: actions/checkout@v2

      - name: Setup Node
        uses: actions/setup-node@v2
        with:
          cache: 'yarn'
          node-version: '20'

      - name: Install Dependencies
        run: yarn install

      - name: Build Artifacts
        uses: widoz/github-artifacts-action@v1
        env:
          GIT_USER: ${{ secrets.GIT_USER }}
          GIT_EMAIL: ${{ secrets.GIT_EMAIL }}
          HUSKY: 0
```

In this workflow, the action is triggered on every push event that includes a tag. The workflow runs on the latest version of Ubuntu and will not run if the commit message contains `--skip-assets-artifacts`.

The workflow includes steps to checkout the repository, setup Node.js with a specified version and cache configuration, install dependencies using `yarn install`, and finally, build the artifacts using the `widoz/github-artifacts-action@v1` action.

The `GIT_USER` and `GIT_EMAIL` environment variables are used for the commit and should be stored as secrets in your GitHub repository. The `HUSKY` environment variable is set to `0` to disable Husky during the action run.
