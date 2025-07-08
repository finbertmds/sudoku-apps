// ExpoConstantsSafe.ts

let Constants: any;
let ExecutionEnvironment: any = {};
try {
  const expoConstants = require('expo-constants');
  Constants = expoConstants.default ?? expoConstants;
  ExecutionEnvironment = expoConstants.ExecutionEnvironment ?? {};
} catch (error) {
  Constants = {
    manifest: null,
    expoConfig: null,
  };
  ExecutionEnvironment = {
    Bare: 'Bare',
    StoreClient: 'StoreClient',
    Standalone: 'Standalone',
  };
}

const isExpoGo =
  Constants.executionEnvironment === ExecutionEnvironment.StoreClient;

export {Constants, ExecutionEnvironment, isExpoGo};
