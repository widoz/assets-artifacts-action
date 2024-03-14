import * as core from "@actions/core";
import { createArtifacts } from "./tasks/create-artifacts";
import { maybeMoveTags } from "./tasks/maybe-move-tags";
import { pushAssets } from "./tasks/push-assets";
import { maybeCreateTemporaryBranch } from "./tasks/maybe-create-temporary-branch";

async function main(): Promise<void> {
  Promise.resolve()
    .then(maybeCreateTemporaryBranch)
    .then(createArtifacts)
    .then(pushAssets)
    .then(maybeMoveTags)

    .catch((error) =>
      core.setFailed(`Failed to create and push artifacts: ${error}`),
    );
}

export default main;
