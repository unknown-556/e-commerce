import User from '../models/userModel';
import Item from '../models/itemModel';

export const addToCart = async (req, res) => {
    try {
        const { itemId, quantity } = req.body;
        const userId = req.user.id;

        const item = await Item.findById(itemId);

        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }

        if (item.stock < quantity) {
            return res.status(400).json({ message: 'Not enough stock available' });
        }

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const cartItemIndex = user.cart.findIndex(cartItem => cartItem.item.toString() === itemId);

        if (cartItemIndex > -1) {
            user.cart[cartItemIndex].quantity += quantity;
        } else {
            user.cart.push({ item: itemId, quantity });
        }

        item.stock -= quantity;
        await item.save();
        await user.save();

        res.status(200).json({ message: 'Item added to cart' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

export const purchaseItems = async (req, res) => {
    try {
        const userId = req.user.id; 

        const cart = await cart.findOne({ userId }).populate('items.item');
        if (!cart || cart.items.length === 0) {
            return res.status(400).json({ message: 'Cart is empty' });
        }
        for (let cartItem of cart.items) {
            const item = cartItem.item;

            if (item.stock < cartItem.quantity) {
                return res.status(400).json({ message: `Not enough stock for ${item.name}` });
            }
            item.stock -= cartItem.quantity;
            await item.save();
        }

        cart.items = [];
        await cart.save();
        res.status(200).json({ message: 'Purchase successful' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
