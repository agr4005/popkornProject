package com.teamstatic.popkornback.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.teamstatic.popkornback.domain.PageRequestDTO;
import com.teamstatic.popkornback.domain.PageResultDTO;
import com.teamstatic.popkornback.domain.ProductDTO;
import com.teamstatic.popkornback.entity.Product;

public interface ProductService {

    PageResultDTO<ProductDTO, Product> findByCategorylAndCategorym(String categoryl, String categorym,
            PageRequestDTO requestDTO);

    PageResultDTO<ProductDTO, Product> findAll(PageRequestDTO requestDTO);

    List<Product> findByProductname(String productname);

    List<Product> findFirstProductByArtist(String artist);

    PageResultDTO<ProductDTO, Product> findByCategoryLAndCategoryMAndKeyword(String categoryl, String categorym, String keyword, PageRequestDTO requestDTO);

    long countAll();

    Product save(Product product);

    public Product findByPcode(int pcode);

    PageResultDTO<ProductDTO, Product> findNewAll(PageRequestDTO requestDTO);

    PageResultDTO<ProductDTO, Product>findAllByKeywordLike(String keyword, PageRequestDTO requestDTO);

    PageResultDTO<ProductDTO, Product>findByCategoryLAndKeyword(String catagoryl, String keyword, PageRequestDTO requestDTO);

    long countByCategoryl(String categoryl);

    default Product dtoToEntity(ProductDTO dto) {
        return Product.builder()
                .pcode(dto.getPcode())
                .productname(dto.getProductname())
                .artist(dto.getArtist())
                .categoryl(dto.getCategoryl())
                .categorym(dto.getCategorym())
                .categorys(dto.getCategorys())
                .price(dto.getPrice())
                .alternative(dto.getAlternative())
                .stock(dto.getStock())
                .releasing(dto.getReleasing())
                .storing(dto.getStoring())
                .receiptdate(dto.getReceiptdate())
                .image1(dto.getImage1())
                .image2(dto.getImage2())
                .image3(dto.getImage3())
                .build();

    }

    default ProductDTO entityToDto(Product entity) {
        return ProductDTO.builder()
                .pcode(entity.getPcode())
                .productname(entity.getProductname())
                .artist(entity.getArtist())
                .categoryl(entity.getCategoryl())
                .categorym(entity.getCategorym())
                .categorys(entity.getCategorys())
                .price(entity.getPrice())
                .alternative(entity.getAlternative())
                .stock(entity.getStock())
                .releasing(entity.getReleasing())
                .storing(entity.getStoring())
                .receiptdate(entity.getReceiptdate())
                .image1(entity.getImage1())
                .image2(entity.getImage2())
                .image3(entity.getImage3())
                .build();
    }

    void deleteByPcode(int pcode);
    
}
