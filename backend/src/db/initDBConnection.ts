/* eslint-disable no-console */
import dataSource from '../data-source';

export async function initDBConnection() {
    try {
        await dataSource.initialize();
        console.log('Data Source has been initialized');
    } catch (error) {
        console.error('Error during Data Source initialization:', error);
    }
}
