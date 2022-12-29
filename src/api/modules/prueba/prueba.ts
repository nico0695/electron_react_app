import { Post } from '../../entities/prueba.entity';
import connectionSource from '../../config/ormconfig';
export const prueba = async () => {
  //   const newPost = new Post();
  //   newPost.title = 'Hello';
  //   newPost.text = 'Hello World';

  //   await newPost.save();

  const newPost = new Post();
  newPost.title = 'Hello';
  newPost.text = 'Hello World';

  //   await newPost.save();

  const postRepository = connectionSource.getRepository(Post);
  const user = await postRepository.save(newPost);
  console.log('user= ', user);

  const posts = await postRepository.find();
  console.log('posts=', posts);

  const asd: string = 'dasdas PRUEBA';
  console.log(asd);
};
