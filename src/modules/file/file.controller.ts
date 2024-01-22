import { Controller, Get, Post, Res, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { FileDto } from "./dto/file.dto";
import { FileService } from "./file.service";
import { FileUtil } from "src/utils/FileUtil";
import { ConfigService } from "@nestjs/config";
import { LocalFilesInterceptor } from "src/common/config/fileConfig";


@Controller("api/v1/files")
export class FileController {

    constructor(
        private fileService: FileService,
        private readonly configService: ConfigService
    ) { }

    @Post('upload')
    @UseInterceptors(LocalFilesInterceptor({
        fieldName: 'file'
    }))
    public uploadSingleFile(@UploadedFile() file: Express.Multer.File): FileDto {
        console.log("file: ", file);
        return this.fileService.uploadSingleFile(file);
    }

    @Get("")    
    public viewImage(@Res() res) {
        console.log(res);
    }
}  