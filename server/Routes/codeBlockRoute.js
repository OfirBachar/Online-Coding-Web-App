const express = require("express");
const {findCodeBlock, getCodeBlocks ,createCodeBlock, updateCodeBlock, } = require("../Controllers/codeBlockController");

const router = express.Router();

router.get("/:codeBlockId", findCodeBlock);
router.get("/", getCodeBlocks);
router.post("/create", createCodeBlock);
router.patch("/updateCode", updateCodeBlock);


module.exports = router;