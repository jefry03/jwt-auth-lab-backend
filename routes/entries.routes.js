const router = require("express").Router();
const verifyToken = require("../middleware/verifyToken");
const EntriesController = require('../controllers/entries.controllers')

router.post("/", verifyToken, EntriesController.validate);
router.get("/", EntriesController.findEntry);
router.get("/my-entries", verifyToken, EntriesController.findMyEntries);
router.put("/:id", verifyToken, EntriesController.updateEntry);
router.delete("/:id", verifyToken, EntriesController.deleteEntry);

module.exports = router;