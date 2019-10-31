/**
 * clients js file created by Tamara G. Mack on 22-Oct-19 for portfolio-api
 */
module.exports = ((mongoose) => {
  const Schema = mongoose.Schema;
  const clientSchema = new Schema({
    ip: {type: String, unique: true},
    users: [{type: Schema.Types.ObjectId, ref: 'Users'}]
  }, {
    timestamps: true
  });

  return mongoose.model('Clients', clientSchema);
});
