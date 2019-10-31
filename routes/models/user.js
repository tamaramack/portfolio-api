/**
 * user js file created by Tamara G. Mack on 30-Oct-19 for portfolio-api
 */
module.exports = (mongoose => {
  const Schema = mongoose.Schema;
  const {String, ObjectId} = Schema.Types;
  const userSchema = new Schema({
    user: {
      type: String,
      required: true
    },
    email: {
      type: String,
      unique: true,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    ips: [{type: ObjectId, ref: 'Clients'}]
  }, {
    timestamps: true
  });

  return mongoose.model('Users', userSchema);
});
