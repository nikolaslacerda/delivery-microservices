import {Request, Response} from 'express';
var paths = require('path');

export const handleGetProfileImage = (req: Request, res: Response) => {
    const path = __dirname + "/../../db-images/restaurants/"
    console.log(path)
    return res.sendFile(paths.resolve(path + req.params.imageName));
};

