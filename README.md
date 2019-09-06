# Using `env2file` Sample App

This application uses [env2file](https://www.npmjs.com/package/env2file) to inject data from the environment into a production build that will be used to create production release APK and IPA files.

## The Environment Files

The development environment just has data:

```TypeScript
export const environment = {
  production: false,
  tagLine: 'Secrets? We have no secrets here',
  getSmart: {
    main: 'this is development',
    companion: 'everyone knows everything'
  }
};
```

The production environment file pulls data out of the generated `secrets.ts` file:

```TypeScript
import { secrets } from './secrets';

export const environment = {
  production: true,
  tagLine: secrets.secret1,
  getSmart: {
    main: secrets.secret2,
    companion: secrets.secret3
  }
};
```

## The Build Scripts

The production build (`npm run build`) has been changed to generate the `secrets.ts` file based on environment variables:

```JSON
  "scripts": {
    "ng": "ng",
    "start": "ng serve",
    "build": "env2file -k DEMO -f src/environments/secrets.ts -o secrets; ng build --prod",
    "test": "ng test",
    "lint": "ng lint",
    "e2e": "ng e2e"
  },
```

## The Environment

Set the following variables in your environment.

```
export DEMO_SECRET1='Secret Agent, man...'
export DEMO_SECRET2='Maxwell Smart'
export DEMO_SECRET3='Agent 99'
```

If you are using Ionic's Appflow automations, you should be able to set custom environment variables there as well (not tested).

## Running

If you do `npm start` you will see whatever is in `environment.ts` on the home page.

If you do `npm run build` and then serve it, you will see the secrets. To serve it, do the following:

1. `npm run build`
1. `cd www`
1. `http-server -c-1 .`

This assumes you have [http-server](https://www.npmjs.com/package/http-server) installed globally on your machine. If you don't, you should. It is a cool and useful tool... 🥳

## Misc

There were a few setup files that needed to be changed so that things built properly and so the `secrets.ts` file would never get checked in accidentally. See the commits in the GitHub repo for details.
