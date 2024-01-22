import { BadRequestException, Injectable } from "@nestjs/common";
import multer from "multer";
import { FileDto } from "./dto/file.dto";
import { ConfigService } from "@nestjs/config";
import { v4 as uuid } from 'uuid';
import { FileUtil } from "src/utils/FileUtil";
const Path = require('path');


@Injectable()
export class FileService{

    constructor(
        private  configService:ConfigService
    ){}
    
    public uploadSingleFile(file: Express.Multer.File):FileDto{
        
        if(!file){
            throw new BadRequestException("File is required !");
        }
        
        return  {
            filename: file.originalname,
            filenameUUID: file.filename,
            extension: Path.extname(file.originalname),
            size: file.size,
            url: "wait it progressing",
        } as FileDto;;
    }

    public ViewImage(){
        
    }
}