const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// User Schema
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

async function setupAdmin() {
    try {
        // Connect to MongoDB
        await mongoose.connect('mongodb://localhost:27017/midc-property');
        console.log('Connected to MongoDB');

        // Check if user exists
        const email = 'ganesh0988@gmail.com';
        let user = await User.findOne({ email });

        if (!user) {
            // Create new user if doesn't exist
            const hashedPassword = await bcrypt.hash('admin123', 12);
            user = await User.create({
                name: 'Ganesh',
                email,
                password: hashedPassword,
                role: 'admin'
            });
            console.log('Admin user created successfully');
        } else {
            // Update existing user to admin
            await User.updateOne(
                { email },
                { 
                    $set: { 
                        role: 'admin',
                        updatedAt: new Date()
                    }
                }
            );
            console.log('Existing user updated to admin');
        }

        console.log('Admin setup completed successfully');
    } catch (error) {
        console.error('Error setting up admin:', error);
    } finally {
        await mongoose.disconnect();
    }
}

setupAdmin();
