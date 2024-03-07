const { Schema, model } = require('mongoose');


// Reaction schema as a subdocument of the Thought parent (based on the model in assignment README)
const ReactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new mongoose.Types.ObjectId(), 
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280, 
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now, // sets default value to the current timestamp as per instructions
      get: createdAtVal => createdAtVal.toISOString().split('T')[0], // the getter method to format the timestamp
    },
  },
  {
    toJSON: {
      getters: true, 
    },
    id: false, 
  }
);


// Thought/Parent schema/document
const ThoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1, 
      maxlength: 280, 
    },
    createdAt: {
      type: Date,
      default: Date.now, 
      get: createdAtVal => createdAtVal.toISOString().split('T')[0], // same getter method to format timestamp as above
    },
    username: {
      type: String,
      required: true,
    },
    // Adds reaction schema as a child/subdocument
    reactions: [ReactionSchema],
  },
  {
    toJSON: {
      virtuals: true, // Enable the counter properties below
      getters: true, // Enable getters for the timestamp thing
    },
    id: false,
  }
);

//  `reactionCount` property gets the number of reactions per thought
ThoughtSchema.virtual('reactionCount').get(function() {
  return this.reactions.length;
});

// creates the Thought model using the ThoughtSchema after the THoughtSchema has been defined
const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;