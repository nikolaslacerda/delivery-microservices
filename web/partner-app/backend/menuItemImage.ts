import {Request, Response} from 'express';
import multer = require('multer');

const maxSize = 2 * 1024 * 1024;

export const handleMenuItemUpdateImage = async (req: Request, res: Response, next) => {
  await uploadFile(req, res, next);
};

function generateImageName(id: any, name: any): string {
  const a = Math.floor(Math.random() * (99999999 - 11111111)) + 11111111;
  return id + '_image_' + a + '.' + name.substr(name.lastIndexOf('.') + 1);
}

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, './src/assets/img/foods');
  },
  filename: (req, file, callback) => {
    callback(null, generateImageName(req.params.menuItemId, file.originalname));
  },
});

const uploadFile = multer({
  storage,
  limits: {fileSize: maxSize},
  fileFilter(req: Request, file: any, cb: any): any {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      cb(new Error('Please upload JPG and PNG images only!'));
    }
    cb(undefined, true);
  }
}).single('file');

