/**
 * blog js file created by Tamara G. Mack on 18-Oct-19 for portfolio-api
 */
module.exports = ((mongoose) => {
  const Schema = mongoose.Schema;
  const blogSchema = new Schema({
    title: {type: String},
    text: {type: String}
  }, {
    timestamps: {
      createdAt: 'timestamp',
      updatedAt: 'updated'
    }
  });

  return mongoose.model('Blog', blogSchema);
});
