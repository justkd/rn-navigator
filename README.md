# template-expo-ts-npm-publish

The codesandbox tasks `runAtStart` for this
isn't working for the `start` script. Just
run it manually in a new terminal `npm run start`.

Don't delete the `publish` directory.

The `package.json` in there is important
and running the build command will 
overwrite the other files and directories.

Do update `publish/package.json` to match your
module info and dependencies and not the
example app stuff.

Run `npm adduser` and login with the link 
before publishing.

Module goes in `src`, example app in `example`.
Once built, the publishable module is in `publish`.