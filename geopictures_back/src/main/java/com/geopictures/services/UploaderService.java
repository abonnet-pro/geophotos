package com.geopictures.services;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedOutputStream;
import java.io.File;
import java.nio.file.Files;

@Service
public class UploaderService {

    @Value("${upload.files}")
    private String pathToUpload;

    public String uploadFile(MultipartFile file) throws Exception {
        if(file.isEmpty()) {
            throw new Exception("Fichier invalide");
        }

        byte[] bytes = file.getBytes();
        File dir = new File(pathToUpload);

        File serverFile = new File(dir.getAbsolutePath() + File.separator + file.getOriginalFilename());

        BufferedOutputStream stream = new BufferedOutputStream(Files.newOutputStream(serverFile.toPath()));
        stream.write(bytes);
        stream.close();

        return file.getOriginalFilename();
    }

    public boolean deleteFile(String filename) {
        File dir = new File(pathToUpload);
        File serverFile = new File(dir.getAbsolutePath() + File.separator + filename);
        return serverFile.delete();
    }
}
