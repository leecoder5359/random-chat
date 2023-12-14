export const CHAT_SERVICE = Symbol('CHAT_SERVICE');

export interface IChatService {
  save(message: string, socketId: number): Promise<void>;
}
