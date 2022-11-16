module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const ConfigSchema = new Schema({
    projectName: {
      type: String,
    },
    gitUrl: {
      type: String,
    },
    gitBranch: {
      type: String,
    },
    buildCommand: {
      type: String,
    },
    uploadPath: {
      type: String,
    },
  });

  const Config = mongoose.model('Config', ConfigSchema);

  return Config;
};
