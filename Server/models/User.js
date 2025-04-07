import mongoose from "mongoose";
import bcrypt from "bcrypt";


const userSchema = new mongoose.Schema({
name : {type : String, required: true, },
email: {type : String, required : true, unique: true },
password: { type: String, required: true, select: false},
Tournaments: [{type: mongoose.Schema.Types.ObjectId, ref: "Tournament"}]
}, {
    timestamps: true,
})

userSchema.pre('save', async function (next) {

	
    if (!this.isModified('password')) {
		return next();
	}
	const salt = await bcrypt.genSalt(10);

	this.password = await bcrypt.hash(this.password, salt);
	next(); 
});


userSchema.pre('findOneAndUpdate', async function (next) {

	if (!this._update.password) {
		return next();
	}
	const salt = await bcrypt.genSalt(10);

	this._update.password = await bcrypt.hash(this._update.password, salt);
	next();
});


userSchema.methods.comparePassword = async function (candidatePassword) {
	return await bcrypt.compare(candidatePassword, this.password);
};



export default mongoose.model("User", userSchema);