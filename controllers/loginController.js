
import jwt from 'jsonwebtoken';

const secret = "KIRAN";

export const login = async (req, res) => {
  try {
    const token = jwt.sign({
      _id: 44,
      email: "Kiran@gmail.com"
    }, secret);
    res.status(200).json({ token });
  } catch (error) {
    console.error('Error generating token:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
