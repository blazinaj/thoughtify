import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'mobi.thoughtify.app',
  appName: 'thoughtify',
  webDir: 'build',
  server: {
    androidScheme: 'https'
  }
};

export default config;
