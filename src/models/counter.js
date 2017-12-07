import mongoose from 'mongoose';

var CounterSchema = mongoose.Schema({
	_id: { type: String, required: true },
	index: { type: Number, default: 0 }
});
export default mongoose.model('counter', CounterSchema);
