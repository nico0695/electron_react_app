import ExampleServices from '../services/example.services';

import { IPost } from '../interfaces/example.interfaces';

import { ipcMain } from 'electron';

export default class ExampleController {
  #exampleServices: ExampleServices;

  constructor() {
    // declaracion de methodos para que funcionen las referencias
    this.createPost = this.createPost.bind(this);
    this.listPosts = this.listPosts.bind(this);

    // inicializacion de servicios
    this.#exampleServices = new ExampleServices();

    // inicializacion de oyentes ipc
    this.registerIPC();
  }

  /** Post Routes */
  // Se debe declarar cada oyente IPC con su respectivo metodo
  protected registerIPC(): void {
    ipcMain.on('post/createPost', this.createPost);
    ipcMain.on('post/listPosts', this.listPosts);
  }

  /** Post Controllers Methods */

  public async createPost(event: any, arg: any) {
    const dataPost: IPost = {
      title: arg.title,
      text: arg.text,
    };

    const response = await this.#exampleServices.createPost(dataPost);

    // response
    event.reply('post/createPost-reply', response);
  }

  public async listPosts(event: any, arg: any) {
    const response = await this.#exampleServices.listPosts();

    // response
    event.reply('post/listPosts-reply', response);
  }
}
