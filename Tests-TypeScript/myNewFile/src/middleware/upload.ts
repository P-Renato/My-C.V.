import multer from 'multer';

// Extend Express Request interface to include 'profile'
declare module 'express-serve-static-core' {
    interface Request {
        profile?: string;
    }
}

const storage = multer.diskStorage({
    destination: "public/uploads/",
    filename: (req, file, cb)=> {
        const number = Date.now();
        const fileName = file.originalname.split(".")[0];
        const fileExt = file.originalname.split(".")[1];
        const newFileName = `${fileName}_${number}.${fileExt}`;
        req.profile = newFileName;
        cb(null, newFileName);
    }
});

export const upload = multer({
    storage: storage,
    limits: {fileSize: 200 * 1024}
});



