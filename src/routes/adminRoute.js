const express = require('express');
const router = express.Router();
const authorize = require('../middlewares/roleMiddleware');
const { registerAdmin, loginAdmin, addItem, viewAllItems, viewItemById, updateItem, deleteItem } = require('../controllers/adminController');


router.post('/register', registerAdmin);
router.post('/login', loginAdmin);
router.post('/items', authorize(['admin']), addItem);
router.get('/items', authorize(['admin']), viewAllItems);
router.get('/items/:id', authorize(['admin']), viewItemById);
router.put('/items/:id', authorize(['admin']), updateItem);
router.delete('/items/:id', authorize(['admin']), deleteItem);

module.exports = router;

