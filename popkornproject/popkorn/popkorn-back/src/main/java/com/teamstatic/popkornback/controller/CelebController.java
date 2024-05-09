package com.teamstatic.popkornback.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.teamstatic.popkornback.common.JSchWrapper;
import com.teamstatic.popkornback.domain.CelebDTO;
import com.teamstatic.popkornback.entity.Celeb;
import com.teamstatic.popkornback.service.CelebService;

import lombok.AllArgsConstructor;
import retrofit2.http.DELETE;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@AllArgsConstructor
@RestController
@RequestMapping("/api/celeb")
public class CelebController {

    CelebService celebService;

    @GetMapping("/celeblist")
    public List<Celeb> getMethodName() {
        return celebService.findAll();
    }

    @DeleteMapping("/delete")
    public List<Celeb> deleteByartist(@RequestParam String artist) {
        celebService.deleteByartist(artist);
        return celebService.findAll();
    }

    @PostMapping("/celebSave")
    public Boolean postCelebName(CelebDTO cdto) {

        Celeb entity = celebService.dtoToEntity(cdto);

        JSchWrapper jsch = new JSchWrapper();

        try {
            // 파일 업로드
            // celebLogo
            jsch.connectSFTP();

            boolean uploadSuccessL = jsch.uploadFile(cdto.getCelebLogoFile().getInputStream(),
                    cdto.getCelebLogoFile().getOriginalFilename(), "/celebIMG");

            // JSchWrapper 연결 종료
            jsch.disconnectSFTP();

            // 파일 업로드
            // celebMain

            jsch.connectSFTP();

            boolean uploadSuccessM = jsch.uploadFile(cdto.getCelebMainFile().getInputStream(),
                    cdto.getCelebMainFile().getOriginalFilename(), "/celebIMG/celebmainimg");

            // JSchWrapper 연결 종료
            jsch.disconnectSFTP();

            if (cdto.getCelebLogoFile() != null) {
                entity.setCelebimg(cdto.getCelebLogoFile().getOriginalFilename());
            }

            if (cdto.getCelebMainFile() != null) {
                entity.setMainimg(cdto.getCelebMainFile().getOriginalFilename());
            }

            celebService.save(entity);

            return uploadSuccessL && uploadSuccessM;

        } catch (Exception e) {
            e.printStackTrace();
            return false;
        } finally {
            // 항상 연결 종료
            jsch.disconnectSFTP();
        }
        
    }

}
