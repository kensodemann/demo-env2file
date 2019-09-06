import { secrets } from './secrets';

export const environment = {
  production: true,
  tagLine: secrets.secret1,
  getSmart: {
    main: secrets.secret2,
    companion: secrets.secret3
  }
};
