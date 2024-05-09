package com.teamstatic.popkornback.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.teamstatic.popkornback.common.JSchWrapper;
import com.teamstatic.popkornback.domain.PageRequestDTO;
import com.teamstatic.popkornback.domain.PageResultDTO;
import com.teamstatic.popkornback.domain.ProductDTO;

import com.teamstatic.popkornback.entity.OrderDetail;
import com.teamstatic.popkornback.entity.Product;

import com.teamstatic.popkornback.service.ProductService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.RequestParam;

@AllArgsConstructor
@RequestMapping("/api/product")
@RestController
public class ProductController {

    ProductService pService;

    @GetMapping("/productlist")
    public PageResultDTO<ProductDTO, Product> getMethodName(int page) {
        PageRequestDTO requestDTO = PageRequestDTO.builder()
                .page(page)
                .size(20)
                .build();
        PageResultDTO<ProductDTO, Product> resultDTO = pService.findAll(requestDTO);
        resultDTO.setDashboard1(pService.countAll());
        // resultDTO.setDashboard2(pService.countBy("signed"));
        // resultDTO.setDashboard3(pService.countByStatus("unsigned"));

        return resultDTO;
    }

    @GetMapping("/findByCategorylAndCategorym")
    public PageResultDTO<ProductDTO, Product> findByCategorylAndCategorym(String categoryl, String categorym,
            int page, String keyword) {


        if (categoryl.equals("new")) {
            PageRequestDTO requestDTO = PageRequestDTO.builder()
                    .page(1)
                    .size(8)
                    .build();

            PageResultDTO<ProductDTO, Product> resultDTO = pService.findNewAll(requestDTO);
            return resultDTO;

        } else if (keyword.length() <= 0) {
            PageRequestDTO requestDTO = PageRequestDTO.builder()
                    .page(page)
                    .size(20)
                    .categoryl(categoryl)
                    .categorym(categorym)
                    .build();

            PageResultDTO<ProductDTO, Product> resultDTO = pService.findByCategorylAndCategorym(categoryl, categorym,
                    requestDTO);

            return resultDTO;

        } else {
            System.out.println(keyword);

            PageRequestDTO requestDTO = PageRequestDTO.builder()
                    .page(page)
                    .size(20)
                    .categoryl(categoryl)
                    .categorym(categorym)
                    .build();

            PageResultDTO<ProductDTO, Product> resultDTO = pService.findByCategoryLAndCategoryMAndKeyword(categoryl,
                    categorym,
                    keyword, requestDTO);

            return resultDTO;

        }

    }

    @PostMapping("/selectoption")
    public List<Product> selectoption(@RequestBody Map<String, Object> request) {
        String productname = (String) request.get("productname");
        List<Product> list = pService.findByProductname(productname);
        return list;
    }

    @GetMapping("/findByArtist")
    public List<Product> getMethodName(@RequestParam String artist) {
        List<Product> list = pService.findFirstProductByArtist(artist);
        return list;
    }

    @PostMapping("/checkDetailCount")
    public Map<String, Object> checkDetailCount(@RequestBody List<OrderDetail> orderDetails) {

        Map<String, Object> response = new HashMap<>();

        for (OrderDetail orderDetail : orderDetails) {
            if (orderDetail.getDetailcount() > pService.findByPcode(orderDetail.getPcode()).getStock()) {
                response.put("result", false);
                return response;
            }
        }

        // If all checks passed
        response.put("result", true);
        response.put("imp_uid", "imp71862281");
        return response;
    }

    @GetMapping("/searchlist")
    public PageResultDTO<ProductDTO, Product> searchlist(String categoryl, String categorym,
            int page, String keyword) {

        if (categoryl.equals("new")) {
            PageRequestDTO requestDTO = PageRequestDTO.builder()
                    .page(1)
                    .size(8)
                    .build();

            PageResultDTO<ProductDTO, Product> resultDTO = pService.findNewAll(requestDTO);

            resultDTO.setDashboard1(pService.countAll());
            resultDTO.setDashboard2(pService.countByCategoryl("album"));
            resultDTO.setDashboard3(pService.countByCategoryl("goods"));
            resultDTO.setDashboard4(pService.countByCategoryl("photo"));

            return resultDTO;

        } else if (categoryl.equals("all")) {
            PageRequestDTO requestDTO = PageRequestDTO.builder()
                    .page(page)
                    .size(20)
                    .keyword(keyword)
                    .build();

            PageResultDTO<ProductDTO, Product> resultDTO = pService.findAll(requestDTO);

            resultDTO.setDashboard1(pService.countAll());
            resultDTO.setDashboard2(pService.countByCategoryl("album"));
            resultDTO.setDashboard3(pService.countByCategoryl("goods"));
            resultDTO.setDashboard4(pService.countByCategoryl("photo"));

            return resultDTO;

        } else if (categorym.equals("all")) {
            PageRequestDTO requestDTO = PageRequestDTO.builder()
                    .page(page)
                    .size(20)
                    .keyword(keyword)
                    .build();

            PageResultDTO<ProductDTO, Product> resultDTO = pService.findByCategoryLAndKeyword(categoryl, keyword,
                    requestDTO);

            resultDTO.setDashboard1(pService.countAll());
            resultDTO.setDashboard2(pService.countByCategoryl("album"));
            resultDTO.setDashboard3(pService.countByCategoryl("goods"));
            resultDTO.setDashboard4(pService.countByCategoryl("photo"));

            return resultDTO;

        } else if (keyword.length() <= 0) {
            PageRequestDTO requestDTO = PageRequestDTO.builder()
                    .page(page)
                    .size(20)
                    .categoryl(categoryl)
                    .categorym(categorym)
                    .build();

            PageResultDTO<ProductDTO, Product> resultDTO = pService.findByCategorylAndCategorym(categoryl, categorym,
                    requestDTO);

            resultDTO.setDashboard1(pService.countAll());
            resultDTO.setDashboard2(pService.countByCategoryl("album"));
            resultDTO.setDashboard3(pService.countByCategoryl("goods"));
            resultDTO.setDashboard4(pService.countByCategoryl("photo"));

            return resultDTO;

        } else {
            System.out.println(keyword);

            PageRequestDTO requestDTO = PageRequestDTO.builder()
                    .page(page)
                    .size(20)
                    .categoryl(categoryl)
                    .categorym(categorym)
                    .build();

            PageResultDTO<ProductDTO, Product> resultDTO = pService.findByCategoryLAndCategoryMAndKeyword(categoryl,
                    categorym,
                    keyword, requestDTO);

            resultDTO.setDashboard1(pService.countAll());
            resultDTO.setDashboard2(pService.countByCategoryl("album"));
            resultDTO.setDashboard3(pService.countByCategoryl("goods"));
            resultDTO.setDashboard4(pService.countByCategoryl("photo"));

            return resultDTO;
        }
    }

    @PostMapping("/productSave")
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

    @PostMapping("/update")
    public Product update(@RequestBody Product updatedItem) {
        return pService.save(updatedItem);
    }
    
    

}
