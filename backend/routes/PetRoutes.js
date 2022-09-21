const PetController = require('../controllers/PetController');
const verifyToken = require('../helpers/verify-token');
const router = require('express').Router();
const { imageUpload } = require('../helpers/image-upload');

router.post(
  '/register', 
  verifyToken,
  imageUpload.array('images'),
  PetController.register
);
router.get('/', PetController.getAll);
router.get('/mypets', verifyToken, PetController.getAllUserPets);
router.get('/myadoptions', verifyToken, PetController.getAllUserAdoptions);
router.get('/:id', PetController.getPetById);
router.delete('/:id', verifyToken, PetController.deletePetById);
router.patch('/:id', verifyToken, imageUpload.array('images'), PetController.updatePetById);
router.patch('/schedule/:id', verifyToken, PetController.schedule);
router.patch('/conclude/:id', verifyToken, PetController.concludeAdoption);

module.exports = router;