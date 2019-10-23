/**
 * clients js file created by Tamara G. Mack on 22-Oct-19 for portfolio-api
 */
/**
 * blog js file created by Tamara G. Mack on 18-Oct-19 for portfolio-api
 */
module.exports = ((mongoose) => {
  const Schema = mongoose.Schema;
  const clientSchema = new Schema({
    ip: {type: String},
    users: [{type: Schema.Types.ObjectId, ref: 'Users'}]
  }, {
    timestamps: {
      createdAt: 'timestamp',
      updatedAt: 'updated'
    }
  });

  return mongoose.model('Clients', clientSchema);
});
