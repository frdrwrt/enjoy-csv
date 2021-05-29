import { promisify } from 'util';
import { pipeline as syncPipeline } from 'stream';

export const pipeline = promisify(syncPipeline);
