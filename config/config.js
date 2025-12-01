

const config = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET || 'YOUR_secret_key',
  mongoUri:process.env.MONGO_URI ||'mongodb+srv://michealoloriegbe_db_user:password1234%21@michealport.jhixebw.mongodb.net/?retryWrites=true&w=majority',
};

export default config;
