import { registerAs } from '@nestjs/config';

export default registerAs('auth', () => ({
  jwtSecret: process.env.ACCESS_TOKEN_SECRET || 'xw5DjZgX3TkTT',
  accessTokenExpiration: process.env.ACCESS_TOKEN_EXPIRES_IN || '6000',
  resetPasswordKey: process.env.JWT_RESET_PASSWORD_KEY || 's21DjZg12Jde',
}));
