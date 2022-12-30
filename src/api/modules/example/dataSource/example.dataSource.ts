import { Repository } from 'typeorm';

import connectionSource from '../../../config/ormconfig';

import { Post } from '../../../entities/example.entity';
import { IPost } from '../interfaces/example.interfaces';

export default class PostsDataSources {
  #postRepository: Repository<Post>;

  constructor() {
    /* Se debe declarar el repositorio de la entidad que se va a utilizar para usar los metodos de EntityManeger
    en lugar de utilizar la entidad "Post" se debe usar el repositorio "#postRepository" */
    this.#postRepository = connectionSource.getRepository(Post);
  }

  /**
   * Save post in database
   * @param data IPosts - Data user
   * @returns
   */
  public async createPost(data: IPost): Promise<Post | unknown> {
    try {
      const newPost = new Post();
      newPost.title = data.title;
      newPost.text = data.text;

      // utilizo el repositorio de post para guardar los datos pasandole el objeto como parametro
      this.#postRepository.save(newPost);

      return newPost;
    } catch (error) {
      return error;
    }
  }

  /**
   * Lista los post guardados
   * @returns Array<IPost>
   */
  public async listPosts(): Promise<Post[] | unknown> {
    try {
      // utilizo el repositorio de post para traer los datos
      const posts = await this.#postRepository.find();

      return posts;
    } catch (error) {
      return error;
    }
  }
}
