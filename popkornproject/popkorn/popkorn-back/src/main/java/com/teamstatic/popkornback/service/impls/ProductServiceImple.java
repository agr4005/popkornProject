package com.teamstatic.popkornback.service.impls;

import java.util.ArrayList;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.teamstatic.popkornback.domain.PageRequestDTO;
import com.teamstatic.popkornback.domain.PageResultDTO;
import com.teamstatic.popkornback.domain.ProductDTO;
import com.teamstatic.popkornback.entity.Product;
import com.teamstatic.popkornback.repository.ProductRepsitory;
import com.teamstatic.popkornback.service.ProductService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ProductServiceImple implements ProductService {

    final ProductRepsitory pRepsitory;

    public PageResultDTO<ProductDTO, Product> findByCategorylAndCategorym(String categoryl, String categorym,
            PageRequestDTO requestDTO) {

        Pageable pageable = requestDTO.getPageable(Sort.by("receiptdate").descending());

        Page<Product> result = pRepsitory.findByCategorylAndCategorym(categoryl, categorym, pageable);

        return new PageResultDTO<>(result, entity -> entityToDto(entity));
    }

    public PageResultDTO<ProductDTO, Product> findAll(PageRequestDTO requestDTO) {

        Pageable pageable = requestDTO.getPageable(Sort.by("receiptdate").descending());

        Page<Product> result = pRepsitory.findAllByKeywordLike(requestDTO.getKeyword(),pageable);

        return new PageResultDTO<>(result, entity -> entityToDto(entity));
    }

    public PageResultDTO<ProductDTO, Product> findByCategoryLAndCategoryMAndKeyword(String categoryl, String categorym, String keyword, PageRequestDTO requestDTO){
        Pageable pageable = requestDTO.getPageable(Sort.by("receiptdate").descending());

        Page<Product> result = pRepsitory.findByCategoryLAndCategoryMAndKeyword(categoryl,categorym,keyword,pageable);

        return new PageResultDTO<>(result, entity -> entityToDto(entity));
    }
    
    public PageResultDTO<ProductDTO, Product> findByCategoryLAndKeyword(String categoryl, String keyword, PageRequestDTO requestDTO){
        
        Pageable pageable = requestDTO.getPageable(Sort.by("receiptdate").descending());
    
        Page<Product> result = pRepsitory.findByCategoryLAndKeyword(categoryl,keyword,pageable);
    
        return new PageResultDTO<>(result, entity -> entityToDto(entity));
    }

    @Override
    public List<Product> findByProductname(String productname) {
        return pRepsitory.findByProductname(productname);
    }

    public List<Product> findFirstProductByArtist(String artist) {
        return pRepsitory.findFirstProductByArtist(artist);
    }

    public Product findByPcode(int pcode) {
        return pRepsitory.findByPcode(pcode);
    }

    public PageResultDTO<ProductDTO, Product> findNewAll(PageRequestDTO requestDTO) {

        Pageable pageable = requestDTO.getPageable(Sort.by("receiptdate").descending());

        Page<Product> albumResult = pRepsitory.findNewAlbum(pageable);
        Page<Product> goodsResult = pRepsitory.findNewGoods(pageable);
        Page<Product> photoResult = pRepsitory.findNewPhoto(pageable);

        // albumResult를 기준으로 새로운 Page 객체 생성
        List<Product> combinedList = new ArrayList<>(albumResult.getContent());
        combinedList.addAll(goodsResult.getContent());
        combinedList.addAll(photoResult.getContent());

        // 페이지 처리를 위한 설정
        int start = (int) pageable.getOffset();
        int end = Math.min((start + 24), combinedList.size());

        // 새로운 페이지 객체 생성
        Page<Product> resultPage = new PageImpl<>(combinedList.subList(start, end), pageable, combinedList.size());

        return new PageResultDTO<>(resultPage, this::entityToDto);

    }

    public PageResultDTO<ProductDTO, Product>findAllByKeywordLike(String keyword, PageRequestDTO requestDTO){

        Pageable pageable = requestDTO.getPageable(Sort.by("receiptdate").descending());

        Page<Product> result = pRepsitory.findAllByKeywordLike(keyword, pageable);

        return new PageResultDTO<>(result, entity -> entityToDto(entity));
    }

    public long countAll() {
        return pRepsitory.count();
    }

    public Product save(Product product){
        return pRepsitory.save(product);
    }

    public long countByCategoryl(String categoryl){
        return pRepsitory.countByCategoryl(categoryl);
    }

    @Transactional
    public void deleteByPcode(int pcode){
        pRepsitory.deleteByPcode(pcode);
    }

}
