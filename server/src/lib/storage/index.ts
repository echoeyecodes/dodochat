import envConfig from '../env';
import { LocalStorageProvider } from './LocalProvider';
import { S3StorageProvider } from './S3Provider';
import type { StorageProvider } from './types';

let storageInstance: StorageProvider;

const providerType = envConfig.get('STORAGE_PROVIDER') || 'local';

if (providerType === 's3' || providerType === 'r2') {
    storageInstance = new S3StorageProvider();
} else {
    storageInstance = new LocalStorageProvider();
}

export default storageInstance;
