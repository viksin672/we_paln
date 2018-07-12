var mongoose = require("mongoose");


var QuerySchema = new mongoose.Schema({
    
    budget: {
        type: String,
        default: ''
      },
    food: {
        type: String,
        default: ''
      },
    people: {
        type: String,
        default: ''
      },
    squery:{
        type: String,
        default: ''
      },
    author: {
        id: {
           type: String,
           default:''
        },
        username: {
            type: String,
            default: ''
          },
        email: {
            type: String,
            default: ''
          },
        phone: {
            type: String,
            default: ''
          }
     }
});



module.exports = mongoose.model("Query", QuerySchema);