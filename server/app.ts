import { Server } from './api/common/server';
import { routes } from './routes';

/**
 * Starts the server By Initializing Server class
 * @param {Router} routes
 * @param {string} serverPort
 */
export const app = new Server(routes(), parseInt("3000"));
