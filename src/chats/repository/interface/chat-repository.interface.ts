export const CHAT_REPOSITORY = Symbol('CHAT_REPOSITORY');

export interface IChatRepository {
  save(message: string, socketId: number): Promise<void>;
}
