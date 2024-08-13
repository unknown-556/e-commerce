
import Admin from '../models/adminModel';
import Item from '../models/itemModel';

export const registerAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;
    const admin = new Admin({ username, password });
    await admin.save();
    res.status(201).json({ message: 'Admin created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const loginAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;
    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }
    const isValid = await admin.comparePassword(password);
    if (!isValid) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }
    res.status(200).json({ message: 'Admin logged in successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const addItem = async (req, res) => {
  try {
    const { name, description, price, stock } = req.body;
    const item = new Item({ name, description, image, category, price, stock });
    await item.save();
    res.status(201).json({ message: 'Item added successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const viewAllItems = async (req, res) => {
  try {
    const items = await Item.find().sort({ createdAt: -1 });
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const viewItemById = async (req, res) => {
    try {
        const itemId = req.params.id;
        const item = await Item.findById(itemId);

        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }

        res.status(200).json({ item });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

export const updateItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, stock } = req.body;
    const item = await Item.findByIdAndUpdate(id, { name, description, price, stock }, { new: true });
    res.status(200).json({ message: 'Item updated successfully' }, item);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const deleteItem = async (req, res) => {
  try {
    const { id } = req.params;
    await Item.findByIdAndRemove(id);
    res.status(200).json({ message: 'Item deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};