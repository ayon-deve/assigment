export const configuration = () => ({
  NODE_ENV: process.env.NODE_ENV ? process.env.NODE_ENV : 'dev',
  MONGO_STR:
    process.env.NODE_ENV == 'mongodb+srv://ayon:1tyG1L5hxbp0TPPQ@cluster0.kimvjfv.mongodb.net/',


  MONGO_DB_NAME: 'demo'



});
