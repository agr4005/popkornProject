package com.teamstatic.popkornback.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.siot.IamportRestClient.IamportClient;
import com.siot.IamportRestClient.exception.IamportResponseException;
import com.siot.IamportRestClient.request.CancelData;
import com.teamstatic.popkornback.common.JSchWrapper;
import com.teamstatic.popkornback.domain.CelebDTO;
import com.teamstatic.popkornback.domain.EventDTO;
import com.teamstatic.popkornback.domain.NoticeDTO;
import com.teamstatic.popkornback.domain.PageRequestDTO;
import com.teamstatic.popkornback.domain.PageResultDTO;
import com.teamstatic.popkornback.domain.ProductDTO;
import com.teamstatic.popkornback.domain.UserDTO;
import com.teamstatic.popkornback.entity.Celeb;
import com.teamstatic.popkornback.entity.Event;
import com.teamstatic.popkornback.entity.Notices;
import com.teamstatic.popkornback.entity.Orderinfo;
import com.teamstatic.popkornback.entity.Product;
import com.teamstatic.popkornback.entity.Snakegame;
import com.teamstatic.popkornback.entity.User;
import com.teamstatic.popkornback.service.CelebService;
import com.teamstatic.popkornback.service.EventService;
import com.teamstatic.popkornback.service.NoticeService;
import com.teamstatic.popkornback.service.OrderInfoService;
import com.teamstatic.popkornback.service.ProductService;
import com.teamstatic.popkornback.service.SnakegameService;
import com.teamstatic.popkornback.service.UserService;
import com.teamstatic.popkornback.service.impls.RegisterMail;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@Slf4j
@AllArgsConstructor
@RestController
@RequestMapping("/api/manager")
public class ManagerController {

    SnakegameService sgService;
    NoticeService nService;
    CelebService celebService;
    EventService eService;
    ProductService pService;
    UserService uService;
    RegisterMail registerMail;
    OrderInfoService oiService;
    PaymentsController pController;


    @DeleteMapping("/user/delete")
    public PageResultDTO<UserDTO, User> userDelete(@RequestParam String id) {

        uService.deleteById(id);

        PageRequestDTO requestDTO = PageRequestDTO.builder()
                .page(1)
                .size(20)
                .build();

        PageResultDTO<UserDTO, User> resultDTO = uService.pageList(requestDTO);
        resultDTO.setDashboard1(uService.countByStatus("admin"));
        resultDTO.setDashboard2(uService.countByStatus("signed"));
        resultDTO.setDashboard3(uService.countByStatus("unsigned"));

        return resultDTO;
    }

    @DeleteMapping("/product/delete")
    public PageResultDTO<ProductDTO, Product> getMethodName(@RequestParam int pcode) {

        pService.deleteByPcode(pcode);

        PageRequestDTO requestDTO = PageRequestDTO.builder()
                .page(1)
                .size(20)
                .build();

        PageResultDTO<ProductDTO, Product> resultDTO = pService.findAll(requestDTO);

        resultDTO.setDashboard1(pService.countAll());
        resultDTO.setDashboard2(pService.countByCategoryl("album"));
        resultDTO.setDashboard3(pService.countByCategoryl("goods"));
        resultDTO.setDashboard4(pService.countByCategoryl("photo"));

        return resultDTO;
    }

    @PostMapping("/user/update")
    public User update(@RequestBody User updatedItem) {
        return uService.save(updatedItem);
    }

    @PostMapping("/product/update")
    public Product update(@RequestBody Product updatedItem) {
        return pService.save(updatedItem);
    }

    @PostMapping("/snakegame/getrecord")
    public List<Snakegame> getRecord(@RequestBody String nickname) {
        String result = nickname.replace("\"", "");
        return sgService.findTop3RecordsAndMe(result);
    }

    @PostMapping("/snakegame/insertrecord")
    public List<Snakegame> postMethodName(@RequestBody Snakegame entity) {

        entity.setNickname(entity.getNickname().replace("\"", ""));
        Optional<Snakegame> userhistory = sgService.findById(entity.getNickname());

        if (!userhistory.isPresent() || userhistory.get().getRecord() < entity.getRecord()) {
            sgService.save(entity);
        }

        return sgService.findTop3RecordsAndMe(entity.getNickname());
    }

    @PostMapping("/notices/insert")
    public List<Notices> insertNotices(@RequestBody NoticeDTO noticeDTO) {
        // NoticeDTO noticeDTO = NoticeDTO.builder()
        // .id(id)
        // .content(content)
        // .build();

        Notices notice = new Notices();
        notice.setId(noticeDTO.getId());
        notice.setContent(noticeDTO.getContent());

        nService.save(notice);
        return getNotices();
    }

