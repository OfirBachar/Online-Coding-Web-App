const codeBlockModel = require("../Models/codeBlockModel");

const findCodeBlock = async (req, res) => {
    const codeBlockId = req.params.codeBlockId;
    try{
        const codeBlock = await codeBlockModel.findById(codeBlockId)
        res.status(200).json(codeBlock);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
   
  };

  const getCodeBlocks = async (req, res) => {
    try{
        const codeBlocks = await codeBlockModel.find()
        res.status(200).json(codeBlocks);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};

    const createCodeBlock = async(req, res) => {
        try{
            const {title, code, solution } = req.body;
            if( !title || !code || !solution) return res.status(400).json("All fields are required");

            let codeBlock = await codeBlockModel.findOne({title});

            if(codeBlock) return res.status(400).json("CodeBlock is already exist");

            codeBlock = new codeBlockModel({ title, code, solution})

            await codeBlock.save();

            res.status(200).json({ title, code, solution});
        }catch(error){
            console.log(error);
            res.status(500),json(error);
        }
    };

    const updateCodeBlock = async(req, res) => {
        try{
            const { title, code } = req.body;

            if(!title || !code ) return res.status(400).json("All fields are required");

            let codeBlock = await codeBlockModel.findOne({title});

            if(!codeBlock) return res.status(400).json("codeBlock not found"); 

            codeBlock.code = code;

            await codeBlock.save();

            res.status(200).json( "Code block updated successfully");
        }catch(error){
            console.log(error);
            res.status(500).json(error);
        }
    };

   
module.exports = {findCodeBlock, getCodeBlocks, createCodeBlock, updateCodeBlock};
