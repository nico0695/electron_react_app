import ExampleDataSource from '../dataSource/example.dataSource';

import { IPost } from '../interfaces/example.interfaces';

export default class ExampleServices {
  #exampleDataSource: ExampleDataSource;

  constructor() {
    // declaracion de methodos para que funcionen las referencias
    this.createPost = this.createPost.bind(this);
    this.listPosts = this.listPosts.bind(this);

    // inicializacion de datasources
    this.#exampleDataSource = new ExampleDataSource();
  }

  /**
   * Create a post
   * @param dataPost IPost - Data user
   */
  public async createPost(dataPost: IPost) {
    try {
      
      if (dataPost.title.length === 0) {
        return {
          error: 'Complete todos los campos',
        };
      }

      const response = await this.#exampleDataSource.createPost(dataPost);

      return {
        data: response,
      };
    } catch (error) {
      return {
        error: 'Error al crear el post',
      };
    }
  }

   /**
   * Listar post
   * @param dataPost IPost - Data user
   */
   public async listPosts() {
    try {
      const response = await this.#exampleDataSource.listPosts();

      return {
        data: response,
      };
    } catch (error) {
      return {
        error: 'Error al listar los post',
      };
    }
  }
}