    @GetMapping("/notices/getnotices")
    public List<Notices> getNotices() {
        return nService.findAll();
    }

    @DeleteMapping("/celeb/delete")
    public List<Celeb> deleteByartist(@RequestParam String artist) {
        celebService.deleteByartist(artist);
        return celebService.findAll();
    }

    @PostMapping("/celeb/celebSave")
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

    @GetMapping("/event/deleteByecode")
    public List<Event> deleteByecode(@RequestParam int ecode) {
        eService.deleteByecode(ecode);
        return eService.findAll();
    }

    @PostMapping("/event/eventSave")
    public Boolean postEventName(EventDTO edto) {

        Event entity = eService.dtoToEntity(edto);

        JSchWrapper jsch = new JSchWrapper();

        try {
            jsch.connectSFTP();

            // 파일 업로드
            boolean uploadSuccess1 = jsch.uploadFile(edto.getImageFile().getInputStream(),
                    edto.getImageFile().getOriginalFilename(), "/event2IMG");

            // JSchWrapper 연결 종료
            jsch.disconnectSFTP();

            jsch.connectSFTP();

            boolean uploadSuccess2 = jsch.uploadFile(edto.getContentFile().getInputStream(),
                    edto.getContentFile().getOriginalFilename(), "/event2IMG");

            jsch.disconnectSFTP();

            if (edto.getImageFile() != null) {
                entity.setImage1(edto.getImageFile().getOriginalFilename());
            }

            // Event Content Image
            if (edto.getContentFile() != null) {
                entity.setContent(edto.getContentFile().getOriginalFilename());
            }

            eService.save(entity);

            return uploadSuccess1 && uploadSuccess2;

        } catch (Exception e) {

            e.printStackTrace();
            return false;
        } finally {
            // 항상 연결 종료
            jsch.disconnectSFTP();
        }

    }

    @PostMapping("/product/productSave")
    public Boolean postMethodName(ProductDTO dto) {

        Product entity = pService.dtoToEntity(dto);

        JSchWrapper jsch = new JSchWrapper();

        try {

            jsch.connectSFTP();

            // 파일 업로드 로직 추가
            boolean uploadSuccess = jsch.uploadFile(dto.getImageFile().getInputStream(),
                    dto.getImageFile().getOriginalFilename(), "/productIMG");

            // JSchWrapper 연결 종료
            jsch.disconnectSFTP();

            entity.setImage1(dto.getImageFile().getOriginalFilename());

            pService.save(entity);

            return uploadSuccess;

        } catch (Exception e) {
            // 예외 처리
            e.printStackTrace(); // 혹은 로깅을 통한 예외 처리
            return false; // 실패 시 false 반환
        } finally {
            // 항상 연결 종료
            jsch.disconnectSFTP();
        }
    }

    @PostMapping("/user/mailsend")
    public String sendEmail(@RequestBody Map<String, String> requestData) {
        String emailRecipient = requestData.get("emailRecipient");
        String emailTitle = requestData.get("emailTitle");
        String emailContent = requestData.get("emailContent");

        try {
            registerMail.sendEmail(emailRecipient, emailTitle, emailContent);
            return "Email sent successfully";
        } catch (Exception e) {
            e.printStackTrace();
            return "Failed to send email";
        }
    }

    @PostMapping("/user/sendtoallusers")
    public String sendtoallusers(@RequestBody Map<String, String> requestData) {
        String emailTitle = requestData.get("emailTitle");
        String emailContent = requestData.get("emailContent");

        List<User> users = uService.findAll();

        List<User> filteredUsers = new ArrayList<>();
        for (User user : users) {
            if (!isNotEmailFormat(user.getId())) {
                filteredUsers.add(user);
            }
        }

        for (User user : filteredUsers) {
            try {
                registerMail.sendEmail(user.getId(), emailTitle, emailContent);
            } catch (Exception e) {
                e.printStackTrace();
                return "Failed to send email";
            }
        }

        return "Email sent successfully";
    }

    private boolean isNotEmailFormat(String input) {

        return !input.contains("@");
    }

    @PostMapping("/orderinfo/updatestatus")
    public String updateStatus(@RequestParam("merchantuid") String merchantuid, @RequestParam("status") String status) {
        try {
            List<Orderinfo> focusorderInfo = oiService.findByMerchantUid(merchantuid);

            Orderinfo orderInfo = focusorderInfo.get(0);
            orderInfo.setStatus(status);
            oiService.save(orderInfo);
            return status;
        } catch (Exception e) {
            return "주문 상태 변경 실패: " + e.getMessage();
        }
    }

    @PostMapping("/pay/refund")
    public boolean getRefund(@RequestBody Orderinfo orderinfo) throws IamportResponseException, IOException {
        return pController.refund(orderinfo);
    }

}
