import express from 'express'
import {postData} from '../controllers/Datacontroller.js'

const router=express.Router();

router.post('/',postData);


export default router